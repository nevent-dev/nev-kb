/**
 * kb-index.mjs — Integración de Astro (hook astro:build:generated).
 *
 * Publica /kb-index.json: un índice legible por máquina con una entrada por
 * página del manual, en los dos idiomas, incluyendo su URL canónica.
 *
 * Existe porque llms-full.txt no dice a qué URL pertenece cada página: solo
 * concatena "# Título" y el cuerpo. Cualquier consumidor que quiera citar la
 * fuente tiene que adivinarla, y adivinarla sale mal — el primer enlace de una
 * sección casi siempre apunta a OTRA página, no a la propia. El Help Bot de
 * soporte citaba en falso justamente por eso.
 *
 * Aquí la URL se deriva de la ruta del fichero, que es de donde Astro la deriva
 * también, así que es exacta por construcción y no por heurística.
 */

import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = 'https://help.nevent.ai';

/** Recorre un directorio devolviendo todas las rutas de ficheros .md/.mdx. */
function walk(dir) {
	const out = [];
	for (const name of readdirSync(dir)) {
		const full = path.join(dir, name);
		if (statSync(full).isDirectory()) out.push(...walk(full));
		else if (name.endsWith('.mdx') || name.endsWith('.md')) out.push(full);
	}
	return out;
}

/** Separa frontmatter y cuerpo. Solo interesan unos pocos campos. */
function parse(raw) {
	const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
	if (!m) return { data: {}, body: raw };
	const data = {};
	for (const line of m[1].split(/\r?\n/)) {
		const kv = line.match(/^(title|description|diataxis):\s*(.*)$/);
		if (kv) data[kv[1]] = kv[2].trim().replace(/^["']|["']$/g, '');
	}
	return { data, body: m[2] };
}

/**
 * Limpia el cuerpo para consumo por modelos: fuera imports, componentes de
 * Starlight y marcadores de aside, que solo añaden ruido al recuperar.
 */
function clean(body) {
	return body
		.replace(/^import\s+.*$/gm, '')
		.replace(/<Schema>[\s\S]*?<\/Schema>/g, '')
		.replace(/:::(\w+)(\[[^\]]*\])?/g, '')
		.replace(/:::/g, '')
		.replace(/\n{3,}/g, '\n\n')
		.trim();
}

/**
 * URL pública de una página.
 * El español es el locale raíz (sin prefijo); el inglés cuelga de /en/.
 */
function urlOf(rel, locale) {
	const slug = rel
		.replace(/\.mdx?$/, '')
		.replace(/\\/g, '/')
		.replace(/\/index$/, '');
	const prefix = locale === 'en' ? '/en' : '';
	return slug === 'index' ? `${SITE}${prefix}/` : `${SITE}${prefix}/${slug}/`;
}

function collect(contentDir) {
	const pages = [];
	for (const file of walk(contentDir)) {
		const relFull = path.relative(contentDir, file);
		const segments = relFull.split(path.sep);
		const locale = segments[0] === 'en' ? 'en' : 'es';
		const rel = locale === 'en' ? segments.slice(1).join('/') : relFull;

		const { data, body } = parse(readFileSync(file, 'utf8'));
		if (!data.title) continue;
		// La 404 no es contenido: indexarla solo genera citas a una página de error.
		if (/^404(\.mdx?)?$/.test(rel)) continue;

		const cleaned = clean(body);
		pages.push({
			title: data.title,
			description: data.description || '',
			url: urlOf(rel, locale),
			locale,
			area: rel.split('/')[0].replace(/\.mdx?$/, ''),
			diataxis: data.diataxis || '',
			content: cleaned,
		});
	}
	pages.sort((a, b) => a.locale.localeCompare(b.locale) || a.url.localeCompare(b.url));
	return pages;
}

/** @returns {import('astro').AstroIntegration} */
export default function kbIndex() {
	return {
		name: 'kb-index',
		hooks: {
			'astro:build:generated': async ({ dir, logger }) => {
				const distDir = fileURLToPath(dir);
				const __dirname = path.dirname(fileURLToPath(import.meta.url));
				const contentDir = path.resolve(__dirname, '../src/content/docs');

				const pages = collect(contentDir);
				if (!pages.length) {
					logger.warn('kb-index: no se encontró ninguna página, no se genera nada');
					return;
				}

				// generatedAt permite al consumidor saber si el corpus cambió sin
				// descargarlo entero dos veces.
				const payload = {
					project: 'Nevent Help Center',
					site: SITE,
					generatedAt: new Date().toISOString(),
					count: pages.length,
					pages,
				};

				writeFileSync(path.join(distDir, 'kb-index.json'), JSON.stringify(payload));

				const es = pages.filter((p) => p.locale === 'es').length;
				logger.info(`kb-index: ${pages.length} páginas (${es} es / ${pages.length - es} en) → /kb-index.json`);
			},
		},
	};
}
