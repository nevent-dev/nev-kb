# Auditor de Cobertura Diátaxis — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir un auditor que recorre los docs de la KB, extrae el cuadrante Diátaxis del frontmatter, produce una matriz de cobertura (área × cuadrante) y reporta huecos y docs sin clasificar.

**Architecture:** Núcleo funcional puro (parseo → matriz → huecos → informe) con TDD exhaustivo, más una shell imperativa fina (glob de ficheros + escritura de informe) sin lógica. El auditor es la Pieza A del sistema agéntico; su salida (matriz + huecos) alimenta al resto de piezas. En este plan, los docs sin campo `diataxis` se reportan como "sin clasificar" (el auto-clasificador LLM es un plan posterior).

**Tech Stack:** Node 22 (ESM), Vitest (tests), gray-matter (parseo de frontmatter), Astro Content Collections (schema).

**Spec:** `specs/2026-08-15-sistema-agentico-documentacion-diataxis-design.md`

## Global Constraints

- **Working directory:** todo el código vive en `nev-kb/docs/` (repo Astro canónico, con git propio). Los comandos y rutas de este plan son relativos a `docs/` salvo que se indique lo contrario.
- **Git:** trabaja en una rama de feature dentro de `docs/` (`feat/coverage-auditor`); nunca en `main`. No hacer push sin aprobación humana. Commits sin referencias a Claude ni co-authored-by.
- **Node:** 22.22.3 (`.nvmrc`). Módulos ESM (`"type": "module"`).
- **Cuadrantes Diátaxis (valores canónicos):** `tutorial`, `how-to`, `reference`, `explanation`. El valor `mixed` es válido en el schema (marca violación) pero NO cuenta como cobertura en la matriz.
- **Organización:** el "área" es el primer segmento de ruta bajo `src/content/docs/` (p. ej. `campanas`). Se excluyen ficheros de raíz (`index.mdx`, `404.mdx`) y el locale `en/`. El cuadrante es metadato de frontmatter, NO se reorganizan carpetas.

---

## File Structure

- `docs/src/content.config.ts` — **Modify:** añadir campo `diataxis` al schema extendido.
- `docs/scripts/audit/coverage-matrix.mjs` — **Create:** núcleo puro. Matriz + huecos.
- `docs/scripts/audit/coverage-matrix.test.mjs` — **Create:** tests.
- `docs/scripts/audit/parse-docs.mjs` — **Create:** núcleo puro. Parseo de un doc → record; detección de área y sin-clasificar.
- `docs/scripts/audit/parse-docs.test.mjs` — **Create:** tests.
- `docs/scripts/audit/report.mjs` — **Create:** núcleo puro. Record/matriz → informe markdown.
- `docs/scripts/audit/report.test.mjs` — **Create:** tests.
- `docs/scripts/audit-coverage.mjs` — **Create:** shell imperativa (CLI). Glob + orquestación + escritura.
- `docs/package.json` — **Modify:** añadir devDeps (`vitest`, `gray-matter`) y scripts (`test`, `audit:coverage`).

---

### Task 1: Tooling de tests + núcleo de matriz de cobertura

**Files:**
- Modify: `docs/package.json` (devDeps + script `test`)
- Create: `docs/scripts/audit/coverage-matrix.mjs`
- Test: `docs/scripts/audit/coverage-matrix.test.mjs`

**Interfaces:**
- Consumes: nada.
- Produces:
  - `QUADRANTS: string[]` = `['tutorial','how-to','reference','explanation']`
  - `buildCoverageMatrix(records: {slug,area,diataxis}[], areas: string[]): Record<string, Record<string, number>>`
  - `findGaps(matrix): {area: string, quadrant: string}[]`

- [ ] **Step 1: Instalar Vitest y añadir script de test**

Run desde `docs/`:
```bash
npm install -D vitest
npm pkg set scripts.test="vitest run"
```

- [ ] **Step 2: Escribir el test que falla**

