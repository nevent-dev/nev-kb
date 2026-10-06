import { describe, it, expect } from 'vitest';
import {
  sortRecords,
  buildGroups,
  collectSlugs,
  findUnassigned,
  readEsRecords,
  DIATAXIS_SIDEBAR_ORDER,
  EMPIEZA_AQUI_GROUP,
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
    const dynamicSlugs = collectSlugs(groups.filter((g) => g.label !== 'Empieza aquí'));
    expect(dynamicSlugs.sort()).toEqual(['audiencia/a', 'campanas/c', 'suscripciones/b']);
    expect(new Set(dynamicSlugs).size).toBe(dynamicSlugs.length);
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

  it('Empieza aquí es un grupo estático en primera posición, expandido', () => {
    const records = [
      rec({ slug: 'empieza-aqui', title: 'Empieza', diataxis: 'tutorial' }),
      rec({ slug: 'campanas/crear-primera-campana', title: 'Crea tu campaña', diataxis: 'tutorial' }),
    ];
    const groups = buildGroups(records);
    expect(groups[0].label).toBe('Empieza aquí');
    expect(groups[0].collapsed).toBe(false);
  });

  it('Empieza aquí contiene las 9 rutas de activación del onboarding, con sus labels y anidación exactos', () => {
    // Fuente de verdad: astro.config.mjs previo al commit dd10734 (PR #92),
    // donde este grupo se mantenía a mano. Son los "aha moments" del
    // onboarding: sus slugs viven también en sus módulos naturales
    // (Segmentación, Campañas, Publicidad de pago, Chatbot, Magic Links),
    // así que aquí se permite que se repitan.
    const flat = [];
    function walk(items) {
      for (const item of items) {
        if (item.slug) flat.push({ label: item.label, slug: item.slug });
        if (item.items) walk(item.items);
      }
    }
    walk(EMPIEZA_AQUI_GROUP.items);

    expect(EMPIEZA_AQUI_GROUP.collapsed).toBe(false);
    expect(flat).toEqual([
      { label: 'Cómo funciona el onboarding', slug: 'empieza-aqui' },
      { label: 'Antes de nada · Conecta tu ticketera', slug: 'audiencia/conecta-tu-ticketera' },
      { label: '1 · Crea tu primer segmento', slug: 'segmentacion/tu-primer-segmento' },
      { label: '2 · Crea y envía tu campaña', slug: 'campanas/crear-primera-campana' },
      { label: '1 · Conecta Meta, Google y TikTok', slug: 'paid-media/introduccion' },
      { label: '2 · Sincroniza un segmento como audiencia', slug: 'paid-media/sincroniza-un-segmento-como-audiencia' },
      { label: '3 · Comprueba que tus ventas llegan a Meta', slug: 'paid-media/conversiones-de-meta' },
      { label: '1 · Configura tu chatbot', slug: 'chatbot/configuracion' },
      { label: '1 · Monta tu primer Magic Link', slug: 'herramientas/tu-primer-magic-link' },
    ]);

    const groups = buildGroups([rec({ slug: 'empieza-aqui', title: 'Empieza' })]);
    const empieza = groups.find((g) => g.label === 'Empieza aquí');
    expect(empieza.items.find((i) => i.label === 'Vende por tus canales').items.map((i) => i.slug)).toEqual([
      'segmentacion/tu-primer-segmento',
      'campanas/crear-primera-campana',
    ]);
    expect(empieza.items.find((i) => i.label === 'Anuncios más rentables').items.map((i) => i.slug)).toEqual([
      'paid-media/introduccion',
      'paid-media/sincroniza-un-segmento-como-audiencia',
      'paid-media/conversiones-de-meta',
    ]);
    expect(empieza.items.find((i) => i.label === 'Atención automática').items.map((i) => i.slug)).toEqual([
      'chatbot/configuracion',
    ]);
    expect(empieza.items.find((i) => i.label === 'Mide qué canal te trae gente').items.map((i) => i.slug)).toEqual([
      'herramientas/tu-primer-magic-link',
    ]);
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
  it('todos los docs ES (salvo index/404) aparecen en algún grupo, sin duplicados (excepto Empieza aquí)', () => {
    // "Empieza aquí" es una selección curada y estática de rutas de
    // activación (ver EMPIEZA_AQUI_GROUP): sus slugs viven también en sus
    // módulos naturales, así que queda EXENTA de la regla de duplicados.
    // El resto de grupos dinámicos sigue sin poder duplicar slugs.
    const records = readEsRecords();
    expect(records.length).toBeGreaterThan(100);
    const groups = buildGroups(records);
    const dynamicGroups = groups.filter((g) => g.label !== 'Empieza aquí');
    const dynamicSlugs = collectSlugs(dynamicGroups);
    expect(new Set(dynamicSlugs).size).toBe(dynamicSlugs.length);
    // 'empieza-aqui' (la página índice del onboarding) vive únicamente en el
    // grupo estático "Empieza aquí": no se le asigna ningún grupo dinámico.
    const expected = new Set(records.map((r) => r.slug).filter((slug) => slug !== 'empieza-aqui'));
    expect(new Set(dynamicSlugs)).toEqual(expected);

    // El grupo estático aparece una vez, en primera posición, y todos sus
    // slugs corresponden a contenido real existente.
    expect(groups[0].label).toBe('Empieza aquí');
    const allRealSlugs = new Set(records.map((r) => r.slug));
    const empiezaSlugs = collectSlugs([groups[0]]);
    for (const slug of empiezaSlugs) {
      expect(allRealSlugs.has(slug)).toBe(true);
    }
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
