import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import {
  findHoverViolations,
  findColorViolations,
  findImportantViolations,
  findFontFamilyViolations,
  findFontFaceViolations,
  checkBrandTokens,
  BRAND_TOKENS,
} from './style-guard.mjs';

describe('reglas por fichero', () => {
  it('detecta :hover', () => {
    expect(findHoverViolations('.a:hover { color: red; }')).toHaveLength(1);
    expect(findHoverViolations('.a:focus-visible { }')).toHaveLength(0);
  });

  it('detecta colores literales y acepta tokens', () => {
    expect(findColorViolations('color: #a64eff;')).toHaveLength(1);
    expect(findColorViolations('color: rgba(0,0,0,.5);')).toHaveLength(1);
    expect(findColorViolations('color: var(--color-brand-accent);')).toHaveLength(0);
  });

  it('detecta !important', () => {
    expect(findImportantViolations('color: red !important;')).toHaveLength(1);
    expect(findImportantViolations('color: red;')).toHaveLength(0);
  });

  it('no cuenta lo que va dentro de un comentario de varias líneas', () => {
    const css = `/*\n  Aquí explicamos por qué no usamos !important\n  ni #ff0000 en el código.\n*/\n.a { color: var(--x); }`;
    expect(findImportantViolations(css)).toHaveLength(0);
    expect(findColorViolations(css)).toHaveLength(0);
  });

  it('exige que font-family use un token', () => {
    expect(findFontFamilyViolations("font-family: 'Manuka', sans-serif;")).toHaveLength(1);
    expect(findFontFamilyViolations('font-family: var(--font-display);')).toHaveLength(0);
  });

  it('prohíbe declarar fuentes web', () => {
    expect(findFontFaceViolations("@font-face { font-family: 'X'; }")).toHaveLength(1);
    expect(findFontFaceViolations('.a { color: var(--x); }')).toHaveLength(0);
  });
});

describe('integridad de marca', () => {
  const tokensReales = readFileSync('src/styles/nevent-tokens.css', 'utf8');

  it('la hoja de tokens del repo está intacta', () => {
    expect(checkBrandTokens(tokensReales)).toEqual([]);
  });

  it('cantan los valores de marca cambiados', () => {
    const manipulado = tokensReales.replace('--color-brand-accent: #a64eff;', '--color-brand-accent: #ff0000;');
    const problemas = checkBrandTokens(manipulado);
    expect(problemas).toHaveLength(1);
    expect(problemas[0].token).toBe('--color-brand-accent');
    expect(problemas[0].esperado).toBe('#a64eff');
  });

  it('canta si alguien vuelve a meter una fuente propia', () => {
    const conManuka = tokensReales.replace(
      /--font-display:[^;]+;/,
      "--font-display: 'Manuka', sans-serif;",
    );
    const problemas = checkBrandTokens(conManuka);
    expect(problemas.some((p) => p.token === '--font-display')).toBe(true);
  });

  it('cubre la escala de acento completa', () => {
    expect(Object.keys(BRAND_TOKENS)).toHaveLength(12);
  });
});
