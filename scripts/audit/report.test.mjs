import { describe, it, expect } from 'vitest';
import { renderReport } from './report.mjs';

const matrix = { campanas: { tutorial: 2, 'how-to': 0, reference: 1, explanation: 0 } };
const gaps = [
  { area: 'campanas', quadrant: 'how-to' },
  { area: 'campanas', quadrant: 'explanation' },
];
const unclassified = [{ slug: 'campanas/x', area: 'campanas', diataxis: null }];

describe('renderReport', () => {
  it('incluye cabecera de tabla con los cuatro cuadrantes', () => {
    const md = renderReport(matrix, gaps, unclassified);
    expect(md).toContain('| Área | tutorial | how-to | reference | explanation |');
  });
  it('usa em-dash para celdas en cero y el número para el resto', () => {
    const md = renderReport(matrix, gaps, unclassified);
    expect(md).toContain('| campanas | 2 | — | 1 | — |');
  });
  it('lista huecos y sin-clasificar con sus recuentos', () => {
    const md = renderReport(matrix, gaps, unclassified);
    expect(md).toContain('## Huecos (2)');
    expect(md).toContain('## Sin clasificar (1)');
    expect(md).toContain('- campanas/x');
  });
});
