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
