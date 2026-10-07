import { describe, it, expect } from 'vitest';
import rehypeTrailingSlash, { withTrailingSlash } from './rehype-trailing-slash.mjs';

describe('withTrailingSlash', () => {
	it('añade barra final a rutas internas', () => {
		expect(withTrailingSlash('/campanas/crear-primera-campana')).toBe('/campanas/crear-primera-campana/');
	});
	it('coloca la barra antes de ancla y query', () => {
		expect(withTrailingSlash('/a/b#x')).toBe('/a/b/#x');
		expect(withTrailingSlash('/a/b?q=1#x')).toBe('/a/b/?q=1#x');
	});
	it('no toca raíz, rutas con barra, ficheros, externos ni anclas', () => {
		for (const h of ['/', '/a/', '/llms.txt', '/a/b.md', 'https://x.com/a', '//cdn.x/a', '#ancla', 'mailto:a@b.c']) {
			expect(withTrailingSlash(h)).toBe(h);
		}
	});
});

describe('rehypeTrailingSlash', () => {
	it('reescribe <a> y atributos href de MDX', () => {
		const tree = {
			type: 'root',
			children: [
				{ type: 'element', tagName: 'a', properties: { href: '/x/y' }, children: [] },
				{ type: 'mdxJsxFlowElement', attributes: [{ type: 'mdxJsxAttribute', name: 'href', value: '/p/q' }], children: [] },
			],
		};
		rehypeTrailingSlash()(tree);
		expect(tree.children[0].properties.href).toBe('/x/y/');
		expect(tree.children[1].attributes[0].value).toBe('/p/q/');
	});
});
