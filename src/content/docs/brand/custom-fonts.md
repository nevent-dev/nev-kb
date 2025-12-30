---
title: Fuentes personalizadas
description: Sube y gestiona fuentes custom para usar en tus newsletters y formularios
---

Usa las tipografías oficiales de tu marca en todas las comunicaciones de Nevent.

## ¿Para qué sirven las fuentes personalizadas?

Las fuentes personalizadas te permiten mantener la coherencia visual de tu marca usando las mismas tipografías que usas en tu sitio web, materiales impresos y otros canales.

**Se aplican en:**
- Newsletters por email
- Formularios de registro
- Landing pages de eventos

## Acceder a fuentes personalizadas

1. Ve a **Configuración** → **Fuentes personalizadas**
2. Verás la lista de fuentes actualmente subidas

## Subir una nueva fuente

### Paso 1: Preparar el archivo

**Formatos soportados:**
- `.woff` (Web Open Font Format) - **Recomendado**
- `.woff2` (Web Open Font Format 2) - **Mejor compresión**
- `.ttf` (TrueType Font)
- `.otf` (OpenType Font)

**Tamaño máximo:** 2MB por archivo

:::tip[¿Dónde conseguir archivos de fuente?]
- Si tienes licencia de la fuente, busca los archivos en tu carpeta de fuentes del sistema
- Servicios como Google Fonts ofrecen descargas gratuitas en formato web
- Tu diseñador o agencia debe poder proporcionarte los archivos `.woff` o `.woff2`
:::

### Paso 2: Subir a Nevent

1. Haz clic en **Subir fuente**
2. Introduce el **nombre de la fuente**
   - Ejemplo: "Montserrat Bold", "Helvetica Neue Light"
3. Selecciona el archivo de fuente
4. Haz clic en **Guardar**

### Paso 3: Usar la fuente

Una vez subida, la fuente estará disponible en:
- Editor de newsletters
- Constructor de formularios
- Plantillas de email

## Gestionar fuentes

### Ver fuentes activas

La tabla muestra:
- **Nombre** - Nombre que le diste a la fuente
- **Archivo** - Nombre del archivo subido
- **Tamaño** - Peso del archivo
- **Fecha de subida** - Cuándo se agregó

### Eliminar una fuente

1. Haz clic en el ícono de **papelera** junto a la fuente
2. Confirma la eliminación

:::caution[Contenido existente]
Si eliminas una fuente que está en uso, las newsletters y formularios que la usan volverán a usar la fuente predeterminada.
:::

## Mejores prácticas

### Sube solo las variantes necesarias

No subas toda la familia tipográfica si no la vas a usar. Cada archivo aumenta el peso de tus emails.

**Ejemplo eficiente:**
- ✅ Montserrat Regular (para cuerpo de texto)
- ✅ Montserrat Bold (para títulos)
- ❌ Montserrat Thin, Light, Medium, etc. (si no las usas)

### Usa formatos web optimizados

**Prioridad:**
1. `.woff2` - Menor peso, mejor compresión
2. `.woff` - Buena compatibilidad
3. `.ttf` / `.otf` - Más pesados, úsalos solo si no tienes los otros

### Nombra las fuentes claramente

**Buenos nombres:**
- "Montserrat Bold"
- "Roboto Regular"
- "Futura Medium"

**Malos nombres:**
- "Font1"
- "Nueva"
- "Titulo"

### Considera el peso total

Cada fuente que subas aumenta el tamaño de tus emails. Mantén un balance entre personalización y performance.

**Recomendación:** Máximo 2-3 fuentes personalizadas (una para títulos, una para cuerpo de texto).

## Solución de problemas

### La fuente no se ve en el email

**Posibles causas:**
1. **Cliente de email no soporta fuentes custom**
   - Solución: Nevent automáticamente usa una fuente fallback (Arial, Helvetica)

2. **Archivo corrupto o formato no soportado**
   - Solución: Convierte la fuente a `.woff2` usando un convertidor online

3. **Nombre de fuente con espacios o caracteres especiales**
   - Solución: Renombra sin espacios ni acentos

### El archivo es demasiado grande

**Solución:**
1. Usa un compresor de fuentes online
2. Elimina caracteres que no necesitas (glifos exóticos)
3. Convierte a `.woff2` que tiene mejor compresión

### ¿Qué clientes de email soportan fuentes custom?

**Soporte completo:**
- Apple Mail (iOS, macOS)
- Outlook para Mac
- Thunderbird

**Soporte parcial:**
- Gmail (app móvil)
- Outlook.com

**Sin soporte:**
- Outlook para Windows (usa fuentes del sistema)
- Yahoo Mail

:::note[Fallback automático]
No te preocupes: Nevent configura automáticamente fuentes fallback para clientes que no soportan custom fonts.
:::

## Licencias de fuentes

:::caution[Importante - Licencias]
Asegúrate de tener **licencia para uso web** de las fuentes que subes.

Algunas licencias solo permiten uso en diseño impreso pero no en web. Usar fuentes sin licencia apropiada puede resultar en problemas legales.
:::

**Fuentes con licencia libre:**
- Google Fonts (todas gratuitas y sin restricciones)
- Adobe Fonts (si tienes suscripción Creative Cloud)
- Font Squirrel (marcadas como "Commercial use OK")

**Requieren licencia de pago:**
- Fuentes comerciales de foundries
- Fuentes que vienen con tu software de diseño

**Cuando tengas dudas:** Contacta al proveedor de la fuente para confirmar si puedes usarla en emails.
