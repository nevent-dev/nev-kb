#!/usr/bin/env node
// Guardián de estilo del Design System de Nevent.
//
// Dos capas:
//
//   A. Reglas por fichero (modo ratchet: solo los ficheros que cambias).
//      El legacy no bloquea; lo nuevo sí.
//        1. :hover           -> prohibido (feedback por :active/:focus-visible)
//        2. color literal    -> usar var(--token)
//        3. !important       -> prohibido: es lo que impide que el token mande
//        4. font-family con nombre de fuente -> usar var(--font-*)
//        5. @font-face       -> prohibido fuera de la capa de tokens
//
//   B. Integridad de marca (siempre, no depende de lo que hayas tocado).
//      Comprueba que los valores canónicos de nevent.ai siguen intactos en la
//      hoja de tokens. Si alguien cambia el morado de marca, el CI se cae.
//
// Fuente de verdad de la capa B:
// nev-landing-nevent/nevent-web/src/styles/tokens.css (escala --accent-* y --ds-ink).
import { readFileSync } from 'node:fs';
import { basename } from 'node:path';

// Ficheros donde SÍ se permiten literales de color y familias tipográficas:
// son la capa de tokens y los puentes de tema.
const TOKEN_LAYER = /(^|[./])(tokens\.json|css-vars\.css|tokens\.ts|primeng-theme\.scss|nevent-tokens\.css|nevent-theme\.css|nevent-web-tokens\.css)$/;

const HEX = /#[0-9a-fA-F]{3,8}\b/;
const FUNC_COLOR = /\b(rgba?|hsla?)\s*\(/;
const HOVER = /:hover\b/;
const IMPORTANT = /!\s*important\b/;
const FONT_FACE = /@font-face\b/;
// Declaración de font-family: se valida el valor, no el patrón, porque \s* con
// lookahead retrocede y daba falsos positivos sobre "font-family: var(--x)".
const FONT_FAMILY_DECL = /font-family\s*:\s*([^;}]+)/;

// Vacía los comentarios conservando el número de líneas, para que /* ... */
// repartido en varias líneas no cuente como código.
function stripComments(text) {
  const sinBloques = text.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));
  return sinBloques.split('\n').map((l) => l.replace(/\/\/.*$/, '')).join('\n');
}

function scan(text, re) {
  const out = [];
  const limpio = stripComments(text).split('\n');
  const original = text.split('\n');
  limpio.forEach((code, i) => {
    if (re.test(code)) out.push({ line: i + 1, text: (original[i] || '').trim().slice(0, 80) });
  });
  return out;
}

export function findHoverViolations(text) {
  const out = [];
  text.split('\n').forEach((line, i) => { if (HOVER.test(line)) out.push({ line: i + 1, text: line.trim().slice(0, 80) }); });
  return out;
}

export function findColorViolations(text) {
  const out = [];
  const limpio = stripComments(text).split('\n');
  const original = text.split('\n');
  limpio.forEach((code, i) => {
    if (HEX.test(code) || FUNC_COLOR.test(code)) out.push({ line: i + 1, text: (original[i] || '').trim().slice(0, 80) });
  });
  return out;
}

export function findImportantViolations(text) { return scan(text, IMPORTANT); }
export function findFontFamilyViolations(text) {
  const out = [];
  const limpio = stripComments(text).split('\n');
  const original = text.split('\n');
  limpio.forEach((code, i) => {
    const m = code.match(FONT_FAMILY_DECL);
    const valor = m ? m[1].trim().toLowerCase() : '';
    // inherit/initial/unset/revert no eligen fuente: la heredan.
    const esPalabraClave = ['inherit', 'initial', 'unset', 'revert'].includes(valor.replace(/;$/, ''));
    if (m && !valor.startsWith('var(--') && !esPalabraClave) {
      out.push({ line: i + 1, text: (original[i] || '').trim().slice(0, 80) });
    }
  });
  return out;
}
export function findFontFaceViolations(text) { return scan(text, FONT_FACE); }

// ---------------------------------------------------------------------------
// Capa B — integridad de marca
// ---------------------------------------------------------------------------
// Copiados literalmente de la escala --accent-* y --ds-ink de nevent.ai.
// Cambiar cualquiera de estos valores es un cambio de marca, no de un sitio:
// se hace primero en la landing y luego aquí, nunca al revés.
export const BRAND_TOKENS = {
  '--color-brand-black': '#1a1e2a',
  '--color-brand-accent': '#a64eff',
  '--color-purple-50': '#f6edff',
  '--color-purple-100': '#ecdcff',
  '--color-purple-200': '#d9b8ff',
  '--color-purple-300': '#c48fff',
  '--color-purple-400': '#b06bff',
  '--color-purple-500': '#a64eff',
  '--color-purple-600': '#8f3ae6',
  '--color-purple-700': '#732bc0',
  '--color-purple-800': '#57219a',
  '--color-purple-900': '#3c1770',
};

