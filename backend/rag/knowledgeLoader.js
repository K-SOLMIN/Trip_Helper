'use strict';

const fs = require('fs');
const path = require('path');

const DEFAULT_KNOWLEDGE_DIR = path.join(__dirname, '../data/knowledge');

function readKnowledgeFile(filePath) {
  const raw = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(raw);
  if (!Array.isArray(data)) {
    throw new Error(`${path.basename(filePath)} must contain a top-level JSON array`);
  }
  return data;
}

function loadKnowledgeFiles(dir = DEFAULT_KNOWLEDGE_DIR) {
  if (!fs.existsSync(dir)) throw new Error(`Knowledge data directory not found: ${dir}`);

  const files = fs.readdirSync(dir).filter(file => file.endsWith('.json')).sort();
  if (!files.length) throw new Error(`No .json knowledge files found in ${dir}`);

  return files.flatMap(file => {
    const filePath = path.join(dir, file);
    const items = readKnowledgeFile(filePath);
    console.log(`  - ${file}: ${items.length} items`);
    return items.map(item => ({ ...item, source_file: file }));
  });
}

module.exports = { DEFAULT_KNOWLEDGE_DIR, loadKnowledgeFiles, readKnowledgeFile };
