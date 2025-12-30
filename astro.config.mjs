// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://help.nevent.ai',

	integrations: [
		// Sitemap for SEO (reduces indexing time by 50%)
		sitemap(),

		starlight({
			title: 'NevKB',
			description: 'Knowledge Base de Nevent - La fuente única de verdad del conocimiento de la compañía',

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
					label: '1. Creación de Cuenta',
					autogenerate: { directory: '01-cuenta' },
					collapsed: false,
					badge: { text: 'Empezar', variant: 'tip' },
				},
				{
					label: '2. Configuración Inicial',
					autogenerate: { directory: '02-configuracion' },
					collapsed: true,
				},
				{
					label: '3. Integraciones y Sincronización',
					autogenerate: { directory: '03-integraciones' },
					collapsed: true,
				},
				{
					label: '4. Importación de Datos',
					autogenerate: { directory: '04-importacion-datos' },
					collapsed: true,
				},
				{
					label: '5. Audiencia / Fans',
					autogenerate: { directory: '05-audiencia' },
					collapsed: true,
				},
				{
					label: '6. Etiquetas',
					autogenerate: { directory: '06-etiquetas' },
					collapsed: true,
				},
				{
					label: '7. Segmentación',
					autogenerate: { directory: '07-segmentacion' },
					collapsed: true,
				},
				{
					label: '8. Canales de Comunicación',
					autogenerate: { directory: '08-canales' },
					collapsed: true,
				},
				{
					label: '9. Plantillas',
					autogenerate: { directory: '09-plantillas' },
					collapsed: true,
				},
				{
					label: '10. Campañas',
					autogenerate: { directory: '10-campanas' },
					collapsed: true,
				},
				{
					label: '11. Newsletters',
					autogenerate: { directory: '11-newsletters' },
					collapsed: true,
				},
				{
					label: '12. Experiencias / Eventos',
					autogenerate: { directory: '12-experiencias' },
					collapsed: true,
					badge: { text: 'Sincronizado', variant: 'note' },
				},
				{
					label: '13. Lineup de Artistas',
					autogenerate: { directory: '13-lineup' },
					collapsed: true,
					badge: { text: 'Spotify', variant: 'success' },
				},
				{
					label: '14. Merchandising',
					autogenerate: { directory: '14-merchandising' },
					collapsed: true,
				},
				{
					label: '15. Ventas y Compras',
					autogenerate: { directory: '15-ventas' },
					collapsed: true,
					badge: { text: 'Solo lectura', variant: 'caution' },
				},
				{
					label: '16. Gamificación',
					autogenerate: { directory: '16-gamificacion' },
					collapsed: true,
				},
				{
					label: '17. Chatbot',
					autogenerate: { directory: '17-chatbot' },
					collapsed: true,
				},
				{
					label: '18. Herramientas y Analytics',
					autogenerate: { directory: '18-herramientas' },
					collapsed: true,
				},
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
