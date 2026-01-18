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

			// Sidebar - Motor de Segmentación Estructurado
			sidebar: [
				{
					label: 'Audiencia',
					items: [
						{
							label: 'Motor de Segmentación',
							items: [
								{
									label: 'Introducción',
									slug: 'audience/motor-segmentacion',
									badge: { text: 'Empezar aquí', variant: 'tip' }
								},
								{
									label: 'Cómo Crear un Segmento',
									slug: 'audience/motor-segmentacion/crear-segmento'
								},
								{
									label: 'Las 6 Categorías',
									slug: 'audience/motor-segmentacion/categorias'
								},
								{
									label: 'Operadores & Lógica Y/O',
									slug: 'audience/motor-segmentacion/operadores-logica'
								},
								{
									label: 'Modificadores & RFM',
									slug: 'audience/motor-segmentacion/modificadores-rfm',
									badge: { text: 'Avanzado', variant: 'note' }
								},
								{
									label: 'Grupos & A/B Testing',
									slug: 'audience/motor-segmentacion/grupos'
								},
								{
									label: 'Casos de Uso Prácticos',
									slug: 'audience/motor-segmentacion/casos-uso'
								},
								{
									label: 'Mejores Prácticas',
									slug: 'audience/motor-segmentacion/mejores-practicas'
								},
								{
									label: 'Preguntas Frecuentes',
									slug: 'audience/motor-segmentacion/faq'
								},
							]
						}
					]
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
