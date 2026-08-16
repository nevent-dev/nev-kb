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
				//   'mixed' marca un doc que viola la separación de tipos y debe dividirse.
				diataxis: z
					.enum(['tutorial', 'how-to', 'reference', 'explanation', 'mixed'])
					.optional(),
			}),
		}),
	}),
	i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
};
