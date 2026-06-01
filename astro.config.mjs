// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import starlightThemeNova from 'starlight-theme-nova';
import starlightLlmsTxt from 'starlight-llms-txt';

// https://astro.build/config
export default defineConfig({
	site: 'https://help.nevent.ai',

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
					/\/(casos-practicos|que-puedes-hacer|conectar-claude|conectar-chatgpt|frases-listas-para-usar|permisos-y-seguridad|preguntas-frecuentes|herramientas|instalacion-local|analitica|campanas|audiencia|plantillas|short-urls|multi-cuenta|lanzar-un-evento|recuperar-audiencia-dormida|diagnosticar-campana-floja|optimizar-inversion-publicitaria|cierre-de-mes-y-reporting)\//;
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
					url === 'https://help.nevent.ai/en/nevent-ai/'
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

			// Plugins: Theme Nova + llms.txt para asistentes de IA
			plugins: [
				starlightThemeNova(),
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
				// Favicon
				{
					tag: 'link',
					attrs: {
						rel: 'icon',
						href: '/favicon.svg',
						type: 'image/svg+xml',
					},
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
				// ─── Español (root) ────────────────────────────────────────────
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
