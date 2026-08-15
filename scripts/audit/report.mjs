import { QUADRANTS } from './coverage-matrix.mjs';

export function renderReport(matrix, gaps, unclassified) {
  const areas = Object.keys(matrix).sort();
  const header = `| Área | ${QUADRANTS.join(' | ')} |`;
  const sep = `| --- | ${QUADRANTS.map(() => '---').join(' | ')} |`;
  const rows = areas.map((area) => {
    const cells = QUADRANTS.map((q) => (matrix[area][q] === 0 ? '—' : String(matrix[area][q])));
    return `| ${area} | ${cells.join(' | ')} |`;
  });
  const gapLines = gaps.map((g) => `- ${g.area} → **${g.quadrant}**`);
  const unclLines = unclassified.map((u) => `- ${u.slug}`);
  return [
    '# Matriz de cobertura Diátaxis',
    '',
    header, sep, ...rows,
    '',
    `## Huecos (${gaps.length})`,
    ...(gapLines.length ? gapLines : ['- (ninguno)']),
    '',
    `## Sin clasificar (${unclassified.length})`,
    ...(unclLines.length ? unclLines : ['- (ninguno)']),
    '',
  ].join('\n');
}
