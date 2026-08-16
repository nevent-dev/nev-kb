#!/usr/bin/env node
// Validador determinista pre-publicación: comprueba claves de FAQ (q/a) y
// ortografía heurística (tildes/eñes) en todos los docs. Sale con código 1 si
// encuentra violaciones, para poder usarlo como gate en el pipeline/CI.
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { checkFaqKeys, checkOrthography } from './audit/validate-frontmatter.mjs';

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
  }
  const total = faqProblems + orthoProblems;
  console.log(`\nValidados ${files.length} docs. FAQ: ${faqProblems} · Ortografía: ${orthoProblems}.`);
  if (total > 0) {
    console.error(`\n${total} violaciones. Corrígelas antes de publicar.`);
    process.exit(1);
  }
  console.log('Sin violaciones.');
}

main().catch((err) => { console.error(err); process.exit(1); });
