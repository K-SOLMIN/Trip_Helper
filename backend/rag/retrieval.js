'use strict';

const { embed } = require('./embed');
const store = require('./store');

async function searchKnowledge(query, { city = null, category = null, priceRange = null, limit = 6 } = {}) {
  const vector = await embed(query);
  const results = await store.search(vector, { city, category, priceRange, limit });

  return results.map(result => ({
    score: result.score,
    text: result.payload?.text ?? '',
    destination: result.payload?.destination,
    city: result.payload?.city,
    category: result.payload?.category,
    title: result.payload?.title,
    tags: result.payload?.tags,
    price_range: result.payload?.price_range,
    hours: result.payload?.hours,
    source: result.payload?.source,
    chunk_index: result.payload?.chunk_index,
  }));
}

module.exports = { searchKnowledge };
