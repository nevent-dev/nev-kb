# 🚀 Guía de Deployment - NevKB

Este documento explica cómo deployar NevKB a producción.

---

## ✅ Pre-requisitos

Antes de deployar, asegúrate de que:

- [x] Build local exitoso (`npm run build`)
- [x] Preview funciona correctamente (`npm run preview`)
- [x] Todos los artículos tienen frontmatter válido
- [x] No hay errores de MDX parsing
- [x] Git repository actualizado

---

## 🌐 Opción 1: Netlify (Recomendado)

### Paso 1: Preparar Repository

```bash
# Si aún no tienes git repo:
git init
git add .
git commit -m "Initial commit: Starlight KB setup"

# Crear repo en GitHub y push
git remote add origin https://github.com/tu-usuario/nev-kb.git
git branch -M main
git push -u origin main
```

### Paso 2: Deploy en Netlify

1. **Ir a Netlify**: https://app.netlify.com
2. **New site from Git**
3. **Conectar GitHub** y selecciona `nev-kb`
4. **Build settings**:
   ```yaml
   Build command: npm run build
   Publish directory: docs/dist
   ```
5. **Deploy site** ✅

### Paso 3: Configurar Dominio

1. **Domain settings** → **Add custom domain**
2. Ingresa: `kb.nevent.com`
3. **DNS Configuration**:
   - Agrega CNAME record en tu DNS provider:
   ```
   Type: CNAME
   Name: kb
   Value: [tu-site].netlify.app
   ```
4. **HTTPS/SSL**: Auto-configurado por Netlify ✅

### Build Settings Avanzados

```yaml
# netlify.toml (crear en root del proyecto)
[build]
  command = "cd docs && npm install && npm run build"
  publish = "docs/dist"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/docs/*"
  to = "/:splat"
  status = 301
```

---

## ⚡ Opción 2: Vercel

### Paso 1: Deploy desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd /Users/samu/workspace/nevent/nev-kb/docs
vercel --prod
```

### Paso 2: Configuración

Cuando Vercel pregunte:

```
? Set up and deploy? [Y/n] y
? Which scope? Tu equipo
? Link to existing project? [y/N] n
? What's your project's name? nev-kb
? In which directory is your code located? ./
? Override build command? [y/N] n
? Override output directory? [y/N] n
```

Vercel detectará Astro automáticamente.

### Paso 3: Dominio Custom

```bash
vercel domains add kb.nevent.com
```

Sigue instrucciones para configurar DNS.

---

## 🐳 Opción 3: Docker + cualquier hosting

### Dockerfile

Crear `Dockerfile` en `/Users/samu/workspace/nevent/nev-kb/docs/`:

```dockerfile
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Build y Deploy

```bash
# Build image
docker build -t nev-kb:latest .

# Test local
docker run -p 8080:80 nev-kb:latest

# Push to registry (ej: Docker Hub)
docker tag nev-kb:latest tu-usuario/nev-kb:latest
docker push tu-usuario/nev-kb:latest

# Deploy en tu servidor favorito (AWS ECS, DigitalOcean, etc)
```

---

## 📊 Post-Deployment Checklist

### Verificaciones Inmediatas

```bash
# 1. Check sitemap
curl https://kb.nevent.com/sitemap-index.xml

# 2. Check homepage
curl -I https://kb.nevent.com
# Expect: 200 OK

# 3. Check search
curl https://kb.nevent.com/pagefind/pagefind.js
# Should return JS file

# 4. Check article
curl https://kb.nevent.com/campaigns/crear-primera-campana/
# Should return HTML
```

### SEO Setup

**Google Search Console**:
1. Ir a: https://search.google.com/search-console
2. Add property: `kb.nevent.com`
3. Verify ownership (HTML tag method)
4. Submit sitemap: `https://kb.nevent.com/sitemap-index.xml`

**robots.txt** (crear en `public/robots.txt`):
```
User-agent: *
Allow: /
Sitemap: https://kb.nevent.com/sitemap-index.xml
```

### Analytics Setup

**Opción A: Google Analytics**

