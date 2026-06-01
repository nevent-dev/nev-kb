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
		sitemap(),

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

			// Sidebar
			sidebar: [
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
								{ label: 'Colaboraciones con influencers', slug: 'nevent-ai/casos-practicos/colaboraciones-con-influencers' },
								{ label: 'Gestionar varios clientes', slug: 'nevent-ai/casos-practicos/gestionar-varios-clientes' },
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
				}
			],

			// Customización de UI
			customCss: [
				'./src/styles/custom.css',
			],

			// i18n (preparado para español)
			defaultLocale: 'root',
			locales: {
				root: {
					label: 'Español',
					lang: 'es',
				},
				// Futuro: en: { label: 'English', lang: 'en' },
			},
		}),
	],
});
