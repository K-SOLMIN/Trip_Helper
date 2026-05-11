'use strict';

// 공동작업 일정 생성 전용 에이전트 서비스 (agentService.js 와 독립적으로 운영)
const { genAI, CHAT_MODEL_NAME } = require('../config/gemini');
const { toolDefinitions } = require('./mcpTools');
const mcpClient = require('./mcpClient');
const {
  COLLAB_AGENT_SYSTEM,
  COLLAB_MAX_AGENT_ITERATIONS,
  COLLAB_JSON_PROMPT,
  buildCollabInitialPrompt,
  buildRagQuery,
  normalizePlanParams,
} = require('../domains/aiTravel/collabPromptBuilder');
const { extractJsonObject } = require('../domains/aiTravel/responseParser');
const { withRetry } = require('./geminiService');
const { getWeatherForTrip } = require('./weatherService');

async function getCollabRagContext(params) {
  try {
    const { retrieveContext } = require('./ragService');
    const { resolveCoords } = require('../rag/geo');
    const normalized = normalizePlanParams(params);

    let lat = null;
    let lon = null;
    if (normalized.accommodations?.length > 0) {
      const coords = resolveCoords(normalized.accommodations[0].location);
      if (coords) {
        lat = coords.lat;
        lon = coords.lon;
      }
    }

    return retrieveContext(buildRagQuery(normalized), {
      dest: normalized.dest,
      budget: normalized.budget,
      lat,
      lon,
      debug: true,
    });
  } catch (err) {
    console.warn(`[CollabRAG] error: ${err.message}`);
    return { context: '', meta: { enabled: false, reason: 'error', error: err.message } };
  }
}

function getToolCalls(response) {
  const parts = response.response.candidates?.[0]?.content?.parts ?? [];
  return parts.filter(part => part.functionCall);
}

async function executeToolCalls(toolCalls) {
  return Promise.all(
    toolCalls.map(async part => {
      const { name, args } = part.functionCall;
      const result = await mcpClient.callTool(name, args);
      return {
        functionResponse: {
          name,
          response: { content: JSON.stringify(result) },
        },
      };
    })
  );
}

function safeSend(chatSession, message) {
  return withRetry(() => chatSession.sendMessage(message));
}

async function resolveFinalText(chatSession, response) {
  const lastParts = response.response.candidates?.[0]?.content?.parts ?? [];
  const toolCallParts = lastParts.filter(part => part.functionCall);

  if (!toolCallParts.length) {
    const text = response.response.text();
    if (text.includes('{')) return text;
    const retry = await safeSend(chatSession, COLLAB_JSON_PROMPT);
    return retry.response.text();
  }

  const dummyResponses = toolCallParts.map(part => ({
    functionResponse: {
      name: part.functionCall.name,
      response: { content: JSON.stringify({ done: true, note: 'Sufficient data collected. Generate the final itinerary now.' }) },
    },
  }));
  const closedResponse = await safeSend(chatSession, dummyResponses);
  const closedText = closedResponse.response.text();
  if (closedText.includes('{')) return closedText;

  const fallback = await safeSend(chatSession, COLLAB_JSON_PROMPT);
  return fallback.response.text();
}

async function runCollabAgent(params) {
  const normalized = normalizePlanParams(params);

  const [ragResult, weatherSummary] = await Promise.all([
    getCollabRagContext(params),
    getWeatherForTrip(normalized.dest, params.startDate, params.endDate),
  ]);

  const ragContext = typeof ragResult === 'string' ? ragResult : ragResult.context;
  const ragDebug = typeof ragResult === 'string' ? null : ragResult.meta;
  const initialPrompt = buildCollabInitialPrompt(params, ragContext, weatherSummary);

  const model = genAI.getGenerativeModel({
    model: CHAT_MODEL_NAME,
    systemInstruction: COLLAB_AGENT_SYSTEM,
    tools: [{ functionDeclarations: toolDefinitions }],
  });

  const chatSession = model.startChat({ history: [] });
  let response = await safeSend(chatSession, initialPrompt);

  for (let iteration = 0; iteration < COLLAB_MAX_AGENT_ITERATIONS; iteration++) {
    const toolCalls = getToolCalls(response);
    if (!toolCalls.length) break;

    const toolResults = await executeToolCalls(toolCalls);
    response = await safeSend(chatSession, toolResults);
  }

  const finalText = await resolveFinalText(chatSession, response);
  console.log('[collabAgentService] finalText preview:', finalText.slice(0, 120));
  const plan = extractJsonObject(finalText);
  if (!Array.isArray(plan.days) || plan.days.length === 0) {
    throw new Error('AI가 공동 일정을 생성하지 못했습니다. 잠시 후 다시 시도해 주세요.');
  }
  if (ragDebug) plan.ragDebug = ragDebug;
  return plan;
}

module.exports = { runCollabAgent };
