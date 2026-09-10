import { describe, it, expect } from 'vitest';
import {
  sortRecords,
  buildGroups,
  collectSlugs,
  findUnassigned,
  readEsRecords,
  DIATAXIS_SIDEBAR_ORDER,
} from './sidebar.mjs';

function rec(overrides) {
  return {
    slug: 'x/a',
    title: 'A',
    diataxis: 'how-to',
    order: null,
    label: null,
    badge: null,
    nivel: null,
    ...overrides,
  };
}

describe('sortRecords', () => {
  it('ordena tutorial → how-to → explanation → reference', () => {
    const records = [
      rec({ slug: 'r', title: 'R', diataxis: 'reference' }),
      rec({ slug: 'e', title: 'E', diataxis: 'explanation' }),
      rec({ slug: 'h', title: 'H', diataxis: 'how-to' }),
      rec({ slug: 't', title: 'T', diataxis: 'tutorial' }),
    ];
    const sorted = sortRecords(records).map((r) => r.diataxis);
    expect(sorted).toEqual(DIATAXIS_SIDEBAR_ORDER);
  });

  it('a igual diataxis, usa sidebar.order ascendente', () => {
    const records = [
      rec({ slug: 'b', title: 'B', order: 2 }),
      rec({ slug: 'a', title: 'A', order: 1 }),
      rec({ slug: 'c', title: 'C', order: null }),
    ];
    expect(sortRecords(records).map((r) => r.slug)).toEqual(['a', 'b', 'c']);
  });

  it('a igual diataxis y sin order, ordena alfabéticamente por título', () => {
    const records = [
      rec({ slug: 'z', title: 'Zeta' }),
      rec({ slug: 'a', title: 'Alfa' }),
      rec({ slug: 'm', title: 'Eme' }),
    ];
    expect(sortRecords(records).map((r) => r.slug)).toEqual(['a', 'm', 'z']);
  });
});

