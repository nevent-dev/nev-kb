---
title: Ventas y Compras
description: Visualiza ventas sincronizadas desde sistemas externos - Dashboard de métricas y detalle de transacciones.
---

Visualiza y analiza todas las ventas sincronizadas desde tus ticketeras y plataformas de ecommerce.

:::caution[Solo visualización]
Nevent **NO procesa pagos ni vende**. Solo muestra datos sincronizados desde:
- Ticketeras (entradas de eventos)
- Ecommerce (productos físicos)
- Cashless (compras en eventos)
:::

## En esta sección

- **Listado de ventas**: Todas las transacciones sincronizadas
- **Detalle de compra**: Información completa de cada transacción
- **Historial por usuario**: Timeline de compras en perfil de fan
- **Estados de compra**: Pendiente, completado, cancelado, reembolsado
- **Filtros avanzados**: Por fecha, importe, estado, canal
- **Métricas de usuario**: Total ventas, número de compras, eventos asistidos
- **Exportación**: Descarga reportes a Excel/CSV

## Listado de ventas

### Columnas disponibles
- **Fecha**: Cuándo se realizó la compra
- **Canal**: Logo del sistema externo (Shotgun, CASFID, etc.)
- **Referencia**: Código de la compra
  - ID externo (si viene de ticketera)
  - ID interno Nevent (si aplica)
- **Comprador**: Email y nombre
- **Importe**: Total de la compra (EUR)
- **Estado**: Tag coloreado según estado
- **Acciones**: Ver detalle completo

### Filtros avanzados

#### Por fecha
Selector de rango:
- Últimos 7 días
- Últimos 30 días
- Últimos 3 meses
- Rango personalizado

#### Por importe
- Importe mínimo
- Importe máximo

#### Por estado
- Pendiente (amarillo)
- Completado (verde)
- Cancelado (rojo)
- Reembolsado (azul)

#### Por canal
- Shotgun
- Eventbrite
- CASFID
- Shopify
- Otros

### Ordenación
- Por fecha (más recientes primero)
- Por importe (mayor a menor)
- Por comprador (alfabético)

## Detalle de compra

### Información de integración
- **Canal de origen**: Plataforma externa
- **ID de compra**: Identificador único
- **Referencia externa**: Código en el sistema de origen
- **Estado**: Pendiente, completado, cancelado, reembolsado
- **Código de afiliado**: Si la compra vino de un afiliado

### Información de pago
- **Gateway**: Stripe, PayComet, Bizum, etc.
- **ID del pago**: PaymentIntent ID (Stripe)
- **Método de pago**: Tarjeta, Bizum, PayPal, etc.
- **Moneda**: EUR, USD, GBP, etc.

### Información del evento
(Solo si la compra es de entradas)
- **Nombre del evento**: Link al detalle del evento
- **Fecha del evento**: Cuándo es/fue el evento
- **Venue**: Dónde se celebra

### Desglose financiero
- **Subtotal**: Precio base de productos/entradas
- **Taxes**: IVA u otros impuestos
- **Fees**: Comisiones de gestión
- **Descuentos**: Cupones aplicados
- **Total**: Importe final pagado
- **Reembolsado**: Si aplica, cuánto se devolvió

### Movimientos (line items)
Tabla con cada item comprado:
- Descripción
- Tipo (entrada, producto, experiencia)
- Precio unitario
- Cantidad
- Total por item

### Entradas sincronizadas
(Solo si la compra incluye entradas)
- Listado de entradas con:
  - Tipo de entrada (GA, VIP, etc.)
  - Nombre del asistente
  - Email del asistente
  - QR code (si está sincronizado)
  - Estado (activo, usado, cancelado)

### Productos comprados
(Solo si la compra incluye productos)
- Listado de productos con:
  - Nombre del producto
  - Variante (talla, color)
  - Cantidad
  - Precio unitario
  - Total

## Historial en perfil de usuario

### Timeline visual
En el perfil de cada fan, se muestra:
- Línea de tiempo de compras
- Iconos por tipo:
  - 🎫 Entradas
  - 🛍️ Productos/merchandising
  - ⬆️ Personalizaciones/upgrades
- Click en cada compra para ver detalle completo

### Resumen de compras
Widget con:
- **Total ventas** (EUR): Suma de todas sus compras
- **Número de compras**: Cantidad de transacciones
- **Eventos asistidos**: Cuántos eventos únicos

### Detalle expandido
Al hacer click en una compra:
- Precio total
- Método de pago
- Fecha
- Estado
- Resumen (X entradas, Y productos, Z personalizaciones)
- Nombre del evento (si aplica)
- Botón "Ver detalle completo" → Abre modal con toda la info

## Estados de compra

### 🟡 Pendiente
- Pago iniciado pero no completado
- Esperando confirmación del gateway
- Timeout de reserva

### ✅ Completado
- Pago procesado correctamente
- Entradas/productos entregados o disponibles
- Transacción finalizada

### ❌ Cancelado
- Pago falló o fue cancelado por el usuario
- Timeout de carrito
- Stock insuficiente (en caso de productos)

### 🔵 Reembolsado
- Compra fue completada pero se devolvió el dinero
- Parcial o total
- Motivo: cancelación de evento, solicitud del usuario, etc.

## Exportación de datos

### Formatos disponibles
- **Excel (.xlsx)**: Con formato y columnas organizadas
- **CSV**: Para importar en otras herramientas

### Datos incluidos
- Fecha de compra
- Email y nombre del comprador
- Referencia de compra
- Estado
- Importe total
- Desglose (subtotal, taxes, fees, descuentos)
- Método de pago
- Canal de origen
- Nombre del evento (si aplica)
- Productos/entradas comprados

### Filtros aplicables
Exporta solo las ventas que cumplan tus filtros:
- Rango de fechas específico
- Solo completadas
- Solo de un evento concreto
- Solo por encima de X EUR

## Casos de uso

### Segmentación por compras
Crea segmentos como:
- "Ha comprado entrada VIP en los últimos 6 meses"
- "Ha gastado más de 100€ en merchandising"
- "Ha asistido a al menos 3 eventos"

### Análisis de valor de cliente
Identifica:
- Top 10% de clientes por valor (whales)
- Clientes de una sola compra (one-timers)
- Clientes recurrentes (repeat customers)

### Reactivación
Detecta fans que:
- Compraron hace más de 1 año
- No han vuelto a comprar desde su primer evento
- Dejaron carritos abandonados

### Fidelización
Premia usuarios que:
- Han asistido a X eventos
- Gastan más de X EUR al mes
- Compran siempre Early Bird