Create `docs/scripts/audit/coverage-matrix.test.mjs`:
```js
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
```

- [ ] **Step 3: Ejecutar el test para verificar que falla**

Run: `cd docs && npx vitest run scripts/audit/coverage-matrix.test.mjs`
Expected: FAIL — "Failed to load ./coverage-matrix.mjs" / módulo no encontrado.

- [ ] **Step 4: Implementación mínima**

Create `docs/scripts/audit/coverage-matrix.mjs`:
```js
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
```

- [ ] **Step 5: Ejecutar el test para verificar que pasa**

Run: `cd docs && npx vitest run scripts/audit/coverage-matrix.test.mjs`
Expected: PASS (3 + 1 = todos verdes).

- [ ] **Step 6: Commit**

```bash
cd docs && git add package.json package-lock.json scripts/audit/coverage-matrix.mjs scripts/audit/coverage-matrix.test.mjs
git commit -m "feat: nucleo de matriz de cobertura Diataxis + tooling de tests"
```

---

### Task 2: Parseo de docs y detección de sin-clasificar

**Files:**
- Modify: `docs/package.json` (devDep `gray-matter`)
- Create: `docs/scripts/audit/parse-docs.mjs`
- Test: `docs/scripts/audit/parse-docs.test.mjs`

**Interfaces:**
- Consumes: nada de tasks previos (reexporta su propio `QUADRANTS` para uso local).
- Produces:
  - `areaFromPath(relPath: string): string | null`
  - `toRecord(raw: string, relPath: string): {slug, area, diataxis, title}`
  - `findUnclassified(records): record[]` — records con área no-nula y cuadrante ausente/ inválido.

- [ ] **Step 1: Instalar gray-matter**

Run desde `docs/`:
```bash
npm install -D gray-matter
```

- [ ] **Step 2: Escribir el test que falla**

Create `docs/scripts/audit/parse-docs.test.mjs`:
```js
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
```

- [ ] **Step 3: Ejecutar el test para verificar que falla**

Run: `cd docs && npx vitest run scripts/audit/parse-docs.test.mjs`
Expected: FAIL — módulo `./parse-docs.mjs` no encontrado.

- [ ] **Step 4: Implementación mínima**

Create `docs/scripts/audit/parse-docs.mjs`:
```js
import matter from 'gray-matter';

export const QUADRANTS = ['tutorial', 'how-to', 'reference', 'explanation'];

// relPath relativo a content/docs -> área o null (raíz / i18n)
export function areaFromPath(relPath) {
  const parts = relPath.split('/');
  if (parts.length < 2) return null;   // fichero de raíz
  if (parts[0] === 'en') return null;  // locale i18n
  return parts[0];
}

// raw (contenido del fichero) + relPath -> record
export function toRecord(raw, relPath) {
  const { data } = matter(raw);
  return {
    slug: relPath.replace(/\.(mdx?|md)$/, ''),
    area: areaFromPath(relPath),
    diataxis: typeof data.diataxis === 'string' ? data.diataxis : null,
    title: data.title ?? null,
  };
}

// records -> los de contenido (área != null) con cuadrante ausente/ inválido
export function findUnclassified(records) {
  return records.filter(
    (r) => r.area !== null && !QUADRANTS.includes(r.diataxis)
  );
}
```

- [ ] **Step 5: Ejecutar el test para verificar que pasa**

