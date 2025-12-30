---
title: Plantillas de Comunicación
description: Diseña plantillas reutilizables para Email, SMS y WhatsApp con variables dinámicas.
---

Crea plantillas profesionales para tus comunicaciones multicanal.

## En esta sección

- **Editor MJML**: Emails responsive con editor visual drag & drop
- **Plantillas WhatsApp**: Texto, botones, medios, aprobación Meta
- **Plantillas SMS**: Texto plano con variables de personalización
- **Variables dinámicas**: Personaliza con datos del usuario
- **Vista previa multi-dispositivo**: Desktop, móvil, tablet
- **Sincronización con Meta**: Gestión de estados de aprobación
- **Biblioteca de plantillas**: Reutiliza y versiona tus diseños

## Plantillas de Email

### Editor MJML
- **Drag & drop**: Arrastra componentes (texto, imagen, botón, etc.)
- **Responsive automático**: Se adapta a cualquier dispositivo
- **Secciones pre-diseñadas**: Header, hero, contenido, footer
- **Estilos personalizados**: Colores, fuentes, espaciados
- **Código HTML**: Acceso al código para ajustes avanzados

### Variables disponibles
```
{{nombre}} - Nombre del usuario
{{apellidos}} - Apellidos
{{email}} - Email del usuario
{{evento_nombre}} - Nombre del evento
{{evento_fecha}} - Fecha del evento
{{evento_link}} - Link al evento
... y muchas más
```

### Vista previa
- Desktop (1200px)
- Tablet (768px)
- Móvil (375px)
- Modo oscuro / Modo claro

## Plantillas de WhatsApp

### Tipos soportados
- **Texto simple**: Solo mensaje de texto
- **Con botones**: Hasta 3 botones de acción
- **Con medios**: Imagen, video o PDF
- **Interactivas**: Listas o botones de respuesta rápida

### Proceso de aprobación
1. **Diseña la plantilla** en Nevent
2. **Envía a Meta** para aprobación
3. **Espera validación** (24-48h típicamente)
4. **Usa en campañas** una vez aprobada

Estados:
- 🟡 **Pendiente**: Enviada, esperando revisión
- ✅ **Aprobada**: Lista para usar
- ❌ **Rechazada**: Requiere modificaciones

### Limitaciones
- Máximo 1,024 caracteres
- Variables deben estar declaradas en Meta
- No se puede editar una plantilla aprobada (crear nueva versión)

## Plantillas de SMS

### Características
- Texto plano (sin formato)
- Máximo 160 caracteres por SMS
- Emojis soportados (cuentan como múltiples caracteres)
- Variables de personalización
- Link tracking automático

### Mejores prácticas
- Sé conciso (ideal < 120 caracteres)
- Incluye siempre tu marca al inicio
- Un solo CTA claro
- Añade "STOP para darte de baja"

Ejemplo:
```
Hola {{nombre}}! 🎉 Tu entrada para {{evento_nombre}} está lista.
Descárgala aquí: {{link}}

NEVENT - STOP para cancelar
```