describe('buildGroups', () => {
  it('agrupa por carpeta y no duplica slugs', () => {
    const records = [
      rec({ slug: 'audiencia/a', title: 'A', diataxis: 'tutorial' }),
      rec({ slug: 'suscripciones/b', title: 'B', diataxis: 'how-to' }),
      rec({ slug: 'campanas/c', title: 'C', diataxis: 'reference' }),
    ];
    const groups = buildGroups(records);
    const slugs = collectSlugs(groups);
    expect(slugs.sort()).toEqual(['audiencia/a', 'campanas/c', 'suscripciones/b']);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('todos los grupos y subgrupos van collapsed: true', () => {
    const records = [
      rec({ slug: 'segmentacion/capacidades/a', title: 'A', diataxis: 'reference' }),
      rec({ slug: 'segmentacion/casos/b', title: 'B', diataxis: 'how-to' }),
      rec({ slug: 'segmentacion/c', title: 'C', diataxis: 'tutorial' }),
    ];
    const groups = buildGroups(records);
    const seg = groups.find((g) => g.label === 'Segmentación');
    expect(seg.collapsed).toBe(true);
    for (const item of seg.items) {
      if (item.items) expect(item.collapsed).toBe(true);
    }
  });

  it('reparte segmentacion/capacidades/* y segmentacion/casos/* en subgrupos', () => {
    const records = [
      rec({ slug: 'segmentacion/capacidades/rfm', title: 'RFM', diataxis: 'reference' }),
      rec({ slug: 'segmentacion/casos/vip', title: 'VIP', diataxis: 'how-to' }),
      rec({ slug: 'segmentacion/tu-primer-segmento', title: 'Primero', diataxis: 'tutorial' }),
    ];
    const groups = buildGroups(records);
    const seg = groups.find((g) => g.label === 'Segmentación');
    const criterios = seg.items.find((i) => i.label === 'Criterios');
    const casos = seg.items.find((i) => i.label === 'Casos');
    expect(criterios.items.map((i) => i.slug)).toEqual(['segmentacion/capacidades/rfm']);
    expect(casos.items.map((i) => i.slug)).toEqual(['segmentacion/casos/vip']);
    expect(seg.items.some((i) => i.slug === 'segmentacion/tu-primer-segmento')).toBe(true);
  });

  it('usa sidebar.label si existe, si no el title', () => {
    const records = [
      rec({ slug: 'audiencia/a', title: 'Título largo', label: 'Corto', diataxis: 'tutorial' }),
      rec({ slug: 'audiencia/b', title: 'Sin override', diataxis: 'how-to' }),
    ];
    const groups = buildGroups(records);
    const items = groups.find((g) => g.label === 'Audiencia').items;
    expect(items.find((i) => i.slug === 'audiencia/a').label).toBe('Corto');
    expect(items.find((i) => i.slug === 'audiencia/b').label).toBe('Sin override');
  });

  it('añade badge Pro cuando nivel es pro y no hay badge propio', () => {
    const records = [rec({ slug: 'chatbot/a', title: 'A', diataxis: 'how-to', nivel: 'pro' })];
    const groups = buildGroups(records);
    const item = groups.find((g) => g.label === 'Chatbot').items[0];
    expect(item.badge).toEqual({ text: 'Pro', variant: 'note' });
  });

  it('conserva el badge propio del frontmatter en vez de sobreescribirlo con Pro', () => {
    const records = [
      rec({
        slug: 'chatbot/a',
        title: 'A',
        diataxis: 'how-to',
        nivel: 'pro',
        badge: { text: 'Nuevo', variant: 'tip' },
      }),
    ];
    const groups = buildGroups(records);
    const item = groups.find((g) => g.label === 'Chatbot').items[0];
    expect(item.badge).toEqual({ text: 'Nuevo', variant: 'tip' });
  });

  it('Empieza aquí solo incluye la página índice, no duplica rutas de otros módulos', () => {
    const records = [
      rec({ slug: 'empieza-aqui', title: 'Empieza', diataxis: 'tutorial' }),
      rec({ slug: 'campanas/crear-primera-campana', title: 'Crea tu campaña', diataxis: 'tutorial' }),
    ];
    const groups = buildGroups(records);
    const empieza = groups.find((g) => g.label === 'Empieza aquí');
    expect(collectSlugs([empieza])).toEqual(['empieza-aqui']);
  });

  it('separa Nevent IA de Nevent IA para desarrolladores', () => {
    const records = [
      rec({ slug: 'nevent-ai', title: 'Qué es', diataxis: 'explanation' }),
      rec({ slug: 'nevent-ai/developers', title: 'Overview', diataxis: 'reference' }),
    ];
    const groups = buildGroups(records);
    expect(collectSlugs([groups.find((g) => g.label === 'Nevent IA')])).toEqual(['nevent-ai']);
    expect(
      collectSlugs([groups.find((g) => g.label === 'Nevent IA para desarrolladores')])
    ).toEqual(['nevent-ai/developers']);
  });
});

describe('findUnassigned', () => {
  it('detecta slugs que ningún grupo reclama', () => {
    const records = [rec({ slug: 'no-existe/x', title: 'X' })];
    expect(findUnassigned(records)).toEqual(['no-existe/x']);
  });

  it('no deja nada sin asignar para las carpetas de contenido reales', () => {
    expect(findUnassigned(readEsRecords())).toEqual([]);
  });
});

describe('integración con el contenido real', () => {
  it('todos los docs ES (salvo index/404) aparecen en algún grupo, sin duplicados', () => {
    const records = readEsRecords();
    expect(records.length).toBeGreaterThan(100);
    const groups = buildGroups(records);
    const slugs = collectSlugs(groups);
    expect(new Set(slugs).size).toBe(slugs.length);
    const expected = new Set(records.map((r) => r.slug));
    expect(new Set(slugs)).toEqual(expected);
  });

  it('respeta el orden T→H→E→R dentro de cada grupo plano', () => {
    const records = readEsRecords();
    const groups = buildGroups(records);
    const bySlug = new Map(records.map((r) => [r.slug, r]));
    function rank(diataxis) {
      const i = DIATAXIS_SIDEBAR_ORDER.indexOf(diataxis);
      return i === -1 ? DIATAXIS_SIDEBAR_ORDER.length : i;
    }
    function checkItems(items) {
      let lastRank = -1;
      for (const item of items) {
        if (item.items) { checkItems(item.items); continue; }
        const r = rank(bySlug.get(item.slug)?.diataxis ?? null);
        expect(r).toBeGreaterThanOrEqual(lastRank);
        lastRank = r;
      }
    }
    for (const g of groups) checkItems(g.items);
  });
});
