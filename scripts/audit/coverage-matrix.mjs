export const QUADRANTS = ['tutorial', 'how-to', 'reference', 'explanation'];

// records: [{ slug, area, diataxis }], areas: string[]
// -> { [area]: { [quadrant]: count } }
export function buildCoverageMatrix(records, areas) {
  const matrix = {};
  for (const area of areas) {
    matrix[area] = Object.fromEntries(QUADRANTS.map((q) => [q, 0]));
  }
  for (const rec of records) {
    const row = matrix[rec.area];
    if (!row) continue;
    if (QUADRANTS.includes(rec.diataxis)) {
      row[rec.diataxis] += 1;
    }
  }
  return matrix;
}

// matrix -> [{ area, quadrant }] para celdas en 0
export function findGaps(matrix) {
  const gaps = [];
  for (const [area, row] of Object.entries(matrix)) {
    for (const [quadrant, count] of Object.entries(row)) {
      if (count === 0) gaps.push({ area, quadrant });
    }
  }
  return gaps;
}

export const MODULOS = ['marketing', 'experience', 'revenue', 'plataforma'];

// records: [{ slug, modulo, diataxis }] -> { [modulo]: { [quadrant]: count } }
export function buildModuloMatrix(records, modulos = MODULOS) {
  const matrix = {};
  for (const modulo of modulos) {
    matrix[modulo] = Object.fromEntries(QUADRANTS.map((q) => [q, 0]));
  }
  for (const rec of records) {
    const row = matrix[rec.modulo];
    if (!row) continue;
    if (QUADRANTS.includes(rec.diataxis)) row[rec.diataxis] += 1;
  }
  return matrix;
}

// records: [{ slug, group, diataxis }], groups: string[]
// -> { [group]: { [quadrant]: count } }
export function buildGroupMatrix(records, groups) {
  const matrix = {};
  for (const group of groups) {
    matrix[group] = Object.fromEntries(QUADRANTS.map((q) => [q, 0]));
  }
  for (const rec of records) {
    const row = matrix[rec.group];
    if (!row) continue;
    if (QUADRANTS.includes(rec.diataxis)) row[rec.diataxis] += 1;
  }
  return matrix;
}

// Variante de findGaps que permite excluir claves del resultado (p. ej. los
// grupos de sidebar 'Playbooks' y 'Solución de problemas', homogéneos por
// diseño: no tiene sentido pedirles un tutorial o una reference).
export function findGapsExcluding(matrix, keyName, exclude = []) {
  const excluded = new Set(exclude);
  const gaps = [];
  for (const [key, row] of Object.entries(matrix)) {
    if (excluded.has(key)) continue;
    for (const [quadrant, count] of Object.entries(row)) {
      if (count === 0) gaps.push({ [keyName]: key, quadrant });
    }
  }
  return gaps;
}

// Mínimo de cobertura por módulo VENDIDO (marketing/experience/revenue; no
// 'plataforma', que no es un módulo comercial). matrix keyed by modulo.
export const MODULO_MINIMUMS = { tutorial: 1, 'how-to': 2, explanation: 1, reference: 1 };
export const MODULOS_VENDIDOS = ['marketing', 'experience', 'revenue'];

// moduloMatrix -> [{ modulo, quadrant, count, minimum }] para las celdas que
// no llegan al mínimo exigido en un módulo vendido.
export function findModuloShortfalls(moduloMatrix, minimums = MODULO_MINIMUMS, modulosVendidos = MODULOS_VENDIDOS) {
  const shortfalls = [];
  for (const modulo of modulosVendidos) {
    const row = moduloMatrix[modulo];
    if (!row) continue;
    for (const [quadrant, minimum] of Object.entries(minimums)) {
      const count = row[quadrant] ?? 0;
      if (count < minimum) shortfalls.push({ modulo, quadrant, count, minimum });
    }
  }
  return shortfalls;
}
