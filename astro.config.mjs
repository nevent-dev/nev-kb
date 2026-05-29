// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import starlightThemeNova from 'starlight-theme-nova';

// https://astro.build/config
export default defineConfig({
	site: 'https://help.nevent.ai',

	integrations: [
		// Sitemap for SEO (reduces indexing time by 50%)
		sitemap(),

		starlight({
			title: 'Nevent Help Center',
			description: 'Knowledge Base de Nevent - La fuente única de verdad del conocimiento de la compañía',

			// Theme Nova
			plugins: [starlightThemeNova()],

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
					label: 'Audiencia',
					items: [
						{
							label: 'Cómo crear un segmento',
							slug: 'audiencia/crear-segmento',
							badge: { text: 'Nuevo', variant: 'tip' }
						},
						{
							label: 'Criterios de segmentación',
							slug: 'audiencia/criterios-segmentacion',
							badge: { text: 'Nuevo', variant: 'tip' }
						},
						{
							label: 'Modificadores de segmentación',
							slug: 'audiencia/modificadores',
							badge: { text: 'Nuevo', variant: 'tip' }
						}
					]
				},
				{
					label: 'Suscripciones',
					items: [
						{
							label: 'Crear una suscripción',
							slug: 'suscripciones/crear-formulario',
							badge: { text: 'Nuevo', variant: 'tip' }
						},
						{
							label: 'Ajustes generales',
							slug: 'suscripciones/configuracion-general',
							badge: { text: 'Nuevo', variant: 'tip' }
						},
						{
							label: 'Campos del formulario',
							slug: 'suscripciones/campos-formulario',
							badge: { text: 'Nuevo', variant: 'tip' }
						},
						{
							label: 'Apariencia del formulario',
							slug: 'suscripciones/apariencia-formulario',
							badge: { text: 'Nuevo', variant: 'tip' }
						},
						{
							label: 'Automatizaciones',
							slug: 'suscripciones/automatizaciones-formulario',
							badge: { text: 'Nuevo', variant: 'tip' }
						},
						{
							label: 'Suscriptores',
							slug: 'suscripciones/suscriptores-formulario',
							badge: { text: 'Nuevo', variant: 'tip' }
						}
					]
				},
				{
					label: 'Campañas',
					items: [
						{
							label: 'Crear una campaña de email',
							slug: 'campanas/crear-campana',
							badge: { text: 'Nuevo', variant: 'tip' }
						},
						{
							label: 'Canales de campaña',
							slug: 'campanas/canales-campana',
							badge: { text: 'Nuevo', variant: 'tip' }
						},
						{
							label: 'Marketing vs transaccional',
							slug: 'campanas/tipos-campana',
							badge: { text: 'Nuevo', variant: 'tip' }
						},
						{
							label: 'Asunto y vista previa',
							slug: 'campanas/asunto-y-previsualizacion',
							badge: { text: 'Nuevo', variant: 'tip' }
						},
						{
							label: 'Programar o enviar',
							slug: 'campanas/programar-campana',
							badge: { text: 'Nuevo', variant: 'tip' }
						},
						{
							label: 'Estados de una campaña',
							slug: 'campanas/estados-campana',
							badge: { text: 'Nuevo', variant: 'tip' }
						}
					]
				},
				{
					label: 'Configuración',
					items: [
						{
							label: 'Configurar dominio de email',
							slug: 'configuracion/dominio-email',
							badge: { text: 'Nuevo', variant: 'tip' }
						},
						{
							label: 'Configurar envío de SMS',
							slug: 'configuracion/configurar-sms',
							badge: { text: 'Nuevo', variant: 'tip' }
						}
					]
				},
				{
					label: 'Nevent AI',
					items: [
						{ label: 'Qué es Nevent MCP', slug: 'nevent-ai', badge: { text: 'Nuevo', variant: 'tip' } },
						{ label: 'Casos de uso', slug: 'nevent-ai/casos-de-uso' },
						{ label: 'Conectar con Claude', slug: 'nevent-ai/conectar-claude' },
						{ label: 'Conectar con ChatGPT', slug: 'nevent-ai/conectar-chatgpt' },
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
