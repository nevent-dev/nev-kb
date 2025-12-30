# 🤖 Guía de Generación de Contenido para Claude

> Esta guía está diseñada específicamente para que Claude Code pueda generar contenido masivamente sin fricción.

---

## 🎯 Quick Start para Claude

### Crear un Nuevo Artículo (Método Directo - Recomendado)

```bash
# 1. Decidir categoría y título
# Categorías disponibles: featured-resources, account-billing, analytics,
# audience, campaigns, content, conversations, customer-hub,
# deliverability-compliance, flows, integrations, reviews,
# signup-forms, sms, whatsapp

# 2. Usar Write tool directamente
# Path: src/content/docs/{categoria}/{slug}.mdx
```

**Template básico**:

```mdx
---
title: Tu Título Aquí
description: Descripción SEO de 120-155 caracteres que aparecerá en Google
---

# Tu Título Aquí

## Introducción

Explicación breve de qué trata el artículo.

## Contenido Principal

### Subsección 1

Contenido aquí...

### Subsección 2

Más contenido...

## Ejemplos Prácticos

\`\`\`bash
# Código de ejemplo
npm install package-name
\`\`\`

## Próximos Pasos

- [Artículo relacionado 1](/categoria/slug-1)
- [Artículo relacionado 2](/categoria/slug-2)

---

💡 **Tip**: Agrega un tip útil aquí.
```

---

## 📁 Estructura de Carpetas

```
src/content/docs/
├── index.mdx                          # Homepage (NO MODIFICAR)
│
├── featured-resources/                # ⭐ Recursos destacados
│   ├── getting-started.mdx
│   └── [tus-articulos].mdx
│
├── account-billing/                   # 💳 Cuentas y facturación
├── advanced-kdp-marketing-analytics/  # 📊 Analytics avanzado
├── analytics/                         # 📈 Análisis y métricas
├── audience/                          # 👥 Gestión de audiencia
├── campaigns/                         # 🚀 Campañas de marketing
├── content/                           # 📝 Gestión de contenido
├── conversations/                     # 💬 Conversaciones
├── customer-hub/                      # 🏢 Customer Hub
├── deliverability-compliance/         # ✅ Deliverability
├── flows/                             # 🔄 Automatizaciones
├── integrations/                      # 🔌 Integraciones
├── reviews/                           # ⭐ Reviews
├── signup-forms/                      # 📋 Formularios
├── sms/                               # 📱 SMS
└── whatsapp/                          # 💚 WhatsApp
```

---

## 🛠️ Métodos de Generación

### Método 1: Write Tool Directo (⚡ MÁS RÁPIDO)

**Cuándo usar**: Cuando generas contenido rápido, conoces la estructura.

```bash
# Paso 1: Decide path
# Ejemplo: src/content/docs/sms/como-crear-campana-sms.mdx

# Paso 2: Usa Write tool con contenido MDX
```

**Ventajas**:
- ✅ Zero overhead
- ✅ Máxima velocidad
- ✅ Control total

---

### Método 2: CLI Interactive (🎯 MÁS GUIADO)

**Cuándo usar**: Cuando quieres validación, helpers, o generación con prompts.

```bash
npm run gen:article
```

**Prompts**:
1. Selecciona categoría (1-16)
2. Título del artículo
3. Descripción SEO
4. Orden en sidebar (opcional)

**Output**: Archivo .mdx creado con template completo.

---

## 📝 Frontmatter Reference

### Mínimo Requerido

```yaml
---
title: Título del Artículo
description: Descripción SEO de 120-155 caracteres
---
```

### Con Todas las Opciones

```yaml
---
title: Título del Artículo
description: Descripción SEO de 120-155 caracteres optimizada para Google

# Orden en sidebar (opcional)
sidebar:
  order: 1  # Menor número = aparece primero
  badge:
    text: 'Nuevo'
    variant: tip  # tip, note, caution, danger, success

# Editar título sidebar (opcional, si quieres que sea diferente)
# sidebar:
#   label: 'Título Corto para Sidebar'

# Plantilla (opcional, solo para páginas especiales)
# template: splash  # Para landing pages tipo homepage
---
```

---

## 🎨 Componentes MDX Disponibles

### Cards (Tarjetas)

