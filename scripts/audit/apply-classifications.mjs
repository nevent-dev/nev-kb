#!/usr/bin/env node
// Migración idempotente: escribe el campo `diataxis` en el frontmatter de cada
// doc listado en scripts/audit/classifications.tsv (slug<TAB>quadrant).
// Inserta la línea tras `title:`; si el doc ya tiene `diataxis:`, lo deja intacto.
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const CONTENT = fileURLToPath(new URL('../../src/content/docs/', import.meta.url));
const TSV = fileURLToPath(new URL('./classifications.tsv', import.meta.url));
const VALID = new Set(['tutorial', 'how-to', 'reference', 'explanation', 'mixed']);

function resolveFile(slug) {
  for (const ext of ['.mdx', '.md']) {
    const p = CONTENT + slug + ext;
    if (existsSync(p)) return p;
  }
  return null;
}

// Devuelve el nuevo contenido, o null si no hay cambio (ya anotado / sin frontmatter).
function insertDiataxis(raw, quadrant) {
  const lines = raw.split('\n');
  if (lines[0] !== '---') return null; // sin frontmatter
  let end = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === '---') { end = i; break; }
  }
  if (end === -1) return null;
  for (let i = 1; i < end; i++) {
    if (/^diataxis:/.test(lines[i])) return null; // ya anotado (idempotente)
  }
  let insertAt = 1; // por defecto, justo tras el `---` de apertura
  for (let i = 1; i < end; i++) {
    if (/^title:/.test(lines[i])) { insertAt = i + 1; break; }
  }
  lines.splice(insertAt, 0, `diataxis: ${quadrant}`);
  return lines.join('\n');
}

async function main() {
  const tsv = await readFile(TSV, 'utf8');
  const rows = tsv.split('\n').map((l) => l.trim()).filter(Boolean);
  let written = 0, skipped = 0, missing = 0, bad = 0;
  for (const row of rows) {
    const [slug, quadrant] = row.split('\t');
    if (!VALID.has(quadrant)) { console.error(`cuadrante inválido: ${row}`); bad++; continue; }
    const file = resolveFile(slug);
    if (!file) { console.error(`no encontrado: ${slug}`); missing++; continue; }
    const raw = await readFile(file, 'utf8');
    const next = insertDiataxis(raw, quadrant);
    if (next === null) { skipped++; continue; }
    await writeFile(file, next, 'utf8');
    written++;
  }
  console.log(`escritos: ${written} · sin cambio: ${skipped} · no encontrados: ${missing} · inválidos: ${bad}`);
  if (missing || bad) process.exit(1);
}

main().catch((err) => { console.error(err); process.exit(1); });
