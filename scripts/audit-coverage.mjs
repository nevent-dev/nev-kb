#!/usr/bin/env node
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { toRecord, findUnclassified } from './audit/parse-docs.mjs';
import { buildCoverageMatrix, findGaps } from './audit/coverage-matrix.mjs';
import { renderReport } from './audit/report.mjs';

const CONTENT_DIR = fileURLToPath(new URL('../src/content/docs', import.meta.url));
const OUT = fileURLToPath(new URL('../coverage-report.md', import.meta.url));

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(full)));
    else if (/\.mdx?$/.test(e.name)) files.push(full);
  }
  return files;
}

async function main() {
  const files = await walk(CONTENT_DIR);
  const records = [];
  for (const f of files) {
    const raw = await readFile(f, 'utf8');
    records.push(toRecord(raw, relative(CONTENT_DIR, f)));
  }
  const areas = [...new Set(records.map((r) => r.area).filter(Boolean))].sort();
  const matrix = buildCoverageMatrix(records, areas);
  const report = renderReport(matrix, findGaps(matrix), findUnclassified(records));
  await writeFile(OUT, report, 'utf8');
  console.log(report);
  console.error(`\nEscrito: ${OUT}`);
}

main().catch((err) => { console.error(err); process.exit(1); });
