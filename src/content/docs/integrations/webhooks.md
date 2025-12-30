---
title: Webhooks
description: Conecta Nevent con cualquier sistema mediante webhooks personalizados
---

Recibe notificaciones en tiempo real cuando ocurren eventos en Nevent para integrar con tus sistemas custom.

## ¿Qué son los webhooks?

Los webhooks son notificaciones HTTP automáticas que Nevent envía a tu servidor cuando ocurre un evento específico.

**Analogía:** Es como dar tu número de teléfono a Nevent para que te llame cuando algo importante suceda, en lugar de tú estar llamando constantemente preguntando "¿pasó algo nuevo?".

**¿Por qué usar webhooks?**

- ⚡ **Tiempo real** - Notificación instantánea cuando ocurre el evento
- 🔧 **Flexible** - Conecta con cualquier sistema que acepte HTTP
- 💰 **Eficiente** - Sin polling constante, ahorra recursos
- 🎯 **Específico** - Recibe solo los eventos que te interesan

**Ideal para:**
- Integrar con sistemas legacy o custom
- Sincronizar con CRMs no soportados nativamente
- Activar procesos internos automáticamente
- Actualizar dashboards en tiempo real
- Enviar notificaciones a Slack, Discord, etc.

## Requisitos previos

Antes de configurar webhooks:

1. **Endpoint HTTPS**
   - Tu servidor debe tener una URL pública accesible
   - **Debe ser HTTPS** (no HTTP)
   - Ejemplo: `https://api.tuorganizacion.com/webhooks/nevent`

2. **Capacidad de recibir POST requests**
   - Tu endpoint debe aceptar requests POST con JSON

3. **Responder rápidamente**
   - Tu endpoint debe responder en menos de 10 segundos
   - Status code 2xx indica éxito

## Configurar webhooks

### Paso 1: Crear endpoint

1. Ve a **Configuración** → **Integraciones** → **Webhooks**
2. Haz clic en **Crear webhook**
3. Completa el formulario:

**URL del webhook:**
```
https://api.tuorganizacion.com/webhooks/nevent
```

**Nombre descriptivo:**
```
Sincronización con CRM
```

**Secret (opcional pero recomendado):**
- Genera un secret aleatorio
- Úsalo para verificar que los requests vienen de Nevent
- Ejemplo: `whsec_k5EKJQnf9sMX2vYzJdHG3L8pR`

### Paso 2: Seleccionar eventos

Elige qué eventos dispararán el webhook:

**Eventos de fans:**
- ✅ `fan.created` - Nuevo fan se registró
- ✅ `fan.updated` - Información de fan actualizada
- ✅ `fan.deleted` - Fan eliminado

**Eventos de compras:**
- ✅ `purchase.completed` - Compra de entrada completada
- ✅ `purchase.refunded` - Compra reembolsada
- ✅ `purchase.cancelled` - Compra cancelada

**Eventos de asistencia:**
- ✅ `attendance.checked_in` - Fan hizo check-in en evento
- ✅ `attendance.checked_out` - Fan hizo check-out

**Eventos de campañas:**
- ✅ `email.sent` - Email enviado
- ✅ `email.opened` - Email abierto
- ✅ `email.clicked` - Link en email clickeado
- ✅ `sms.sent` - SMS enviado
- ✅ `sms.delivered` - SMS entregado

**Eventos de eventos (valga la redundancia):**
- ✅ `event.created` - Nuevo evento creado
- ✅ `event.updated` - Evento actualizado
- ✅ `event.published` - Evento publicado
- ✅ `event.cancelled` - Evento cancelado

### Paso 3: Configurar opciones

**Reintentos automáticos:**
- ✅ Activar para reintentos si tu endpoint falla
- Nevent reintentará: 1min, 5min, 30min, 2h, 6h después

**Batch mode:**
- ✅ Agrupar múltiples eventos en un solo request
- Útil si recibes alto volumen
- Máximo: 100 eventos por batch

**Filtros (opcional):**
- Filtra por evento específico, tipo de fan, etc.
- Ejemplo: Solo purchases > 100€

### Paso 4: Probar webhook

