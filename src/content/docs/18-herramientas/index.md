---
title: Herramientas y Analytics
description: Reportes, métricas y utilidades - Analiza el rendimiento de tus campañas y operaciones.
---

Mide, analiza y optimiza tus operaciones con herramientas avanzadas de reporting y analytics.

## En esta sección

- **Analytics de campañas**: Métricas multicanal (Email, SMS, WhatsApp)
- **Acortador de URLs**: Links con tracking personalizado
- **Dashboard de uso**: Consumo de plan (emails, SMS, WhatsApp)
- **Integraciones de analytics**: Google Analytics 4, Meta Pixel
- **Exportación de datos**: Descarga reportes a Excel/CSV

## Analytics de Campañas

### Dashboard multicanal
Vista unificada de todas tus campañas con métricas clave:

#### Email
- 📧 **Enviados**: Total de emails enviados
- ✅ **Entregados**: Emails que llegaron a inbox
- 👁️ **Abiertos**: Cuántos abrieron el email
- 🖱️ **Clicks**: Cuántos hicieron click en algún link
- ❌ **Bounces**: Emails rebotados (hard + soft)
- 🚫 **Desuscripciones**: Usuarios que se dieron de baja

**Tasas calculadas**:
- **Delivery rate**: (Entregados / Enviados) × 100
- **Open rate**: (Abiertos / Entregados) × 100
- **Click rate**: (Clicks / Entregados) × 100
- **Bounce rate**: (Bounces / Enviados) × 100
- **Unsubscribe rate**: (Unsubs / Entregados) × 100

#### SMS
- 📱 **Enviados**: Total de SMS enviados
- ✅ **Entregados**: SMS recibidos por el usuario
- 💬 **Respuestas**: SMS de respuesta del usuario
- ❌ **Fallos**: No entregados

**Tasas calculadas**:
- **Delivery rate**: (Entregados / Enviados) × 100
- **Response rate**: (Respuestas / Entregados) × 100

#### WhatsApp
- 📩 **Enviados**: Mensajes enviados
- ✅ **Entregados**: Llegaron al dispositivo del usuario
- 👁️ **Leídos**: Usuario abrió el mensaje (check azul)
- 💬 **Respuestas**: Mensajes de respuesta

**Tasas calculadas**:
- **Delivery rate**: (Entregados / Enviados) × 100
- **Read rate**: (Leídos / Entregados) × 100
- **Response rate**: (Respuestas / Leídos) × 100

### Gráficos temporales
Visualiza la evolución de métricas en el tiempo:
- **Gráfico de línea**: Aperturas/clicks por día
- **Gráfico de barras**: Comparativa de campañas
- **Heatmap**: Mejor hora/día para enviar
- **Funnel**: De envío a conversión

### Filtros avanzados
Personaliza tu vista:
- **Rango de fechas**: Últimos 7/30/90 días, personalizado
- **Canal**: Solo email, solo SMS, solo WhatsApp, o todos
- **Campaña**: Filtra por campaña específica
- **Estado**: Completadas, en curso, programadas
- **Segmento**: Por audiencia objetivo

### Comparativas
Compara rendimiento:
- **Esta campaña vs. promedio histórico**
- **Email vs. SMS vs. WhatsApp**
- **Segmento A vs. Segmento B**
- **Mes actual vs. mes anterior**

## Acortador de URLs

### Crear link corto
Transforma URLs largas en cortas con tracking:

**Antes**:
```
https://tuevento.com/comprar-entradas?utm_source=email&utm_campaign=lineup&utm_content=cta-button
```

**Después**:
```
https://nev.to/abc123
```

### Magic Links
Enlaces únicos por usuario con parámetros encriptados:
```
https://nev.to/abc123?ml=eyJ1c2VySWQiOiJ4eXoifQ==
```

**Ventajas**:
- Identifican automáticamente al usuario (sin login)
- Permiten acciones directas (comprar, descargar, etc.)
- Trackean conversiones por usuario

### Métricas de links
Para cada link, visualiza:
- **Clicks totales**: Cuántas veces se clickeó
- **Clicks únicos**: Cuántos usuarios distintos
- **Origen**: Desktop, móvil, tablet
- **Ubicación**: País, ciudad
- **Navegador**: Chrome, Safari, Firefox, etc.
- **Referrer**: De dónde vinieron (email, social, directo)

### Analytics por campaña
Agrupa links por campaña:
- Total de clicks de todos los links de la campaña
- Link más clickeado
- Tasa de clicks (clicks / enviados)
- Conversiones generadas

### Gestión de links
- **Listar todos los links**: Ordenar por clicks, fecha
- **Editar destino**: Cambiar URL sin cambiar el link corto
- **Expiración**: Configura fecha de caducidad
- **Activar/desactivar**: Pausar link temporalmente
- **Eliminar**: Borrar link (404 al acceder)

## Dashboard de Uso del Plan

### Consumo de emails
- **Enviados este mes**: X de Y incluidos en tu plan
- **% consumido**: Barra de progreso
- **Promedio diario**: Emails por día
- **Proyección**: A este ritmo, alcanzarás el límite el [fecha]
- **Histórico**: Gráfico de consumo últimos 12 meses

