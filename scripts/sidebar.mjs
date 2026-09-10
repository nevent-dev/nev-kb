// scripts/sidebar.mjs — genera el bloque de sidebar ES de Starlight a partir
// del frontmatter de cada doc bajo src/content/docs (excluyendo en/, index.mdx
// y 404.mdx). Sustituye el bloque ES que antes se mantenía a mano en
// astro.config.mjs.
//
// Uso desde astro.config.mjs:
//   import { getEsSidebar } from './scripts/sidebar.mjs';
//   sidebar: [...getEsSidebar(), ...bloqueEnManual]
//
// Reglas (ver PLAN Ola 0 §4):
//   - Todos los grupos (y subgrupos) van con collapsed: true.
//   - Orden dentro de cada grupo/subgrupo: diataxis tutorial → how-to →
//     explanation → reference; a igualdad, frontmatter `sidebar.order`
//     (ascendente, sin valor va al final); a igualdad, alfabético por título.
//   - Badge 'Pro' (variant note) cuando nivel === 'pro', salvo que el
//     frontmatter ya declare su propio `sidebar.badge` (p. ej. 'Nuevo'),
//     que se conserva tal cual.
//   - La etiqueta mostrada es `sidebar.label` si existe, si no el `title`.
//   - Cada slug aparece en un único grupo.

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

export const DIATAXIS_SIDEBAR_ORDER = ['tutorial', 'how-to', 'explanation', 'reference'];

const DEFAULT_CONTENT_DIR = fileURLToPath(new URL('../src/content/docs', import.meta.url));

/**
 * Recorre src/content/docs (raíz, sin en/) y devuelve un record por doc:
 *   { slug, title, diataxis, order, label, badge, nivel }
 */
export function readEsRecords(contentDir = DEFAULT_CONTENT_DIR) {
  const records = [];
  function walk(dir) {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) {
        if (name === 'en') continue;
        walk(full);
        continue;
      }
      if (!/\.mdx?$/.test(name)) continue;
      let slug = relative(contentDir, full).replace(/\.(mdx?|md)$/, '').replace(/\\/g, '/');
      if (slug === 'index' || slug === '404') continue;
      // Astro's content-collection slugs drop a trailing `index` segment
      // (e.g. `segmentacion/capacidades/index.mdx` → slug `segmentacion/capacidades`).
      slug = slug.replace(/(^|\/)index$/, '') || slug;
      const { data } = matter(readFileSync(full, 'utf8'));
      records.push({
        slug,
        title: data.title ?? slug,
        diataxis: typeof data.diataxis === 'string' ? data.diataxis : null,
        order: typeof data.sidebar?.order === 'number' ? data.sidebar.order : null,
        label: typeof data.sidebar?.label === 'string' ? data.sidebar.label : null,
        badge: data.sidebar?.badge ?? null,
        nivel: typeof data.nivel === 'string' ? data.nivel : null,
      });
    }
  }
  walk(contentDir);
  return records;
}

/** Orden estable: diataxis (T→H→E→R) · sidebar.order · título alfabético. */
export function sortRecords(records) {
  return [...records].sort((a, b) => {
    const da = DIATAXIS_SIDEBAR_ORDER.indexOf(a.diataxis);
    const db = DIATAXIS_SIDEBAR_ORDER.indexOf(b.diataxis);
    const ra = da === -1 ? DIATAXIS_SIDEBAR_ORDER.length : da;
    const rb = db === -1 ? DIATAXIS_SIDEBAR_ORDER.length : db;
    if (ra !== rb) return ra - rb;
    const oa = a.order ?? Infinity;
    const ob = b.order ?? Infinity;
    if (oa !== ob) return oa - ob;
    return a.title.localeCompare(b.title, 'es');
  });
}

/** record -> item de sidebar de Starlight ({ label, slug, badge? }). */
export function toSidebarItem(record) {
  const item = { label: record.label ?? record.title, slug: record.slug };
  if (record.badge) {
    item.badge = record.badge;
  } else if (record.nivel === 'pro') {
    item.badge = { text: 'Pro', variant: 'note' };
  }
  return item;
}

// --- Configuración de grupos (§4 del plan) -------------------------------
// Cada grupo declara cómo reconocer sus docs. `subgroups` se evalúan antes
// que `flat`; el primer grupo (en orden de declaración) que reclama un slug
// se lo queda, así que cada doc aparece en un único sitio.

function isUnder(slug, prefix) {
  return slug === prefix || slug.startsWith(prefix + '/');
}

const ANALITICA_METRICAS = new Set([
  'analitica/eventos-y-entradas',
  'analitica/audiencia',
  'analitica/campanas',
  'analitica/paid-media',
  'analitica/tracking-y-atribucion',
  'analitica/deliverability',
]);

