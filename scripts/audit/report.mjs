import { QUADRANTS } from './coverage-matrix.mjs';

// Renderiza una matriz genérica { [key]: { [quadrant]: count } } como tabla
// Markdown, con `keyLabel` como cabecera de la primera columna.
function renderMatrixTable(matrix, keyLabel) {
  const keys = Object.keys(matrix).sort();
  const header = `| ${keyLabel} | ${QUADRANTS.join(' | ')} |`;
  const sep = `| --- | ${QUADRANTS.map(() => '---').join(' | ')} |`;
  const rows = keys.map((key) => {
    const cells = QUADRANTS.map((q) => (matrix[key][q] === 0 ? '—' : String(matrix[key][q])));
    return `| ${key} | ${cells.join(' | ')} |`;
  });
  return [header, sep, ...rows];
}

export function renderReport(matrix, gaps, unclassified) {
  const gapLines = gaps.map((g) => `- ${g.area} → **${g.quadrant}**`);
  const unclLines = unclassified.map((u) => `- ${u.slug}`);
  return [
    '# Matriz de cobertura Diátaxis',
    '',
    ...renderMatrixTable(matrix, 'Área'),
    '',
    `## Huecos (${gaps.length})`,
    ...(gapLines.length ? gapLines : ['- (ninguno)']),
    '',
    `## Sin clasificar (${unclassified.length})`,
    ...(unclLines.length ? unclLines : ['- (ninguno)']),
    '',
  ].join('\n');
}

// moduloMatrix/groupMatrix: { [key]: { [quadrant]: count } }
// moduloGaps/groupGaps: [{ modulo|grupo, quadrant }] (findGapsExcluding)
// shortfalls: [{ modulo, quadrant, count, minimum }] (findModuloShortfalls)
export function renderExtendedReport({ moduloMatrix, moduloGaps, groupMatrix, groupGaps, shortfalls }) {
  const moduloGapLines = moduloGaps.map((g) => `- ${g.modulo} → **${g.quadrant}**`);
  const groupGapLines = groupGaps.map((g) => `- ${g.grupo} → **${g.quadrant}**`);
  const shortfallLines = shortfalls.map(
    (s) => `- ${s.modulo} → **${s.quadrant}**: ${s.count}/${s.minimum} (mínimo por módulo vendido)`
  );
  return [
    '# Matriz de cobertura Diátaxis — módulo y grupo de sidebar',
    '',
    '## Por módulo',
    ...renderMatrixTable(moduloMatrix, 'Módulo'),
    '',
    `## Huecos por módulo (${moduloGaps.length})`,
    ...(moduloGapLines.length ? moduloGapLines : ['- (ninguno)']),
    '',
    `## Mínimo por módulo vendido sin cubrir (${shortfalls.length})`,
    '',
    '> ≥1 tutorial · ≥2 how-to · ≥1 explanation · ≥1 reference. No aplica a plataforma (no es un módulo comercial).',
    '',
    ...(shortfallLines.length ? shortfallLines : ['- (ninguno)']),
    '',
    '## Por grupo de sidebar',
    ...renderMatrixTable(groupMatrix, 'Grupo'),
    '',
    `## Huecos por grupo de sidebar (${groupGaps.length})`,
    '',
    '> Excluye Playbooks y Solución de problemas (homogéneos por diseño).',
    '',
    ...(groupGapLines.length ? groupGapLines : ['- (ninguno)']),
    '',
  ].join('\n');
}
