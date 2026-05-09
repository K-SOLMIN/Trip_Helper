'use strict';

const {
  QDRANT_URL,
  COLLECTION_NAME: COLLECTION,
  VECTOR_SIZE,
} = require('../rag/config');

async function qdrantFetch(path, method = 'GET', body = null) {
  const options = { method, headers: { 'Content-Type': 'application/json' } };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(`${QDRANT_URL}${path}`, options);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Qdrant ${method} ${path} failed with ${response.status}: ${text}`);
  }

  return response.json();
}

async function ensureCollection() {
  try {
    await qdrantFetch(`/collections/${COLLECTION}`);
    console.log(`Qdrant collection "${COLLECTION}" ready`);
  } catch {
    await qdrantFetch(`/collections/${COLLECTION}`, 'PUT', {
      vectors: { size: VECTOR_SIZE, distance: 'Cosine' },
    });
    console.log(`Qdrant collection "${COLLECTION}" created`);
  }
}

async function deleteCollection() {
  return qdrantFetch(`/collections/${COLLECTION}`, 'DELETE');
}

async function upsert(points) {
  return qdrantFetch(`/collections/${COLLECTION}/points`, 'PUT', { points });
}

async function search(vector, limit = 5, filter = null) {
  const body = { vector, limit, with_payload: true };
  if (filter) body.filter = filter;

  const result = await qdrantFetch(`/collections/${COLLECTION}/points/search`, 'POST', body);
  return result.result;
}

async function searchByParams(vector, { limit = 5, city = null, category = null, priceRange = null } = {}) {
  const must = [];

  if (city) must.push({ key: 'city', match: { any: [city, '공통'] } });
  if (category) must.push({ key: 'category', match: { value: category } });
  if (priceRange) must.push({ key: 'price_range', match: { value: priceRange } });

  return search(vector, limit, must.length ? { must } : null);
}

module.exports = {
  ensureCollection,
  deleteCollection,
  upsert,
  search,
  searchByParams,
  COLLECTION,
  VECTOR_SIZE,
};