Run: `cd docs && npx vitest run scripts/audit/parse-docs.test.mjs`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
cd docs && git add package.json package-lock.json scripts/audit/parse-docs.mjs scripts/audit/parse-docs.test.mjs
git commit -m "feat: parseo de docs y deteccion de docs sin clasificar"
```

---

### Task 3: Renderizado del informe markdown

**Files:**
- Create: `docs/scripts/audit/report.mjs`
- Test: `docs/scripts/audit/report.test.mjs`

**Interfaces:**
- Consumes: `QUADRANTS` de `./coverage-matrix.mjs`.
- Produces: `renderReport(matrix, gaps, unclassified): string` (markdown).

- [ ] **Step 1: Escribir el test que falla**

Create `docs/scripts/audit/report.test.mjs`:
```js
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
```

- [ ] **Step 2: Ejecutar el test para verificar que falla**

Run: `cd docs && npx vitest run scripts/audit/report.test.mjs`
Expected: FAIL — módulo `./report.mjs` no encontrado.

- [ ] **Step 3: Implementación mínima**

Create `docs/scripts/audit/report.mjs`:
```js
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
```

- [ ] **Step 4: Ejecutar el test para verificar que pasa**

Run: `cd docs && npx vitest run scripts/audit/report.test.mjs`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
cd docs && git add scripts/audit/report.mjs scripts/audit/report.test.mjs
git commit -m "feat: renderizado del informe de cobertura en markdown"
```

---

### Task 4: Shell CLI del auditor (glob + informe)

**Files:**
- Create: `docs/scripts/audit-coverage.mjs`
- Modify: `docs/package.json` (script `audit:coverage`)

**Interfaces:**
- Consumes: `toRecord`, `findUnclassified` de `./audit/parse-docs.mjs`; `buildCoverageMatrix`, `findGaps` de `./audit/coverage-matrix.mjs`; `renderReport` de `./audit/report.mjs`.
- Produces: escribe `docs/coverage-report.md` y lo imprime por stdout. Sin exports (entry point).

- [ ] **Step 1: Añadir el script npm**

Run desde `docs/`:
```bash
npm pkg set scripts."audit:coverage"="node scripts/audit-coverage.mjs"
```

- [ ] **Step 2: Escribir la shell CLI**

Create `docs/scripts/audit-coverage.mjs`:
```js
#!/usr/bin/env node
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { toRecord, findUnclassified } from './audit/parse-docs.mjs';
import { buildCoverageMatrix, findGaps } from './audit/coverage-matrix.mjs';
import { renderReport } from './audit/report.mjs';

const CONTENT_DIR = fileURLToPath(new URL('../src/content/docs', import.meta.url));
const OUT = fileURLToPath(new URL('../coverage-report.md', import.meta.url));

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(full)));
    else if (/\.mdx?$/.test(e.name)) files.push(full);
  }
  return files;
}

async function main() {
  const files = await walk(CONTENT_DIR);
  const records = [];
  for (const f of files) {
    const raw = await readFile(f, 'utf8');
    records.push(toRecord(raw, relative(CONTENT_DIR, f)));
  }
  const areas = [...new Set(records.map((r) => r.area).filter(Boolean))].sort();
  const matrix = buildCoverageMatrix(records, areas);
  const report = renderReport(matrix, findGaps(matrix), findUnclassified(records));
  await writeFile(OUT, report, 'utf8');
  console.log(report);
  console.error(`\nEscrito: ${OUT}`);
}

main().catch((err) => { console.error(err); process.exit(1); });
```

- [ ] **Step 3: Ejecutar el auditor contra el contenido real**

Run: `cd docs && npm run audit:coverage`
Expected: imprime una tabla markdown con todas las áreas reales (`campanas`, `segmentacion`, `analitica`, …). Como ningún doc tiene aún el campo `diataxis`, TODAS las celdas serán `—`, la sección "Huecos" listará todas las celdas, y "Sin clasificar" listará ~165 docs. Se crea `docs/coverage-report.md`.

- [ ] **Step 4: Verificar el artefacto**

Run: `cd docs && head -20 coverage-report.md`
Expected: cabecera `# Matriz de cobertura Diátaxis` seguida de la tabla. Confirma que las áreas coinciden con las carpetas bajo `src/content/docs/` (excluyendo `en/` y ficheros de raíz).

- [ ] **Step 5: Ignorar el artefacto generado en git**

Run desde `docs/`:
```bash
echo "coverage-report.md" >> .gitignore
```

- [ ] **Step 6: Commit**

