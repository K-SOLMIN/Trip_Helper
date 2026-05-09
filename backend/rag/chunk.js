'use strict';

const { CHUNK_SIZE, CHUNK_OVERLAP } = require('./config');

function chunkText(text, size = CHUNK_SIZE, overlap = CHUNK_OVERLAP) {
  const source = String(text || '').trim();
  if (!source) return [];
  if (overlap >= size) throw new Error('RAG_CHUNK_OVERLAP must be smaller than RAG_CHUNK_SIZE');

  const chunks = [];
  let start = 0;

  while (start < source.length) {
    const end = Math.min(start + size, source.length);
    chunks.push(source.slice(start, end));
    if (end === source.length) break;
    start += size - overlap;
  }

  return chunks;
}

module.exports = { chunkText };
