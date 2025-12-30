---
title: Campañas de Marketing
description: Comunicación multicanal con Email, SMS, WhatsApp y Push - Manual o con asistente IA.
---

Crea y gestiona campañas de comunicación multicanal para llegar a tu audiencia.

## En esta sección

- **Creación manual**: Wizard paso a paso para configurar campañas
- **Asistente IA**: Generación automática de contenido con inteligencia artificial
- **Canales soportados**: Email, SMS, WhatsApp, Push Notifications
- **Programación**: Envío inmediato, programado o recurrente
- **Segmentación**: Envía a múltiples segmentos de audiencia
- **Personalización**: Variables dinámicas por cada usuario
- **A/B Testing**: Prueba variantes de contenido
- **Analytics en tiempo real**: Opens, clicks, conversiones
- **Magic Links**: URLs con tracking personalizado por usuario
- **Gestión de estados**: Borrador, programada, enviando, completada

## Tipos de campaña

### Email
- Asunto y preview text
- Remitente personalizado
- Plantilla MJML responsive
- Adjuntos (hasta 10MB)
- Tracking de aperturas y clicks
- UTM automáticos

### SMS
- Remitente alfanumérico
- Texto plano (160 caracteres)
- Links acortados con tracking
- Confirmación de entrega

### WhatsApp
- Template pre-aprobado por Meta
- Botones interactivos
- Medios (imagen/video/PDF)
- Respuestas rápidas
- Estado de lectura

### Push Notification
- Título y mensaje
- Deep links
- Imagen/icono
- Acciones personalizadas
- Segmentación por plataforma (iOS/Android/Web)

## Flujo de creación

### 1. Elige el canal
Selecciona Email, SMS, WhatsApp o Push

### 2. Define tu audiencia
- Selecciona segmentos existentes
- Crea un nuevo segmento
- Excluye segmentos (ej: ya compraron)

### 3. Diseña el contenido
- Usa plantillas existentes o crea nueva
- Personaliza con variables
- Añade CTAs y links con tracking

### 4. Configura envío
- **Inmediato**: Envía ahora mismo
- **Programado**: Fecha y hora específica
- **Recurrente**: Diario, semanal, mensual

### 5. Revisa y lanza
- Preview de contenido
- Tamaño de audiencia estimado
- Test de envío (a ti mismo)
- Confirma y lanza

## Asistente IA

### ¿Qué hace?
El asistente de campañas usa IA para:
- Generar asuntos llamativos
- Escribir contenido del email/SMS
- Sugerir emojis apropiados
- Optimizar para conversión
- Adaptar tono según audiencia

### Cómo usarlo
1. Describe tu campaña ("Anuncio de lineup del festival")
2. Selecciona tono (formal/casual/entusiasta)
3. Revisa y edita el contenido generado
4. Aplica a tu campaña

### Prompts configurables
Personaliza el comportamiento del asistente en `/campaigns/email-prompt-config`

## Analytics de campaña

### Métricas clave

**Email**:
- 📧 Enviados
- ✅ Entregados (delivery rate)
- 👁️ Abiertos (open rate)
- 🖱️ Clicks (click rate)
- ❌ Bounces (bounce rate)
- 🚫 Desuscripciones (unsub rate)

**SMS**:
- 📱 Enviados
- ✅ Entregados
- 💬 Respuestas

**WhatsApp**:
- 📩 Enviados
- ✅ Entregados
- 👁️ Leídos
- 💬 Respuestas

### Tracking de conversiones
- Compras generadas por la campaña
- Revenue total (EUR)
- ROI de la campaña
- Magic links más clickeados

## Magic Links

Enlaces únicos por usuario que:
- Contienen parámetros encriptados
- Identifican automáticamente al usuario
- Permiten acciones sin login
- Trackean conversiones

Ejemplo: `https://tuevento.com/comprar?ml=xYz123...`
