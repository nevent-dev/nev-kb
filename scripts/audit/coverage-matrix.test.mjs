import { describe, it, expect } from 'vitest';
import {
  buildCoverageMatrix,
  findGaps,
  QUADRANTS,
  buildModuloMatrix,
  buildGroupMatrix,
  findGapsExcluding,
  findModuloShortfalls,
} from './coverage-matrix.mjs';

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

describe('buildModuloMatrix', () => {
  it('cuenta docs por modulo y cuadrante', () => {
    const records = [
      { slug: 'a', modulo: 'marketing', diataxis: 'tutorial' },
      { slug: 'b', modulo: 'marketing', diataxis: 'how-to' },
      { slug: 'c', modulo: 'plataforma', diataxis: 'reference' },
    ];
    const matrix = buildModuloMatrix(records, ['marketing', 'plataforma']);
    expect(matrix.marketing.tutorial).toBe(1);
    expect(matrix.marketing['how-to']).toBe(1);
    expect(matrix.plataforma.reference).toBe(1);
    expect(matrix.plataforma.tutorial).toBe(0);
  });

  it('ignora records cuyo modulo no está en la lista', () => {
    const records = [{ slug: 'a', modulo: 'no-existe', diataxis: 'tutorial' }];
    const matrix = buildModuloMatrix(records, ['marketing']);
    expect(matrix.marketing.tutorial).toBe(0);
  });
});

describe('buildGroupMatrix', () => {
  it('cuenta docs por grupo de sidebar y cuadrante', () => {
    const records = [
      { slug: 'a', group: 'Chatbot', diataxis: 'how-to' },
      { slug: 'b', group: 'Chatbot', diataxis: 'how-to' },
      { slug: 'c', group: 'Superapp', diataxis: 'explanation' },
    ];
    const matrix = buildGroupMatrix(records, ['Chatbot', 'Superapp']);
    expect(matrix.Chatbot['how-to']).toBe(2);
    expect(matrix.Superapp.explanation).toBe(1);
  });
});

describe('findGapsExcluding', () => {
  it('devuelve celdas en cero, respetando la exclusión', () => {
    const matrix = {
      Playbooks: { tutorial: 0, 'how-to': 5, reference: 0, explanation: 0 },
      Chatbot: { tutorial: 0, 'how-to': 1, reference: 1, explanation: 1 },
    };
    const gaps = findGapsExcluding(matrix, 'grupo', ['Playbooks']);
    expect(gaps).toContainEqual({ grupo: 'Chatbot', quadrant: 'tutorial' });
    expect(gaps.some((g) => g.grupo === 'Playbooks')).toBe(false);
  });
});

describe('findModuloShortfalls', () => {
  it('detecta cuadrantes por debajo del mínimo en módulos vendidos', () => {
    const matrix = {
      marketing: { tutorial: 1, 'how-to': 2, reference: 1, explanation: 1 },
      revenue: { tutorial: 0, 'how-to': 6, reference: 10, explanation: 1 },
      plataforma: { tutorial: 0, 'how-to': 0, reference: 0, explanation: 0 },
    };
    const shortfalls = findModuloShortfalls(matrix);
    expect(shortfalls).toEqual([{ modulo: 'revenue', quadrant: 'tutorial', count: 0, minimum: 1 }]);
  });

  it('no exige mínimos para plataforma', () => {
    const matrix = { plataforma: { tutorial: 0, 'how-to': 0, reference: 0, explanation: 0 } };
    expect(findModuloShortfalls(matrix)).toEqual([]);
  });
});
