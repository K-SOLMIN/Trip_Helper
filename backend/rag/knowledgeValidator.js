'use strict';

const REQUIRED_FIELDS = ['destination', 'city', 'category', 'text'];

function validateKnowledgeItem(item, index) {
  const errors = [];

  for (const field of REQUIRED_FIELDS) {
    const value = item?.[field];
    if (typeof value !== 'string' || !value.trim()) {
      errors.push(`[${index}] ${field} is required`);
    }
  }

  if (item?.tags !== undefined && !Array.isArray(item.tags)) {
    errors.push(`[${index}] tags must be an array`);
  }

  for (const field of ['lat', 'lng']) {
    if (item?.[field] !== undefined && item[field] !== null && !Number.isFinite(Number(item[field]))) {
      errors.push(`[${index}] ${field} must be a number when provided`);
    }
  }

  return errors;
}

function validateKnowledgeItems(items) {
  return items.flatMap((item, index) => validateKnowledgeItem(item, index));
}

module.exports = { REQUIRED_FIELDS, validateKnowledgeItem, validateKnowledgeItems };
