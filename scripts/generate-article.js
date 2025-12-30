#!/usr/bin/env node
/**
 * Script para generar nuevos artículos en NevKB
 * Uso: npm run gen:article
 *
 * Creado para facilitar la generación de contenido por Claude o devs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import slugify from 'slugify';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

// Categorías disponibles
const CATEGORIES = [
  'featured-resources',
  'account-billing',
  'advanced-kdp-marketing-analytics',
  'analytics',
  'audience',
  'campaigns',
  'content',
  'conversations',
  'customer-hub',
  'deliverability-compliance',
  'flows',
  'integrations',
  'reviews',
  'signup-forms',
  'sms',
  'whatsapp',
];

async function generateArticle() {
  console.log('\n🚀 Generador de Artículos NevKB\n');

  // Mostrar categorías
  console.log('Categorías disponibles:');
  CATEGORIES.forEach((cat, idx) => {
    console.log(`  ${idx + 1}. ${cat}`);
  });
  console.log('');

  // Input de usuario
  const categoryIndex = await question('Selecciona categoría (número) [1]: ');
  const category = CATEGORIES[parseInt(categoryIndex || '1') - 1];

  const title = await question('Título del artículo: ');
  const description = await question('Descripción SEO (120-155 chars): ');
  const order = await question('Orden en sidebar (opcional, default: sin orden): ');

  rl.close();

  if (!title || !description) {
    console.error('❌ Error: Título y descripción son obligatorios');
    process.exit(1);
  }

  // Generar slug
  const slug = slugify(title, { lower: true, strict: true });

  // Path del archivo
  const docsPath = path.join(__dirname, '..', 'src', 'content', 'docs');
  const categoryPath = path.join(docsPath, category);
  const filePath = path.join(categoryPath, `${slug}.mdx`);

  // Verificar si existe
  if (fs.existsSync(filePath)) {
    console.error(`❌ Error: Ya existe un artículo en ${filePath}`);
    process.exit(1);
  }

  // Crear directorio si no existe
  fs.mkdirSync(categoryPath, { recursive: true });

  // Generar frontmatter
  let frontmatter = `---
title: ${title}
description: ${description}`;

  if (order) {
    frontmatter += `
sidebar:
  order: ${order}`;
  }

  frontmatter += `
---

# ${title}

## Introducción

[Escribe aquí una breve introducción del tema]

## Contenido Principal

### Sección 1

[Desarrolla el contenido aquí]

### Sección 2

[Más contenido]

## Ejemplos

\`\`\`bash
# Ejemplo de código
comando here
\`\`\`

## Próximos Pasos

- [Artículo relacionado 1](/categoria/articulo-1)
- [Artículo relacionado 2](/categoria/articulo-2)

## Recursos Adicionales

- Link 1
- Link 2

---

💡 **Tip**: [Agrega tips útiles aquí]
`;

  // Escribir archivo
  fs.writeFileSync(filePath, frontmatter, 'utf-8');

  console.log(`\n✅ Artículo creado exitosamente!`);
  console.log(`📁 Ubicación: ${filePath}`);
  console.log(`🌐 URL: /${category}/${slug}`);
  console.log(`\n📝 Ahora edita el archivo para agregar contenido.`);
  console.log(`\n🚀 Ejecuta 'npm run dev' para verlo en el navegador.`);
}

generateArticle().catch(console.error);
