'use strict';

const { GoogleGenerativeAI } = require('@google/generative-ai');
const { CHAT_MODEL, EMBEDDING_MODEL } = require('../rag/config');

if (!process.env.GEMINI_API_KEY) {
  console.warn('GEMINI_API_KEY is not set. AI features will not work.');
}

const apiKey = process.env.GEMINI_API_KEY || 'placeholder';
const genAI = new GoogleGenerativeAI(apiKey);

const CHAT_MODEL_NAME = CHAT_MODEL;
const chatModel = genAI.getGenerativeModel({ model: CHAT_MODEL_NAME });
const embeddingModel = genAI.getGenerativeModel({ model: EMBEDDING_MODEL });

module.exports = { genAI, chatModel, embeddingModel, CHAT_MODEL_NAME };
