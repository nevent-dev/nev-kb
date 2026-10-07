#!/usr/bin/env node
/**
 * audit-links.mjs — auditor determinista de enlaces internos y hreflang sobre
 * el build (dist/). Replica lo que reporta Ahrefs Site Audit:
 *
 *   (a) enlaces internos sin barra final que apuntan a páginas-directorio
 *       (el servidor responde 301 a la versión con barra)
 *   (b) enlaces internos a páginas que no existen (404)
 *   (c) enlaces internos a páginas de redirección (meta refresh de Astro: 3xx)
 *   (d) hreflang que apuntan a una URL inexistente, sin barra final o que no es
 *       auto-canónica (Non_canonical_target / Broken_pages)
 *   (e) hreflang no recíprocos (Incomplete_group)
 *
 * Uso: node scripts/audit-links.mjs [dist] [--json]
 * Sale con código 1 si encuentra cualquier incidencia.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, resolve, extname } from 'node:path';

const SITE = 'https://help.nevent.ai';
const args = process.argv.slice(2);
const distDir = resolve(args.find((a) => !a.startsWith('--')) ?? 'dist');
const asJson = args.includes('--json');

/** Lista recursivamente los ficheros bajo dir. */
function walk(dir) {
	const out = [];
	for (const name of readdirSync(dir)) {
		const p = join(dir, name);
		if (statSync(p).isDirectory()) out.push(...walk(p));
		else out.push(p);
	}
	return out;
}

const files = walk(distDir);
const htmlFiles = files.filter((f) => f.endsWith('.html') && !f.includes('/pagefind/'));
const fileSet = new Set(files.map((f) => f.slice(distDir.length)));

/** Ruta de página ('/a/b/') a partir de un fichero index.html. */
function pageUrlOf(file) {
	const rel = file.slice(distDir.length);
	if (rel === '/404.html') return null;
	return rel.replace(/index\.html$/, '');
}

/** Extrae atributos de una etiqueta. */
function attr(tag, name) {
	const m = tag.match(new RegExp(`\\s${name}="([^"]*)"`));
	return m ? m[1] : null;
}

/** Devuelve el path normalizado de un href interno, o null si es externo. */
function internalPath(href) {
	if (!href || href.startsWith('#') || /^(mailto:|tel:|javascript:|data:)/.test(href)) return null;
	let u = href;
	if (u.startsWith(SITE)) u = u.slice(SITE.length) || '/';
	if (!u.startsWith('/') || u.startsWith('//')) return null;
	return u.split('#')[0].split('?')[0];
}

const pages = new Map(); // url -> { canonical, alternates:[{lang,href}], links:[], redirect }
for (const f of htmlFiles) {
	const url = pageUrlOf(f);
	if (url === null) continue;
	const html = readFileSync(f, 'utf8');
	const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) ?? [])[1] ?? null;
	const redirect = /<meta http-equiv="refresh"/.test(html);
	const alternates = [...html.matchAll(/<link\b[^>]*rel="alternate"[^>]*>/g)]
		.map((m) => m[0])
		.filter((t) => attr(t, 'hreflang'))
		.map((t) => ({ lang: attr(t, 'hreflang'), href: attr(t, 'href') }));
	const links = [...html.matchAll(/<a\b[^>]*\shref="([^"]*)"/g)].map((m) => m[1]);
	pages.set(url, { canonical, alternates, links, redirect });
}

/** ¿Existe el recurso en dist? */
function existsPath(p) {
	if (extname(p)) return fileSet.has(p);
	return fileSet.has(`${p.replace(/\/$/, '')}/index.html`);
}

const issues = { noSlash: [], broken: [], toRedirect: [], hreflangBad: [], hreflangRecip: [] };

for (const [url, page] of pages) {
	if (page.redirect) continue; // las páginas de redirección no cuentan como origen
	for (const href of page.links) {
		const p = internalPath(href);
		if (p === null) continue;
		const isFile = extname(p) !== '';
		if (!isFile && !p.endsWith('/')) {
			if (existsPath(p)) issues.noSlash.push({ from: url, href });
			else issues.broken.push({ from: url, href });
			continue;
		}
		if (!existsPath(p)) {
			issues.broken.push({ from: url, href });
		} else if (!isFile && pages.get(p)?.redirect) {
			issues.toRedirect.push({ from: url, href });
		}
	}

	for (const alt of page.alternates) {
		const t = internalPath(alt.href);
		const problems = [];
		if (t === null) continue;
		if (!alt.href.startsWith(SITE)) problems.push('no absoluta');
		if (!t.endsWith('/')) problems.push('sin barra final');
		const target = pages.get(t.endsWith('/') ? t : `${t}/`);
		if (!target) problems.push('no existe');
		else {
			if (target.redirect) problems.push('es una redirección');
			const selfCanonical = `${SITE}${t.endsWith('/') ? t : `${t}/`}`;
			if (target.canonical !== selfCanonical) problems.push(`canónica distinta (${target.canonical})`);
		}
		if (problems.length) issues.hreflangBad.push({ from: url, lang: alt.lang, href: alt.href, problems });
		else if (alt.lang !== 'x-default') {
			// Reciprocidad: el destino debe listar de vuelta a esta página.
			const back = target.alternates.some((b) => internalPath(b.href) === url);
			if (!back && t !== url) issues.hreflangRecip.push({ from: url, lang: alt.lang, to: t });
		}
	}
}

const summary = {
	pages: pages.size,
	hrefsSinBarraAPaginaDirectorio: issues.noSlash.length,
	enlacesInternosRotos: issues.broken.length,
	enlacesARedireccion: issues.toRedirect.length,
	hreflangInvalidos: issues.hreflangBad.length,
	hreflangNoReciprocos: issues.hreflangRecip.length,
};

if (asJson) console.log(JSON.stringify({ summary, issues }, null, 2));
else {
	console.log(JSON.stringify(summary, null, 2));
	for (const [k, list] of Object.entries(issues)) {
		if (!list.length) continue;
		console.log(`\n## ${k} (${list.length}), primeros 15`);
		for (const i of list.slice(0, 15)) console.log(' ', JSON.stringify(i));
	}
}
process.exit(Object.values(issues).some((l) => l.length) ? 1 : 0);
