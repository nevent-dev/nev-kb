---
title: Comisiones
description: Configura estructura de comisiones en ventas de entradas
---

Define comisiones personalizadas para promotores, afiliados o partners que venden entradas por ti.

## ¿Qué son las comisiones?

Sistema que te permite compartir revenue con terceros que te ayudan a vender entradas.

**Ejemplo básico:**
- Promotor vende entrada de 50€
- Comisión configurada: 10%
- Promotor recibe: 5€
- Tú recibes: 45€

## Casos de uso

### Promotores externos

**Escenario:** Trabajas con promotores locales que venden entradas de tu festival en su ciudad.

**Solución:**
- Cada promotor tiene código único
- Comisión del 15% por entrada vendida
- Seguimiento en tiempo real

### Programa de afiliados

**Escenario:** Influencers y bloggers promocionan tu evento.

**Solución:**
- Código de descuento personalizado por afiliado
- Comisión del 5% por venta con su código
- Dashboard para que vean sus ventas

### Puntos de venta físicos

**Escenario:** Tiendas de discos venden entradas físicamente.

**Solución:**
- Comisión fija de 3€ por entrada
- Liquidación mensual automática
- Gestión de stock

### Partnerships estratégicos

**Escenario:** Partner corporativo vende entradas a sus empleados.

**Solución:**
- Descuento del 20% para empleados
- Partner recibe comisión del 10%
- Facturación separada

## Acceder a comisiones

1. Ve a **Configuración** → **Avanzado** → **Comisiones**
2. Haz clic en **Activar sistema de comisiones**

:::note[Plan Enterprise]
El sistema de comisiones está disponible solo en Plan Enterprise. Contacta a sales@nevent.es para activarlo.
:::

## Crear estructura de comisiones

### Paso 1: Definir modelo

Elige el modelo que mejor se adapte:

**Porcentaje fijo**
- X% de cada venta
- Ejemplo: 10% de todas las ventas
- Simple y transparente

**Importe fijo**
- X€ por entrada vendida
- Ejemplo: 3€ por entrada, independiente del precio
- Predecible

**Escalonado por volumen**
- Comisión aumenta según volumen
- Ejemplo:
  - 1-50 entradas: 5%
  - 51-100 entradas: 7%
  - 100+ entradas: 10%
- Incentiva mayor volumen

**Personalizado por producto**
- Comisión diferente según tipo de entrada
- Ejemplo:
  - Early bird: 15%
  - General: 10%
  - VIP: 5%
- Máxima flexibilidad

### Paso 2: Crear promotor/afiliado

1. Ve a **Comisiones** → **Promotores**
2. Haz clic en **+ Nuevo promotor**
3. Completa datos:

**Información básica:**
- Nombre: `María García - Promotora Madrid`
- Email: `maria@promoraevents.com`
- Teléfono: `+34 600 123 456`
- CIF/NIF: `12345678A` (para facturación)

**Estructura de comisiones:**
- Modelo: Porcentaje fijo
- Valor: `10%`

**Código de promotor:**
- Autogenerado: `MARIA-MAD`
- O personalizado: `MADRID2024`

### Paso 3: Generar enlace de afiliado

Nevent genera automáticamente:

**Enlace único:**
```
https://eventos.tudominio.com/festival-verano?ref=MARIA-MAD
```

**Código de descuento (opcional):**
```
MARIA10
```
(Descuento del 10% + tracking de comisión)

### Paso 4: Compartir con promotor

Envía al promotor:
1. Su enlace único de afiliado
2. Código de descuento (si aplica)
3. Materiales de promoción
4. Dashboard de acceso (opcional)

## Dashboard del promotor

Cada promotor puede acceder a su dashboard:

### Ver ventas en tiempo real

```
Ventas hoy: 12 entradas (600€)
Comisión ganada: 60€

Ventas totales: 145 entradas (7,250€)
Comisión total: 725€
```

### Estadísticas

- Conversión (clics → ventas)
- Entradas por día
- Revenue generado
- Top eventos

### Materiales de promoción

- Banners descargables
- Copy para redes sociales
- Imágenes del evento
- Enlaces cortos

## Liquidación de comisiones

### Configurar calendario

**Frecuencia de pago:**
- Mensual (recomendado)
- Por evento
- Cuando alcance X€

**Método de pago:**
- Transferencia bancaria
- PayPal
- Domiciliación SEPA

**Condiciones:**
- Mínimo a pagar: 50€ (configurable)
- Plazo: 30 días tras final de mes/evento
- IVA aplicable según jurisdicción

### Proceso automático

**Día 1 del mes:**
1. Nevent calcula comisiones del mes anterior
2. Genera informe por promotor
3. Envía email con resumen

**Promotor:**
1. Revisa informe
2. Acepta o solicita aclaración
3. Emite factura (si procede)

**Día 30:**
1. Nevent procesa pago
2. Marca comisión como pagada
3. Envía confirmación

### Informes de comisiones

**Descargar:**
1. Ve a **Comisiones** → **Informes**
2. Selecciona periodo
3. Descarga Excel o PDF

**Contenido:**
- Promotor
- Entradas vendidas
- Revenue generado
- Comisión ganada
- Estado de pago

## Códigos de descuento con tracking

Combina descuentos con comisiones:

**Configurar:**
1. Ve a **Comisiones** → Promotor → **Crear código**
2. Código: `MADRID10`
3. Descuento: 10%
4. Asignar comisión: 5% (sobre precio final)

