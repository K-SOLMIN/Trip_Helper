#!/usr/bin/env node
/**
 * 일회성 마이그레이션 스크립트
 * seedVectorDB.js의 KNOWLEDGE 배열을 data/knowledge/australia.json 으로 추출합니다.
 *
 * 실행: node scripts/migrate-knowledge.js
 */
'use strict';

const fs   = require('fs');
const path = require('path');
const vm   = require('vm');

const SRC  = path.join(__dirname, 'seedVectorDB.js');
const DEST = path.join(__dirname, '../data/knowledge/australia.json');

if (!fs.existsSync(SRC)) {
  console.error('seedVectorDB.js 파일을 찾을 수 없습니다.');
  process.exit(1);
}

const content = fs.readFileSync(SRC, 'utf8');

/* KNOWLEDGE = [ ... ] 블록 추출 */
const startMarker = 'const KNOWLEDGE = [';
const startPos = content.indexOf(startMarker);
if (startPos === -1) {
  console.error('KNOWLEDGE 배열을 찾을 수 없습니다.');
  process.exit(1);
}

const arrayStart = startPos + startMarker.length - 1; // '[' 위치
let depth = 0, endPos = arrayStart;
for (let i = arrayStart; i < content.length; i++) {
  if (content[i] === '[') depth++;
  if (content[i] === ']') { depth--; if (depth === 0) { endPos = i; break; } }
}

const arrayStr = content.slice(arrayStart, endPos + 1);

let knowledge;
try {
  knowledge = vm.runInNewContext(`(${arrayStr})`);
} catch (err) {
  console.error('KNOWLEDGE 배열 파싱 실패:', err.message);
  process.exit(1);
}

fs.mkdirSync(path.dirname(DEST), { recursive: true });
fs.writeFileSync(DEST, JSON.stringify(knowledge, null, 2), 'utf8');

console.log(`✓ ${knowledge.length}개 항목 → ${path.relative(process.cwd(), DEST)}`);
console.log('  이제 node scripts/ingest.js --recreate 로 Qdrant에 재시드하세요.');
