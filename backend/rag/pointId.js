'use strict';

const crypto = require('crypto');

function makePointId({ destination = '', city = '', category = '', title = '', chunkIndex = 0, text = '' }) {
  const key = [destination, city, category, title, chunkIndex, String(text).slice(0, 120)].join('|');
  const hash = crypto.createHash('sha256').update(key).digest('hex');
  return [
    hash.slice(0, 8),
    hash.slice(8, 12),
    `4${hash.slice(13, 16)}`,
    hash.slice(16, 20),
    hash.slice(20, 32),
  ].join('-');
}

module.exports = { makePointId };
