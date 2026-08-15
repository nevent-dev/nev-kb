import matter from 'gray-matter';

// --- Chequeo 1: claves de FAQ ---
// El schema de contenido exige faqs con claves EXACTAS q/a. Los escritores
// agénticos derivan a question/answer o pregunta/respuesta y rompen el build.
const FAQ_REQUIRED = ['q', 'a'];

// raw (contenido del fichero) -> [{ index, badKeys, missing }]
export function checkFaqKeys(raw) {
  const { data } = matter(raw);
  const faqs = data.faqs;
  if (!Array.isArray(faqs)) return [];
  const violations = [];
  faqs.forEach((item, index) => {
    const keys = Object.keys(item || {});
    const badKeys = keys.filter((k) => k !== 'q' && k !== 'a');
    const missing = FAQ_REQUIRED.filter((k) => !keys.includes(k));
    if (badKeys.length || missing.length) violations.push({ index, badKeys, missing });
  });
  return violations;
}

// --- Chequeo 2: ortografía heurística ---
// El verificador LLM no bloquea de forma fiable la falta de tildes/eñes.
// Reglas de alta precisión: palabras acabadas en el sonido -ción/-sión (que en
// español SIEMPRE llevan tilde) y una lista curada de palabras cuya forma sin
// tilde no es una palabra válida distinta en este contexto.
const EXACT = new Map([
  ['tambien', 'también'], ['ademas', 'además'], ['aqui', 'aquí'], ['asi', 'así'],
  ['telefono', 'teléfono'], ['electronico', 'electrónico'], ['categoria', 'categoría'],
  ['analitica', 'analítica'], ['catalogo', 'catálogo'], ['rapido', 'rápido'],
  ['facil', 'fácil'], ['estan', 'están'], ['guia', 'guía'], ['dia', 'día'],
  ['pestana', 'pestaña'], ['pestanas', 'pestañas'], ['despues', 'después'],
]);

// Quita de una línea lo que no es prosa: código inline, destinos de enlaces
// markdown, y etiquetas HTML/JSX (donde aparecen slugs/rutas sin tilde a propósito).
function stripNonProse(line) {
  return line
    .replace(/`[^`]*`/g, ' ')            // `code`
    .replace(/https?:\/\/\S+/g, ' ')     // URLs (slugs sin tilde a propósito)
    .replace(/["'][^"']*\/[^"']*["']/g, ' ') // "/ruta/con/slugs" (href/url/src multilínea)
    .replace(/\]\([^)]*\)/g, '] ')        // ](/ruta-sin-tilde)
    .replace(/<[^>]*>/g, ' ');            // <Component .../>
}

// raw -> [{ line, word, suggestion }]
export function checkOrthography(raw) {
  const flags = [];
  let inFence = false;
  raw.split('\n').forEach((rawLine, i) => {
    // saltar bloques de código con vallas (```), donde hay identificadores en inglés
    if (/^\s*```/.test(rawLine)) { inFence = !inFence; return; }
    if (inFence) return;
    // saltar claves de frontmatter que llevan slugs/rutas
    if (/^\s*(slug|ogImage|image):/.test(rawLine)) return;
    const line = stripNonProse(rawLine);
    const words = line.match(/[A-Za-zÀ-ÿ]+/g) || [];
    for (const w of words) {
      const lw = w.toLowerCase();
      // Solo -ción: en inglés estas palabras usan -tion, así que un final en
      // "cion" es casi siempre español sin tilde. Evitamos -sion, que colisiona
      // con vocabulario inglés (conversion, version, session...).
      if (/^[a-z]{2,}cion$/.test(lw)) {
        flags.push({ line: i + 1, word: w, suggestion: lw.replace(/cion$/, 'ción') });
      } else if (EXACT.has(lw)) {
        flags.push({ line: i + 1, word: w, suggestion: EXACT.get(lw) });
      }
    }
  });
  return flags;
}
