---
title: SMS
description: Activa y configura el canal de mensajería SMS
---

Envía mensajes de texto directamente a los móviles de tus fans para comunicaciones urgentes y recordatorios.

## ¿Qué es el canal SMS?

SMS (Short Message Service) te permite enviar mensajes de texto cortos (hasta 160 caracteres) directamente al teléfono móvil de tus fans.

**Ventajas del SMS:**
- 📱 **98% tasa de apertura** - Se leen en los primeros 3 minutos
- ⚡ **Entrega instantánea** - Llegan en segundos
- 🎯 **Alta conversión** - Ideal para recordatorios de última hora
- 📵 **No requiere internet** - Funciona en cualquier móvil

**Ideal para:**
- Recordatorios de eventos 24h antes
- Alertas de cambios de horario
- Códigos de acceso y confirmaciones
- Ofertas flash con alta urgencia
- Comunicaciones críticas

## Acceder a configuración SMS

1. Ve a **Configuración** → **Comunicación** → **SMS**
2. Activa el toggle **Habilitar SMS**
3. Configura tus opciones

## Configuración disponible

### Habilitar SMS

**Toggle on/off** para activar o desactivar el canal SMS para tu organización.

**Cuando está desactivado:**
- No puedes crear campañas SMS
- No se envían mensajes automáticos por SMS
- Tus créditos SMS no se consumen

**Cuando está activado:**
- Puedes crear campañas SMS
- Puedes enviar mensajes automáticos (recordatorios, confirmaciones)
- Se consumen créditos SMS por cada mensaje enviado

### ID de remitente (Sender ID)

El nombre o número que aparece como remitente del SMS en el móvil del destinatario.

**Opciones:**

1. **Alfanumérico** (recomendado)
   - Formato: Hasta 11 caracteres (letras y números)
   - Ejemplo: `NeventApp`, `FestivalES`, `SalaApolo`
   - **Ventaja:** Profesional y reconocible
   - **Desventaja:** Los destinatarios no pueden responder

2. **Numérico**
   - Formato: Número de teléfono
   - Ejemplo: `+34600123456`
   - **Ventaja:** Los destinatarios pueden responder
   - **Desventaja:** Menos profesional, requiere número dedicado

:::tip[Recomendación]
Usa un Sender ID alfanumérico corto que identifique claramente tu marca. Ejemplo: Si eres "Festival Sónar", usa `Sonar` o `FSonar`.
:::

**Restricciones por país:**
- **España:** Sender ID alfanumérico soportado
- **Otros países:** Algunos países requieren registro previo del Sender ID

### Gestión de créditos

Los mensajes SMS se pagan mediante **créditos pre-pagados**.

**¿Cómo funcionan?**
- 1 crédito = 1 SMS estándar (160 caracteres)
- Mensajes largos consumen múltiples créditos:
  - 161-306 caracteres = 2 créditos
  - 307-459 caracteres = 3 créditos
  - Y así sucesivamente

**Consultar saldo:**
1. Ve a **Configuración** → **Facturación** → **Créditos SMS**
2. Verás tu saldo actual de créditos

**Comprar créditos:**
1. En la misma sección, haz clic en **Comprar créditos**
2. Selecciona el paquete que necesitas
3. Completa el pago

:::caution[Créditos insuficientes]
Si intentas enviar una campaña SMS sin créditos suficientes, recibirás un error. Asegúrate de tener saldo antes de programar campañas.
:::

## Mejores prácticas

### Sé breve y directo

**Límite óptimo:** 160 caracteres (1 crédito)

**Bueno (153 caracteres):**
```
Hola! Mañana es el Festival Sónar.
Puertas: 18:00h. Descarga tu entrada aquí:
https://short.link/abc123
Nos vemos! 🎵
```

**Malo (201 caracteres, 2 créditos):**
```
Hola, te escribimos para recordarte que mañana se celebra
el Festival Sónar en Barcelona. Las puertas se abren a las
18:00 horas. Te recomendamos llegar con tiempo. Puedes
descargar tu entrada en este enlace...
```

### Acorta URLs

Usa servicios de acortado de URLs para ahorrar caracteres:
- Nevent automáticamente acorta URLs en SMS
- Ejemplo: `https://my.nevent.es/event/12345` → `https://nev.nt/a1b2c`

### Usa emojis con moderación

Los emojis pueden consumir más caracteres de lo esperado:
- 1 emoji = 1-2 caracteres (según el emoji)
- Límitate a 1-2 emojis por mensaje

