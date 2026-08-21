/**
 * fix-i18n-links.mjs — Astro integration (astro:build:done hook).
 *
 * Problem: the ES (root locale) and EN (/en/) content trees use DIFFERENT
 * slugs (e.g. /analitica/casos/ ↔ /en/analytics/use-cases/). Starlight's
 * built-in i18n helpers assume mirrored slugs and localize URLs by naively
 * adding/stripping the /en/ prefix. On this site that produces broken URLs
 * that Ahrefs Site Audit reports as 404s:
 *
 *   1. hreflang alternates:
 *      - ES pages emit  hreflang="en" → /en/<spanish-slug>/  (Starlight
 *        fallback page: duplicate ES content, excluded from sitemap)
 *      - EN pages emit  hreflang="es" and x-default → /<english-slug>/
 *        (does not exist at the root locale → 404, ~60 URLs)
 *   2. Language switcher <select>: same naive prefix swap → same URLs.
 *   3. Fallback pages (/en/<spanish-slug>/) render a "Copy Markdown" page
 *      action pointing to /en/<spanish-slug>.md which is never generated
 *      (only real content files get a .md route) → ~62 404s. The ES .md
 *      route DOES exist, so the link is rewritten to /<spanish-slug>.md.
 *   4. Sidebar-derived pagination links double-prefix EN link: items
 *      (/en/en/...) → 404.
 *
 * Fix: after the build, walk dist/**\/*.html and rewrite those four URL
 * classes using an explicit ES↔EN route map derived from the content tree
 * plus a segment translation table. Every rewritten target is validated
 * against the files actually emitted in dist/, so the map can never point
 * to a URL that does not exist.
 *
 * Registered in astro.config.mjs: integrations: [..., fixI18nLinks()].
 */

