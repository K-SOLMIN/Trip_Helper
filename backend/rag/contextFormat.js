'use strict';

function formatContext(results) {
  if (!results?.length) return '';

  return results
    .filter(result => result.text)
    .map(result => {
      const meta = [
        result.destination,
        result.city,
        result.category,
        result.price_range,
        result.score ? `score:${result.score.toFixed(3)}` : null,
      ].filter(Boolean).join(' / ');

      return meta ? `[${meta}]\n${result.text}` : result.text;
    })
    .join('\n\n---\n\n');
}

module.exports = { formatContext };