```mdx
import { Card, CardGrid } from '@astrojs/starlight/components';

<CardGrid>
  <Card title="Feature 1" icon="rocket">
    Descripción de la feature 1
  </Card>

  <Card title="Feature 2" icon="star">
    Descripción de la feature 2
  </Card>
</CardGrid>
```

**Iconos disponibles**: `rocket`, `star`, `bars`, `document`, `phone`, `comment`, `puzzle`, `setting`, `warning`, `magnifier`, `list-format`, `pencil`, `add-document`, `open-book`

---

### Callouts (Cajas de Advertencia/Tips)

```mdx
:::tip[Consejo Pro]
Este es un tip útil para el usuario.
:::

:::note[Nota]
Información adicional importante.
:::

:::caution[Precaución]
Advertencia sobre algo que debe tener cuidado.
:::

:::danger[Peligro]
Algo crítico que puede romper cosas.
:::
```

---

### Tabs (Pestañas)

```mdx
import { Tabs, TabItem } from '@astrojs/starlight/components';

<Tabs>
  <TabItem label="JavaScript">
    \`\`\`js
    console.log('Hello World');
    \`\`\`
  </TabItem>

  <TabItem label="Python">
    \`\`\`python
    print("Hello World")
    \`\`\`
  </TabItem>
</Tabs>
```

---

### Code Blocks (Bloques de Código)

```mdx
\`\`\`bash
npm install package-name
\`\`\`

\`\`\`javascript title="example.js" {1,3-4}
// Línea destacada
const example = 'value';
// Líneas 3-4 también destacadas
console.log(example);
\`\`\`
```

**Lenguajes soportados**: `bash`, `javascript`, `typescript`, `python`, `json`, `yaml`, `markdown`, `jsx`, `tsx`, `css`, `html`, `sql`, `go`, `rust`, `java`, `php`, `ruby`

---

## 🔗 Links Internos

### Link a Otro Artículo

```mdx
[Texto del link](/categoria/slug-del-articulo)

Ejemplos:
- [Getting Started](/featured-resources/getting-started)
- [Crear Campaña](/campaigns/crear-campana)
- [SMS Setup](/sms/configuracion-inicial)
```

### Link a Sección Específica

```mdx
[Link a sección](#titulo-de-seccion)

# Título de Sección {#titulo-de-seccion}
```

---

## 📊 Mejores Prácticas

### Estructura de Artículo Ideal

```
1. Título H1 (automático desde frontmatter)
2. Introducción breve (1-2 párrafos)
3. Secciones H2 principales
   - Subsecciones H3 cuando sea necesario
   - Subsecciones H4 raramente
4. Ejemplos prácticos (code blocks)
5. Próximos pasos (links relacionados)
6. Tips finales (callout)
```

### SEO

- ✅ **Title**: 50-60 caracteres
- ✅ **Description**: 120-155 caracteres
- ✅ **Keywords**: Incluir naturalmente en contenido
- ✅ **Headings**: Estructura jerárquica (H1 > H2 > H3)
- ✅ **Links internos**: Mínimo 2-3 por artículo
- ✅ **Code examples**: Cuando sea relevante

### Longitud Ideal

- **Artículo corto**: 300-500 palabras
- **Artículo medio**: 500-1000 palabras
- **Artículo largo/guía**: 1000-2000 palabras
- **Tutorial completo**: 2000+ palabras

---

## 🚀 Workflow Recomendado para Generación Masiva

### Opción A: Generar 1 Artículo a la Vez

```bash
1. Decidir tema y categoría
2. Write tool → src/content/docs/categoria/slug.mdx
3. Verificar en browser (npm run dev)
4. Repetir para siguiente artículo
```

### Opción B: Generar Batch de Artículos

```bash
1. Crear lista de títulos y categorías
2. Por cada artículo:
   - Write tool con contenido completo
3. Una vez terminado batch, validar:
   - npm run dev
   - Revisar en browser
```

### Opción C: Usar CLI para Scaffolding

```bash
1. npm run gen:article
2. Llenar prompts
3. Editar archivo generado
4. Repetir
```

---

## 🎯 Templates por Tipo de Contenido

### Template: Tutorial/How-To

