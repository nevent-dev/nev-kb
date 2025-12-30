---
title: Newsletters y Suscripciones
description: Gestiona newsletters y formularios de captación con widgets embebibles y automatizaciones.
---

Crea y gestiona múltiples newsletters con formularios personalizados para captar suscriptores.

## En esta sección

- **Gestión de newsletters**: Múltiples listas de suscripción
- **Formularios personalizables**: Campos custom, validaciones, estilos
- **Widgets embebibles**: Iframe, JavaScript snippet, modal, popup
- **Doble opt-in**: Confirmación por email (GDPR compliant)
- **Branding personalizado**: Logo, colores, fuentes
- **Automatizaciones de bienvenida**: Emails de confirmación personalizados
- **Analytics de suscripciones**: Tasa de conversión, origen de suscriptores
- **Gestión de suscriptores**: Lista dedicada por newsletter

## ¿Qué es una newsletter?

Una newsletter en Nevent es:
- Una **lista de suscripción** temática (ej: "Novedades", "Eventos Techno", "Ofertas VIP")
- Un **formulario de captación** personalizable
- Un **widget embebible** para tu web/app
- **Automatizaciones** de bienvenida y confirmación

## Crear una newsletter

### 1. Configuración básica
- Nombre interno
- Nombre público
- Descripción
- Categoría/tema

### 2. Diseño del formulario
- **Campos a capturar**: Email (obligatorio), nombre, apellidos, teléfono, ciudad, etc.
- **Campos personalizados**: Cualquier dato adicional
- **Validaciones**: Email válido, teléfono con formato, etc.
- **Textos**: Placeholder, labels, botón submit
- **Legal**: Checkbox de consentimiento GDPR

### 3. Branding
- Logo
- Colores (primario, secundario, texto)
- Fuentes tipográficas
- Imagen de fondo (opcional)

### 4. Confirmación (Doble opt-in)
- Email de confirmación personalizable
- Página de thank you
- Redirección tras confirmar

## Tipos de widgets

### Iframe embebido
```html
<iframe src="https://help.nevent.ai/subscribe/abc123"
        width="100%" height="400px"></iframe>
```

### Modal / Popup
```html
<script src="https://help.nevent.ai/widget.js"></script>
<script>
  NeventWidget.init({
    newsletterId: 'abc123',
    type: 'modal',
    trigger: 'exit-intent' // o 'scroll', 'time-delay'
  });
</script>
```

### Botón personalizado
```html
<button onclick="NeventWidget.open('abc123')">
  Suscríbete a nuestro newsletter
</button>
```

## Automatizaciones

### Email de bienvenida
Se envía automáticamente cuando:
- Usuario confirma su suscripción (doble opt-in)
- O cuando se suscribe (si doble opt-in desactivado)

Personalizable:
- Asunto
- Contenido (plantilla MJML)
- Remitente
- Delay (inmediato o esperar X horas)

### Email de confirmación
Solo si doble opt-in está activado:
- Se envía tras rellenar el formulario
- Contiene link de confirmación único
- Expira en 48h

## Analytics

### Métricas del formulario
- 👁️ **Vistas**: Cuántas veces se mostró el widget
- 📝 **Envíos**: Formularios enviados
- ✅ **Conversión**: Tasa de suscripción (envíos / vistas)
- 📧 **Confirmados**: Usuarios que confirmaron email (doble opt-in)

### Origen de suscriptores
- Por página (URL)
- Por fuente (organic, social, paid)
- Por dispositivo (desktop, mobile, tablet)

## Gestión de suscriptores

- Ver lista completa de suscriptores
- Filtrar por estado (confirmado / pendiente)
- Filtrar por fecha de suscripción
- Exportar a CSV/Excel
- Añadir/eliminar manualmente
- Importar desde CSV

## Cumplimiento GDPR

Nevent asegura cumplimiento con:
- ✅ Doble opt-in recomendado
- ✅ Checkbox de consentimiento explícito
- ✅ Texto legal personalizable
- ✅ Link de baja en todos los emails
- ✅ Registro de consentimientos con timestamp
- ✅ Derecho al olvido (borrado de datos)