import { readdirSync, readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = 'https://help.nevent.ai';

/**
 * ES → EN path-segment translation table.
 * Keys/values are single URL segments. Segments not listed are identical in
 * both languages (e.g. rfm, deliverability, paid-media, claude-code).
 */
const SEGMENT_ES_TO_EN = {
	'activar-canales': 'activate-your-channels',
	'aperturas-y-clics': 'opens-and-clicks',
	'baja-tasa-de-apertura': 'low-open-rate',
	'bandeja-de-entrada': 'inbox',
	'checklist-de-lanzamiento': 'launch-checklist',
	'ciclo-de-vida': 'lifecycle',
	'como-entender-la-analitica': 'understanding-analytics',
	'como-entiende-nevent-tu-audiencia': 'how-nevent-understands-your-audience',
	'como-funciona': 'how-it-works',
	'como-funcionan-los-creditos': 'how-credits-work',
	'conecta-tu-ticketera': 'connect-your-ticketing-platform',
	'configura-tu-entrega': 'set-up-your-email-delivery',
	'configuracion': 'configuration',
	'consulta-tu-plan': 'check-your-plan',
	'consumo': 'usage',
	'crear-formulario': 'create-a-subscription-form',
	'crear-primera-campana': 'create-your-first-campaign',
	'cuanto-y-cuando-enviar': 'how-much-and-when-to-send',
	'decisiones-frecuentes': 'common-decisions',
	'desuscripciones': 'unsubscribes',
	'dominio-dedicado': 'custom-sending-domain',
	'dominio-no-verifica': 'domain-not-verifying',
	'email-sms-o-whatsapp': 'email-sms-or-whatsapp',
	'emails-a-spam': 'emails-going-to-spam',
	'entregabilidad': 'deliverability',
	'envio-de-emails': 'email-sending-settings',
	'experiencias': 'experiences',
	'explora-tu-audiencia': 'explore-your-audience',
	'fidelizar-post-evento': 'post-event-loyalty',
	'gestion-de-fans': 'manage-a-fan-profile',
	'gestionar-campanas': 'manage-your-campaigns',
	'guias-por-objetivo': 'goal-guides',
	'importar-fans': 'import-your-contacts',
	'informe': 'report',
	'introduccion': 'connect-your-accounts',
	'lanzamiento-72h': '72-hour-launch',
	'llenar-tu-evento': 'fill-your-event',
	'mi-ticketera-no-esta-integrada': 'ticketing-platform-not-integrated',
	'para-que-sirven': 'what-subscriptions-are-for',
	'perfil-musical': 'music-profile',
	'plan-de-uso': 'your-usage-plan',
	'plantillas-email': 'email-templates',
	'plantillas-whatsapp': 'whatsapp-templates',
	'pon-en-marcha-tu-chatbot': 'set-up-your-chatbot',
	'por-que-conectar-tu-ticketera': 'why-connect-your-ticketing-platform',
	'post-mortem-del-evento': 'event-post-mortem',
	'primer-vistazo': 'your-first-look-at-paid-media',
	'primeros-pasos': 'getting-started',
	'que-es-una-audiencia-personalizada': 'what-is-a-custom-audience',
	'que-son-las-experiencias': 'what-are-experiences',
	'que-son-los-magic-links': 'what-are-magic-links',
	'rebotes': 'bounces',
	'recorre-tus-experiencias': 'tour-your-experiences',
	'recuperar-carritos-abandonados': 'recover-abandoned-carts',
	'referencia': 'reference',
	'referencia-audiencias': 'custom-audiences-reference',
	'referencia-integraciones': 'integrations-reference',
	'referencia-magic-links': 'magic-links-reference',
	'reputacion-y-spam': 'sender-reputation-and-spam',
	'resultados': 'results',
	'segmento-vs-lista': 'segment-vs-list',
	'semana-del-evento': 'event-week',
	'sincroniza-un-segmento-como-audiencia': 'sync-a-segment-as-an-audience',
	'solucion-de-problemas': 'troubleshooting',
	'suscripciones': 'subscriptions',
	'trazabilidad-de-enlaces': 'link-tracking-and-performance',
	'tu-primer-analisis': 'your-first-analysis',
	'tu-primer-magic-link': 'create-your-first-magic-link',
	'tu-primer-segmento': 'your-first-segment',
	'tu-primera-suscripcion': 'create-your-first-subscription',
	'un-enlace-por-canal': 'one-link-per-channel',
	'vender-en-preventa': 'sell-more-in-presale',
	'ventas-no-atribuidas': 'unattributed-sales',
	'voz-del-asistente': 'assistant-voice',
	// sections
	'analitica': 'analytics',
	'segmentacion': 'segmentation',
	'capacidades': 'capabilities',
	'motor-segmentacion': 'segmentation-engine',
	'casos': 'use-cases',
	'casos-practicos': 'use-cases',
	'casos-uso': 'use-cases',
	'que-puedes-hacer': 'what-you-can-do',
	// analitica leaves
	'agrupar-y-filtrar': 'grouping-and-filtering',
	'audiencia': 'audience',
	'campanas': 'campaigns',
	'eventos-y-entradas': 'events-and-tickets',
	'tracking-y-atribucion': 'tracking-and-attribution',
	'atribucion-por-canal': 'attribution-by-channel',
	'cohortes-primera-compra': 'cohorts-first-purchase',
	'email-por-tier': 'email-usage-by-tier',
	'open-rate-diario': 'daily-open-rate',
	'roas-ultimos-30-dias': 'roas-last-30-days',
	'top-eventos-revenue': 'top-events-revenue',
	// nevent-ai leaves
	'cierre-de-mes-y-reporting': 'monthly-close-and-reporting',
	'diagnosticar-campana-floja': 'diagnosing-an-underperforming-campaign',
	'lanzar-un-evento': 'launching-an-event',
	'optimizar-inversion-publicitaria': 'optimizing-ad-spend',
	'recuperar-audiencia-dormida': 'winning-back-dormant-audience',
	'conectar-chatgpt': 'connect-chatgpt',
	'conectar-claude': 'connect-claude',
	'herramientas': 'tools',
	'instalacion-local': 'local-installation',
	'frases-listas-para-usar': 'ready-to-use-prompts',
	'permisos-y-seguridad': 'permissions-and-security',
	'preguntas-frecuentes': 'faq',
	'multi-cuenta': 'multi-account',
	'plantillas': 'templates',
	'short-urls': 'link-tracking',
	// segmentacion/capacidades leaves
	'asistencia': 'event-attendance',
	'atributos-del-fan': 'fan-attributes',
	'combinaciones': 'advanced-combinations',
	'engagement': 'digital-engagement',
	'gasto-y-consumo': 'spend-and-consumption',
	'score-y-temperatura': 'score-and-temperature',
	// segmentacion/casos leaves
	'audiencia-con-preferencia': 'audience-with-preference',
	'audiencia-geolocalizada': 'geolocated-audience',
	'carrito-abandonado': 'abandoned-cart',
	'fans-tempranos': 'early-buyers',
	'reactivar-fans-inactivos': 'reactivating-inactive-fans',
	// segmentacion/motor-segmentacion leaves
	'categorias': 'categories',
	'crear-segmento': 'creating-a-segment',
	'grupos': 'groups',
	'mejores-practicas': 'best-practices',
	'modificadores-rfm': 'modifiers-and-rfm',
	'operadores-logica': 'operators-and-logic',
};

/** Recursively lists all files under dir. */
function walk(dir) {
	const out = [];
	for (const name of readdirSync(dir)) {
		const p = join(dir, name);
		if (statSync(p).isDirectory()) out.push(...walk(p));
		else out.push(p);
	}
	return out;
}

/**
 * Builds the ES↔EN route maps by scanning dist/ for emitted pages.
 *
 * @param {string} distDir - Absolute path to the build output directory.
 * @returns {{ esToEn: Map<string, string>, enStrippedToEs: Map<string, string> }}
 *   esToEn: 'analitica/casos' → 'en/analytics/use-cases'
 *   enStrippedToEs: 'analytics/use-cases' → 'analitica/casos'
 */
function buildRouteMaps(distDir) {
	const htmlFiles = walk(distDir).filter((f) => f.endsWith('index.html'));
	const routes = new Set(
		htmlFiles.map((f) =>
			f
				.slice(distDir.length)
				.replace(/^\/+/, '')
				.replace(/\/?index\.html$/, '')
		)
	);
	const esToEn = new Map();
	const enStrippedToEs = new Map();
	for (const route of routes) {
		if (route.startsWith('en/') || route === 'en' || route === '404' || route === '') continue;
		const translated = route
			.split('/')
			.map((seg) => SEGMENT_ES_TO_EN[seg] ?? seg)
			.join('/');
		const enRoute = `en/${translated}`;
		// Only map when the EN target really exists in this build.
		if (routes.has(enRoute)) {
			esToEn.set(route, enRoute);
			enStrippedToEs.set(translated, route);
		}
	}
	// Homepages map to each other.
	esToEn.set('', 'en');
	return { esToEn, enStrippedToEs };
}

/**
 * Rewrites broken locale-swapped URLs inside one HTML document.
 *
 * @param {string} html - Original document.
 * @param {object} maps - Route maps from buildRouteMaps().
 * @param {string} distDir - Build output dir (for .md existence checks).
 * @returns {{ html: string, changes: number }}
 */
function fixHtml(html, maps, distDir) {
	const { esToEn, enStrippedToEs } = maps;
	let changes = 0;

	// (4) Double locale prefix from sidebar link: items → pagination/sidebar.
	html = html.replace(/href="\/en\/en\//g, () => (changes++, 'href="/en/'));
	html = html.replace(/value="\/en\/en\//g, () => (changes++, 'value="/en/'));

	// (1) hreflang alternates emitted by Starlight's default <Head>.
	html = html.replace(
		/(<link rel="alternate" hreflang="(?:en|es|x-default)" href=")([^"]+)("\s*\/?>)/g,
		(full, pre, url, post) => {
			if (!url.startsWith(SITE)) return full;
			const path = url.slice(SITE.length).replace(/^\/+/, '').replace(/\/+$/, '');
			let fixed = null;
			if (path.startsWith('en/')) {
				// /en/<spanish-slug>/ → real EN translation URL
				const es = path.slice(3);
				if (esToEn.has(es) && esToEn.get(es) !== path) fixed = esToEn.get(es);
			} else if (enStrippedToEs.has(path) && enStrippedToEs.get(path) !== path) {
				// /<english-slug>/ (naively stripped prefix) → real ES URL
				fixed = enStrippedToEs.get(path);
			}
			if (fixed == null) return full;
			changes++;
			return `${pre}${SITE}/${fixed}${fixed ? '/' : ''}${post}`;
		}
	);

	// (2) Language switcher <option value="..."> entries.
	html = html.replace(/(<option[^>]*value=")(\/[^"]*)(")/g, (full, pre, path, post) => {
		const clean = path.replace(/^\/+/, '').replace(/\/+$/, '');
		let fixed = null;
		if (clean.startsWith('en/')) {
			const es = clean.slice(3);
			if (esToEn.has(es) && esToEn.get(es) !== clean) fixed = esToEn.get(es);
		} else if (enStrippedToEs.has(clean) && enStrippedToEs.get(clean) !== clean) {
			fixed = enStrippedToEs.get(clean);
		}
		if (fixed == null) return full;
		changes++;
		return `${pre}/${fixed}${fixed ? '/' : ''}${post}`;
	});

	// (3) "Copy Markdown" page action on fallback pages: /en/<es>.md → /<es>.md
	html = html.replace(/(href=")\/en\/([^"]+\.md)(")/g, (full, pre, mdPath, post) => {
		if (existsSync(join(distDir, 'en', mdPath))) return full; // real EN .md route
		if (!existsSync(join(distDir, mdPath))) return full; // no ES .md either — leave
		changes++;
		return `${pre}/${mdPath}${post}`;
	});

	return { html, changes };
}

/**
 * Astro integration entry point.
 * @returns {import('astro').AstroIntegration}
 */
export default function fixI18nLinks() {
	return {
		name: 'fix-i18n-links',
		hooks: {
			'astro:build:done': async ({ dir, logger }) => {
				const distDir = fileURLToPath(dir).replace(/\/+$/, '');
				const maps = buildRouteMaps(distDir);
				let totalChanges = 0;
				let touchedFiles = 0;
				for (const file of walk(distDir).filter((f) => f.endsWith('.html'))) {
					const original = readFileSync(file, 'utf8');
					const { html, changes } = fixHtml(original, maps, distDir);
					if (changes > 0) {
						writeFileSync(file, html);
						totalChanges += changes;
						touchedFiles++;
					}
				}
				logger.info(
					`fix-i18n-links: rewrote ${totalChanges} URLs in ${touchedFiles} HTML files ` +
					`(${maps.esToEn.size} ES↔EN route pairs)`
				);
			},
		},
	};
}
