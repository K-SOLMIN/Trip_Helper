'use strict';
const { getEmbedding } = require('../services/geminiService');

async function embed(text) {
  return getEmbedding(text);
}

module.exports = { embed };
