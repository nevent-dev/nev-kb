import { describe, it, expect } from 'vitest';
import { buildCoverageMatrix, findGaps, QUADRANTS } from './coverage-matrix.mjs';

describe('buildCoverageMatrix', () => {
  it('cuenta docs por área y cuadrante', () => {
    const records = [
      { slug: 'campanas/a', area: 'campanas', diataxis: 'tutorial' },
      { slug: 'campanas/b', area: 'campanas', diataxis: 'tutorial' },
      { slug: 'campanas/c', area: 'campanas', diataxis: 'reference' },
    ];
    const matrix = buildCoverageMatrix(records, ['campanas']);
    expect(matrix.campanas.tutorial).toBe(2);
    expect(matrix.campanas.reference).toBe(1);
    expect(matrix.campanas.explanation).toBe(0);
  });

  it('ignora records cuya área no está en la lista', () => {
    const records = [{ slug: 'x/a', area: 'x', diataxis: 'tutorial' }];
    const matrix = buildCoverageMatrix(records, ['campanas']);
    expect(matrix.campanas.tutorial).toBe(0);
  });

  it('no cuenta cuadrantes inválidos (p. ej. mixed) como cobertura', () => {
    const records = [{ slug: 'campanas/a', area: 'campanas', diataxis: 'mixed' }];
    const matrix = buildCoverageMatrix(records, ['campanas']);
    expect(QUADRANTS.every((q) => matrix.campanas[q] === 0)).toBe(true);
  });
});

describe('findGaps', () => {
  it('devuelve celdas con cero docs', () => {
    const matrix = { campanas: { tutorial: 1, 'how-to': 0, reference: 0, explanation: 0 } };
    const gaps = findGaps(matrix);
    expect(gaps).toContainEqual({ area: 'campanas', quadrant: 'how-to' });
    expect(gaps).not.toContainEqual({ area: 'campanas', quadrant: 'tutorial' });
    expect(gaps).toHaveLength(3);
  });
});