**Resultado:**
- Fan usa código `MADRID10`
- Obtiene 10% descuento
- Promotor recibe 5% del precio con descuento
- Se trackea automáticamente

## Reglas avanzadas

### Comisión escalonada

```
Volumen         Comisión
1-50 entradas   5%
51-100          7%
101-200         10%
200+            12%
```

**Cómo funciona:**
- Promotor vende 150 entradas
- Primeras 50: 5% cada una
- Siguientes 50: 7% cada una
- Últimas 50: 10% cada una

### Comisión por tipo de entrada

```
Entrada         Precio    Comisión
Early Bird      45€       15% (6.75€)
General         60€       10% (6.00€)
VIP             150€      5% (7.50€)
```

**Por qué:** Incentivas venta de early birds (mayor comisión) pero evitas dar comisión alta en VIP (ya caro).

### Override manual

Para casos especiales:

**Ejemplo:** Promotor cerró grupo grande, negocias comisión especial.

1. Ve a Promotor → **Comisiones** → **Override**
2. Para venta específica, cambia comisión
3. Añade nota explicativa

## Facturación de comisiones

### Promotor autónomo/empresa

**Promotor emite factura:**
1. Al final del mes, envía factura por comisiones ganadas
2. Tú pagas contra factura
3. Registro contable normal

**Datos a incluir en factura:**
- Concepto: "Comisión ventas Festival Verano 2024"
- Base: 100€
- IVA (21%): 21€
- Total: 121€

### Retención IRPF

Si el promotor es autónomo español:
- Aplica retención del 15% en factura
- Ejemplo: Base 100€ → Retención 15€ → Cobro 85€ (+ IVA)

### Extranjeros

Promotores fuera de España:
- Sin IVA español (reverse charge o exento)
- Puede aplicar IVA de su país
- Verifica normativa específica

## Prevención de fraude

### Validación de ventas

Nevent valida automáticamente:
- IP del comprador
- No permite auto-compras del promotor
- Límite de compras por IP/email
- Bloquea patrones sospechosos

### Reglas anti-fraude

**Configurar:**
1. Ve a **Comisiones** → **Seguridad**
2. Activa validaciones:
   - ✅ Bloquear auto-compras
   - ✅ Límite 5 compras/IP en 24h
   - ✅ Notificar compras sospechosas

### Auditoría

Todas las ventas se registran con:
- IP del comprador
- User agent
- Timestamp
- Método de pago
- Email del comprador

Si detectas fraude:
1. Ve a **Comisiones** → Promotor → **Suspender**
2. Revisa ventas sospechosas
3. Anula comisión si procede
4. Elimina promotor si necesario

## Analytics

### KPIs por promotor

**Dashboard muestra:**

**Performance:**
- Ventas totales
- Revenue generado
- Tasa de conversión
- Valor medio por venta

**Comparativa:**
- Top performers
- Crecimiento mes a mes
- Comparación con media

**Comportamiento:**
- Fuentes de tráfico
- Horarios de mayor venta
- Dispositivos usados

### Informes

**Exportar datos:**
1. Ve a **Comisiones** → **Analytics**
2. Selecciona métricas
3. Exporta CSV o Excel

**Analizar:**
- ¿Qué promotores generan más revenue?
- ¿Qué canales funcionan mejor?
- ¿Cuál es el CAC (Customer Acquisition Cost)?

## Mejores prácticas

### Comunica claramente

**Al onboarding de promotor:**
- Explica estructura de comisiones
- Define expectativas de pago
- Proporciona materiales

### Sé transparente

**Dashboard del promotor debe mostrar:**
- Ventas en tiempo real
- Comisión calculada
- Estado de pago
- Próximo pago estimado

### Revisa regularmente

**Mensualmente:**
- Analiza performance de promotores
- Identifica oportunidades
- Detecta fraudes potenciales
- Ajusta comisiones si necesario

### Incentiva con bonos

**Ejemplo:**
- Meta: 100 entradas/mes
- Si alcanza: Bonus de 100€ extra
- Si supera 150: Bonus de 250€

**Motiva a promotores a superar sus objetivos.**

### Facilita el pago

**Opciones múltiples:**
- Transferencia bancaria
- PayPal (si prefieren)
- Domiciliación si son recurrentes

**Paga puntualmente:** Genera confianza y lealtad.

## Solución de problemas

### Promotor no ve sus ventas

**Causa:** Ventas no usan su código/enlace.

**Solución:**
- Verifica que compartiste enlace correcto
- Confirma que fans usan su código

### Comisión calculada incorrectamente

**Posibles causas:**
1. Configuración errónea
2. Override manual olvidado
3. Cambio de precio de entrada

**Solución:**
- Revisa configuración de comisión
- Verifica precio de venta vs precio con descuento
- Ajusta manualmente si es error del sistema

### Conflicto en pagos

**Escenario:** Promotor reclama comisión mayor.

**Solución:**
1. Descarga informe detallado
2. Revisa venta por venta
3. Compara con su registro
4. Ajusta si hay error legítimo

## Soporte

Para ayuda con sistema de comisiones:
- Email: comisiones@nevent.es
- Horario: L-V 9:00-18:00 CET
- Plan Enterprise: Soporte prioritario

:::tip[Empieza simple]
No compliques la estructura desde el día 1. Empieza con porcentaje fijo simple (ej: 10%) y ajusta según aprendas qué funciona.
:::
