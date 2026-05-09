'use strict';

function extractJsonObject(text) {
  const source = String(text || '').trim();
  const match = source.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('AI response did not contain a JSON object');
  return JSON.parse(match[0]);
}

module.exports = { extractJsonObject };
