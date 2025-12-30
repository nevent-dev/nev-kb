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
			],

			// Social links (aparecen en header)
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/nevent/nev-kb',
				},
			],

			// Sidebar en orden lógico de onboarding
			sidebar: [
				{
					label: 'Inicio',
					items: [
						{ label: 'Bienvenido', slug: 'index' },
					],
				},
			{
				label: 'Marca',
				autogenerate: { directory: 'brand' },
				collapsed: false,
			},				// {
				// 	label: 'Creación de Cuenta',
		{
			label: 'Comunicación',
			autogenerate: { directory: 'communication' },
			collapsed: false,
		},				// 	autogenerate: { directory: '01-cuenta' },
				// 	collapsed: false,
				// 	badge: { text: 'Empezar', variant: 'tip' },
				// },
				// {
				// 	label: 'Configuración Inicial',
				// 	autogenerate: { directory: '02-configuracion' },
				// 	collapsed: true,
				// },
				// {
				// 	label: 'Integraciones y Sincronización',
				// 	autogenerate: { directory: '03-integraciones' },
				// 	collapsed: true,
				// },
				// {
				// 	label: 'Importación de Datos',
				// 	autogenerate: { directory: '04-importacion-datos' },
				// 	collapsed: true,
				// },
				// {
				// 	label: 'Audiencia / Fans',
				// 	autogenerate: { directory: '05-audiencia' },
				// 	collapsed: true,
				// },
				// {
				// 	label: 'Etiquetas',
				// 	autogenerate: { directory: '06-etiquetas' },
				// 	collapsed: true,
				// },
				// {
				// 	label: 'Segmentación',
				// 	autogenerate: { directory: '07-segmentacion' },
				// 	collapsed: true,
				// },
				// {
				// 	label: 'Canales de Comunicación',
				// 	autogenerate: { directory: '08-canales' },
				// 	collapsed: true,
				// },
				// {
				// 	label: 'Plantillas',
				// 	autogenerate: { directory: '09-plantillas' },
				// 	collapsed: true,
				// },
				// {
				// 	label: 'Campañas',
				// 	autogenerate: { directory: '10-campanas' },
				// 	collapsed: true,
				// },
				// {
				// 	label: 'Newsletters',
				// 	autogenerate: { directory: '11-newsletters' },
				// 	collapsed: true,
				// },
				// {
				// 	label: 'Experiencias / Eventos',
				// 	autogenerate: { directory: '12-experiencias' },
				// 	collapsed: true,
				// 	badge: { text: 'Sincronizado', variant: 'note' },
				// },
				// {
				// 	label: 'Lineup de Artistas',
				// 	autogenerate: { directory: '13-lineup' },
				// 	collapsed: true,
				// 	badge: { text: 'Spotify', variant: 'success' },
				// },
				// {
				// 	label: 'Merchandising',
				// 	autogenerate: { directory: '14-merchandising' },
				// 	collapsed: true,
				// },
				// {
				// 	label: 'Ventas y Compras',
				// 	autogenerate: { directory: '15-ventas' },
				// 	collapsed: true,
				// 	badge: { text: 'Solo lectura', variant: 'caution' },
				// },
				// {
				// 	label: 'Gamificación',
				// 	autogenerate: { directory: '16-gamificacion' },
				// 	collapsed: true,
				// },
				// {
				// 	label: 'Chatbot',
				// 	autogenerate: { directory: '17-chatbot' },
				// 	collapsed: true,
				// },
				// {
				// 	label: 'Herramientas y Analytics',
				// 	autogenerate: { directory: '18-herramientas' },
				// 	collapsed: true,
				// },
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
