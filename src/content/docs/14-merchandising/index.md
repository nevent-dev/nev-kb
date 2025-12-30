---
title: Complementos y Merchandising
description: Gestiona productos físicos sincronizados desde ecommerce/cashless o creados en Nevent.
---

Administra tu catálogo de productos físicos para venta en eventos o online.

:::note[Sistema híbrido]
Los productos pueden ser:
- **Sincronizados** desde plataformas de ecommerce (Shopify, WooCommerce) o cashless (CASFID)
- **Creados manualmente** en Nevent
:::

## En esta sección

- **Sincronización desde ecommerce**: Shopify, WooCommerce, PrestaShop
- **Sincronización cashless**: CASFID y sistemas de pago en eventos
- **Creación manual**: Catálogo propio en Nevent
- **Categorías de productos**: Merch, comida, bebida, transporte, alojamiento, actividades
- **Gestión de variantes**: Tallas, colores, tamaños
- **Gestión de inventario**: Stock por variante
- **Configuración de entregas**: Métodos de envío
- **Seguimiento de ventas**: Analytics por producto
- **Integración con sponsors**: Productos patrocinados

## Categorías disponibles

### Merch
- Camisetas, sudaderas
- Gorras, sombreros
- Posters, stickers
- Accesorios

### Comida
- Bocadillos, snacks
- Menús, combos
- Comida vegana/vegetariana

### Bebida
- Refrescos, agua
- Cervezas, vinos
- Bebidas energéticas
- Cócteles

### Transporte
- Shuttles, autobuses
- Parking
- Taxi compartido

### Alojamiento
- Camping
- Hotel partners
- Hostels

### Actividades
- Workshops
- Experiencias VIP
- Tours guiados

## Sincronización desde plataformas

### Ecommerce
Conecta tu tienda online:
1. **Configuración → Integraciones**
2. Selecciona tu plataforma (Shopify, WooCommerce, etc.)
3. Autentícate con OAuth
4. Sincroniza productos

Datos sincronizados:
- Nombre, descripción, imágenes
- Precio, moneda
- Variantes (tallas, colores, etc.)
- Stock disponible
- Categoría
- SKU, barcode

### Cashless (CASFID)
Sincroniza productos vendidos en el evento:
1. Conecta tu cuenta CASFID
2. Mapea eventos de CASFID con eventos en Nevent
3. Sincroniza transacciones y productos

Datos sincronizados:
- Productos comprados por usuario
- Cantidad por producto
- Precio pagado
- Timestamp de compra

## Crear productos manualmente

### Información básica
- Nombre del producto
- Descripción (con editor de texto enriquecido)
- Imágenes (hasta 10)
- Categoría
- Tags

### Precio y stock
- Precio base (EUR)
- Stock total
- Stock por variante (si aplica)
- Limitar cantidad por compra

### Variantes
Crea variantes por:
- **Talla**: XS, S, M, L, XL, XXL
- **Color**: Negro, Blanco, etc.
- **Tamaño**: Personalizado
- Combinaciones (ej: "M - Negro")

Cada variante tiene:
- SKU propio
- Stock propio
- Precio diferenciado (opcional)

### Configuración de entrega
- **Entrega en evento**: Recoge en persona
- **Envío nacional**: España (Correos, SEUR, etc.)
- **Envío internacional**: Otros países
- **Costes de envío**: Por peso, destino, etc.

## Gestión de inventario

### Stock por variante
- Stock actual
- Stock reservado (pedidos pendientes)
- Stock disponible (actual - reservado)
- Alertas de stock bajo

### Histórico de movimientos
- Entradas de stock (reposiciones)
- Salidas de stock (ventas)
- Ajustes manuales
- Timestamp y responsable

## Seguimiento de ventas

### Dashboard por producto
- Total vendido (unidades)
- Revenue total (EUR)
- Precio promedio
- Gráfico de ventas en el tiempo

### Top productos
- Más vendidos por unidades
- Más vendidos por revenue
- Mejor margen
- Mayor rotación

### Análisis por variante
- Qué tallas/colores venden más
- Stock sobrante por variante
- Recomendaciones de reposición

## Integración con sponsors

Vincula productos con sponsors:
- Logo del sponsor en ficha de producto
- Mención en descripción
- Link a web del sponsor
- Tracking de conversiones para reportes

## Etiquetas de productos

Clasifica productos con tags:
- "Nuevo"
- "Limitado"
- "Agotándose"
- "Exclusivo"
- "Vegano"
- "Eco-friendly"

## Estados de producto

- ✅ **Disponible**: Hay stock, visible en tienda
- ⚠️ **Fuera de stock**: No hay stock, NO visible
- 🟡 **Próximamente**: Anunciado pero aún no disponible
- 🔴 **Descatalogado**: No se vende más

## Filtros y búsqueda

### En el listado de productos
- Por categoría
- Por estado (disponible/agotado)
- Por canal (sincronizado vs. manual)
- Por sponsor
- Ordenar por: precio, ventas, fecha, nombre

### Búsqueda
- Por nombre
- Por SKU
- Por tags
