---
title: Analytics
description: Integra Meta Pixel y Google Analytics para medir el rendimiento de tus comunicaciones
---

Conecta herramientas de analítica para trackear el comportamiento de tus fans y medir la efectividad de tus campañas.

## ¿Por qué configurar analytics?

Las herramientas de analítica te permiten:

- 📊 **Medir conversiones** - Cuántos fans completan acciones (compras, registros)
- 🎯 **Optimizar campañas** - Identifica qué mensajes funcionan mejor
- 👥 **Crear audiencias** - Retargeting en Facebook/Instagram/Google
- 📈 **Entender el funnel** - Desde el email hasta la compra de entrada
- 💰 **Calcular ROI** - Retorno de inversión de cada campaña

## Acceder a configuración de analytics

1. Ve a **Configuración** → **Comunicación** → **Analytics**
2. Verás opciones para Meta Pixel y Google Analytics

## Meta Pixel (Facebook Pixel)

Meta Pixel te permite trackear visitantes en tu sitio y crear audiencias para anuncios en Facebook e Instagram.

### ¿Qué es Meta Pixel?

Un código de seguimiento que se instala en tu sitio web y páginas de Nevent para:
- Trackear conversiones (compras, registros)
- Crear audiencias personalizadas
- Optimizar anuncios de Facebook/Instagram
- Medir el rendimiento de campañas

### Requisitos previos

