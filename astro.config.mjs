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
					label: 'Audiencia y segmentación',
					items: [
						{
							label: 'Segmentos',
							items: [
								{
									label: 'Introducción a segmentos',
									slug: 'audience/motor-segmentacion',
									badge: { text: 'Empezar aquí', variant: 'tip' }
								},
								{
									label: 'Cómo crear un segmento',
									slug: 'audience/motor-segmentacion/crear-segmento'
								},
								{
									label: 'Categorías de criterios',
									slug: 'audience/motor-segmentacion/categorias'
								},
								{
									label: 'Operadores lógicos',
									slug: 'audience/motor-segmentacion/operadores-logica'
								},
								{
									label: 'Modificadores y análisis RFM',
									slug: 'audience/motor-segmentacion/modificadores-rfm',
									badge: { text: 'Avanzado', variant: 'note' }
								},
								{
									label: 'Grupos para A/B testing',
									slug: 'audience/motor-segmentacion/grupos'
								},
								{
									label: 'Casos de uso',
									slug: 'audience/motor-segmentacion/casos-uso'
								},
								{
									label: 'Mejores prácticas',
									slug: 'audience/motor-segmentacion/mejores-practicas'
								},
								{
									label: 'Preguntas frecuentes',
									slug: 'audience/motor-segmentacion/faq'
								},
							]
						}
					]
				},
				{
					label: 'Campañas',
					items: [
						{
							label: 'Introducción a campañas',
							slug: 'campaigns'
						},
						{
							label: 'Campañas de email',
							slug: 'campaigns/email-campaigns'
						},
						{
							label: 'Personalización de mensajes',
							slug: 'campaigns/personalization'
						},
						{
							label: 'A/B testing de campañas',
							slug: 'campaigns/ab-testing'
						},
						{
							label: 'Reenviar a no abiertos',
							slug: 'campaigns/resend-unopened'
						},
						{
							label: 'Campaña de reenganche',
							slug: 'campaigns/reengagement'
						},
						{
							label: 'Campañas de SMS',
							slug: 'campaigns/sms-campaigns'
						},
						{
							label: 'Campañas de push',
							slug: 'campaigns/push-campaigns'
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
