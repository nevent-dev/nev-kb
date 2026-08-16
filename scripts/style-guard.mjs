#!/usr/bin/env node
// Guardián de estilo del Design System de Nevent.
// Bloquea (exit != 0) si un fichero introduce:
//   1. :hover  -> prohibido (feedback por :active/:focus-visible, no por hover)
//   2. color hardcodeado (#hex / rgb() / rgba() / hsl())  -> usar var(--token)
// Pensado para correr sobre FICHEROS CAMBIADOS (ratchet): el legacy no bloquea,
// lo nuevo sí. La capa de tokens/tema está en la allowlist.
import { readFileSync } from 'node:fs';
import { basename } from 'node:path';

// Ficheros donde SÍ se permiten literales de color (fuente de tokens / puentes de tema).
const COLOR_ALLOWLIST = /(^|[./])(tokens\.json|css-vars\.css|tokens\.ts|primeng-theme\.scss|nevent-tokens\.css|nevent-theme\.css)$/;

const HEX = /#[0-9a-fA-F]{3,8}\b/;
const FUNC_COLOR = /\b(rgba?|hsla?)\s*\(/;
const HOVER = /:hover\b/;

export function findHoverViolations(text) {
  const out = [];
  text.split('\n').forEach((line, i) => { if (HOVER.test(line)) out.push({ line: i + 1, text: line.trim().slice(0, 80) }); });
  return out;
}

export function findColorViolations(text) {
  const out = [];
  text.split('\n').forEach((line, i) => {
    // Quitar comentarios antes de buscar: /* inline */ (CSS/SCSS) y // a fin de línea (SCSS/Sass).
    const code = line.replace(/\/\*.*?\*\//g, '').replace(/\/\/.*$/, '');
    if (HEX.test(code) || FUNC_COLOR.test(code)) out.push({ line: i + 1, text: line.trim().slice(0, 80) });
  });
  return out;
}

function checkFile(path) {
  let text;
  try { text = readFileSync(path, 'utf8'); } catch { return []; }
  const violations = [];
  for (const v of findHoverViolations(text)) violations.push({ path, rule: 'no-hover', ...v });
  if (!COLOR_ALLOWLIST.test(basename(path))) {
    for (const v of findColorViolations(text)) violations.push({ path, rule: 'no-hardcoded-color', ...v });
  }
  return violations;
}

// CLI: rutas por argumento (las que pasa el hook / CI). Solo ficheros de estilo.
const STYLE_EXT = /\.(astro|css|scss|sass|vue|svelte)$/;
function main() {
  const files = process.argv.slice(2).filter((f) => STYLE_EXT.test(f));
  if (!files.length) { console.log('style-guard: sin ficheros de estilo que revisar.'); return; }
  const all = files.flatMap(checkFile);
  for (const v of all) {
    const fix = v.rule === 'no-hover'
      ? 'usa :active / :focus-visible (hover prohibido)'
      : 'usa var(--token) en vez del literal de color';
    console.error(`${v.rule}  ${v.path}:${v.line}  -> ${fix}\n    ${v.text}`);
  }
  console.log(`\nstyle-guard: ${files.length} fichero(s), ${all.length} violacion(es).`);
  if (all.length) { console.error('\nBloqueado: corrige las violaciones de estilo antes de subir.'); process.exit(1); }
  console.log('style-guard: OK.');
}

if (import.meta.url === `file://${process.argv[1]}`) main();