1. Haz clic en **Enviar evento de prueba**
2. Nevent enviará un payload de ejemplo a tu endpoint
3. Verifica que tu servidor lo recibe correctamente
4. Deberías ver status `200 OK` en el log

### Paso 5: Activar

1. Revisa la configuración
2. Haz clic en **Activar webhook**
3. El webhook empezará a recibir eventos en tiempo real

## Estructura del payload

### Headers

Cada request incluye estos headers:

```http
POST /webhooks/nevent HTTP/1.1
Host: api.tuorganizacion.com
Content-Type: application/json
User-Agent: Nevent-Webhooks/1.0
X-Nevent-Signature: t=1640995200,v1=5257a...
X-Nevent-Event: purchase.completed
X-Nevent-Delivery: 01234567-89ab-cdef-0123-456789abcdef
```

**Headers importantes:**
- `X-Nevent-Signature`: Firma HMAC para verificar autenticidad
- `X-Nevent-Event`: Tipo de evento
- `X-Nevent-Delivery`: ID único del delivery (para deduplicación)

### Body (JSON)

**Estructura general:**
```json
{
  "id": "evt_01234567890",
  "type": "purchase.completed",
  "created": 1640995200,
  "data": {
    // Objeto específico del evento
  },
  "organization_id": "org_abcdefghijk"
}
```

### Ejemplos de payloads

**Evento: purchase.completed**
```json
{
  "id": "evt_01234567890",
  "type": "purchase.completed",
  "created": 1640995200,
  "data": {
    "purchase": {
      "id": "pur_abc123",
      "fan": {
        "id": "fan_xyz789",
        "email": "juan@example.com",
        "first_name": "Juan",
        "last_name": "García"
      },
      "event": {
        "id": "evt_festival2024",
        "name": "Festival Sónar 2024",
        "date": "2024-06-15"
      },
      "tickets": [
        {
          "type": "General Admission",
          "quantity": 2,
          "price": 85.00,
          "currency": "EUR"
        }
      ],
      "total": 170.00,
      "currency": "EUR",
      "payment_method": "card",
      "status": "completed",
      "purchased_at": "2024-03-15T10:30:00Z"
    }
  },
  "organization_id": "org_abcdefghijk"
}
```

**Evento: fan.created**
```json
{
  "id": "evt_01234567891",
  "type": "fan.created",
  "created": 1640995201,
  "data": {
    "fan": {
      "id": "fan_new123",
      "email": "maria@example.com",
      "first_name": "María",
      "last_name": "López",
      "phone": "+34600123456",
      "city": "Barcelona",
      "country": "ES",
      "tags": ["techno", "vip"],
      "created_at": "2024-03-15T11:00:00Z",
      "source": "Event Registration"
    }
  },
  "organization_id": "org_abcdefghijk"
}
```

**Evento: event.published**
```json
{
  "id": "evt_01234567892",
  "type": "event.published",
  "created": 1640995202,
  "data": {
    "event": {
      "id": "evt_summer2024",
      "name": "Summer Closing Party",
      "date": "2024-09-20",
      "venue": {
        "name": "Sala Apolo",
        "city": "Barcelona"
      },
      "lineup": [
        {"name": "DJ Koze", "spotify_id": "xyz"},
        {"name": "Peggy Gou", "spotify_id": "abc"}
      ],
      "published_at": "2024-03-15T12:00:00Z"
    }
  },
  "organization_id": "org_abcdefghijk"
}
```

## Verificar autenticidad

Para asegurar que los requests vienen realmente de Nevent, verifica la firma HMAC.

### Proceso de verificación

**1. Extrae timestamp y signature del header:**
```
X-Nevent-Signature: t=1640995200,v1=5257a869e7ecebeda32affa62cdca3fa51cad7e77a0e56ff536d0ce8e108d8bd
```

**2. Construye el signed payload:**
```
{timestamp}.{raw_json_body}
```

**3. Calcula HMAC SHA-256:**
```python
import hmac
import hashlib

secret = "whsec_k5EKJQnf9sMX2vYzJdHG3L8pR"
signed_payload = f"{timestamp}.{raw_body}"
expected_signature = hmac.new(
    secret.encode(),
    signed_payload.encode(),
    hashlib.sha256
).hexdigest()
```

