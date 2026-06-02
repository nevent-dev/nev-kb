// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import starlightThemeNova from 'starlight-theme-nova';
import starlightLlmsTxt from 'starlight-llms-txt';
import starlightPageActions from 'starlight-page-actions';
import remarkGfm from 'remark-gfm';

// https://astro.build/config
export default defineConfig({
	site: 'https://help.nevent.ai',

	// Enable GitHub Flavored Markdown (GFM) tables in .mdx files.
	// Astro 6 / @astrojs/mdx do not include remark-gfm automatically for MDX
	// (unlike .md files which have GFM active by default). Without this, markdown
	// tables render as pipe-delimited plain text instead of <table> elements.
	markdown: {
		remarkPlugins: [remarkGfm],
	},

	integrations: [
		// Sitemap for SEO (reduces indexing time by 50%)
		// Filter out Starlight i18n fallback pages: these are Spanish-slug pages that
		// Starlight automatically serves under /en/ when no English translation exists.
		// Including them in the sitemap causes duplicate-content issues for SEO.
		// Pattern: any /en/ URL that contains a Spanish path segment (casos-practicos,
		// que-puedes-hacer, conectar-, frases-listas-para-usar, permisos-y-seguridad,
		// preguntas-frecuentes, herramientas, instalacion-local).
		sitemap({
			filter: (page) => {
				// Starlight i18n fallback: when an EN translation does not exist for a page,
				// Starlight serves the ES (root locale) content at /en/<spanish-slug>/.
				// These duplicate URLs must be excluded from the sitemap to avoid SEO
				// duplicate-content penalties. The list below contains path segments that
				// appear ONLY in ES (root locale) slugs — they have different EN equivalents.
				const SPANISH_ONLY_SLUG_PATTERN =
					/\/(casos-practicos|que-puedes-hacer|conectar-claude|conectar-chatgpt|frases-listas-para-usar|permisos-y-seguridad|preguntas-frecuentes|herramientas|instalacion-local|analitica|campanas|audiencia|plantillas|short-urls|multi-cuenta|lanzar-un-evento|recuperar-audiencia-dormida|diagnosticar-campana-floja|optimizar-inversion-publicitaria|cierre-de-mes-y-reporting|motor-segmentacion|crear-segmento|categorias|operadores-logica|modificadores-rfm|grupos|casos-uso|mejores-practicas|segmentacion|capacidades|asistencia|atributos-del-fan|gasto-y-consumo|score-y-temperatura|combinaciones|agrupar-y-filtrar|tracking-y-atribucion)\//;
				// Exclude pages under /en/ whose path matches a Spanish-only slug
				if (page.startsWith('https://help.nevent.ai/en/') && SPANISH_ONLY_SLUG_PATTERN.test(page)) {
					return false;
				}
				return true;
			},
			// Enrich each sitemap <url> entry with changefreq, priority and lastmod.
			// lastmod defaults to the current build date (ISO 8601); a future iteration
			// can replace new Date() with per-page git mtime via a Vite plugin.
			// Priority rules:
			//   1.0 → homepage (/)
			//   0.9 → /en/ homepage
			//   0.8 → top-level section roots (/nevent-ai/, /en/nevent-ai/)
			//   0.7 → all other pages (default)
			serialize(item) {
				const url = item.url;
				const buildDate = new Date().toISOString().split('T')[0];

				let priority = 0.7;
				let changefreq = /** @type {'weekly'|'monthly'} */ ('weekly');

				if (url === 'https://help.nevent.ai/' || url === 'https://help.nevent.ai/en/') {
					priority = url.includes('/en/') ? 0.9 : 1.0;
					changefreq = 'weekly';
				} else if (
					url === 'https://help.nevent.ai/nevent-ai/' ||
					url === 'https://help.nevent.ai/en/nevent-ai/' ||
					url === 'https://help.nevent.ai/segmentacion/motor-segmentacion/' ||
					url === 'https://help.nevent.ai/en/segmentation/segmentation-engine/' ||
					url === 'https://help.nevent.ai/segmentacion/capacidades/' ||
					url === 'https://help.nevent.ai/en/segmentation/capabilities/' ||
					url === 'https://help.nevent.ai/analitica/' ||
					url === 'https://help.nevent.ai/en/analytics/'
				) {
					priority = 0.8;
					changefreq = 'weekly';
				}

				return {
					...item,
					changefreq,
					priority,
					lastmod: buildDate,
				};
			},
		}),

		starlight({
			title: 'Nevent Help Center',
			description: 'Knowledge Base de Nevent - La fuente única de verdad del conocimiento de la compañía',

			// Logo wordmark — replaces the text title in the header.
			// replacesTitle: true hides the site title text so only the image shows.
			logo: {
				src: './src/assets/logo.png',
				replacesTitle: true,
			},

			// Plugins: Theme Nova + page-actions + llms.txt para asistentes de IA
			plugins: [
				starlightThemeNova(),
				// Page action buttons: "Open in Claude/ChatGPT" dropdown + "Copy Markdown"
				// baseUrl is intentionally omitted to avoid conflict with starlight-llms-txt
				// which already handles llms.txt generation with richer content.
				starlightPageActions({
					actions: {
						chatgpt: true,
						claude: true,
						markdown: true,
					},
					share: false,
				}),
				starlightLlmsTxt({
					projectName: 'Nevent Help Center',
					description:
						'Documentación oficial de Nevent IA y del MCP de Nevent. Conecta tu CRM de live events con Claude o ChatGPT y consulta campañas, audiencias, paid media y analítica en lenguaje natural.',
					details:
						'Nevent es la plataforma de marketing y CRM para promotores de eventos en vivo (festivales, conciertos, clubs, ferias, deportes). El MCP de Nevent permite integrar la plataforma con cualquier asistente de IA compatible con Model Context Protocol y operar sobre campañas (email, SMS, WhatsApp, push), segmentos, plantillas, paid media (Meta, Google, TikTok), short URLs, deliverability y reporting multi-cuenta.',
				}),
			],

			// Mostrar última actualización en cada página
			lastUpdated: true,

			// Search potente con Pagefind (escala a 10K+ páginas)
			pagefind: true,

			// Configuración SEO
			head: [
				// Favicons (multi-resolution)
				{
					tag: 'link',
					attrs: { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico', sizes: 'any' },
				},
				{
					tag: 'link',
					attrs: { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
				},
				{
					tag: 'link',
					attrs: { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
				},
				{
					tag: 'link',
					attrs: { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
				},
				// Meta theme color
				{
					tag: 'meta',
					attrs: {
						name: 'theme-color',
						content: '#8B5CF6', // Violet-500
					},
				},
				// Google Analytics 4
				{
					tag: 'script',
					attrs: {
						src: 'https://www.googletagmanager.com/gtag/js?id=G-HMCEBRLTBG',
						async: true,
					},
				},
				{
					tag: 'script',
					content: `
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
						gtag('config', 'G-HMCEBRLTBG');
					`,
				},
			],

			// Social links (aparecen en header)
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/nevent/nev-kb',
				},
			],

			// Sidebar — ES (raíz) y EN (/en/)
			// Starlight selecciona automáticamente los items del locale activo
			sidebar: [
				// ─── Segmentación — ES ──────────────────────────────────────────
				{
					label: 'Segmentación',
					items: [
						{
							label: 'Motor de Segmentación',
							items: [
								{ label: 'Introducción', slug: 'segmentacion/motor-segmentacion', badge: { text: 'Empieza aquí', variant: 'tip' } },
								{ label: 'Cómo Crear un Segmento', slug: 'segmentacion/motor-segmentacion/crear-segmento' },
								{ label: 'Las 6 Categorías', slug: 'segmentacion/motor-segmentacion/categorias' },
								{ label: 'Operadores & Lógica Y/O', slug: 'segmentacion/motor-segmentacion/operadores-logica' },
								{ label: 'Modificadores & RFM', slug: 'segmentacion/motor-segmentacion/modificadores-rfm', badge: { text: 'Avanzado', variant: 'note' } },
								{ label: 'Grupos & A/B Testing', slug: 'segmentacion/motor-segmentacion/grupos' },
								{ label: 'Casos de Uso Prácticos', slug: 'segmentacion/motor-segmentacion/casos-uso' },
								{ label: 'Mejores Prácticas', slug: 'segmentacion/motor-segmentacion/mejores-practicas' },
								{ label: 'Preguntas Frecuentes', slug: 'segmentacion/motor-segmentacion/faq' },
							],
						},
						{
							label: 'Capacidades',
							items: [
								{ label: 'Catálogo', slug: 'segmentacion/capacidades' },
								{ label: 'Atributos del fan', slug: 'segmentacion/capacidades/atributos-del-fan' },
								{ label: 'Asistencia a eventos', slug: 'segmentacion/capacidades/asistencia' },
								{ label: 'Gasto y consumo', slug: 'segmentacion/capacidades/gasto-y-consumo' },
								{ label: 'Engagement digital', slug: 'segmentacion/capacidades/engagement' },
								{ label: 'Nevent Score y temperatura', slug: 'segmentacion/capacidades/score-y-temperatura' },
								{ label: 'RFM automático', slug: 'segmentacion/capacidades/rfm' },
								{ label: 'Combinaciones avanzadas', slug: 'segmentacion/capacidades/combinaciones' },
							],
						},
						{
							label: 'Casos prácticos',
							collapsed: false,
							items: [
								{ label: 'Índice', slug: 'segmentacion/casos' },
								{ label: 'Reactivar fans inactivos', slug: 'segmentacion/casos/reactivar-fans-inactivos' },
								{ label: 'Fans tempranos (early bird)', slug: 'segmentacion/casos/fans-tempranos' },
								{ label: 'Audiencia geolocalizada', slug: 'segmentacion/casos/audiencia-geolocalizada' },
								{ label: 'Top RFM y VIPs', slug: 'segmentacion/casos/top-rfm-vip' },
								{ label: 'Carrito abandonado', slug: 'segmentacion/casos/carrito-abandonado' },
								{ label: 'Audiencia con preferencia', slug: 'segmentacion/casos/audiencia-con-preferencia' },
							],
						},
					],
				},
				// ─── Analítica — ES ─────────────────────────────────────────────
				{
					label: 'Analítica',
					items: [
						{ label: 'Catálogo', slug: 'analitica' },
						{ label: 'Eventos y entradas', slug: 'analitica/eventos-y-entradas' },
						{ label: 'Audiencia y fans', slug: 'analitica/audiencia' },
						{ label: 'Campañas', slug: 'analitica/campanas' },
						{ label: 'Publicidad de pago', slug: 'analitica/paid-media' },
						{ label: 'Tracking y atribución', slug: 'analitica/tracking-y-atribucion' },
						{ label: 'Deliverability', slug: 'analitica/deliverability' },
						{ label: 'Cómo agrupar y filtrar', slug: 'analitica/agrupar-y-filtrar' },
						{ label: 'FAQ', slug: 'analitica/faq' },
						{
							label: 'Casos prácticos',
							collapsed: false,
							items: [
								{ label: 'Índice', slug: 'analitica/casos' },
								{ label: 'ROAS últimos 30 días', slug: 'analitica/casos/roas-ultimos-30-dias' },
								{ label: 'Top eventos por revenue', slug: 'analitica/casos/top-eventos-revenue' },
								{ label: 'Open rate diario', slug: 'analitica/casos/open-rate-diario' },
								{ label: 'Email por tier', slug: 'analitica/casos/email-por-tier' },
								{ label: 'Atribución por canal', slug: 'analitica/casos/atribucion-por-canal' },
								{ label: 'Cohortes primera compra', slug: 'analitica/casos/cohortes-primera-compra' },
							],
						},
					],
				},
				// ─── Nevent AI — ES ─────────────────────────────────────────────
				{
					label: 'Nevent AI',
					items: [
						{ label: 'Qué es Nevent IA', slug: 'nevent-ai', badge: { text: 'Nuevo', variant: 'tip' } },
						{ label: 'Conectar con Claude', slug: 'nevent-ai/conectar-claude' },
						{ label: 'Conectar con ChatGPT', slug: 'nevent-ai/conectar-chatgpt' },
						{
							label: 'Lo que puedes hacer',
							items: [
								{ label: 'Visión general', slug: 'nevent-ai/que-puedes-hacer' },
								{ label: 'Analítica de eventos', slug: 'nevent-ai/que-puedes-hacer/analitica' },
								{ label: 'Campañas', slug: 'nevent-ai/que-puedes-hacer/campanas' },
								{ label: 'Audiencia y segmentos', slug: 'nevent-ai/que-puedes-hacer/audiencia' },
								{ label: 'Plantillas de email', slug: 'nevent-ai/que-puedes-hacer/plantillas' },
								{ label: 'Publicidad de pago', slug: 'nevent-ai/que-puedes-hacer/paid-media' },
								{ label: 'Tracking de enlaces', slug: 'nevent-ai/que-puedes-hacer/short-urls' },
								{ label: 'Entregabilidad', slug: 'nevent-ai/que-puedes-hacer/deliverability' },
								{ label: 'Gestión multi-cuenta', slug: 'nevent-ai/que-puedes-hacer/multi-cuenta' },
							],
						},
						{
							label: 'Casos prácticos',
							items: [
								{ label: 'Visión general', slug: 'nevent-ai/casos-practicos' },
								{ label: 'Lanzar un evento', slug: 'nevent-ai/casos-practicos/lanzar-un-evento' },
								{ label: 'Recuperar audiencia dormida', slug: 'nevent-ai/casos-practicos/recuperar-audiencia-dormida' },
								{ label: 'Diagnosticar una campaña floja', slug: 'nevent-ai/casos-practicos/diagnosticar-campana-floja' },
								{ label: 'Optimizar inversión publicitaria', slug: 'nevent-ai/casos-practicos/optimizar-inversion-publicitaria' },
								{ label: 'Cierre de mes y reporting', slug: 'nevent-ai/casos-practicos/cierre-de-mes-y-reporting' },
							],
						},
						{ label: 'Frases listas para usar', slug: 'nevent-ai/frases-listas-para-usar' },
						{ label: 'Permisos y seguridad', slug: 'nevent-ai/permisos-y-seguridad' },
						{ label: 'Preguntas frecuentes', slug: 'nevent-ai/preguntas-frecuentes' },
						{
							label: 'Para desarrolladores',
							collapsed: true,
							items: [
								{ label: 'Visión general', slug: 'nevent-ai/developers' },
								{ label: 'Claude Code', slug: 'nevent-ai/developers/claude-code' },
								{ label: 'Claude Desktop', slug: 'nevent-ai/developers/claude-desktop' },
								{ label: 'Cursor, Cline, Continue, VS Code', slug: 'nevent-ai/developers/cursor-cline-continue' },
								{ label: 'Instalación local', slug: 'nevent-ai/developers/instalacion-local' },
								{ label: 'Multi-tenant', slug: 'nevent-ai/developers/multi-tenant' },
								{ label: 'Herramientas disponibles', slug: 'nevent-ai/developers/herramientas' },
								{ label: 'Troubleshooting', slug: 'nevent-ai/developers/troubleshooting' },
							],
						},
					],
				},
				// ─── English (/en/) — uses link: with absolute paths ────────────────
				// These paths are absolute so Starlight does not add an /en/ prefix.
				// The custom Sidebar.astro component:
				//   - strips the double /en/en/ prefix that Starlight adds when rendering
				//     link: items on EN locale pages
				//   - filters this group out entirely when rendering ES locale pages
				// ─── Segmentation — EN ──────────────────────────────────────────
				{
					label: 'Segmentation',
					items: [
						{
							label: 'Segmentation Engine',
							items: [
								{ label: 'Introduction', link: '/en/segmentation/segmentation-engine/', badge: { text: 'Start here', variant: 'tip' } },
								{ label: 'Creating a segment', link: '/en/segmentation/segmentation-engine/creating-a-segment/' },
								{ label: 'The 6 categories', link: '/en/segmentation/segmentation-engine/categories/' },
								{ label: 'Operators & AND/OR logic', link: '/en/segmentation/segmentation-engine/operators-and-logic/' },
								{ label: 'Modifiers & RFM analysis', link: '/en/segmentation/segmentation-engine/modifiers-and-rfm/', badge: { text: 'Advanced', variant: 'note' } },
								{ label: 'Groups & A/B testing', link: '/en/segmentation/segmentation-engine/groups/' },
								{ label: 'Use cases', link: '/en/segmentation/segmentation-engine/use-cases/' },
								{ label: 'Best practices', link: '/en/segmentation/segmentation-engine/best-practices/' },
								{ label: 'FAQ', link: '/en/segmentation/segmentation-engine/faq/' },
							],
						},
						{
							label: 'Capabilities',
							items: [
								{ label: 'Catalog', link: '/en/segmentation/capabilities/' },
								{ label: 'Fan attributes', link: '/en/segmentation/capabilities/fan-attributes/' },
								{ label: 'Event attendance', link: '/en/segmentation/capabilities/event-attendance/' },
								{ label: 'Spend and consumption', link: '/en/segmentation/capabilities/spend-and-consumption/' },
								{ label: 'Digital engagement', link: '/en/segmentation/capabilities/digital-engagement/' },
								{ label: 'Nevent Score and Temperature', link: '/en/segmentation/capabilities/score-and-temperature/' },
								{ label: 'Automatic RFM', link: '/en/segmentation/capabilities/rfm/' },
								{ label: 'Advanced combinations', link: '/en/segmentation/capabilities/advanced-combinations/' },
							],
						},
						{
							label: 'Use cases',
							collapsed: false,
							items: [
								{ label: 'Index', link: '/en/segmentation/use-cases/' },
								{ label: 'Reactivating inactive fans', link: '/en/segmentation/use-cases/reactivating-inactive-fans/' },
								{ label: 'Early buyers', link: '/en/segmentation/use-cases/early-buyers/' },
								{ label: 'Geolocated audience', link: '/en/segmentation/use-cases/geolocated-audience/' },
								{ label: 'Top RFM and VIPs', link: '/en/segmentation/use-cases/top-rfm-vip/' },
								{ label: 'Abandoned cart', link: '/en/segmentation/use-cases/abandoned-cart/' },
								{ label: 'Audience with preference', link: '/en/segmentation/use-cases/audience-with-preference/' },
							],
						},
					],
				},
				// ─── Analytics — EN ─────────────────────────────────────────────
				{
					label: 'Analytics',
					items: [
						{ label: 'Catalog', link: '/en/analytics/' },
						{ label: 'Events and tickets', link: '/en/analytics/events-and-tickets/' },
						{ label: 'Audience', link: '/en/analytics/audience/' },
						{ label: 'Campaigns', link: '/en/analytics/campaigns/' },
						{ label: 'Paid media', link: '/en/analytics/paid-media/' },
						{ label: 'Tracking and attribution', link: '/en/analytics/tracking-and-attribution/' },
						{ label: 'Deliverability', link: '/en/analytics/deliverability/' },
						{ label: 'Grouping and filtering', link: '/en/analytics/grouping-and-filtering/' },
						{ label: 'FAQ', link: '/en/analytics/faq/' },
						{
							label: 'Use cases',
							collapsed: false,
							items: [
								{ label: 'Index', link: '/en/analytics/use-cases/' },
								{ label: 'ROAS last 30 days', link: '/en/analytics/use-cases/roas-last-30-days/' },
								{ label: 'Top events by revenue', link: '/en/analytics/use-cases/top-events-revenue/' },
								{ label: 'Daily open rate', link: '/en/analytics/use-cases/daily-open-rate/' },
								{ label: 'Email usage by tier', link: '/en/analytics/use-cases/email-usage-by-tier/' },
								{ label: 'Attribution by channel', link: '/en/analytics/use-cases/attribution-by-channel/' },
								{ label: 'Cohorts first purchase', link: '/en/analytics/use-cases/cohorts-first-purchase/' },
							],
						},
					],
				},
				// ─── Nevent AI — EN ─────────────────────────────────────────────
				{
					label: 'Nevent AI',
					items: [
						{ label: 'What is Nevent AI', link: '/en/nevent-ai/', badge: { text: 'New', variant: 'tip' } },
						{ label: 'Connect with Claude', link: '/en/nevent-ai/connect-claude/' },
						{ label: 'Connect with ChatGPT', link: '/en/nevent-ai/connect-chatgpt/' },
						{
							label: 'What you can do',
							items: [
								{ label: 'Overview', link: '/en/nevent-ai/what-you-can-do/' },
								{ label: 'Event analytics', link: '/en/nevent-ai/what-you-can-do/analytics/' },
								{ label: 'Campaigns', link: '/en/nevent-ai/what-you-can-do/campaigns/' },
								{ label: 'Audience and segments', link: '/en/nevent-ai/what-you-can-do/audience/' },
								{ label: 'Email templates', link: '/en/nevent-ai/what-you-can-do/templates/' },
								{ label: 'Paid advertising', link: '/en/nevent-ai/what-you-can-do/paid-media/' },
								{ label: 'Link tracking', link: '/en/nevent-ai/what-you-can-do/link-tracking/' },
								{ label: 'Deliverability', link: '/en/nevent-ai/what-you-can-do/deliverability/' },
								{ label: 'Multi-account management', link: '/en/nevent-ai/what-you-can-do/multi-account/' },
							],
						},
						{
							label: 'Use cases',
							items: [
								{ label: 'Overview', link: '/en/nevent-ai/use-cases/' },
								{ label: 'Launching an event', link: '/en/nevent-ai/use-cases/launching-an-event/' },
								{ label: 'Winning back dormant audience', link: '/en/nevent-ai/use-cases/winning-back-dormant-audience/' },
								{ label: 'Diagnosing an underperforming campaign', link: '/en/nevent-ai/use-cases/diagnosing-an-underperforming-campaign/' },
								{ label: 'Optimizing ad spend', link: '/en/nevent-ai/use-cases/optimizing-ad-spend/' },
								{ label: 'Monthly close and reporting', link: '/en/nevent-ai/use-cases/monthly-close-and-reporting/' },
							],
						},
						{ label: 'Ready-to-use prompts', link: '/en/nevent-ai/ready-to-use-prompts/' },
						{ label: 'Permissions and security', link: '/en/nevent-ai/permissions-and-security/' },
						{ label: 'FAQ', link: '/en/nevent-ai/faq/' },
						{
							label: 'For developers',
							collapsed: true,
							items: [
								{ label: 'Overview', link: '/en/nevent-ai/developers/' },
								{ label: 'Claude Code', link: '/en/nevent-ai/developers/claude-code/' },
								{ label: 'Claude Desktop', link: '/en/nevent-ai/developers/claude-desktop/' },
								{ label: 'Cursor, Cline, Continue, VS Code', link: '/en/nevent-ai/developers/cursor-cline-continue/' },
								{ label: 'Local installation', link: '/en/nevent-ai/developers/local-installation/' },
								{ label: 'Multi-tenant', link: '/en/nevent-ai/developers/multi-tenant/' },
								{ label: 'Available tools', link: '/en/nevent-ai/developers/tools/' },
								{ label: 'Troubleshooting', link: '/en/nevent-ai/developers/troubleshooting/' },
							],
						},
					],
				},
			],

			// Custom component overrides
			components: {
				// Filter sidebar by locale so each language sees only its own entries.
				// Starlight uses a single global sidebar array; without this override both
				// the ES and EN groups render on every page.
				Sidebar: './src/components/Sidebar.astro',
				// Custom Head injects JSON-LD structured data (Organization, TechArticle,
				// FAQPage, BreadcrumbList) and og:image meta tags on every page.
				Head: './src/components/Head.astro',
				// Custom Footer renders the FeelBack Yes/No feedback widget above the
				// standard Starlight footer (pagination arrows, edit on GitHub link).
				// Requires contentSetId from https://app.feelback.dev (see Footer.astro).
				Footer: './src/components/Footer.astro',
			},

			// Customización de UI
			customCss: [
				'./src/styles/custom.css',
			],

			// i18n — español en raíz, inglés bajo /en/
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'Español',
					lang: 'es',
				},
				en: {
					label: 'English',
					lang: 'en',
				},
			},
		}),
	],
});
