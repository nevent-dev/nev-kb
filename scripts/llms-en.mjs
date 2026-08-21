/**
 * llms-en.mjs — Integración de Astro (hook astro:build:generated).
 *
 * El plugin starlight-llms-txt genera los ficheros llms solo para el locale
 * raíz. Su comprobación interna descarta cualquier documento cuyo id empiece
 * por un prefijo de idioma, de modo que las 152 páginas en inglés del manual
 * quedan invisibles para los motores generativos.
 *
 * Esta integración cubre ese hueco generando el equivalente inglés:
 *
 *   /en/llms.txt        índice con una línea por página
 *   /en/llms-full.txt   el contenido completo concatenado
 *
 * Se generan bajo /en/ para espejar la estructura de idioma del sitio, en
 * lugar de inventar sufijos en la raíz.
 */

import { readdirSync, readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = 'https://help.nevent.ai';
const PROJECT = 'Nevent Help Center';
const DESCRIPTION =
	'Official documentation for Nevent: the marketing and CRM platform for live event promoters. ' +
	'Campaigns across email, SMS, WhatsApp and push, audience segmentation, paid media, chatbot, ' +
	'deliverability and analytics.';

/** Orden de presentación de las áreas: primero lo que necesita quien empieza. */
const AREA_ORDER = [
	'audience',
	'segmentation',
	'campaigns',
	'deliverability',
	'analytics',
	'paid-media',
	'chatbot',
	'tools',
	'subscriptions',
	'experiences',
	'superapp',
	'usage',
	'goal-guides',
	'lifecycle',
	'common-decisions',
	'troubleshooting',
	'nevent-ai',
];

const AREA_TITLES = {
	audience: 'Audience',
	segmentation: 'Segmentation',
	campaigns: 'Campaigns',
	deliverability: 'Deliverability and channels',
	analytics: 'Analytics',
	'paid-media': 'Paid Media',
	chatbot: 'Chatbot',
	tools: 'Tools',
	subscriptions: 'Subscriptions',
	experiences: 'Experiences',
	superapp: 'Superapp',
	usage: 'Usage and billing',
	'goal-guides': 'Goal guides',
	lifecycle: 'Event lifecycle',
	'common-decisions': 'Common decisions',
	troubleshooting: 'Troubleshooting',
	'nevent-ai': 'Nevent AI',
};

/** Recorre un directorio devolviendo todas las rutas de ficheros .mdx. */
function walk(dir) {
	const out = [];
	for (const name of readdirSync(dir)) {
		const full = path.join(dir, name);
		if (statSync(full).isDirectory()) out.push(...walk(full));
		else if (name.endsWith('.mdx') || name.endsWith('.md')) out.push(full);
	}
	return out;
}

/** Separa frontmatter y cuerpo. Solo se necesitan title y description. */
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
 * Starlight y bloques de metadatos que no aportan al contenido.
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

/** Área a la que pertenece una página, a partir de su ruta relativa. */
const areaOf = (rel) => rel.split(path.sep)[0];

/** URL pública de una página inglesa. */
function urlOf(rel) {
	const slug = rel.replace(/\.mdx?$/, '').replace(/\\/g, '/').replace(/\/index$/, '');
	return `${SITE}/en/${slug}/`;
}

function collect(contentDir) {
	const enDir = path.join(contentDir, 'en');
	const pages = [];
	for (const file of walk(enDir)) {
		const rel = path.relative(enDir, file);
		const { data, body } = parse(readFileSync(file, 'utf8'));
		if (!data.title) continue;
		pages.push({
			rel,
			area: areaOf(rel),
			title: data.title,
			description: data.description || '',
			diataxis: data.diataxis || '',
			url: urlOf(rel),
			body: clean(body),
		});
	}
	// Por área según AREA_ORDER, y alfabético dentro de cada una.
	const rank = (a) => {
		const i = AREA_ORDER.indexOf(a);
		return i === -1 ? AREA_ORDER.length : i;
	};
	pages.sort((a, b) => rank(a.area) - rank(b.area) || a.rel.localeCompare(b.rel));
	return pages;
}

function renderIndex(pages) {
	const out = [
		`# ${PROJECT} (English)`,
		'',
		`> ${DESCRIPTION}`,
		'',
		`This index covers the ${pages.length} pages of the English documentation.`,
		'',
		'## Documentation Sets',
		'',
		`- [Complete English documentation](${SITE}/en/llms-full.txt): the full English documentation, concatenated`,
		`- [Spanish documentation](${SITE}/llms.txt): the same manual in Spanish, which is the source language`,
		'',
	];
	let current = null;
	for (const p of pages) {
		if (p.area !== current) {
			current = p.area;
			out.push('', `## ${AREA_TITLES[current] || current}`, '');
		}
		const desc = p.description ? `: ${p.description}` : '';
		out.push(`- [${p.title}](${p.url})${desc}`);
	}
	out.push('', '## Notes', '');
	out.push('- Generated at build time from the same source as the published documentation');
	out.push('- The Spanish version is the source of truth; English pages are translations');
	return out.join('\n') + '\n';
}

function renderFull(pages) {
	const out = [
		`<SYSTEM>This is the full English documentation for ${PROJECT}</SYSTEM>`,
		'',
		`# ${PROJECT} (English)`,
		'',
		`> ${DESCRIPTION}`,
		'',
	];
	let current = null;
	for (const p of pages) {
		if (p.area !== current) {
			current = p.area;
			out.push('', `# ${AREA_TITLES[current] || current}`, '');
		}
		out.push(`## ${p.title}`, '');
		out.push(`Source: ${p.url}`);
		if (p.diataxis) out.push(`Type: ${p.diataxis}`);
		out.push('', p.body, '');
	}
	return out.join('\n') + '\n';
}

/** @returns {import('astro').AstroIntegration} */
export default function llmsEn() {
	return {
		name: 'llms-en',
		hooks: {
			'astro:build:generated': async ({ dir, logger }) => {
				const distDir = fileURLToPath(dir);
				const __dirname = path.dirname(fileURLToPath(import.meta.url));
				const contentDir = path.resolve(__dirname, '../src/content/docs');

				const pages = collect(contentDir);
				if (!pages.length) {
					logger.warn('llms-en: no se encontró ninguna página inglesa, no se genera nada');
					return;
				}

				const outDir = path.join(distDir, 'en');
				mkdirSync(outDir, { recursive: true });
				writeFileSync(path.join(outDir, 'llms.txt'), renderIndex(pages));
				writeFileSync(path.join(outDir, 'llms-full.txt'), renderFull(pages));

				const areas = new Set(pages.map((p) => p.area)).size;
				logger.info(`llms-en: ${pages.length} páginas inglesas en ${areas} áreas → /en/llms.txt y /en/llms-full.txt`);
			},
		},
	};
}