1. **Meta Business Manager**
   - Crear cuenta en [business.facebook.com](https://business.facebook.com)

2. **Crear un Pixel**
   - En Business Manager → Eventos → Pixels
   - Crear nuevo pixel
   - Copiar el ID del pixel

### Configurar Meta Pixel en Nevent

1. Copia el **ID de tu Pixel** (ejemplo: `1234567890123456`)
2. Ve a **Configuración** → **Comunicación** → **Analytics**
3. Pega el ID en el campo **Meta Pixel ID**
4. Haz clic en **Guardar**

**¿Dónde encontrar el Pixel ID?**

1. Ve a [business.facebook.com](https://business.facebook.com)
2. Selecciona tu cuenta de negocio
3. Ve a **Eventos** → **Fuentes de datos** → **Pixels**
4. Copia el número de 16 dígitos

**Formato del Pixel ID:**
```
1234567890123456
```

### Qué trackea Meta Pixel

Una vez configurado, el pixel automáticamente trackea:

**Eventos estándar:**
- `PageView` - Visitas a páginas de eventos
- `ViewContent` - Visualización de detalles de evento
- `AddToCart` - Añadir entrada al carrito
- `InitiateCheckout` - Inicio del proceso de compra
- `Purchase` - Compra completada

**Eventos personalizados:**
- `RegistrationComplete` - Registro en formulario
- `NewsletterSubscribe` - Suscripción a newsletter
- `EventAttendance` - Confirmación de asistencia

### Usar Meta Pixel para retargeting

**Crear audiencias personalizadas:**

1. **Visitantes de la página de evento**
   - Audience: "Visitaron /events/ en los últimos 30 días"
   - Uso: Retargeting en Facebook/Instagram

2. **Abandonaron el carrito**
   - Audience: "Iniciaron checkout PERO NO compraron"
   - Uso: Anuncio recordatorio con oferta

3. **Compradores de entradas**
   - Audience: "Completaron Purchase en los últimos 90 días"
   - Uso: Upsell de merchandising, VIP upgrades

4. **Lookalike audiences**
   - Audience: Similar a tus compradores
   - Uso: Encontrar nuevos fans con perfil similar

### Mejores prácticas

**Verifica que el pixel funciona:**
1. Instala [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/) (extensión Chrome)
2. Visita una página de evento de Nevent
3. El helper te mostrará si el pixel está activo

**Espera suficiente volumen:**
- Para crear audiencias efectivas, necesitas mínimo 100 eventos
- Para lookalike audiences, mínimo 1,000 usuarios

**Cumple con RGPD:**
- Informa a los usuarios sobre cookies
- Permite opt-out
- Nevent incluye banner de cookies automáticamente

## Google Analytics

Google Analytics te permite medir tráfico, comportamiento y conversiones en tus páginas de Nevent.

### ¿Qué es Google Analytics?

Herramienta gratuita de Google para analizar:
- Tráfico de visitantes (origen, dispositivo, ubicación)
- Comportamiento en el sitio (páginas vistas, tiempo)
- Conversiones (compras, registros)
- Embudos de conversión

### Requisitos previos

1. **Cuenta de Google Analytics**
   - Crear cuenta en [analytics.google.com](https://analytics.google.com)

2. **Crear una propiedad**
   - Configurar nueva propiedad para tu sitio
   - Obtener el Measurement ID (GA4) o Tracking ID (Universal Analytics)

### Configurar Google Analytics en Nevent

**Opción 1: Google Analytics 4 (GA4) - Recomendado**

1. Copia tu **Measurement ID** (formato: `G-XXXXXXXXXX`)
2. Ve a **Configuración** → **Comunicación** → **Analytics**
3. Pega el ID en el campo **Google Analytics 4 ID**
4. Haz clic en **Guardar**

**¿Dónde encontrar el Measurement ID?**

1. Ve a [analytics.google.com](https://analytics.google.com)
2. Selecciona tu propiedad
3. Ve a **Administrar** → **Flujos de datos**
4. Selecciona tu flujo de datos web
5. Copia el **ID de medición** (empieza con `G-`)

**Formato del Measurement ID:**
```
G-ABC123XYZ
```

**Opción 2: Universal Analytics (Legacy)**

1. Copia tu **Tracking ID** (formato: `UA-XXXXXXXXX-X`)
2. Pégalo en el campo **Universal Analytics ID**

:::note[Google Analytics 4 vs Universal]
Universal Analytics dejó de procesar datos en julio 2023. Usa Google Analytics 4 (GA4) para nuevas integraciones.
:::

### Qué trackea Google Analytics

**Métricas automáticas:**
- Sesiones y usuarios
- Páginas vistas
- Tasa de rebote
- Tiempo en página
- Fuente de tráfico (email, social, directo)

**Eventos personalizados:**
- `view_event` - Visualización de evento
- `add_to_cart` - Añadir entrada al carrito
- `begin_checkout` - Inicio de compra
- `purchase` - Compra completada
- `newsletter_signup` - Suscripción

**Parámetros de eventos:**
- `event_name` - Nombre del evento
- `event_date` - Fecha del evento
- `ticket_type` - Tipo de entrada
- `value` - Valor de la transacción
- `currency` - Moneda (EUR)

### Configurar objetivos y conversiones

**En Google Analytics:**

1. Ve a **Administrar** → **Conversiones** (GA4)
2. Haz clic en **Nuevo evento de conversión**
3. Introduce el nombre del evento: `purchase`
4. Guarda

**Objetivos comunes:**

- **Compra de entrada:** Evento `purchase`
- **Registro completado:** Evento `newsletter_signup`
- **Añadido al carrito:** Evento `add_to_cart`

### Analizar el funnel de conversión

**Crear informe de embudo:**

1. Ve a **Explorar** → **Análisis de embudo**
2. Define los pasos:
   - Paso 1: `view_event` (Vio el evento)
   - Paso 2: `add_to_cart` (Añadió al carrito)
   - Paso 3: `begin_checkout` (Inició compra)
   - Paso 4: `purchase` (Completó compra)

**Insights útiles:**
- ¿Dónde abandonan más usuarios?
- ¿Cuál es la tasa de conversión en cada paso?
- ¿Qué fuente de tráfico convierte mejor?

### Mejores prácticas

**Configura filtros:**
- Excluye tráfico interno (tu equipo)
- Filtra bots y spam

**Define dimensiones personalizadas:**
- Tipo de evento (festival, concierto, club night)
- Categoría musical (techno, indie, pop)
- Tipo de entrada (general, VIP, early bird)

**Configura alertas:**
- Alerta si las conversiones caen > 20%
- Alerta si el tráfico aumenta inusualmente (viral)

## Combinar Meta Pixel + Google Analytics

Usar ambas herramientas te da la visión completa:

**Meta Pixel:**
- ✅ Mejor para retargeting en Facebook/Instagram
- ✅ Crear audiencias personalizadas
- ✅ Optimizar anuncios de pago

**Google Analytics:**
- ✅ Mejor para análisis profundo de comportamiento
- ✅ Informes personalizados y embudos
- ✅ Integración con Google Ads

**Ejemplo de uso combinado:**

1. **Google Analytics:** Identifica que el 60% de visitantes vienen de Instagram
2. **Meta Pixel:** Crea audiencia lookalike de compradores
3. **Facebook Ads:** Lanza campaña dirigida a audiencia lookalike
4. **Google Analytics:** Mide el ROI de la campaña

## Solución de problemas

### Meta Pixel no trackea eventos

**Posibles causas:**

1. **Pixel ID incorrecto**
   - Verifica que copiaste los 16 dígitos correctos
   - Sin espacios ni caracteres extra

2. **Bloqueadores de anuncios**
   - Navegadores o extensiones pueden bloquear el pixel
   - Usa Meta Pixel Helper para verificar

3. **Configuración de cookies**
   - El usuario rechazó cookies de tracking
   - Comportamiento esperado por RGPD

**Solución:**
- Verifica el Pixel ID en Meta Events Manager
- Comprueba que los eventos aparecen en tiempo real
- Espera 24-48h para que los datos se procesen

### Google Analytics no muestra datos

**Posibles causas:**

1. **ID incorrecto**
   - Verifica formato: `G-XXXXXXXXXX` (GA4)
   - O `UA-XXXXXXXXX-X` (Universal)

2. **Propiedad en pausa**
   - Verifica que la propiedad esté activa en GA

3. **Filtros demasiado restrictivos**
   - Revisa filtros en la configuración de vistas

**Solución:**
- Usa Google Tag Assistant para verificar instalación
- Comprueba en **Tiempo real** que aparecen visitas
- Espera 24-48h para informes completos

### Los datos no coinciden entre herramientas

**Es normal:** Meta Pixel y Google Analytics usan metodologías diferentes.

**Diferencias comunes:**
- Definición de "sesión" vs "usuario"
- Ventana de atribución diferente
- Bloqueadores afectan diferente a cada herramienta

**Solución:**
- Usa cada herramienta para su propósito específico
- No esperes números idénticos
- Enfócate en tendencias, no en valores absolutos

## Privacidad y cumplimiento

### RGPD y consentimiento

Nevent cumple automáticamente con RGPD:
- Banner de cookies en primera visita
- Opt-out disponible
- Pixel/Analytics solo se cargan tras consentimiento

### Anonimización de IPs

**Google Analytics:**
- GA4 anonimiza IPs automáticamente
- No requiere configuración adicional

**Meta Pixel:**
- Usa datos agregados y anónimos
- Cumple con normativa europea

### Política de privacidad

Asegúrate de que tu política de privacidad mencione:
- Uso de cookies de terceros (Meta, Google)
- Propósito del tracking (analítica, publicidad)
- Cómo darse de baja
- Derechos ARCO (acceso, rectificación, cancelación, oposición)

## Límites

- **Meta Pixel:** Sin límite de eventos
- **Google Analytics 4:** 10M eventos/mes (plan gratuito)
- **Universal Analytics:** Sin límite de eventos (obsoleto)

:::tip[Escala sin problemas]
Incluso festivales grandes con 100K+ visitantes/mes están dentro de los límites gratuitos de GA4.
:::
