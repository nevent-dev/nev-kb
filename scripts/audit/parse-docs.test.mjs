import { describe, it, expect } from 'vitest';
import { areaFromPath, toRecord, findUnclassified } from './parse-docs.mjs';

describe('areaFromPath', () => {
  it('devuelve el primer segmento como área', () => {
    expect(areaFromPath('campanas/crear.mdx')).toBe('campanas');
  });
  it('excluye ficheros de raíz', () => {
    expect(areaFromPath('index.mdx')).toBeNull();
  });
  it('excluye el locale en/', () => {
    expect(areaFromPath('en/campanas/crear.mdx')).toBeNull();
  });
});

describe('toRecord', () => {
  it('extrae slug, área y diataxis del frontmatter', () => {
    const raw = `---\ntitle: Crear campaña\ndiataxis: tutorial\n---\nCuerpo`;
    const rec = toRecord(raw, 'campanas/crear.mdx');
    expect(rec).toEqual({
      slug: 'campanas/crear',
      area: 'campanas',
      diataxis: 'tutorial',
      title: 'Crear campaña',
    });
  });
  it('pone diataxis a null cuando falta', () => {
    const raw = `---\ntitle: Sin tipo\n---\nCuerpo`;
    const rec = toRecord(raw, 'campanas/x.mdx');
    expect(rec.diataxis).toBeNull();
  });
});

describe('findUnclassified', () => {
  it('devuelve records de contenido sin cuadrante válido', () => {
    const records = [
      { slug: 'campanas/a', area: 'campanas', diataxis: 'tutorial' },
      { slug: 'campanas/b', area: 'campanas', diataxis: null },
      { slug: 'campanas/c', area: 'campanas', diataxis: 'mixed' },
      { slug: 'index', area: null, diataxis: null },
    ];
    const out = findUnclassified(records);
    expect(out.map((r) => r.slug)).toEqual(['campanas/b', 'campanas/c']);
  });
});