```mdx
---
title: Cómo [Hacer Algo]
description: Guía paso a paso para [lograr objetivo] en [tiempo estimado]
---

# Cómo [Hacer Algo]

## ¿Qué Aprenderás?

Al final de esta guía, sabrás cómo:
- Objetivo 1
- Objetivo 2
- Objetivo 3

## Prerrequisitos

- Requisito 1
- Requisito 2

## Paso 1: [Título del Paso]

Descripción detallada...

\`\`\`bash
# Comandos
\`\`\`

## Paso 2: [Siguiente Paso]

...

## Verificación

Cómo verificar que todo funciona correctamente.

## Troubleshooting

### Problema 1
Solución...

### Problema 2
Solución...

## Próximos Pasos

- [Artículo relacionado 1](/path)
- [Artículo relacionado 2](/path)
```

---

### Template: Conceptual/Explicación

```mdx
---
title: Qué es [Concepto]
description: Explicación completa de [concepto] y cómo funciona en Nevent
---

# Qué es [Concepto]

## Introducción

Definición simple en 1-2 líneas.

## ¿Por Qué es Importante?

Explicar el valor y casos de uso.

## Cómo Funciona

Explicación técnica con diagramas si es necesario.

## Casos de Uso

### Caso de Uso 1
...

### Caso de Uso 2
...

## Comparación con Alternativas

| Feature | [Concepto] | Alternativa |
|---------|-----------|-------------|
| ...     | ...       | ...         |

## Mejores Prácticas

1. Práctica 1
2. Práctica 2

## Recursos Relacionados

- [Link 1](/path)
- [Link 2](/path)
```

---

### Template: Reference/Documentación Técnica

```mdx
---
title: [API/Feature] Reference
description: Documentación técnica completa de [API/Feature]
---

# [API/Feature] Reference

## Overview

Descripción breve de qué es y para qué sirve.

## Syntax

\`\`\`typescript
interface Example {
  property: string;
  method(): void;
}
\`\`\`

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `param1`  | string | Yes | Description |
| `param2`  | number | No | Description |

## Return Value

Qué retorna y en qué formato.

## Examples

### Basic Example

\`\`\`javascript
const example = doSomething();
\`\`\`

### Advanced Example

\`\`\`javascript
const advanced = doSomethingComplex({
  option1: true,
  option2: 'value'
});
\`\`\`

## Error Handling

Posibles errores y cómo manejarlos.

## See Also

- [Related API](/path)
- [Related Guide](/path)
```

---

## ⚙️ Scripts Útiles

```bash
# Desarrollo
npm run dev              # Arrancar dev server (puerto 4321)
npm run build            # Build para producción
npm run preview          # Preview del build

# Generación
npm run gen:article      # Generar nuevo artículo (interactive)
npm run validate         # Validar frontmatter de todos los archivos
npm run detect:categories # Detectar categorías nuevas

# Git
git status               # Ver cambios
git add .                # Agregar todos los cambios
git commit -m "add: nuevos articulos de [categoria]"
```

---

## 🐛 Troubleshooting

### Error: "Expected frontmatter"

**Problema**: Falta frontmatter o está mal formateado.

**Solución**: Asegúrate de que el archivo empiece con `---` y tenga `title` y `description`.

---

### Error: "Cannot find module"

**Problema**: Imports incorrectos de componentes.

**Solución**: Verificar imports:
```mdx
import { Card, CardGrid } from '@astrojs/starlight/components';
```

---

### Artículo No Aparece en Sidebar

**Problema**: El artículo existe pero no se ve en el sidebar.

**Solución**:
1. Verificar que está en una carpeta con `autogenerate` en config
2. Verificar que el archivo termina en `.mdx`
3. Verificar que tiene frontmatter válido
4. Restart dev server

---

## 📈 Métricas de Éxito

Al generar contenido, apunta a:

- ✅ **Cobertura**: 30+ artículos en MVP
- ✅ **Calidad**: Lighthouse SEO score 95+
- ✅ **Linkado**: Mínimo 3 links internos por artículo
- ✅ **Ejemplos**: Code blocks cuando sea relevante
- ✅ **Actualización**: Fecha de última modificación clara

---

## 🎉 ¡Listo para Generar!

**Flujo recomendado**:

1. ✅ Lee esta guía completa
2. ✅ Genera tu primer artículo con Write tool
3. ✅ Verifica en `npm run dev` (http://localhost:4321)
4. ✅ Si funciona, continúa generando masivamente
5. ✅ Cada 10-20 artículos, valida que todo se ve bien

**Happy writing! 🚀**
