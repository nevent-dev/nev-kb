#!/usr/bin/env node
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { toRecord, findUnclassified } from './audit/parse-docs.mjs';
import {
  buildCoverageMatrix,
  findGaps,
  buildModuloMatrix,
  buildGroupMatrix,
  findGapsExcluding,
  findModuloShortfalls,
  MODULOS,
} from './audit/coverage-matrix.mjs';
import { renderReport, renderExtendedReport } from './audit/report.mjs';
import { groupLabelForSlug, SIDEBAR_GROUP_LABELS } from './sidebar.mjs';

const CONTENT_DIR = fileURLToPath(new URL('../src/content/docs', import.meta.url));
const OUT = fileURLToPath(new URL('../coverage-report.md', import.meta.url));
const OUT_EXTENDED = fileURLToPath(new URL('../coverage-report-modulo.md', import.meta.url));
// Grupos de sidebar homogéneos por diseño: no tiene sentido pedirles los
// cuatro cuadrantes (Playbooks son todo how-to; Solución de problemas igual).
const GROUP_GAP_EXCLUDE = ['Playbooks', 'Solución de problemas'];

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

  // Matriz módulo × cuadrante y grupo de sidebar × cuadrante (solo ES: los
  // docs en/ no llevan modulo y no encajan en ningún grupo de sidebar, así
  // que quedan fuera de estas dos matrices de forma natural).
  const moduloMatrix = buildModuloMatrix(records, MODULOS);
  const moduloGaps = findGapsExcluding(moduloMatrix, 'modulo');

  // parse-docs.mjs no recorta el `index` final del slug (a diferencia de
  // sidebar.mjs, que replica el comportamiento de Astro); lo normalizamos
  // aquí para que groupLabelForSlug reconozca páginas índice como
  // `empieza-aqui/index` → `empieza-aqui`.
  const recordsWithGroup = records.map((r) => ({
    ...r,
    group: groupLabelForSlug(r.slug.replace(/(^|\/)index$/, '') || r.slug),
  }));
  const groupMatrix = buildGroupMatrix(recordsWithGroup, SIDEBAR_GROUP_LABELS);
  const groupGaps = findGapsExcluding(groupMatrix, 'grupo', GROUP_GAP_EXCLUDE);
  const shortfalls = findModuloShortfalls(moduloMatrix);

  const extendedReport = renderExtendedReport({ moduloMatrix, moduloGaps, groupMatrix, groupGaps, shortfalls });
  await writeFile(OUT_EXTENDED, extendedReport, 'utf8');
  console.log(extendedReport);
  console.error(`\nEscrito: ${OUT_EXTENDED}`);
}

main().catch((err) => { console.error(err); process.exit(1); });