### Consumo de SMS
Similar a emails:
- Enviados este mes
- % del plan
- Costo adicional si excedes

### Consumo de WhatsApp
- Conversaciones iniciadas
- Límite del plan
- Costo por conversación adicional

### Alertas de consumo
Notificaciones automáticas:
- 🟡 **50% consumido**: "Vas por la mitad del plan"
- 🟠 **80% consumido**: "Cuidado, quedan pocos emails"
- 🔴 **100% consumido**: "Límite alcanzado, actualiza tu plan"

### Histórico de facturación
- Facturas de los últimos 12 meses
- Descarga en PDF
- Detalle de cargos (plan base + extras)

## Integraciones de Analytics Externas

### Google Analytics 4

#### Configuración
1. Obtén tu Measurement ID de GA4 (ej: `G-XXXXXXXXXX`)
2. Pégalo en **Configuración → Canales → Analytics**
3. Activa el tracking

#### Qué se envía a GA4
- **Eventos estándar**:
  - `page_view`: Cada vez que se carga una página
  - `click`: Clicks en botones/links
  - `form_submit`: Envíos de formularios
  - `purchase`: Compras (si aplica)

- **Eventos personalizados**:
  - `newsletter_signup`: Suscripción a newsletter
  - `event_view`: Vista de página de evento
  - `campaign_click`: Click en campaña de email

- **Parámetros automáticos**:
  - User ID (si está logueado)
  - Campaign source (email, SMS, etc.)
  - Campaign name
  - Event ID

#### Beneficios
- **Atribución**: Qué canal generó cada conversión
- **Funnels**: Flujo de navegación hasta compra
- **Cohorts**: Análisis de retención por segmento

### Meta Pixel

#### Configuración
1. Obtén tu Pixel ID de Facebook/Instagram
2. Pégalo en **Configuración → Canales → Analytics**
3. Activa el tracking

#### Eventos enviados
- **Estándar**:
  - `PageView`: Vista de página
  - `ViewContent`: Vista de evento/producto
  - `AddToCart`: Añadir al carrito (si aplica)
  - `Purchase`: Compra completada
  - `Lead`: Suscripción a newsletter

- **Personalizados**:
  - `EventInterest`: Marcó interés en evento
  - `ArtistFollow`: Siguió a un artista
  - `ShareEvent`: Compartió evento en redes

#### Beneficios
- **Audiencias de remarketing**: Retargetear usuarios en Facebook/Instagram
- **Lookalike audiences**: Encontrar usuarios similares
- **Atribución de anuncios**: Qué anuncios generaron conversiones

## Exportación de Datos

### Formatos disponibles
- **Excel (.xlsx)**: Con formato, columnas organizadas, gráficos
- **CSV**: Para importar en otras herramientas

### Qué se puede exportar

#### Listados de usuarios
- Email, nombre, apellidos, teléfono
- Ciudad, país, idioma
- Intereses, preferencias
- Tags/etiquetas
- Total ventas, eventos asistidos
- Nevent Score

#### Listados de ventas
- Fecha, comprador, evento
- Importe, método de pago
- Estado, canal de origen
- Desglose (subtotal, taxes, fees)

#### Segmentos
- Todos los usuarios de un segmento
- Con todas sus propiedades

#### Analytics de campañas
- Todas las métricas por campaña
- Resumen de rendimiento multicanal
- Comparativas temporales

#### Historial de importaciones
- Fecha, archivo, registros importados
- Errores, warnings
- Estado (completado, fallido)

### Programación de exportaciones
Configura exportaciones automáticas:
- **Frecuencia**: Diaria, semanal, mensual
- **Formato**: Excel o CSV
- **Destino**: Email, SFTP, Google Drive, Dropbox
- **Filtros**: Solo datos de los últimos 30 días, etc.

## Reportes personalizados

### Constructor de reportes
Crea reportes a medida:
1. Selecciona **fuente de datos**: Usuarios, campañas, ventas, eventos
2. Elige **columnas**: Qué campos incluir
3. Añade **filtros**: Por fecha, estado, segmento, etc.
4. Define **agrupación**: Por día, semana, mes, campaña
5. Añade **cálculos**: Sumas, promedios, tasas
6. Visualiza y exporta

### Dashboards guardados
Guarda configuraciones frecuentes:
- "Reporte mensual de ventas"
- "Performance de campañas de email"
- "Crecimiento de audiencia semanal"

Acceso rápido con un click.

## Herramientas adicionales

### Validador de emails
Limpia tu lista antes de enviar:
- Detecta emails inválidos (formato incorrecto)
- Identifica emails desechables (temp-mail.org, etc.)
- Marca bounces conocidos

### Calculadora de ROI
Mide el retorno de inversión de campañas:
- **Inversión**: Costo de la campaña (tiempo + herramientas)
- **Ingresos generados**: Ventas atribuidas
- **ROI**: (Ingresos - Inversión) / Inversión × 100

### Comparador A/B
Compara 2 variantes de una campaña:
- Versión A vs. Versión B
- Métricas lado a lado
- Ganador estadísticamente significativo
