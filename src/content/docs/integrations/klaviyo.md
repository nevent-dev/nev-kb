---
title: Klaviyo
description: Sincroniza tu audiencia con Klaviyo para email marketing avanzado
---

Conecta Nevent con Klaviyo para aprovechar las capacidades avanzadas de email marketing, automatizaciones y segmentación.

## ¿Qué es Klaviyo?

Klaviyo es una plataforma de email marketing y automatización diseñada para ecommerce y negocios orientados a datos.

**¿Por qué usar Klaviyo con Nevent?**

- 🎯 **Segmentación avanzada** - Crea audiencias complejas con múltiples condiciones
- 🤖 **Automatizaciones potentes** - Flows personalizados por comportamiento
- 📊 **Analytics profundo** - Revenue attribution, LTV, cohort analysis
- 🎨 **Editor visual** - Diseños de email más sofisticados
- 📈 **A/B Testing** - Optimiza subject lines, contenido, timing

**Ideal para:**
- Festivales con estrategia de email marketing compleja
- Promotoras que venden merchandising online
- Venues con múltiples líneas de producto (entradas, VIP, merch)
- Organizaciones que necesitan analytics de revenue

## Requisitos previos

Antes de integrar Klaviyo:

1. **Cuenta de Klaviyo activa**
   - Crear cuenta en [klaviyo.com](https://www.klaviyo.com)
   - Plan de pago o trial activo

2. **API Key de Klaviyo**
   - Generar API Key con permisos de lectura y escritura
   - Guardar la API Key en lugar seguro

## Configurar integración

### Paso 1: Obtener API Key de Klaviyo

1. Inicia sesión en Klaviyo
2. Ve a **Account** → **Settings** → **API Keys**
3. Haz clic en **Create Private API Key**
4. Nombre: "Nevent Integration"
5. Permisos necesarios:
   - ✅ **Lists** - Full Access
   - ✅ **Profiles** - Full Access
   - ✅ **Metrics** - Read Only
   - ✅ **Events** - Full Access
6. Copia la API Key (comienza con `pk_`)

:::caution[Guarda la API Key]
Solo podrás ver la API Key completa una vez. Guárdala en un lugar seguro. Si la pierdes, tendrás que crear una nueva.
:::

### Paso 2: Conectar Klaviyo en Nevent

1. Ve a **Configuración** → **Integraciones** → **Klaviyo**
2. Haz clic en **Conectar Klaviyo**
3. Pega tu **API Key** de Klaviyo
4. Haz clic en **Verificar conexión**
5. Si la conexión es exitosa, verás ✅ "Conectado"

### Paso 3: Seleccionar lista de Klaviyo

1. Verás un selector con todas tus listas de Klaviyo
2. Selecciona la lista donde quieres sincronizar contactos de Nevent
3. Haz clic en **Guardar**

**Recomendación:** Crea una lista específica "Nevent - All Contacts" para mantener organizado.

### Paso 4: Configurar opciones de sincronización

**Sincronizar automáticamente:**
- ✅ Activar para sincronización continua cada hora
- ❌ Desactivar para sincronización manual

**Qué datos sincronizar:**
- ✅ Información básica (nombre, email, teléfono)
- ✅ Eventos asistidos
- ✅ Compras realizadas
- ✅ Etiquetas y segmentos
- ✅ Preferencias musicales
- ❌ Datos sensibles (nunca se sincronizan)

**Dirección de sincronización:**
- **Nevent → Klaviyo:** Crear/actualizar perfiles en Klaviyo
- **Klaviyo → Nevent:** Importar nuevos suscriptores desde Klaviyo
- **Bidireccional:** Sincronización en ambas direcciones (recomendado)

## Datos que se sincronizan

### Perfiles (Profiles)

Cada fan de Nevent se crea como perfil en Klaviyo con:

**Propiedades estándar:**
- `email` - Email del fan
- `first_name` - Nombre
- `last_name` - Apellidos
- `phone_number` - Teléfono (formato E.164)
- `location` - Ciudad, país

**Propiedades personalizadas:**
- `nevent_id` - ID del fan en Nevent
- `total_events_attended` - Número de eventos asistidos
- `total_spent` - Gasto total en €
- `favorite_genres` - Géneros musicales favoritos
- `first_event_date` - Fecha del primer evento
- `last_event_date` - Fecha del último evento
- `vip_status` - Si es VIP o no
- `nevent_tags` - Etiquetas de Nevent

### Eventos (Events)

Las acciones del fan se registran como eventos en Klaviyo:

**Evento: Purchased Ticket**
```json
{
  "event": "Purchased Ticket",
  "properties": {
    "event_name": "Festival Sónar 2024",
    "event_date": "2024-06-15",
    "ticket_type": "General Admission",
    "price": 85.00,
    "currency": "EUR",
    "venue": "Fira de Barcelona",
    "artist_lineup": ["Arca", "Four Tet", "Kelly Lee Owens"]
  }
}
```

**Evento: Attended Event**
```json
{
  "event": "Attended Event",
  "properties": {
    "event_name": "Festival Sónar 2024",
    "event_date": "2024-06-15",
    "ticket_type": "General Admission"
  }
}
```

**Evento: Newsletter Subscribed**
```json
{
  "event": "Newsletter Subscribed",
  "properties": {
    "source": "Event Registration",
    "event_name": "Festival Sónar 2024"
  }
}
```

## Usar datos de Nevent en Klaviyo

### Crear segmentos avanzados

**Ejemplo 1: Super fans**
```
Attended Event at least 3 times in the last 12 months
AND Total Spent greater than 200€
```

**Ejemplo 2: Fans de techno que no compran hace tiempo**
```
Favorite Genres contains "Techno"
AND Last Event Date is more than 6 months ago
```

**Ejemplo 3: VIPs inactivos**
```
VIP Status equals True
AND Last Event Date is more than 3 months ago
```

### Crear flows personalizados

**Flow 1: Post-compra**
```
Trigger: Purchased Ticket
Wait: 1 day
Email: "¡Gracias por tu compra! Aquí tienes tu guía del evento"
Wait: 7 days before event
Email: "¡Ya queda poco! Prepárate para {{event_name}}"
Wait: 1 day after event
Email: "¿Cómo fue tu experiencia? [Feedback survey]"
```

**Flow 2: Re-engagement**
```
Trigger: Last Event Date is exactly 3 months ago
Email: "Te echamos de menos. Aquí tienes 10% descuento"
Wait: 7 days
Branch:
  - If clicked: Email: "Próximos eventos que te encantarán"
  - If not clicked: Email: "¿Qué tipo de eventos te gustaría ver?"
```

**Flow 3: VIP nurturing**
```
Trigger: VIP Status = True
Email: "Bienvenido al programa VIP"
Wait: 14 days
Email: "Acceso exclusivo: preventa para {{next_event}}"
```

### Personalización con datos de Nevent

**En subject lines:**
```
¡{{first_name}}, {{favorite_artist}} viene a {{city}}!
Has estado en {{total_events_attended}} eventos, ¡gracias!
```

**En contenido:**
```
Hola {{first_name}},

Vimos que te gustó {{last_event_attended}}.
Creemos que te encantará este lineup:
{% for artist in recommended_artists %}
- {{ artist }}
{% endfor %}
```

## Campañas desde Klaviyo

Una vez sincronizado, puedes:

1. **Crear campañas en Klaviyo**
   - Usar segmentos basados en datos de Nevent
   - Personalizar con propiedades de Nevent
   - Enviar desde Klaviyo

2. **Ver resultados en ambas plataformas**
   - Klaviyo: Métricas de email (open, click, revenue)
   - Nevent: Conversión a compras de entradas

## Mejores prácticas

### Define una estrategia de datos

**¿Dónde vive cada dato?**
- **Nevent:** Eventos, asistencia, compras de entradas
- **Klaviyo:** Preferencias de email, engagement, campañas

**Evita conflictos:**
- No edites el mismo campo en ambas plataformas
- Si sincronizas bidireccional, define sistema de verdad por campo

### Sincroniza regularmente

**Frecuencia recomendada:**
- Festivales grandes: Cada 1 hora
- Venues medianos: Cada 6 horas
- Promotoras pequeñas: Cada 24 horas

### Usa naming conventions

**Para listas:**
- ✅ "Nevent - All Contacts"
- ✅ "Nevent - VIP"
- ✅ "Nevent - Techno Fans"

**Para segmentos:**
- ✅ "Nevent: Attended 3+ Events"
- ✅ "Nevent: High Spenders (>200€)"

### Mapea campos custom

Si tienes campos personalizados en Nevent:

1. Ve a **Configuración** → **Integraciones** → **Klaviyo** → **Mapeo de campos**
2. Mapea cada campo custom de Nevent a una propiedad de Klaviyo
3. Ejemplo: `origen_fan` (Nevent) → `acquisition_source` (Klaviyo)

## Analizar resultados

### En Klaviyo

**Métricas disponibles:**
- Revenue per recipient
- Click-to-purchase rate
- Campaign ROI
- Segment performance

**Informes útiles:**
1. **Revenue report:** ¿Qué campañas generan más ventas?
2. **Engagement report:** ¿Qué segmentos abren más?
3. **Flow performance:** ¿Qué flows convierten mejor?

### En Nevent

**Métricas sincronizadas desde Klaviyo:**
- Opens, clicks (por fan)
- Campañas recibidas
- Flow status (en qué flow está cada fan)

**Análisis combinado:**
- Ve a **Audiencia** → Fan individual
- Verás su actividad de Klaviyo integrada en su perfil

## Solución de problemas

### La API Key no funciona

**Posibles causas:**

1. **Permisos insuficientes**
   - Solución: Regenera API Key con permisos completos de Lists y Profiles

2. **API Key incorrecta**
   - Solución: Verifica que copiaste completa (empieza con `pk_`)

3. **Cuenta de Klaviyo suspendida**
   - Solución: Contacta a soporte de Klaviyo

### Los contactos no se sincronizan

**Posibles causas:**

1. **Email inválido o duplicado**
   - Klaviyo rechaza emails inválidos o ya existentes en otra lista
   - Solución: Limpia duplicados y valida formato de emails

2. **Límite de contactos alcanzado**
   - Plan de Klaviyo tiene límite de contactos
   - Solución: Upgrade de plan o limpia contactos inactivos

3. **Sincronización desactivada**
   - Verifica que "Sincronizar automáticamente" está activado

### Los eventos no aparecen en Klaviyo

**Causa:** Los eventos tardan hasta 15 minutos en aparecer.

**Solución:** Espera y refresca. Si después de 1 hora no aparecen, contacta a soporte.

### Datos desactualizados en Klaviyo

**Causa:** Sincronización programada no ha corrido.

**Solución:**
1. Ve a **Configuración** → **Integraciones** → **Klaviyo** → **Historial**
2. Verifica última sincronización
3. Haz clic en **Sincronizar ahora** para forzar sync

## Límites y costes

### Límites técnicos

- **Rate limit de Klaviyo:** 10 requests/segundo
- **Máximo de propiedades custom:** 200 por perfil
- **Máximo de eventos:** Ilimitados

### Costes

**Nevent:**
- La integración está incluida en planes Pro y Enterprise
- Sin coste adicional por sincronización

**Klaviyo:**
- Cobra por número de contactos activos
- Plan Email: Desde $20/mes (500 contactos)
- Plan Email + SMS: Desde $35/mes (500 contactos)

**Ejemplo de coste:**
- 10,000 contactos: ~$150/mes
- 50,000 contactos: ~$700/mes

:::tip[Optimiza costes]
Klaviyo cobra por contactos activos (comprometidos en últimos 6 meses). Limpia inactivos regularmente.
:::

## Seguridad y privacidad

### Datos cifrados

- La API Key se almacena cifrada en Nevent
- Todas las comunicaciones usan HTTPS/TLS

### RGPD compliance

- Los fans deben consentir el envío a terceros
- Nevent documenta el consentimiento
- Los fans pueden ejercer derechos ARCO en ambas plataformas

### Revocar acceso

Para desconectar Klaviyo:

1. Ve a **Configuración** → **Integraciones** → **Klaviyo**
2. Haz clic en **Desconectar**
3. Confirma la desconexión
4. En Klaviyo, elimina la API Key de Nevent

## Recursos adicionales

- [Klaviyo API Docs](https://developers.klaviyo.com)
- [Klaviyo Academy](https://academy.klaviyo.com) - Cursos gratuitos
- [Nevent + Klaviyo Webinar](https://nevent.es/webinars/klaviyo) - Grabación disponible