### Incluye identificación

Siempre incluye quién eres al inicio:
- ✅ "Hola! Soy Festival Sónar. Mañana..."
- ✅ "Sala Apolo: Recordatorio de tu..."
- ❌ "Hola! Mañana es tu evento..." (¿quién soy?)

### Timing óptimo

**Mejores momentos para enviar SMS:**
- 10:00 - 13:00 (mañana)
- 17:00 - 20:00 (tarde)

**Evita:**
- ❌ Antes de las 9:00
- ❌ Después de las 22:00
- ❌ Domingos temprano

### Incluye opt-out

Da opción de darse de baja:
```
Responde BAJA para no recibir más SMS
```

:::note[Cumplimiento legal]
En España, necesitas consentimiento explícito para enviar SMS comerciales (RGPD). Nevent gestiona este consentimiento automáticamente en formularios de registro.
:::

## Casos de uso

### Recordatorio de evento 24h antes

```
Hola! Mañana es tu concierto en Sala Apolo
(20:00h). Descarga tu entrada: https://nev.nt/x1y2
¡Te esperamos! 🎸
```

**Consumo:** 1 crédito (134 caracteres)

### Alerta de cambio de horario

```
IMPORTANTE: El concierto de esta noche se
adelanta a las 21:30h (antes 22:00h).
Nos vemos antes! - Festival Sónar
```

**Consumo:** 1 crédito (124 caracteres)

### Código de acceso VIP

```
Tu código VIP para acceso rápido: VIP-8372
Muéstralo en puerta junto a tu entrada.
Sala Apolo
```

**Consumo:** 1 crédito (97 caracteres)

### Oferta flash

```
⚡ FLASH SALE: 2x1 en entradas para el
próximo sábado. Solo hoy hasta las 23:59h.
Compra: https://nev.nt/2x1 - Sónar
```

**Consumo:** 1 crédito (128 caracteres)

## Solución de problemas

### Los SMS no se entregan

**Posibles causas:**

1. **Sin créditos**
   - Verifica tu saldo en Configuración → Facturación
   - Compra créditos si es necesario

2. **Números incorrectos**
   - Verifica que los números tienen formato internacional
   - Ejemplo correcto: `+34600123456`
   - Ejemplo incorrecto: `600123456`

3. **Sender ID no permitido en el país**
   - Algunos países requieren registro previo
   - Contacta a soporte para países específicos

4. **Operador bloqueó el mensaje**
   - Evita palabras spam: "GRATIS", "PREMIO", "GANA"
   - No uses MAYÚSCULAS en exceso

### Los mensajes llegan con caracteres extraños

**Causa:** Uso de caracteres especiales no soportados.

**Solución:**
- Evita: ñ, á, é, í, ó, ú, ¿, ¡ (o usa con moderación)
- Alternativa: usa "n", "a", "e", "i", "o", "u"
- Emojis estándar sí funcionan

### Los destinatarios no pueden responder

**Causa:** Usas Sender ID alfanumérico.

**Solución:**
- Los Sender ID alfanuméricos son "solo envío"
- Si necesitas respuestas, configura un número dedicado
- Contacta a soporte para habilitar número bidireccional

## Límites y costes

### Límites técnicos

- **Longitud máxima:** 918 caracteres (6 SMS concatenados)
- **Tasa de envío:** Hasta 100 SMS/segundo
- **Sender ID alfanumérico:** Máximo 11 caracteres
- **Países soportados:** 200+ países

### Estructura de costes

Los precios varían según el país de destino:

**España:**
- 1 crédito = 0.05€ por SMS

**Otros países:**
- Consulta la tabla de precios en Configuración → Facturación

**Paquetes de créditos:**
- 1,000 créditos: 50€
- 5,000 créditos: 225€ (10% descuento)
- 10,000 créditos: 400€ (20% descuento)

:::tip[Optimiza costes]
Agrupa tus comunicaciones y envía SMS solo para mensajes realmente urgentes. Usa email para contenido informativo extenso.
:::

## Integración con campañas

Una vez habilitado SMS, podrás:

1. **Crear campañas SMS** desde el módulo de Campañas
2. **Automatizaciones SMS** para confirmaciones y recordatorios
3. **Segmentación** para enviar solo a fans que aceptaron SMS
4. **Estadísticas** de entrega, apertura y conversión

Consulta la sección **Campañas** (próximamente documentado) para más detalles.
