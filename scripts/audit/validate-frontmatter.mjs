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

// --- Chequeo 3: diataxis y modulo/nivel obligatorios (ERROR) ---
// El schema de Zod (src/content.config.ts) no tiene acceso a la ruta del
// entry, así que la excepción por ruta (index.mdx, 404.mdx, locale en/
// opcional) vive aquí, no en el schema.
export const DIATAXIS_VALUES = ['tutorial', 'how-to', 'reference', 'explanation'];
export const MODULO_VALUES = ['marketing', 'experience', 'revenue', 'plataforma'];
export const NIVEL_VALUES = ['basic', 'pro', 'unico'];

// relPath (relativo a content/docs, con extensión) -> true si diataxis/modulo
// son opcionales en ese doc.
export function isExemptFromTaxonomy(relPath) {
  const norm = relPath.replace(/\\/g, '/');
  if (norm === 'index.mdx' || norm === 'index.md') return true;
  if (norm === '404.mdx' || norm === '404.md') return true;
  if (norm.startsWith('en/')) return true;
  return false;
}

// relPath + raw -> [{ level: 'error', code, message }]
export function checkTaxonomy(relPath, raw) {
  if (isExemptFromTaxonomy(relPath)) return [];
  const { data } = matter(raw);
  const violations = [];

  if (data.diataxis === 'mixed') {
    violations.push({ level: 'error', code: 'diataxis-mixed', message: `${relPath}: diataxis 'mixed' ya no es válido, divide el doc y reclasifícalo` });
  } else if (!DIATAXIS_VALUES.includes(data.diataxis)) {
    violations.push({ level: 'error', code: 'diataxis-missing', message: `${relPath}: falta diataxis (o valor inválido: ${JSON.stringify(data.diataxis)})` });
  }

  if (!MODULO_VALUES.includes(data.modulo)) {
    violations.push({ level: 'error', code: 'modulo-missing', message: `${relPath}: falta modulo (o valor inválido: ${JSON.stringify(data.modulo)})` });
  } else if (data.modulo !== 'plataforma' && !NIVEL_VALUES.includes(data.nivel)) {
    violations.push({ level: 'error', code: 'nivel-missing', message: `${relPath}: modulo '${data.modulo}' requiere nivel (basic/pro/unico), falta o es inválido: ${JSON.stringify(data.nivel)}` });
  }

  return violations;
}

// --- Chequeo 4: patrón de título por tipo diataxis (WARN, ERROR con --strict) ---
// Listas curadas de arranques de título esperados por cuadrante Diátaxis.
// No son gramática: son la convención editorial de esta KB.
const TITLE_PREFIXES = {
  tutorial: [
    'Tu primer', 'Tu primera', 'Primer recorrido', 'Empieza', 'Crea tu primer', 'Crea tu primera',
    'Pon en marcha', 'Explora', 'Recorre', 'Conecta tu', 'Configura tu',
  ],
  'how-to': [
    'Cómo', 'Qué hacer', 'Checklist', 'Ajustes',
    'Crea', 'Configura', 'Gestiona', 'Importa', 'Consulta', 'Activa', 'Sincroniza', 'Comprueba',
    'Añade', 'Analiza', 'Diseña', 'Divide', 'Reactiva', 'Recupera', 'Vende', 'Fideliza', 'Lanza',
    'Baja',
  ],
  explanation: [
    'Qué es', 'Qué son', 'Qué consigues', 'Por qué', 'Cómo funciona', 'Cómo funcionan',
    'Cómo entiende', 'Cómo entender', 'Cómo se', 'Cuándo', 'Para qué', 'Los ', 'Segmento',
    'Email,', 'Cuánto', 'Reputación', 'RFM', 'Nevent Score', 'Límites', 'Atribución',
    'Buenas prácticas', 'Mejores', 'Permisos', 'Casos prácticos', 'Lo que puedes', 'Motor',
  ],
  reference: [
    'Referencia', 'Catálogo', 'Campos', 'Límites', 'Requisitos', 'Qué datos', 'Qué puedes medir',
    'Qué mide', 'Preguntas frecuentes', 'FAQ', 'Frases', 'Métricas', 'Deliverability', 'Tracking',
    'Compatibilidad', 'Nevent MCP', 'Troubleshooting', 'Modelo', 'Operadores', '6 ', 'Asistencia',
    'Atributos', 'Gasto', 'Engagement', 'Combinaciones', 'Criterios', 'Cómo agrupar',
    'Qué incluye', 'Soporte según',
  ],
};

