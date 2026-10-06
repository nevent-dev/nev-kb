#!/usr/bin/env node
// Validador determinista pre-publicación: comprueba claves de FAQ (q/a),
// ortografía heurística (tildes/eñes), taxonomía obligatoria (diataxis,
// modulo, nivel), patrón de título por cuadrante Diátaxis, heurísticas de
// cuerpo por cuadrante y ausencia de slugs duplicados en el sidebar
// generado. Sale con código 1 si hay algún ERROR (los WARN no bloquean,
// salvo --strict, que también convierte en ERROR los WARN de título).
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  checkFaqKeys,
  checkOrthography,
  checkTaxonomy,
  checkTitlePattern,
  checkBodyHeuristics,
} from './audit/validate-frontmatter.mjs';
import { readEsRecords, buildGroups, collectSlugs } from './sidebar.mjs';

const STRICT = process.argv.includes('--strict');
const CONTENT = fileURLToPath(new URL('../src/content/docs', import.meta.url));

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    // excluir el locale inglés: la ortografía española no aplica
    if (e.isDirectory()) { if (e.name !== 'en') files.push(...(await walk(full))); }
    else if (/\.mdx?$/.test(e.name)) files.push(full);
  }
  return files;
}

async function main() {
  const files = await walk(CONTENT);
  let faqProblems = 0;
  let orthoProblems = 0;
  let errors = 0;
  let warns = 0;
  for (const f of files) {
    const raw = await readFile(f, 'utf8');
    const rel = relative(CONTENT, f);
    for (const v of checkFaqKeys(raw)) {
      faqProblems++;
      console.error(`FAQ  ${rel}: faq #${v.index} claves inválidas [${v.badKeys.join(', ')}] / faltan [${v.missing.join(', ')}]`);
    }
    for (const o of checkOrthography(raw)) {
      orthoProblems++;
      console.error(`ORTO ${rel}:${o.line}: "${o.word}" -> "${o.suggestion}"`);
    }
    for (const v of checkTaxonomy(rel, raw)) {
      errors++;
      console.error(`ERROR ${v.message}`);
    }
    for (const v of checkTitlePattern(rel, raw, { strict: STRICT })) {
      if (v.level === 'error') errors++; else warns++;
      console.error(`${v.level.toUpperCase()} ${v.message}`);
    }
    for (const v of checkBodyHeuristics(rel, raw)) {
      warns++;
      console.error(`WARN ${v.message}`);
    }
  }

  // Sin slugs duplicados en el sidebar generado (defensivo: buildGroups ya
  // asigna cada slug a un único grupo, pero un fallo aquí señalaría un bug
  // real en scripts/sidebar.mjs, no solo en el contenido). El grupo estático
  // "Empieza aquí" está EXENTO: es una selección curada de rutas de
  // activación del onboarding cuyos slugs viven también en sus módulos
  // naturales (ver scripts/sidebar.mjs, EMPIEZA_AQUI_GROUP).
  const records = readEsRecords(CONTENT);
  const dynamicGroups = buildGroups(records).filter((g) => g.label !== 'Empieza aquí');
  const slugs = collectSlugs(dynamicGroups);
  const seen = new Set();
  for (const slug of slugs) {
    if (seen.has(slug)) {
      errors++;
      console.error(`ERROR slug duplicado en el sidebar generado: ${slug}`);
    }
    seen.add(slug);
  }

  const total = faqProblems + orthoProblems + errors + warns;
  console.log(
    `\nValidados ${files.length} docs. FAQ: ${faqProblems} · Ortografía: ${orthoProblems} · ` +
      `Errores: ${faqProblems + orthoProblems + errors} · Avisos: ${warns}.`
  );
  if (total > 0) {
    console.error(`\n${total} incidencias (${faqProblems + orthoProblems + errors} error(es), ${warns} aviso(s)).`);
  }
  if (faqProblems + orthoProblems + errors > 0) {
    console.error('Corrige los errores antes de publicar.');
    process.exit(1);
  }
  console.log('Sin errores.' + (warns ? ` (${warns} avisos no bloqueantes)` : ''));
}

main().catch((err) => { console.error(err); process.exit(1); });
