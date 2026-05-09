'use strict';

function numberFromEnv(name, fallback) {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

module.exports = {
  QDRANT_URL: process.env.QDRANT_URL || 'http://localhost:6333',
  COLLECTION_NAME: process.env.QDRANT_COLLECTION || 'travel_knowledge',
  VECTOR_SIZE: numberFromEnv('VECTOR_SIZE', 3072),
  EMBEDDING_MODEL: process.env.EMBEDDING_MODEL || 'gemini-embedding-001',
  CHAT_MODEL: process.env.CHAT_MODEL || 'gemini-2.0-flash',
  CHUNK_SIZE: numberFromEnv('RAG_CHUNK_SIZE', 600),
  CHUNK_OVERLAP: numberFromEnv('RAG_CHUNK_OVERLAP', 100),
  BATCH_SIZE: numberFromEnv('RAG_BATCH_SIZE', 50),
};
