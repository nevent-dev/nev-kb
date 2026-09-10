import { defineCollection, z } from 'astro:content';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			// Custom frontmatter fields used by src/components/Head.astro:
			//   - faqs: Q&A pairs → FAQPage JSON-LD (rich accordion + voice search) on any page
			//   - ogImage: per-page Open Graph image override
			extend: z.object({
				faqs: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
				ogImage: z.string().optional(),
				// diataxis: tipo de documento según Diátaxis (poblado por el auditor / auto-clasificador).
				// Obligatorio para todo doc bajo src/content/docs/ salvo index.mdx, 404.mdx
				// y el locale en/ (en EN es opcional). El schema de Zod no tiene acceso al
				// slug/ruta del entry, así que esa excepción por ruta la aplica el gate
				// determinista (scripts/audit/validate-frontmatter.mjs), no este schema.
				diataxis: z.enum(['tutorial', 'how-to', 'reference', 'explanation']).optional(),
				// modulo: unidad de producto/negocio a la que pertenece la página.
				// Mismas excepciones de obligatoriedad que diataxis (ver arriba).
				modulo: z.enum(['marketing', 'experience', 'revenue', 'plataforma']).optional(),
				// nivel: plan en el que está disponible la capacidad documentada.
				// Obligatorio cuando modulo !== 'plataforma' (ver gate).
				nivel: z.enum(['basic', 'pro', 'unico']).optional(),
				// sinonimos: términos alternativos por los que un usuario podría buscar
				// esta página; se indexan en el buscador vía PageTitle (data-pagefind-body).
				sinonimos: z.array(z.string()).optional(),
				// canonica: marca la página como la fuente de verdad de su tema cuando
				// existen varias páginas relacionadas (p. ej. tras una fusión de contenido).
				canonica: z.boolean().optional(),
			}),
		}),
	}),
	i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
};
