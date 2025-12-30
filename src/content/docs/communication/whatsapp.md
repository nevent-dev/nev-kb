---
title: WhatsApp
description: Configura WhatsApp Business para comunicarte con tus fans
---

Conecta tu cuenta de WhatsApp Business para enviar confirmaciones, recordatorios y mensajes personalizados directamente a WhatsApp.

## ¿Qué es el canal WhatsApp?

WhatsApp Business te permite comunicarte con tus fans en la app de mensajería más usada del mundo.

**Ventajas de WhatsApp:**
- 💚 **Alta confianza** - Tus fans ya usan WhatsApp diariamente
- 📸 **Contenido rico** - Envía imágenes, videos, PDFs, ubicaciones
- 💬 **Conversacional** - Comunicación bidireccional en tiempo real
- ✅ **Confirmaciones instantáneas** - Entradas, confirmaciones de asistencia
- 🌍 **Global** - 2 mil millones de usuarios activos

**Ideal para:**
- Confirmaciones de compra de entradas
- Recordatorios de eventos con ubicación del venue
- Atención al cliente en tiempo real
- Envío de entradas digitales (QR, PDF)
- Actualizaciones de última hora

## Requisitos previos

Antes de configurar WhatsApp en Nevent, necesitas:

1. **Cuenta de WhatsApp Business**
   - Crear una cuenta en [business.whatsapp.com](https://business.whatsapp.com)
   - Verificar tu número de teléfono de empresa

2. **Meta Business Manager**
   - Tener una cuenta en [business.facebook.com](https://business.facebook.com)
   - Vincular tu WhatsApp Business a Meta Business Manager

3. **Número de teléfono dedicado**
   - Un número que no esté siendo usado en WhatsApp personal
   - Puede ser un móvil o un número VoIP

:::caution[Número dedicado requerido]
No puedes usar el mismo número para WhatsApp personal y WhatsApp Business API. Necesitas un número diferente.
:::

## Acceder a configuración WhatsApp

1. Ve a **Configuración** → **Comunicación** → **WhatsApp**
2. Verás el estado de tu integración

## Configurar WhatsApp en Nevent

### Paso 1: Conectar tu cuenta

1. Haz clic en **Conectar WhatsApp Business**
2. Inicia sesión con tu cuenta de Meta Business Manager
3. Autoriza a Nevent a acceder a tu cuenta de WhatsApp
4. Selecciona el número de teléfono que quieres usar

### Paso 2: Seleccionar número

Si tienes múltiples números en tu cuenta de WhatsApp Business:

1. Verás un selector con todos tus números
2. Selecciona el número que quieres usar para Nevent
3. Haz clic en **Confirmar**

**Formato del número:**
```
+34 600 123 456
```

### Paso 3: Verificar plantillas

WhatsApp requiere que uses **plantillas pre-aprobadas** para mensajes proactivos.

**Nevent incluye plantillas estándar:**
- ✅ Confirmación de compra
- ✅ Recordatorio de evento (24h antes)
- ✅ Envío de entrada digital
- ✅ Cambio de horario/ubicación
- ✅ Bienvenida a nuevo fan

**Estado de plantillas:**
1. Ve a **Plantillas de WhatsApp** en la misma pantalla
2. Verás el estado de cada plantilla:
   - 🟢 **Aprobada** - Lista para usar
   - 🟡 **En revisión** - Meta está revisando
   - 🔴 **Rechazada** - Necesita modificación

:::note[Aprobación de plantillas]
Meta revisa las plantillas en 24-48 horas. No podrás enviar mensajes proactivos hasta que al menos una plantilla esté aprobada.
:::

### Paso 4: Configurar respuestas automáticas (opcional)

Configura mensajes automáticos para cuando tus fans te escriban:

**Mensaje de bienvenida**
Se envía cuando alguien te escribe por primera vez.

**Ejemplo:**
```
¡Hola! 👋 Gracias por contactar con Festival Sónar.
¿En qué podemos ayudarte?

1️⃣ Información sobre entradas
2️⃣ Ubicación y horarios
3️⃣ Otro tema

Responde con el número de tu consulta.
```

**Mensaje fuera de horario**
Se envía cuando escriben fuera de tu horario de atención.

**Ejemplo:**
```
Gracias por tu mensaje. Nuestro horario de atención
es de Lunes a Viernes, 10:00-18:00h.

Te responderemos lo antes posible en horario laboral.

Para consultas urgentes: hola@festivalsonar.com
```

## Usar WhatsApp en campañas

Una vez configurado, podrás usar WhatsApp en:

### Mensajes automáticos

**Confirmación de compra:**
```
¡Hola {{nombre}}! ✅

Tu entrada para {{evento}} ha sido confirmada.

📅 Fecha: {{fecha}}
🕐 Hora: {{hora}}
📍 Lugar: {{ubicacion}}

Descarga tu entrada: {{link_entrada}}

¡Nos vemos! 🎵
```

**Recordatorio 24h antes:**
```
¡Hola {{nombre}}! ⏰

Te recordamos que mañana es {{evento}}.

🕐 Puertas: {{hora_apertura}}
📍 {{direccion_venue}}

Ver ubicación: {{mapa}}

¿Listo para la mejor noche? 🔥
```

### Campañas manuales

Crea campañas de WhatsApp desde el módulo de Campañas:

1. Ve a **Campañas** → **Crear campaña**
2. Selecciona **WhatsApp** como canal
3. Elige una plantilla aprobada
4. Personaliza con variables
5. Selecciona tu audiencia
6. Envía o programa

:::tip[Personalización]
Usa variables como `{{nombre}}`, `{{evento}}`, `{{fecha}}` para personalizar cada mensaje.
:::

## Mejores prácticas

### Respeta las normas de WhatsApp

**Permitido:**
- ✅ Confirmaciones transaccionales
- ✅ Recordatorios de eventos comprados
- ✅ Atención al cliente solicitada
- ✅ Actualizaciones sobre compras

**Prohibido:**
- ❌ Spam o mensajes no solicitados
- ❌ Contenido engañoso
- ❌ Cadenas de mensajes
- ❌ Compartir el número del cliente sin permiso

### Obtén consentimiento explícito

Antes de enviar mensajes de WhatsApp, asegúrate de que el fan:
- Ha dado consentimiento para recibir mensajes en WhatsApp
- Ha proporcionado su número voluntariamente
- Puede optar por no recibirlos (opt-out)

Nevent gestiona el consentimiento automáticamente en formularios de registro.

### Usa plantillas aprobadas

**Estructura de una buena plantilla:**

1. **Saludo personalizado:** "Hola {{nombre}}"
2. **Contexto claro:** "Tu entrada para {{evento}}"
3. **Información relevante:** Fecha, hora, ubicación
4. **Call-to-action:** Link o acción esperada
5. **Despedida de marca:** "¡Nos vemos! - Festival Sónar"

### Mantén conversaciones humanas

Cuando respondas manualmente:
- Usa un tono conversacional
- Responde rápido (ideal < 1 hora)
- Usa emojis con moderación
- Sé útil y resolutivo

### Envía contenido multimedia

Aprovecha las capacidades de WhatsApp:
- 🎫 **PDFs:** Entradas, programas, guías
- 🗺️ **Ubicaciones:** Pin del venue
- 📸 **Imágenes:** Cartel del evento, map del recinto
- 🎬 **Videos:** Aftermovie, teaser del evento

## Estadísticas y métricas

En **Campañas** → **Estadísticas** podrás ver:

- **Enviados:** Mensajes enviados con éxito
- **Entregados:** Mensajes que llegaron al móvil del fan
- **Leídos:** Mensajes abiertos (si el fan tiene confirmaciones de lectura activadas)
- **Respondidos:** Fans que respondieron al mensaje
- **Errores:** Mensajes que no se pudieron entregar

## Solución de problemas

### No puedo conectar mi cuenta de WhatsApp

**Posibles causas:**

1. **No tienes WhatsApp Business API**
   - Solución: Crea una cuenta en [business.whatsapp.com](https://business.whatsapp.com)
   - WhatsApp normal o WhatsApp Business app NO funcionan

2. **No eres administrador de Meta Business Manager**
   - Solución: Pide permisos de administrador a quien gestione la cuenta

3. **El número ya está en uso**
   - Solución: Desvincúlalo de WhatsApp personal primero

### Las plantillas están en estado "Rechazada"

**Causas comunes:**

1. **Contenido promocional agresivo**
   - Evita: "COMPRA AHORA", "OFERTA LIMITADA", "DESCUENTO"
   - Usa: Lenguaje informativo y transaccional

2. **Variables incorrectas**
   - Todas las variables deben tener ejemplos
   - Ejemplo: `{{nombre}}` → Ejemplo: "Juan"

3. **Formato incorrecto**
   - Usa saltos de línea
   - No uses MAYÚSCULAS excesivas
   - Máximo 1024 caracteres

**Solución:**
1. Edita la plantilla siguiendo las normas
2. Reenvía para revisión
3. Espera 24-48h para nueva revisión

### Los mensajes no se entregan

**Posibles causas:**

1. **Número incorrecto o inválido**
   - Verifica formato internacional: `+34600123456`
   - Confirma que el número tiene WhatsApp activo

2. **El fan te bloqueó**
   - Los mensajes no se entregan si te bloquean
   - Métrica: Aparecerá como "Error: Usuario bloqueó la cuenta"

3. **Límite de mensajes alcanzado**
   - WhatsApp limita mensajes según tu tier
   - Tier 1: 1,000 mensajes únicos/24h
   - Tier 2: 10,000 mensajes únicos/24h
   - Contacta a soporte para aumentar tier

### No recibo respuestas de fans

**Causa:** Las respuestas llegan a tu bandeja de WhatsApp Business Manager, no a Nevent.

**Solución:**
1. Configura notificaciones en Meta Business Manager
2. O integra el buzón de WhatsApp con tu CRM
3. Próximamente: Nevent tendrá bandeja de entrada integrada

## Límites y restricciones

### Límites de Meta

- **Ventana de conversación:** 24 horas desde última interacción del fan
- **Mensajes proactivos:** Requieren plantillas aprobadas
- **Mensajes iniciados por el fan:** Texto libre durante 24h
- **Tier inicial:** 1,000 conversaciones únicas/día

### Costes

WhatsApp cobra por **conversaciones**, no por mensajes:

- **Conversación iniciada por empresa:** ~0.04€ (varía por país)
- **Conversación iniciada por cliente:** Gratis
- **Ventana de 24h:** Mensajes múltiples = 1 conversación

**Ejemplos:**

1. Envías recordatorio → Fan responde → Tú respondes
   - **Coste:** 1 conversación iniciada por empresa

2. Fan te escribe → Tú respondes
   - **Coste:** 1 conversación iniciada por cliente (gratis)

:::tip[Optimiza costes]
Agrupa comunicaciones en la misma ventana de 24h para pagar solo 1 conversación.
:::

## Seguridad y privacidad

- **End-to-end encryption:** Todos los mensajes están cifrados
- **RGPD compliant:** Cumple con normativa europea de privacidad
- **Opt-out:** Los fans pueden darse de baja en cualquier momento
- **Datos seguros:** Meta y Nevent no leen el contenido de los mensajes

:::caution[Importante]
Nunca solicites información sensible (contraseñas, datos bancarios) por WhatsApp.
:::