1. Crear property en GA4
2. Agregar script en `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      // ... existing config
      head: [
        {
          tag: 'script',
          attrs: {
            async: true,
            src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX',
          },
        },
        {
          tag: 'script',
          content: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `,
        },
      ],
    }),
  ],
});
```

**Opción B: Plausible (Privacy-friendly)**

```javascript
head: [
  {
    tag: 'script',
    attrs: {
      defer: true,
      'data-domain': 'kb.nevent.com',
      src: 'https://plausible.io/js/script.js',
    },
  },
],
```

---

## 🔄 CI/CD Setup (GitHub Actions)

Crear `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install dependencies
        working-directory: ./docs
        run: npm ci

      - name: Build
        working-directory: ./docs
        run: npm run build

      - name: Deploy to Netlify
        uses: nwtgck/actions-netlify@v2
        with:
          publish-dir: './docs/dist'
          production-branch: main
          github-token: ${{ secrets.GITHUB_TOKEN }}
          deploy-message: "Deploy from GitHub Actions"
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

**Setup Secrets**:
1. GitHub repo → Settings → Secrets
2. Add:
   - `NETLIFY_AUTH_TOKEN` (from Netlify → User Settings → Applications)
   - `NETLIFY_SITE_ID` (from Netlify → Site Settings → Site ID)

---

## 🎯 Performance Optimization

### Enable Compression

**Netlify** (automático):
- Gzip/Brotli enabled by default ✅

**Vercel** (automático):
- Compression enabled ✅

**Nginx** (si self-hosted):

```nginx
# /etc/nginx/nginx.conf
gzip on;
gzip_vary on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml+rss;
gzip_min_length 1000;

# Cache static assets
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### CDN Setup

**Cloudflare** (recomendado para custom domain):

1. Agregar `kb.nevent.com` a Cloudflare
2. DNS → CNAME → apuntar a Netlify/Vercel
3. **SSL/TLS** → Full (strict)
4. **Speed** → Optimization → Auto Minify (JS, CSS, HTML)
5. **Caching** → Configuration:
   ```
   Browser Cache TTL: 4 hours
   ```

---

## 🔐 Security Headers

**Netlify** (`netlify.toml`):

```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' https://plausible.io; style-src 'self' 'unsafe-inline';"
```

---

## 📈 Monitoring

### Uptime Monitoring

**UptimeRobot** (gratis):
1. Ir a: https://uptimerobot.com
2. Add Monitor:
   - Type: HTTP(s)
   - URL: https://kb.nevent.com
   - Interval: 5 minutes
3. Setup alerts (email/Slack)

### Error Tracking

**Sentry** (opcional):

```bash
npm install @sentry/astro
```

```javascript
// astro.config.mjs
import sentry from '@sentry/astro';

export default defineConfig({
  integrations: [
    sentry({
      dsn: 'YOUR_SENTRY_DSN',
      environment: 'production',
    }),
    starlight({...}),
  ],
});
```

---

## 🚨 Rollback Strategy

### Netlify

```bash
# Ver deploys anteriores
netlify deploy:list

# Rollback a deploy anterior
netlify deploy:rollback --site-id=YOUR_SITE_ID --deploy-id=PREVIOUS_DEPLOY_ID
```

### Vercel

```bash
# Ver deployments
vercel ls

# Promote anterior deployment a producción
vercel promote [deployment-url] --prod
```

### Git-based

```bash
# Revertir último commit
git revert HEAD
git push origin main

# CI/CD auto-deploya la versión anterior
```

---

## 🎉 Deployment Completo

Una vez deployado, verifica:

- ✅ **Homepage**: https://kb.nevent.com
- ✅ **Search**: Funciona en /search
- ✅ **Sitemap**: https://kb.nevent.com/sitemap-index.xml
- ✅ **SSL**: Candado verde en browser
- ✅ **Performance**: Lighthouse score >90
- ✅ **Mobile**: Responsive design funciona
- ✅ **Analytics**: Tracking activo

---

## 📞 Troubleshooting

### Build falla en Netlify

**Error**: `Module not found`
**Solución**:
```bash
# Verificar package.json tiene todas las deps
npm install
npm run build  # Test local primero
```

### 404 en rutas

**Causa**: SPA fallback no configurado
**Solución**: Agregar a `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/404.html"
  status = 404
```

### Search no funciona

**Causa**: Pagefind no se generó
**Solución**:
- Verificar que `pagefind: true` en astro.config.mjs
- Check que build completo corrió (no preview)

---

**Última actualización**: 30 Diciembre 2025
**Tiempo estimado de deployment**: 5-10 minutos (Netlify/Vercel)