// La marca resuelve todo el texto en la pila del sistema. Cualquier familia
// propia (Manuka, Poppins, Inter...) es una decisión de marca y no puede
// entrar por un CSS suelto.
const SYSTEM_STACK = /-apple-system,\s*BlinkMacSystemFont/;

export function checkBrandTokens(text) {
  const problemas = [];
  for (const [token, valor] of Object.entries(BRAND_TOKENS)) {
    const re = new RegExp(`${token}\\s*:\\s*([^;]+);`);
    const m = text.match(re);
    if (!m) { problemas.push({ token, esperado: valor, encontrado: '(ausente)' }); continue; }
    const actual = m[1].trim().toLowerCase();
    if (actual !== valor) problemas.push({ token, esperado: valor, encontrado: actual });
  }
  for (const familia of ['--font-display', '--font-body']) {
    const m = text.match(new RegExp(`${familia}\\s*:\\s*([^;]+);`));
    if (!m) { problemas.push({ token: familia, esperado: 'pila del sistema', encontrado: '(ausente)' }); continue; }
    if (!SYSTEM_STACK.test(m[1])) {
      problemas.push({ token: familia, esperado: 'pila del sistema (como nevent.ai)', encontrado: m[1].trim().slice(0, 60) });
    }
  }
  return problemas;
}

function checkFile(path) {
  let text;
  try { text = readFileSync(path, 'utf8'); } catch { return []; }
  const violations = [];
  const enTokens = TOKEN_LAYER.test(basename(path));

  for (const v of findHoverViolations(text)) violations.push({ path, rule: 'no-hover', ...v });
  for (const v of findImportantViolations(text)) violations.push({ path, rule: 'no-important', ...v });
  if (!enTokens) {
    for (const v of findColorViolations(text)) violations.push({ path, rule: 'no-hardcoded-color', ...v });
    for (const v of findFontFamilyViolations(text)) violations.push({ path, rule: 'no-font-family-literal', ...v });
    for (const v of findFontFaceViolations(text)) violations.push({ path, rule: 'no-webfont', ...v });
  }
  return violations;
}

const AYUDA = {
  'no-hover': 'usa :active / :focus-visible (hover prohibido)',
  'no-hardcoded-color': 'usa var(--token) en vez del literal de color',
  'no-important': 'quita el !important: si hace falta, el token o el selector están mal',
  'no-font-family-literal': 'usa var(--font-display) / var(--font-body)',
  'no-webfont': 'la marca usa la pila del sistema: no añadas @font-face aquí',
};

const HOJA_TOKENS = 'src/styles/nevent-tokens.css';

function main() {
  const args = process.argv.slice(2);
  const STYLE_EXT = /\.(astro|css|scss|sass|vue|svelte)$/;
  const files = args.filter((f) => STYLE_EXT.test(f));
  let fallos = 0;

  // Capa B: siempre, tocaras lo que tocaras.
  let tokensText = '';
  try { tokensText = readFileSync(HOJA_TOKENS, 'utf8'); } catch {}
  if (tokensText) {
    const problemas = checkBrandTokens(tokensText);
    for (const p of problemas) {
      console.error(`brand-token  ${HOJA_TOKENS}  -> ${p.token} debe ser ${p.esperado}, es ${p.encontrado}`);
    }
    fallos += problemas.length;
    if (!problemas.length) console.log('style-guard: marca intacta (12 tokens + 2 familias).');
  } else {
    console.error(`brand-token  no se pudo leer ${HOJA_TOKENS}`);
    fallos += 1;
  }

  // Capa A: ratchet sobre lo que cambia.
  if (!files.length) {
    console.log('style-guard: sin ficheros de estilo que revisar.');
  } else {
    const all = files.flatMap(checkFile);
    for (const v of all) {
      console.error(`${v.rule}  ${v.path}:${v.line}  -> ${AYUDA[v.rule]}\n    ${v.text}`);
    }
    console.log(`style-guard: ${files.length} fichero(s), ${all.length} violacion(es).`);
    fallos += all.length;
  }

  if (fallos) { console.error('\nBloqueado: corrige las violaciones de estilo antes de subir.'); process.exit(1); }
  console.log('style-guard: OK.');
}

if (import.meta.url === `file://${process.argv[1]}`) main();
