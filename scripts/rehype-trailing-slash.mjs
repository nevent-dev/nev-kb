/**
 * rehype-trailing-slash.mjs — plugin rehype que añade la barra final a los
 * enlaces internos de los .md/.mdx.
 *
 * Problema: el sitio se sirve como directorios (`/ruta/index.html`) y el CDN
 * responde 301 a `/ruta/` cuando se pide `/ruta`. Los enlaces del contenido se
 * escriben sin barra final (`[texto](/campanas/crear-primera-campana)`), así
 * que cada uno de ellos es un «enlace interno que redirige» para Ahrefs y
 * gasta presupuesto de rastreo. Corregirlo aquí, en el pipeline, evita tocar
 * cientos de ficheros y protege los artículos futuros.
 *
 * Reglas:
 *   - Solo href internos absolutos (`/algo`), no `//host`, no esquemas.
 *   - Se respeta `#ancla` y `?query`: la barra va antes de ambos.
 *   - No se toca nada con extensión de fichero (`/llms.txt`, `/foo.md`, `.pdf`).
 *   - Cubre tanto `<a>` de markdown como `<a>` y `href` de componentes MDX.
 */

const FILE_EXT = /\.[a-z0-9]{1,8}$/i;

/**
 * Devuelve el href con barra final si es un enlace interno a una página.
 * @param {string} href
 * @returns {string}
 */
export function withTrailingSlash(href) {
	if (typeof href !== 'string' || !href.startsWith('/') || href.startsWith('//')) return href;
	const m = href.match(/^([^?#]*)(.*)$/);
	const path = m[1];
	const rest = m[2];
	if (path === '/' || path.endsWith('/') || FILE_EXT.test(path)) return href;
	return `${path}/${rest}`;
}

/** Recorre el árbol hast aplicando fn a cada nodo. */
function walk(node, fn) {
	fn(node);
	if (Array.isArray(node.children)) for (const child of node.children) walk(child, fn);
}

/** @returns {(tree: any) => void} */
export default function rehypeTrailingSlash() {
	return (tree) => {
		walk(tree, (node) => {
			if (node.type === 'element' && node.tagName === 'a' && node.properties?.href) {
				node.properties.href = withTrailingSlash(String(node.properties.href));
			} else if (
				(node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') &&
				Array.isArray(node.attributes)
			) {
				for (const attr of node.attributes) {
					if (attr.type === 'mdxJsxAttribute' && attr.name === 'href' && typeof attr.value === 'string') {
						attr.value = withTrailingSlash(attr.value);
					}
				}
			}
		});
	};
}