// Páginas bajo solucion-de-problemas/ siguen la convención "voz del cliente":
// el título es la pregunta o queja tal cual la formularía el usuario (p. ej.
// "Mis emails van a spam", "No veo ventas atribuidas a mis campañas"), no un
// imperativo. No tiene sentido forzarlas a encajar en los prefijos genéricos
// de how-to, así que quedan exentas del chequeo de patrón de título.
function isCustomerVoiceExempt(relPath) {
  return relPath.replace(/\\/g, '/').startsWith('solucion-de-problemas/');
}

// Lista cerrada de excepciones puntuales por slug (relPath relativo a
// content/docs, con extensión): páginas cuyo título se sabe que no encaja en
// los prefijos curados por un motivo editorial concreto y que no justifica
// ampliar la lista general. Vacía salvo casos puntuales verificados a mano.
const TITLE_PATTERN_SLUG_EXCEPTIONS = new Set([]);

// Quita comillas envolventes y el símbolo de interrogación de apertura, y
// recorta espacio, para comparar contra los prefijos curados.
function normalizeTitle(title) {
  let t = (title ?? '').trim();
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
    t = t.slice(1, -1);
  }
  return t.replace(/^¿/, '');
}

// diataxis + title -> true si el título arranca con uno de los prefijos
// curados para ese cuadrante (o si el cuadrante no tiene lista, por defecto true).
export function matchesTitlePattern(diataxis, title) {
  const prefixes = TITLE_PREFIXES[diataxis];
  if (!prefixes) return true;
  const normalized = normalizeTitle(title);
  return prefixes.some((p) => normalized.startsWith(p));
}

// relPath + raw -> [{ level, code, message }] (level: 'warn' salvo --strict)
export function checkTitlePattern(relPath, raw, { strict = false } = {}) {
  if (isExemptFromTaxonomy(relPath)) return [];
  if (isCustomerVoiceExempt(relPath)) return [];
  const normalizedRelPath = relPath.replace(/\\/g, '/');
  if (TITLE_PATTERN_SLUG_EXCEPTIONS.has(normalizedRelPath)) return [];
  const { data } = matter(raw);
  if (!DIATAXIS_VALUES.includes(data.diataxis)) return []; // ya lo cubre checkTaxonomy
  if (matchesTitlePattern(data.diataxis, data.title)) return [];
  return [{
    level: strict ? 'error' : 'warn',
    code: 'title-pattern',
    message: `${relPath}: el título "${data.title}" no empieza por un arranque esperado para ${data.diataxis}`,
  }];
}

// --- Chequeo 5: heurísticas de cuerpo por tipo diataxis (WARN) ---
// Los guías de esta KB numeran pasos sobre todo con encabezados
// "## Paso N: ..." (a veces "### Paso N"), no con listas ordenadas de
// Markdown; se cuentan ambas formas y se toma la que dé más pasos.
function countNumberedSteps(body) {
  const orderedListItems = (body.match(/^\s*\d+\.\s+\S/gm) || []).length;
  const stepHeadings = (body.match(/^#{2,4}\s*Paso\s*\d+/gim) || []).length;
  return Math.max(orderedListItems, stepHeadings);
}

function hasMarkdownTable(body) {
  // Cabecera de tabla GFM: una línea con '|' seguida de una fila separadora
  // de guiones/dos puntos (--- | :--- | ---:).
  if (/\|.*\n\s*\|?[\s:-]*-{3,}[\s:|-]*\n/.test(body)) return true;
  // Algunas reference usan <table> HTML en vez de sintaxis Markdown (por
  // ejemplo cuando el contenido de las celdas necesita saltos de línea o
  // formato que Markdown no soporta bien dentro de una tabla).
  return /<table[\s>]/i.test(body);
}

// relPath + raw -> [{ level: 'warn', code, message }]
export function checkBodyHeuristics(relPath, raw) {
  if (isExemptFromTaxonomy(relPath)) return [];
  const { data, content } = matter(raw);
  const diataxis = data.diataxis;
  if (!DIATAXIS_VALUES.includes(diataxis)) return [];
  const violations = [];
  const steps = countNumberedSteps(content);

  if ((diataxis === 'tutorial' || diataxis === 'how-to') && steps < 3) {
    violations.push({
      level: 'warn',
      code: 'body-steps',
      message: `${relPath}: ${diataxis} con solo ${steps} paso(s) numerado(s) (se esperan ≥3)`,
    });
  }
  if (diataxis === 'explanation' && steps > 0) {
    violations.push({
      level: 'warn',
      code: 'body-explanation-steps',
      message: `${relPath}: explanation con ${steps} paso(s) numerado(s); una explicación no debería llevar procedimiento paso a paso`,
    });
  }
  if (diataxis === 'reference' && !hasMarkdownTable(content)) {
    violations.push({
      level: 'warn',
      code: 'body-reference-table',
      message: `${relPath}: reference sin ninguna tabla`,
    });
  }
  return violations;
}