**4. Compara con la firma recibida:**
```python
if hmac.compare_digest(expected_signature, received_signature):
    # Firma válida, procesa el evento
else:
    # Firma inválida, rechaza el request
```

### Ejemplo completo en Node.js

```javascript
const crypto = require('crypto');
const express = require('express');
const app = express();

app.post('/webhooks/nevent', express.raw({type: 'application/json'}), (req, res) => {
  const signature = req.headers['x-nevent-signature'];
  const secret = process.env.NEVENT_WEBHOOK_SECRET;

  // Extrae timestamp y signature
  const [t, v1] = signature.split(',').map(part => part.split('=')[1]);

  // Construye signed payload
  const signedPayload = `${t}.${req.body}`;

  // Calcula HMAC
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(signedPayload)
    .digest('hex');

  // Verifica firma
  if (!crypto.timingSafeEqual(
    Buffer.from(v1),
    Buffer.from(expectedSignature)
  )) {
    return res.status(401).send('Invalid signature');
  }

  // Verifica timestamp (no más de 5 minutos de antigüedad)
  const currentTime = Math.floor(Date.now() / 1000);
  if (currentTime - parseInt(t) > 300) {
    return res.status(401).send('Timestamp too old');
  }

  // Procesa el evento
  const event = JSON.parse(req.body);
  console.log('Received event:', event.type);

  // Tu lógica aquí...

  res.status(200).send('OK');
});

app.listen(3000);
```

## Mejores prácticas

### Responde rápidamente

Tu endpoint debe:
- Responder con `200 OK` inmediatamente
- Procesar el evento de forma asíncrona (background job)

**Mal:**
```javascript
app.post('/webhook', async (req, res) => {
  await procesarEventoComplejo(req.body); // Puede tardar 30s
  res.status(200).send('OK'); // Timeout!
});
```

**Bien:**
```javascript
app.post('/webhook', async (req, res) => {
  // Valida y encola
  await queue.add('process-webhook', req.body);
  res.status(200).send('OK'); // Responde rápido
});
```

### Implementa idempotencia

Nevent puede enviar el mismo evento múltiples veces (reintentos).

**Usa `X-Nevent-Delivery` para deduplicar:**
```javascript
const deliveryId = req.headers['x-nevent-delivery'];

// Verifica si ya procesaste este delivery
if (await db.deliveryExists(deliveryId)) {
  return res.status(200).send('Already processed');
}

// Procesa y guarda delivery ID
await procesarEvento(event);
await db.saveDeliveryId(deliveryId);
```

### Monitorea fallos

Revisa el log de webhooks regularmente:
1. Ve a **Configuración** → **Integraciones** → **Webhooks** → **Historial**
2. Verás todos los deliveries con su status
3. Investiga fallos recurrentes

### Usa un secret fuerte

**Mal:**
```
secret123
```

**Bien:**
```
whsec_k5EKJQnf9sMX2vYzJdHG3L8pR7tU4vW2xY9zA1bC3dE5fG6hI8jK
```

Genera con:
```bash
openssl rand -hex 32
```

### Maneja errores gracefully

Si tu procesamiento falla:
- Devuelve status `500` para que Nevent reintente
- Logea el error para debugging
- Implementa alertas para fallos persistentes

## Casos de uso

### Sincronizar con CRM custom

**Objetivo:** Cuando alguien compra entrada, crear lead en tu CRM.

**Configuración:**
- Evento: `purchase.completed`
- Endpoint: `https://api.tucrm.com/webhooks/nevent`

**Lógica en tu endpoint:**
```javascript
if (event.type === 'purchase.completed') {
  const { fan, event, total } = event.data.purchase;

  await crm.createLead({
    email: fan.email,
    name: `${fan.first_name} ${fan.last_name}`,
    source: 'Nevent',
    deal_value: total,
    notes: `Compró entrada para ${event.name}`
  });
}
```

### Notificaciones a Slack

**Objetivo:** Avisar al equipo cuando se vende entrada VIP.

**Configuración:**
- Evento: `purchase.completed`
- Filtro: `ticket_type = VIP`
- Endpoint: Webhook URL de Slack

