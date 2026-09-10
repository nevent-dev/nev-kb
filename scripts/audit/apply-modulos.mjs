#!/usr/bin/env node
// Migración idempotente: escribe los campos `modulo` y `nivel` en el
// frontmatter de cada doc listado en scripts/audit/modulos.tsv
// (slug<TAB>modulo<TAB>nivel, con nivel vacío para modulo=plataforma).
// Inserta las líneas tras `diataxis:` (o tras `title:` si el doc aún no
// tiene diataxis); si el doc ya tiene `modulo:`, lo deja intacto (no pisa
// clasificaciones manuales posteriores del writer).
import { readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const CONTENT = fileURLToPath(new URL('../../src/content/docs/', import.meta.url));
const TSV = fileURLToPath(new URL('./modulos.tsv', import.meta.url));
const VALID_MODULO = new Set(['marketing', 'experience', 'revenue', 'plataforma']);
const VALID_NIVEL = new Set(['basic', 'pro', 'unico', '']);

function resolveFile(slug) {
  for (const ext of ['.mdx', '.md']) {
    const p = CONTENT + slug + ext;
    if (existsSync(p)) return p;
  }
  return null;
}

// Devuelve el nuevo contenido, o null si no hay cambio (ya anotado / sin frontmatter).
function insertModulo(raw, modulo, nivel) {
  const lines = raw.split('\n');
  if (lines[0] !== '---') return null; // sin frontmatter
  let end = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === '---') { end = i; break; }
  }
  if (end === -1) return null;
  for (let i = 1; i < end; i++) {
    if (/^modulo:/.test(lines[i])) return null; // ya anotado (idempotente)
  }
  // Inserta tras `diataxis:` si existe; si no, tras `title:`; si no, al abrir.
  let insertAt = 1;
  let foundDiataxis = false;
  for (let i = 1; i < end; i++) {
    if (/^diataxis:/.test(lines[i])) { insertAt = i + 1; foundDiataxis = true; break; }
  }
  if (!foundDiataxis) {
    for (let i = 1; i < end; i++) {
      if (/^title:/.test(lines[i])) { insertAt = i + 1; break; }
    }
  }
  const toInsert = [`modulo: ${modulo}`];
  if (nivel) toInsert.push(`nivel: ${nivel}`);
  lines.splice(insertAt, 0, ...toInsert);
  return lines.join('\n');
}

async function main() {
  const tsv = await readFile(TSV, 'utf8');
  const rows = tsv.split('\n').map((l) => l.trim()).filter(Boolean);
  let written = 0, skipped = 0, missing = 0, bad = 0;
  for (const row of rows) {
    const [slug, modulo, nivel = ''] = row.split('\t');
    if (!VALID_MODULO.has(modulo) || !VALID_NIVEL.has(nivel)) {
      console.error(`fila inválida: ${row}`);
      bad++;
      continue;
    }
    if (modulo !== 'plataforma' && !nivel) {
      console.error(`nivel obligatorio (modulo != plataforma): ${row}`);
      bad++;
      continue;
    }
    const file = resolveFile(slug);
    if (!file) { console.error(`no encontrado: ${slug}`); missing++; continue; }
    const raw = await readFile(file, 'utf8');
    const next = insertModulo(raw, modulo, nivel);
    if (next === null) { skipped++; continue; }
    await writeFile(file, next, 'utf8');
    written++;
  }
  console.log(`escritos: ${written} · sin cambio: ${skipped} · no encontrados: ${missing} · inválidos: ${bad}`);
  if (missing || bad) process.exit(1);
}

main().catch((err) => { console.error(err); process.exit(1); });
