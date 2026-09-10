// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import starlightThemeNova from 'starlight-theme-nova';
import starlightLlmsTxt from 'starlight-llms-txt';
import starlightPageActions from 'starlight-page-actions';
import remarkGfm from 'remark-gfm';
import fixI18nLinks from './scripts/fix-i18n-links.mjs';
import llmsEn from './scripts/llms-en.mjs';
import kbIndex from './scripts/kb-index.mjs';
import { getEsSidebar } from './scripts/sidebar.mjs';

// https://astro.build/config
export default defineConfig({
	site: 'https://help.nevent.ai',

	// Redirecciones 301 de rutas antiguas tras la reorganización Diátaxis
	// (Ola 0). Solo cubren el árbol ES (raíz): el árbol EN no se ha tocado.
	// Astro genera una página estática con <meta http-equiv="refresh"> más
	// cabecera de redirección en el adaptador que la soporte.
	redirects: {
		// decisiones-frecuentes/* → integradas en su sección natural
		'/decisiones-frecuentes/email-sms-o-whatsapp': '/campanas/email-sms-o-whatsapp',
		'/decisiones-frecuentes/cuanto-y-cuando-enviar': '/campanas/cuanto-y-cuando-enviar',
		'/decisiones-frecuentes/segmento-vs-lista': '/segmentacion/segmento-vs-lista',
		// guias-por-objetivo/* + ciclo-de-vida/* → unificadas en playbooks/*
		'/guias-por-objetivo/fidelizar-post-evento': '/playbooks/fidelizar-post-evento',
		'/guias-por-objetivo/lanzamiento-72h': '/playbooks/lanzamiento-72h',
		'/guias-por-objetivo/llenar-tu-evento': '/playbooks/llenar-tu-evento',
		'/guias-por-objetivo/reactivar-fans-inactivos': '/playbooks/reactivar-fans-inactivos',
		'/guias-por-objetivo/recuperar-carritos-abandonados': '/playbooks/recuperar-carritos-abandonados',
		'/guias-por-objetivo/vender-en-preventa': '/playbooks/vender-en-preventa',
		'/ciclo-de-vida/checklist-de-lanzamiento': '/playbooks/checklist-de-lanzamiento',
		'/ciclo-de-vida/post-mortem-del-evento': '/playbooks/post-mortem-del-evento',
		'/ciclo-de-vida/semana-del-evento': '/playbooks/semana-del-evento',
		// segmentacion/motor-segmentacion/* → renombradas o retiradas
		'/segmentacion/motor-segmentacion/faq': '/segmentacion/preguntas-frecuentes',
		'/segmentacion/motor-segmentacion/mejores-practicas': '/segmentacion/buenas-practicas',
		'/segmentacion/motor-segmentacion/grupos': '/segmentacion/grupos-ab-testing',
		'/segmentacion/motor-segmentacion': '/segmentacion/tu-primer-segmento',
		'/segmentacion/motor-segmentacion/crear-segmento': '/segmentacion/tu-primer-segmento',
		'/segmentacion/motor-segmentacion/categorias': '/segmentacion/capacidades',
		'/segmentacion/motor-segmentacion/operadores-logica': '/segmentacion/capacidades/combinaciones',
		'/segmentacion/motor-segmentacion/modificadores-rfm': '/segmentacion/capacidades/rfm',
		'/segmentacion/motor-segmentacion/casos-uso': '/segmentacion/casos',
	},

	// Enable GitHub Flavored Markdown (GFM) tables in .mdx files.
	// Astro 6 / @astrojs/mdx do not include remark-gfm automatically for MDX
	// (unlike .md files which have GFM active by default). Without this, markdown
	// tables render as pipe-delimited plain text instead of <table> elements.
	markdown: {
		remarkPlugins: [remarkGfm],
	},

	integrations: [
		// Sitemap for SEO (reduces indexing time by 50%)
		// i18n config generates <xhtml:link rel="alternate" hreflang="..."> entries for
		// each page, signalling to Google which language version to serve per region.
		// This is the recommended way to implement hreflang in @astrojs/sitemap ≥ 3.x.
		// defaultLocale: 'es' → root locale (no prefix); 'en' maps to /en/ paths.
		// Filter out Starlight i18n fallback pages: these are Spanish-slug pages that
		// Starlight automatically serves under /en/ when no English translation exists.
		// Including them in the sitemap causes duplicate-content issues for SEO.
		// Pattern: any /en/ URL that contains a Spanish path segment (casos-practicos,
		// que-puedes-hacer, conectar-, frases-listas-para-usar, permisos-y-seguridad,
		// preguntas-frecuentes, herramientas, instalacion-local).
		sitemap({
			// Multilingual hreflang: generates xhtml:link alternate entries per page.
			// Tells Google "this page is in Spanish; equivalent English page is at /en/..."
			i18n: {
				defaultLocale: 'es',
				locales: {
					es: 'es-ES',
					en: 'en-GB',
				},
			},
			filter: (page) => {
				// Starlight i18n fallback: when an EN translation does not exist for a page,
				// Starlight serves the ES (root locale) content at /en/<spanish-slug>/.
				// These duplicate URLs must be excluded from the sitemap to avoid SEO
				// duplicate-content penalties. The list below contains path segments that
				// appear ONLY in ES (root locale) slugs — they have different EN equivalents.
				const SPANISH_ONLY_SLUG_PATTERN =
					/\/(casos-practicos|que-puedes-hacer|conectar-claude|conectar-chatgpt|frases-listas-para-usar|permisos-y-seguridad|preguntas-frecuentes|herramientas|instalacion-local|analitica|campanas|audiencia|plantillas|short-urls|multi-cuenta|lanzar-un-evento|recuperar-audiencia-dormida|diagnosticar-campana-floja|optimizar-inversion-publicitaria|cierre-de-mes-y-reporting|mejores-practicas|segmentacion|capacidades|asistencia|atributos-del-fan|gasto-y-consumo|score-y-temperatura|combinaciones|agrupar-y-filtrar|tracking-y-atribucion|playbooks|buenas-practicas|grupos-ab-testing|segmento-vs-lista|email-sms-o-whatsapp|cuanto-y-cuando-enviar|por-que-se-dan-de-baja|consulta-tus-suscriptores)\//;
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
					url === 'https://help.nevent.ai/segmentacion/tu-primer-segmento/' ||
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
			// alt is required: without it every page ships an <img> with an empty
			// alt attribute in the header, flagged as "missing alt text" by SEO
			// audits (Ahrefs Site Audit: ~200 pages affected).
			logo: {
				src: './src/assets/logo.png',
				alt: 'Nevent Help Center',
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
						content: '#a64eff', // Magenta Nevent, el mismo que nevent.ai
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

			// Sidebar — ES (raíz) y EN (/en/)
			// Starlight selecciona automáticamente los items del locale activo
			sidebar: [
				// Bloque ES generado desde el frontmatter de cada doc (ver scripts/sidebar.mjs).
				...getEsSidebar(),
				// ─── English (/en/) — uses link: with absolute paths ────────────────
				// These paths are absolute so Starlight does not add an /en/ prefix.
				// The custom Sidebar.astro component:
				//   - strips the double /en/en/ prefix that Starlight adds when rendering
				//     link: items on EN locale pages
				//   - filters this group out entirely when rendering ES locale pages
				// ─── Segmentation — EN ──────────────────────────────────────────
				{
					label: 'Event lifecycle',
					items: [
						{ label: 'Launch checklist', link: '/en/lifecycle/launch-checklist/' },
						{ label: 'Your event week', link: '/en/lifecycle/event-week/' },
						{ label: 'Event post-mortem', link: '/en/lifecycle/event-post-mortem/' },
					],
				},
				{
					label: 'Troubleshooting',
					items: [
						{ label: 'My emails are going to spam', link: '/en/troubleshooting/emails-going-to-spam/' },
						{ label: 'Low open rate', link: '/en/troubleshooting/low-open-rate/' },
						{ label: 'I don\'t see attributed sales', link: '/en/troubleshooting/unattributed-sales/' },
						{ label: 'My domain won\'t verify', link: '/en/troubleshooting/domain-not-verifying/' },
					],
				},
				{
					label: 'Common decisions',
					items: [
						{ label: 'Email, SMS or WhatsApp', link: '/en/common-decisions/email-sms-or-whatsapp/' },
						{ label: 'Segment or list', link: '/en/common-decisions/segment-vs-list/' },
						{ label: 'How much and when to send', link: '/en/common-decisions/how-much-and-when-to-send/' },
					],
				},
				{
					label: 'Goal guides',
					items: [
						{ label: 'How to fill your event', link: '/en/goal-guides/fill-your-event/' },
						{ label: '72-hour launch', link: '/en/goal-guides/72-hour-launch/' },
						{ label: 'Recover abandoned carts', link: '/en/goal-guides/recover-abandoned-carts/' },
						{ label: 'Reactivate inactive fans', link: '/en/goal-guides/reactivate-inactive-fans/' },
						{ label: 'Sell more in presale', link: '/en/goal-guides/sell-more-in-presale/' },
						{ label: 'Post-event loyalty', link: '/en/goal-guides/post-event-loyalty/' },
					],
				},
				{
					label: 'Audience',
					items: [
						{ label: 'Import your contacts', link: '/en/audience/import-your-contacts/' },
						{ label: 'A fan\'s profile', link: '/en/audience/manage-a-fan-profile/' },
						{ label: 'Explore your audience', link: '/en/audience/explore-your-audience/' },
						{ label: 'Connect your ticketing platform', link: '/en/audience/connect-your-ticketing-platform/' },
						{ label: 'Why connect your ticketing platform', link: '/en/audience/why-connect-your-ticketing-platform/' },
						{ label: 'If your ticketing platform isn\'t integrated', link: '/en/audience/ticketing-platform-not-integrated/' },
						{ label: 'How Nevent understands your audience', link: '/en/audience/how-nevent-understands-your-audience/' },
						{ label: 'Integrations reference', link: '/en/audience/integrations-reference/' },
						{ label: 'Fans and segments reference', link: '/en/audience/reference/' },
					],
				},
				{
					label: 'Subscriptions',
					items: [
						{ label: 'What subscriptions are for', link: '/en/subscriptions/what-subscriptions-are-for/' },
						{ label: 'Create your first subscription', link: '/en/subscriptions/create-your-first-subscription/' },
						{ label: 'Create a subscription form', link: '/en/subscriptions/create-a-subscription-form/' },
						{ label: 'Subscriptions reference', link: '/en/subscriptions/reference/' },
					],
				},
				{
					label: 'Campaigns',
					items: [
						{ label: 'Create your first campaign', link: '/en/campaigns/create-your-first-campaign/' },
						{ label: 'Design email templates', link: '/en/campaigns/email-templates/' },
						{ label: 'Create WhatsApp templates', link: '/en/campaigns/whatsapp-templates/' },
						{ label: 'Manage your campaigns', link: '/en/campaigns/manage-your-campaigns/' },
						{ label: 'Interpreting the results', link: '/en/campaigns/report/results/' },
						{ label: 'Who opened and clicked', link: '/en/campaigns/report/opens-and-clicks/' },
						{ label: 'Checking bounces', link: '/en/campaigns/report/bounces/' },
						{ label: 'Who unsubscribed', link: '/en/campaigns/report/unsubscribes/' },
						{ label: 'Which audience it reached', link: '/en/campaigns/report/audience/' },
						{ label: 'Best practices', link: '/en/campaigns/best-practices/' },
						{ label: 'Campaign reference', link: '/en/campaigns/reference/' },
					],
				},
				{
					label: 'Paid Media',
					items: [
						{ label: 'What is Paid Media', link: '/en/paid-media/what-is-paid-media/' },
						{ label: 'Connect your accounts', link: '/en/paid-media/connect-your-accounts/' },
						{ label: 'Your first look at Paid Media', link: '/en/paid-media/your-first-look-at-paid-media/' },
						{ label: 'Sync a segment as an audience', link: '/en/paid-media/sync-a-segment-as-an-audience/' },
						{ label: 'What is a custom audience', link: '/en/paid-media/what-is-a-custom-audience/' },
						{ label: 'Custom audiences reference', link: '/en/paid-media/custom-audiences-reference/' },
						{ label: 'Paid Media reference', link: '/en/paid-media/reference/' },
					],
				},
				{
					label: 'Experiences',
					items: [
						{ label: 'What are experiences', link: '/en/experiences/what-are-experiences/' },
						{ label: 'Tour your experiences', link: '/en/experiences/tour-your-experiences/' },
						{ label: 'Waitlists', link: '/en/experiences/waitlists/' },
						{ label: 'Your event\'s music profile', link: '/en/experiences/music-profile/' },
						{ label: 'Analytics for your event', link: '/en/experiences/analytics/' },
						{ label: 'Experiences reference', link: '/en/experiences/reference/' },
					],
				},
				{
					label: 'Tools',
					items: [
						{ label: 'What are Magic Links', link: '/en/tools/what-are-magic-links/' },
						{ label: 'Create your first Magic Link', link: '/en/tools/create-your-first-magic-link/' },
						{ label: 'Magic Links', link: '/en/tools/magic-links/' },
						{ label: 'One link per channel', link: '/en/tools/one-link-per-channel/' },
						{ label: 'Magic Links reference', link: '/en/tools/magic-links-reference/' },
					],
				},
				{
					label: 'Chatbot',
					items: [
						{ label: 'Set up your chatbot', link: '/en/chatbot/set-up-your-chatbot/' },
						{ label: 'Configuration', link: '/en/chatbot/configuration/' },
						{ label: 'Assistant voice', link: '/en/chatbot/assistant-voice/' },
						{ label: 'Inbox', link: '/en/chatbot/inbox/' },
						{ label: 'Link tracking and performance', link: '/en/chatbot/link-tracking-and-performance/' },
						{ label: 'How it works', link: '/en/chatbot/how-it-works/' },
						{ label: 'Chatbot reference', link: '/en/chatbot/reference/' },
					],
				},
				{
					label: 'Superapp',
					items: [
						{ label: 'What is the Superapp', link: '/en/superapp/what-is-the-superapp/' },
						{ label: 'Getting started with the Superapp', link: '/en/superapp/getting-started/' },
						{ label: 'Home, onboarding and push', link: '/en/superapp/home-onboarding-and-push/' },
						{ label: 'Superapp reference', link: '/en/superapp/reference/' },
					],
				},
				{
					label: 'Usage and billing',
					items: [
						{ label: 'Your usage plan', link: '/en/usage/your-usage-plan/' },
						{ label: 'How credits work', link: '/en/usage/how-credits-work/' },
						{ label: 'Check your plan and usage', link: '/en/usage/check-your-plan/' },
						{ label: 'Plan and billing reference', link: '/en/usage/reference/' },
					],
				},
				{
					label: 'Deliverability and channels',
					items: [
						{ label: 'Set up your email delivery', link: '/en/deliverability/set-up-your-email-delivery/' },
						{ label: 'Activate your channels', link: '/en/deliverability/activate-your-channels/' },
						{ label: 'Custom sending domain', link: '/en/deliverability/custom-sending-domain/' },
						{ label: 'Email sending settings', link: '/en/deliverability/email-sending-settings/' },
						{ label: 'Sender reputation and spam', link: '/en/deliverability/sender-reputation-and-spam/' },
						{ label: 'Deliverability reference', link: '/en/deliverability/reference/' },
					],
				},
				{
					label: 'Segmentation',
					items: [
						{
							label: 'Segmentation Engine',
							items: [
								{ label: 'Introduction', link: '/en/segmentation/segmentation-engine/', badge: { text: 'Start here', variant: 'tip' } },
								{ label: 'Create your first segment', link: '/en/segmentation/your-first-segment/' },
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
						{ label: 'Understanding analytics', link: '/en/analytics/understanding-analytics/' },
						{ label: 'Your first analysis', link: '/en/analytics/your-first-analysis/' },
						{ label: 'What the Home dashboard measures', link: '/en/analytics/your-home-dashboard/' },
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
						{ label: 'Getting started', link: '/en/nevent-ai/getting-started/' },
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
				// Sustituye los iconos sociales por la vuelta a nevent.ai. El de
				// GitHub apuntaba a un repositorio inexistente (404) y no le sirve
				// de nada a un cliente.
				SocialIcons: './src/components/SocialIcons.astro',
				// Conserva el pie de Starlight (paginación, edición, fecha) y
				// añade debajo el de nevent.ai.
				Footer: './src/components/Footer.astro',
				// Pinta el distintivo de tipo Diátaxis, el aviso de nivel Pro y los
				// sinónimos indexables encima del <h1> de cada página.
				PageTitle: './src/components/PageTitle.astro',
			},

			// Customización de UI
			customCss: [
				'./src/styles/nevent-tokens.css',
				// Tokens de nevent.ai que consumen los componentes portados.
				'./src/styles/nevent-web-tokens.css',
				'./src/styles/nevent-ds-theme.css',
				'./src/styles/custom.css',
				'./src/styles/nevent-theme.css',
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

		// Post-build: rewrites hreflang alternates, language-switcher options,
		// fallback-page "Copy Markdown" links and /en/en/ double prefixes so that
		// no internal URL relies on Starlight's naive /en/ prefix swap (ES and EN
		// trees use different slugs). See scripts/fix-i18n-links.mjs.
		fixI18nLinks(), llmsEn(), kbIndex(),
	],
});