const GROUP_DEFS = [
  {
    label: 'Empieza aquí',
    match: (slug) => slug === 'empieza-aqui',
  },
  {
    label: 'Playbooks',
    match: (slug) => isUnder(slug, 'playbooks'),
  },
  {
    label: 'Solución de problemas',
    match: (slug) => isUnder(slug, 'solucion-de-problemas'),
  },
  {
    label: 'Cuenta y organización',
    match: (slug) => isUnder(slug, 'organizacion') || isUnder(slug, 'consumo'),
  },
  {
    label: 'Audiencia',
    match: (slug) => isUnder(slug, 'audiencia') || isUnder(slug, 'suscripciones'),
  },
  {
    label: 'Segmentación',
    match: (slug) => isUnder(slug, 'segmentacion'),
    subgroups: [
      { label: 'Criterios', match: (slug) => isUnder(slug, 'segmentacion/capacidades') },
      { label: 'Casos', match: (slug) => isUnder(slug, 'segmentacion/casos') },
    ],
  },
  {
    label: 'Campañas',
    match: (slug) => isUnder(slug, 'campanas'),
    subgroups: [
      { label: 'Informe de campaña', match: (slug) => isUnder(slug, 'campanas/informe') },
    ],
  },
  {
    label: 'Entregabilidad y canales',
    match: (slug) => isUnder(slug, 'entregabilidad'),
  },
  {
    label: 'Publicidad de pago',
    match: (slug) => isUnder(slug, 'paid-media'),
  },
  {
    label: 'Analítica',
    match: (slug) => isUnder(slug, 'analitica'),
    subgroups: [
      { label: 'Métricas', match: (slug) => ANALITICA_METRICAS.has(slug) },
      { label: 'Casos', match: (slug) => isUnder(slug, 'analitica/casos') },
    ],
  },
  {
    label: 'Experiencias',
    match: (slug) => isUnder(slug, 'experiencias'),
  },
  {
    label: 'Magic Links',
    match: (slug) => isUnder(slug, 'herramientas'),
  },
  {
    label: 'Chatbot',
    match: (slug) => isUnder(slug, 'chatbot'),
  },
  {
    label: 'Superapp',
    match: (slug) => isUnder(slug, 'superapp'),
  },
  {
    label: 'Nevent IA',
    match: (slug) => isUnder(slug, 'nevent-ai') && !isUnder(slug, 'nevent-ai/developers'),
    subgroups: [
      { label: 'Lo que puedes hacer', match: (slug) => isUnder(slug, 'nevent-ai/que-puedes-hacer') },
      { label: 'Casos prácticos', match: (slug) => isUnder(slug, 'nevent-ai/casos-practicos') },
    ],
  },
  {
    label: 'Nevent IA para desarrolladores',
    match: (slug) => isUnder(slug, 'nevent-ai/developers'),
  },
];

/**
 * records -> bloque de sidebar ES de Starlight (array de grupos con
 * collapsed: true, cada uno con `items` ordenados; los grupos con
 * subgrupos anidan sub-arrays también collapsed: true).
 */
export function buildGroups(records) {
  const remaining = new Set(records.map((r) => r.slug));
  const bySlug = new Map(records.map((r) => [r.slug, r]));
  const groups = [];

  for (const def of GROUP_DEFS) {
    const groupSlugs = records
      .map((r) => r.slug)
      .filter((slug) => remaining.has(slug) && def.match(slug));
    if (groupSlugs.length === 0) continue;

    const flatSlugs = [];
    const subBuckets = (def.subgroups ?? []).map(() => []);

    for (const slug of groupSlugs) {
      let placed = false;
      if (def.subgroups) {
        for (let i = 0; i < def.subgroups.length; i++) {
          if (def.subgroups[i].match(slug)) {
            subBuckets[i].push(slug);
            placed = true;
            break;
          }
        }
      }
      if (!placed) flatSlugs.push(slug);
      remaining.delete(slug);
    }

    const items = sortRecords(flatSlugs.map((s) => bySlug.get(s))).map(toSidebarItem);
    if (def.subgroups) {
      def.subgroups.forEach((sub, i) => {
        if (subBuckets[i].length === 0) return;
        const subItems = sortRecords(subBuckets[i].map((s) => bySlug.get(s))).map(toSidebarItem);
        items.push({ label: sub.label, collapsed: true, items: subItems });
      });
    }

    groups.push({ label: def.label, collapsed: true, items });
  }

  return groups;
}

/** Slugs que ningún grupo reclamó (debería quedar vacío). */
export function findUnassigned(records) {
  const assigned = new Set();
  for (const def of GROUP_DEFS) {
    for (const r of records) {
      if (def.match(r.slug)) assigned.add(r.slug);
    }
  }
  return records.map((r) => r.slug).filter((slug) => !assigned.has(slug));
}

/** Todos los slugs presentes en un bloque de sidebar ya construido. */
export function collectSlugs(groups) {
  const slugs = [];
  function walk(items) {
    for (const item of items) {
      if (item.slug) slugs.push(item.slug);
      if (item.items) walk(item.items);
    }
  }
  for (const g of groups) walk(g.items);
  return slugs;
}

/** Punto de entrada usado por astro.config.mjs. */
export function getEsSidebar(contentDir = DEFAULT_CONTENT_DIR) {
  return buildGroups(readEsRecords(contentDir));
}
