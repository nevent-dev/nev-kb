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

			// Sidebar auto-generado por categorías
			sidebar: [
				{
					label: 'Inicio',
					items: [
						{ label: 'Bienvenido', slug: 'index' },
					],
				},
				{
					label: 'Featured Resources',
					autogenerate: { directory: 'featured-resources' },
					collapsed: false,
					badge: { text: 'Popular', variant: 'tip' },
				},
				{
					label: 'Account & Billing',
					autogenerate: { directory: 'account-billing' },
					collapsed: true,
				},
				{
					label: 'Advanced KDP & Marketing Analytics',
					autogenerate: { directory: 'advanced-kdp-marketing-analytics' },
					collapsed: true,
				},
				{
					label: 'Analytics',
					autogenerate: { directory: 'analytics' },
					collapsed: true,
				},
				{
					label: 'Audience',
					autogenerate: { directory: 'audience' },
					collapsed: true,
				},
				{
					label: 'Campaigns',
					autogenerate: { directory: 'campaigns' },
					collapsed: true,
				},
				{
					label: 'Content',
					autogenerate: { directory: 'content' },
					collapsed: true,
				},
				{
					label: 'Conversations',
					autogenerate: { directory: 'conversations' },
					collapsed: true,
				},
				{
					label: 'Customer Hub',
					autogenerate: { directory: 'customer-hub' },
					collapsed: true,
				},
				{
					label: 'Deliverability & Compliance',
					autogenerate: { directory: 'deliverability-compliance' },
					collapsed: true,
				},
				{
					label: 'Flows',
					autogenerate: { directory: 'flows' },
					collapsed: true,
				},
				{
					label: 'Integrations',
					autogenerate: { directory: 'integrations' },
					collapsed: true,
				},
				{
					label: 'Reviews',
					autogenerate: { directory: 'reviews' },
					collapsed: true,
				},
				{
					label: 'Sign-up Forms',
					autogenerate: { directory: 'signup-forms' },
					collapsed: true,
				},
				{
					label: 'SMS',
					autogenerate: { directory: 'sms' },
					collapsed: true,
				},
				{
					label: 'WhatsApp',
					autogenerate: { directory: 'whatsapp' },
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
