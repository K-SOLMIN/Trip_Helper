'use strict';

const { genAI, CHAT_MODEL_NAME } = require('../config/gemini');
const { toolDefinitions } = require('./mcpTools');
const mcpClient = require('./mcpClient');
const {
  AGENT_SYSTEM,
  MAX_AGENT_ITERATIONS,
  buildInitialPrompt,
  buildRagQuery,
  normalizePlanParams,
} = require('../domains/aiTravel/promptBuilder');
const { extractJsonObject } = require('../domains/aiTravel/responseParser');

async function getRagContext(params) {
  try {
    const { retrieveContext } = require('./ragService');
    const normalized = normalizePlanParams(params);
    return retrieveContext(buildRagQuery(normalized), {
      dest: normalized.dest,
      budget: normalized.budget,
    });
  } catch {
    return '';
  }
}

function getToolCalls(response) {
  const candidate = response.response.candidates?.[0];
  const parts = candidate?.content?.parts ?? [];
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

async function resolveFinalText(chat, response) {
  const lastParts = response.response.candidates?.[0]?.content?.parts ?? [];
  const hasToolCall = lastParts.some(part => part.functionCall);

  if (!hasToolCall) return response.response.text();

  const fallback = await chat.sendMessage(
    '지금까지 수집한 정보를 바탕으로 최종 여행 일정 JSON만 반환해 주세요.'
  );
  return fallback.response.text();
}

async function runAgent(params) {
  const ragContext = await getRagContext(params);
  const initialPrompt = buildInitialPrompt(params, ragContext);

  const model = genAI.getGenerativeModel({
    model: CHAT_MODEL_NAME,
    systemInstruction: AGENT_SYSTEM,
    tools: [{ functionDeclarations: toolDefinitions }],
  });

  const chat = model.startChat({ history: [] });
  let response = await chat.sendMessage(initialPrompt);

  for (let iteration = 0; iteration < MAX_AGENT_ITERATIONS; iteration++) {
    const toolCalls = getToolCalls(response);
    if (!toolCalls.length) break;

    const toolResults = await executeToolCalls(toolCalls);
    response = await chat.sendMessage(toolResults);
  }

  const finalText = await resolveFinalText(chat, response);
  return extractJsonObject(finalText);
}

module.exports = { runAgent };