**Payload a Slack:**
```javascript
await fetch(SLACK_WEBHOOK_URL, {
  method: 'POST',
  body: JSON.stringify({
    text: `🎉 Nueva venta VIP!\n${fan.first_name} compró ${tickets.length} entradas VIP para ${event.name}\nTotal: ${total}€`
  })
});
```

### Actualizar dashboard en tiempo real

**Objetivo:** Dashboard muestra ventas en vivo.

**Configuración:**
- Evento: `purchase.completed`
- Endpoint: `https://api.dashboard.com/realtime/sales`

**En tu frontend:**
```javascript
// WebSocket recibe evento del backend
socket.on('new-purchase', (purchase) => {
  // Actualiza contador
  updateSalesCounter(purchase.total);

  // Añade a tabla de últimas ventas
  addToRecentSales(purchase);

  // Animación celebratoria
  showConfetti();
});
```

### Enviar email transaccional custom

**Objetivo:** Enviar email de bienvenida con tu diseño custom.

**Configuración:**
- Evento: `fan.created`
- Endpoint: `https://api.tuorganizacion.com/emails/welcome`

**Lógica:**
```javascript
if (event.type === 'fan.created') {
  await emailService.send({
    to: event.data.fan.email,
    template: 'welcome-custom',
    data: {
      name: event.data.fan.first_name,
      discount_code: generateDiscountCode()
    }
  });
}
```

## Solución de problemas

### El webhook no recibe eventos

**Posibles causas:**

1. **URL no accesible**
   - Verifica que tu endpoint es público
   - Prueba con `curl` desde fuera de tu red

2. **No es HTTPS**
   - Nevent solo envía a endpoints HTTPS
   - Solución: Obtén certificado SSL (gratis con Let's Encrypt)

3. **Webhook desactivado**
   - Verifica status en Configuración → Webhooks

4. **Eventos no seleccionados**
   - Verifica que marcaste los eventos que quieres recibir

### Recibo eventos duplicados

**Causa:** Tu endpoint tardó mucho en responder, Nevent reintentó.

**Solución:**
- Implementa deduplicación con `X-Nevent-Delivery`
- Responde con `200` inmediatamente

### Firma inválida

**Posibles causas:**

1. **Secret incorrecto**
   - Verifica que usas el secret correcto

2. **Body modificado**
   - Usa el raw body, no el parseado
   - Ejemplo: `express.raw({type: 'application/json'})`

3. **Timestamp muy antiguo**
   - El evento tiene más de 5 minutos
   - Descarta eventos antiguos

### Timeout en el webhook

**Causa:** Tu endpoint tarda más de 10 segundos.

**Solución:**
- Responde inmediatamente
- Procesa de forma asíncrona
- Usa queue (Bull, RabbitMQ, etc.)

## Límites

- **Timeout:** 10 segundos
- **Payload máximo:** 1MB
- **Reintentos:** Hasta 5 intentos
- **Rate limit:** 1000 eventos/minuto por webhook

## Seguridad

### HTTPS obligatorio

Nevent **solo** envía webhooks a URLs HTTPS para proteger los datos en tránsito.

### Valida siempre la firma

No confíes en requests sin validar la firma HMAC.

### Whitelist de IPs (opcional)

Si quieres restricción adicional, acepta solo requests desde IPs de Nevent:

```
35.198.123.45
34.76.234.67
104.155.67.89
```

### No expongas datos sensibles

En tu respuesta, no incluyas información sensible:
```javascript
// Mal
res.status(200).send({ api_key: 'secret123' });

// Bien
res.status(200).send('OK');
```

## Testing local

Para probar webhooks en local:

**Opción 1: ngrok**
```bash
ngrok http 3000
# Usa la URL HTTPS de ngrok en Nevent
```

**Opción 2: webhook.site**
- Visita [webhook.site](https://webhook.site)
- Usa la URL única generada
- Inspecciona payloads recibidos

**Opción 3: Evento de prueba**
- En Nevent, haz clic en "Enviar evento de prueba"
- Inspecciona en tu endpoint local

:::tip[Desarrollo iterativo]
Usa webhook.site primero para ver la estructura del payload, luego implementa tu lógica local con ngrok.
:::