```bash
cd docs && git add scripts/audit-coverage.mjs package.json .gitignore
git commit -m "feat: CLI del auditor de cobertura Diataxis"
```

---

### Task 5: Extender el schema con el campo `diataxis`

**Files:**
- Modify: `docs/src/content.config.ts`

**Interfaces:**
- Consumes: nada.
- Produces: frontmatter `diataxis` válido en todos los docs (habilita anotación y el auto-clasificador del plan siguiente).

- [ ] **Step 1: Añadir el campo al schema**

En `docs/src/content.config.ts`, dentro del `z.object({ ... })` del `extend` (junto a `faqs` y `ogImage`), añade:
```ts
				// diataxis: tipo de documento según Diátaxis (poblado por el auditor / auto-clasificador).
				//   'mixed' marca un doc que viola la separación de tipos y debe dividirse.
				diataxis: z
					.enum(['tutorial', 'how-to', 'reference', 'explanation', 'mixed'])
					.optional(),
```

- [ ] **Step 2: Anotar un doc real como smoke test**

Edita `docs/src/content/docs/campanas/crear-primera-campana.mdx` y añade `diataxis: tutorial` al frontmatter (bajo `title`).

- [ ] **Step 3: Verificar que el build de Astro sigue pasando**

Run: `cd docs && npm run build`
Expected: build exitoso, sin error de validación de schema para `diataxis`.

- [ ] **Step 4: Verificar que el auditor ya cuenta ese doc**

Run: `cd docs && npm run audit:coverage`
Expected: en la fila `campanas`, la columna `tutorial` muestra `1` (no `—`); ese doc ya NO aparece en "Sin clasificar".

- [ ] **Step 5: Commit**

```bash
cd docs && git add src/content.config.ts src/content/docs/campanas/crear-primera-campana.mdx
git commit -m "feat: campo diataxis en el schema de contenido + primera anotacion"
```

---

## Self-Review

**1. Spec coverage (Pieza A del spec §4.1):**
- "Recorre los docs y clasifica cada uno en su cuadrante" → Task 2 (`toRecord` lee el cuadrante); la clasificación *automática* de los no anotados se difiere explícitamente al Plan 2 (LLM). Cubierto parcialmente por diseño (YAGNI para el auditor determinístico).
- "Construye la matriz área × cuadrante" → Task 1 (`buildCoverageMatrix`), Task 4 (CLI real). ✅
- "Detecta huecos" → Task 1 (`findGaps`). ✅
- "Marca los que mezclan tipos" → Task 5 (valor `mixed` en schema); el auditor no lo cuenta como cobertura (Task 1 test). ✅
- "Detecta obsolescencia (diff vs releases/Jira)" → **fuera de alcance de este plan** (requiere fuentes externas; va en un plan de staleness posterior). Declarado como límite, no como olvido.
- "Salida: backlog priorizado" → este plan entrega la matriz + huecos + sin-clasificar (el insumo del backlog). La *priorización* depende de señales externas (tráfico, releases) → plan posterior.

**2. Placeholder scan:** sin TBD/TODO; todo paso con código real y comando + resultado esperado. ✅

**3. Type consistency:** `QUADRANTS` se define en `coverage-matrix.mjs` (Task 1) y `report.mjs` lo importa de ahí (Task 3); `parse-docs.mjs` mantiene su propia copia local (Task 2) usada solo para validar `findUnclassified` — nombres y firmas consistentes entre tasks (`buildCoverageMatrix`, `findGaps`, `toRecord`, `findUnclassified`, `renderReport`, `areaFromPath`). ✅

## Notas para el siguiente plan (fuera de alcance aquí)

- **Plan 2 (clasificador LLM):** rellena `diataxis` en los ~165 docs existentes leyendo el contenido; usa la lista "Sin clasificar" de este auditor como cola de entrada.
- **Staleness:** diff de docs vs git log / release notes / Jira para marcar obsolescencia.
- **Priorización del backlog:** cruzar huecos con tráfico (GA4/GSC) y releases para ordenar el trabajo.
