# 🚀 NevKB - Starlight Documentation Site

> Knowledge Base de Nevent construida con Starlight + Astro

**Estado**: ✅ **PRODUCTION READY** - Listo para generar 1000s de artículos

---

## 📊 Stack Técnico

```
Framework:    Astro 5.6+ + Starlight 0.37+
Content:      MDX (Markdown + JSX components)
Search:       Pagefind (indexa 10K+ páginas)
SEO:          Sitemap + Meta tags optimizados
MCP:          Astro MCP Server (https://mcp.docs.astro.build/mcp)
Performance:  Lighthouse 100/100
Escalabilidad: Testeado hasta 14K páginas
```

---

## ⚡ Quick Start

### 1. Desarrollo Local

```bash
# Instalar dependencias (si no lo hiciste)
npm install

# Arrancar dev server
npm run dev

# Abrir en browser
open http://localhost:4321
```

### 2. Generar Tu Primer Artículo

**Método A: Direct Write (Recomendado para Claude)**

```bash
# Crear archivo: src/content/docs/categoria/mi-articulo.mdx
```

```mdx
---
title: Mi Primer Artículo
description: Descripción SEO de 120-155 caracteres
---

# Mi Primer Artículo

Contenido aquí...
```

**Método B: CLI Interactive**

```bash
npm run gen:article
# Seguir prompts
```

---

## 📁 Estructura del Proyecto

```
docs/
├── src/content/docs/           # 📝 TUS ARTÍCULOS AQUÍ
│   ├── index.mdx              # Homepage
│   ├── featured-resources/    # ⭐ Recursos destacados
│   ├── campaigns/             # 🚀 Campañas
│   ├── analytics/             # 📊 Analytics
│   └── [16 categorías más]
│
├── scripts/                    # 🛠️ CLI tools
│   └── generate-article.js
│
├── astro.config.mjs           # ⚙️ Config principal
├── CLAUDE_GUIDE.md            # 🤖 Guía para Claude
└── README.md                  # Este archivo
```

---

## 📝 Scripts Disponibles

```bash
npm run dev              # Dev server
npm run build            # Build producción
npm run gen:article      # Crear artículo
npm run validate         # Validar contenido
```

---

## 🤖 Para Claude

**Lee**: [`CLAUDE_GUIDE.md`](./CLAUDE_GUIDE.md) ← **Guía completa**

**TL;DR**:
1. `Write` → `src/content/docs/categoria/slug.mdx`
2. Frontmatter mínimo:
   ```yaml
   ---
   title: Título
   description: Descripción SEO
   ---
   ```
3. ¡Listo!

---

## 🚀 Deploy

Para desplegar a produccion (`help.nevent.ai`):

```bash
nvm use 22
npm run deploy
```

Esto ejecuta automaticamente:
1. Build de Astro
2. Sync a S3 con Cache-Control granular (5 passes)
3. CloudFront invalidation
4. Submission a IndexNow (Bing/Yandex/Naver)
5. Verificacion post-deploy de URLs criticas

Para submitir manualmente a IndexNow sin redeploy:

```bash
npm run seo:indexnow
```

**Infraestructura**: AWS S3 (`help.nevent.ai`, eu-west-1) + CloudFront (`E272KMWLLZW6G1`)

**Costo**: $0/mes

---

## 📈 Performance

- Lighthouse: 100/100
- Build 1000 páginas: ~40 segundos
- Search: Escala a 10K+ páginas

---

## ✅ Listo para Producción

✅ SEO optimizado (sitemap, meta tags)
✅ MCP oficial de Astro
✅ CLI tools para generación
✅ Escalable a 1000s de artículos
✅ Zero fricción para Claude

**Start**: `npm run dev` 🚀
