---
title: Facturas
description: Consulta, descarga y gestiona las facturas de tu suscripción
---

Accede a todas las facturas de tu suscripción a Nevent, descárgalas en PDF y gestiona tu historial de pagos.

## Acceder a facturas

1. Ve a **Configuración** → **Facturación** → **Facturas**
2. Verás la lista completa de todas tus facturas

## Información de cada factura

En la tabla de facturas verás:

### Número de factura

Identificador único de la factura.

**Formato:**
```
2024-03-001234
```

- `2024-03`: Año y mes de emisión
- `001234`: Número secuencial

### Fecha de emisión

Cuando se generó la factura.

**Ejemplo:**
```
15/03/2024
```

Las facturas se emiten:
- **Plan mensual:** El mismo día cada mes
- **Plan anual:** Una vez al año en la fecha de renovación

### Concepto

Descripción de qué se está facturando.

**Ejemplos:**

**Suscripción mensual:**
```
Suscripción Plan Pro - Marzo 2024
```

**Suscripción anual:**
```
Suscripción Plan Enterprise - Año 2024/2025
```

**Upgrade con prorrateo:**
```
Upgrade Plan Pro - Prorrateo 15-31 Marzo 2024
```

**Créditos SMS:**
```
Créditos SMS - 1,000 unidades
```

**Usuarios adicionales:**
```
3 usuarios adicionales - Marzo 2024
```

### Importe

Total de la factura.

**Desglose:**
- Base imponible (sin IVA)
- IVA (21% en España)
- Total

**Ejemplo:**
```
Base: 81.82€
IVA (21%): 17.18€
Total: 99.00€
```

:::note[IVA incluido en precios]
Los precios mostrados en Nevent siempre incluyen IVA. En la factura verás el desglose.
:::

### Estado

Estado del pago de la factura.

**Estados posibles:**

**Pagado ✅**
- Pago procesado correctamente
- Factura válida
- Todo correcto

**Pendiente ⏳**
- Pago aún no procesado
- Domiciliación SEPA: Tarda 5-7 días laborables
- Factura provisional hasta confirmación de pago

**Fallido ❌**
- Pago rechazado
- Puede ser por fondos insuficientes, tarjeta caducada, etc.
- Requiere acción

**Reembolsado 🔄**
- Pago devuelto
- Por cancelación, upgrade/downgrade, etc.
- Se ha emitido nota de crédito

### Acciones

Botones para gestionar cada factura.

**Descargar PDF**
- Descarga factura completa en PDF
- Válida para contabilidad y desgravaciones
- Formato estándar oficial

**Ver detalles**
- Información completa de la factura
- Desglose de conceptos
- Datos de pago

**Solicitar rectificativa** (si hay error)
- Contacto directo con facturación
- Para corregir datos

## Descargar facturas

### Descargar factura individual

1. Busca la factura en la lista
2. Haz clic en **Descargar PDF**
3. Se descarga automáticamente

**Formato del archivo:**
```
Factura_2024-03-001234_Festival_Sonar.pdf
```

### Descargar múltiples facturas

Para descargar facturas de varios meses:

1. Selecciona las facturas (checkbox)
2. Haz clic en **Descargar seleccionadas**
3. Se genera un ZIP con todos los PDFs

**Útil para:**
- Cierre anual contable
- Auditorías
- Presentación a gestor

### Enviar facturas por email

Si necesitas reenviar una factura:

1. Haz clic en **⋮** → **Reenviar por email**
2. Introduce email de destino
3. Haz clic en **Enviar**

**Útil para:**
- Enviar a nuevo gestor/contable
- Reenviar si se perdió el email original
- Compartir con departamento de finanzas

## Contenido de la factura PDF

### Header

```
FACTURA

Número: 2024-03-001234
Fecha: 15/03/2024
```

### Datos del emisor (Nevent)

```
NEVENT TECHNOLOGIES, S.L.
CIF: B-12345678
Calle Ejemplo, 123, 08001 Barcelona
Email: facturacion@nevent.es
Teléfono: +34 932 123 456
```

### Datos del cliente (tu organización)

```
FESTIVAL SÓNAR, S.L.
CIF: B-87654321
Calle Nou de la Rambla, 113
08004 Barcelona, España
```

### Detalle de conceptos

```
CONCEPTO                            CANTIDAD   PRECIO    IMPORTE
Suscripción Plan Pro - Marzo 2024        1     81.82€    81.82€

                                    BASE IMPONIBLE:      81.82€
                                    IVA (21%):           17.18€
                                    TOTAL:               99.00€
```

### Método de pago

```
Método de pago: Tarjeta •••• 1234
Estado: Pagado
Fecha de pago: 15/03/2024
```

### Información adicional

```
Forma de pago: Tarjeta de crédito
Vencimiento: Al recibo
```

:::tip[Conserva tus facturas]
Guarda todas las facturas en tu carpeta de contabilidad. Son deducibles como gasto de software/marketing y debes conservarlas 6 años.
:::

## Filtrar y buscar facturas

### Por fecha

**Mes específico:**
1. Selecciona mes y año en el filtro
2. Se muestran solo facturas de ese periodo

**Rango de fechas:**
1. Haz clic en "Rango personalizado"
2. Selecciona fecha inicio y fin
3. Haz clic en **Aplicar**

**Útil para:**
- Cierre mensual
- Declaración trimestral IVA
- Cierre anual

### Por estado

**Filtrar por:**
- ✅ Solo pagadas
- ⏳ Solo pendientes
- ❌ Solo fallidas
- 🔄 Solo reembolsadas

**Útil para:**
- Verificar pagos pendientes
- Revisar pagos fallidos que requieren acción

### Por importe

**Filtros:**
- Menor de X€
- Mayor de X€
- Entre X€ y Y€

**Útil para:**
- Facturas superiores a X€ para auditoría
- Pequeños cargos (créditos SMS, etc.)

### Búsqueda por número

Introduce número de factura completo o parcial:

**Ejemplos:**
- `2024-03-001234` (número completo)
- `2024-03` (todas las facturas de marzo 2024)
- `001234` (por número secuencial)

## Notas de crédito

### ¿Qué es una nota de crédito?

Documento que anula total o parcialmente una factura.

**Se emite cuando:**
- Reembolso por cancelación
- Corrección de error en factura
- Descuento o promoción aplicada a posteriori
- Downgrade de plan (crédito para siguientes meses)

**Formato:**
```
NC-2024-03-000123
```

**Aparece en tu historial como:**
```
Nota de crédito - Reembolso por cancelación
Importe: -99.00€
```

### Cómo se aplica

**Reembolso directo:**
- Se devuelve el importe a tu método de pago
- Tarda 5-10 días laborables

**Crédito en cuenta:**
- Se resta del próximo cargo
- Ejemplo: Nota de crédito 50€, próximo cargo 99€ → pagas 49€

## Facturas rectificativas

### ¿Cuándo se necesita?

Si hay un error en la factura después de emitida:

**Errores comunes:**
- Razón social incorrecta
- NIF/CIF incorrecto
- Dirección fiscal errónea
- Importe incorrecto

:::caution[No puedes editarla tú]
Una factura ya emitida NO se puede editar directamente. Se requiere procedimiento oficial de rectificación.
:::

### Proceso

1. Contacta a facturacion@nevent.es
2. Indica:
   - Número de factura a rectificar
   - Qué datos son incorrectos
   - Cuáles son los datos correctos
3. Nevent emite factura rectificativa
4. Se anula la factura original
5. Recibes nueva factura corregida

**Plazo:** 3-5 días laborables

## Historial de pagos

Además de las facturas, puedes ver el historial completo de pagos:

### Acceder

1. Ve a **Configuración** → **Facturación** → **Historial de pagos**

### Información mostrada

**Por cada pago:**
- Fecha y hora exacta
- Método de pago usado
- Estado (exitoso, fallido, reembolsado)
- Importe
- Factura asociada (enlace)

**Útil para:**
- Reconciliación bancaria
- Verificar si un pago se procesó
- Historial completo para auditorías

## Exportar datos de facturación

Para tu contabilidad o ERP:

### Exportar a Excel/CSV

1. Ve a **Facturas**
2. Selecciona las facturas a exportar (o todas)
3. Haz clic en **Exportar** → **CSV** o **Excel**

**Formato del archivo:**

```csv
Número,Fecha,Concepto,Base,IVA,Total,Estado
2024-03-001234,15/03/2024,Suscripción Plan Pro,81.82,17.18,99.00,Pagado
2024-02-001233,15/02/2024,Suscripción Plan Pro,81.82,17.18,99.00,Pagado
```

**Útil para:**
- Importar a software de contabilidad
- Análisis de gastos en Excel
- Presentar a gestor/contable

### Exportar a PDF consolidado

Para generar un único PDF con todas las facturas del año:

1. Filtra por año (ej: 2024)
2. Haz clic en **Exportar** → **PDF consolidado**
3. Se genera un PDF con todas las facturas una detrás de otra

**Útil para:**
- Auditorías
- Presentación a bancos
- Archivo anual

## Automatización

### Email automático

Cada vez que se emite una factura:
- Se envía automáticamente a tu "Email de facturación"
- Incluye PDF adjunto
- Asunto: `Factura 2024-03-001234 - Nevent`

**Configurar:**
1. Ve a **Datos de facturación**
2. Actualiza "Email de facturación"
3. Guarda

### Notificaciones

Puedes activar notificaciones para:
- ✅ Nueva factura emitida
- ⚠️ Pago fallido
- 💳 Tarjeta próxima a caducar
- 📧 Factura rectificativa disponible

**Configurar:**
1. Ve a **Configuración** → **Notificaciones**
2. Activa "Notificaciones de facturación"

### Integración con contabilidad

Para automatizar la importación a tu software contable:

**API de Nevent:**
- Endpoint: `/api/billing/invoices`
- Formato: JSON
- Autenticación: API Key

**Zapier/Make:**
- Trigger: "Nueva factura en Nevent"
- Action: "Crear asiento en [tu software]"

Contacta a api@nevent.es para documentación.

## Problemas comunes

### No encuentro una factura

**Posibles causas:**

1. **Filtros activos**
   - Revisa filtros de fecha, estado, etc.
   - Haz clic en "Limpiar filtros"

2. **Factura de otro periodo**
   - Amplía el rango de fechas
   - Usa búsqueda por número de factura

3. **Pago aún no procesado**
   - Domiciliaciones SEPA tardan 5-7 días
   - Factura aparecerá como "Pendiente" hasta entonces

### El PDF no se descarga

**Solución:**
1. Verifica que permites descargas en tu navegador
2. Prueba en modo incógnito
3. Prueba desde otro navegador
4. Contacta a soporte si persiste

### El importe es diferente al esperado

**Puede ser por:**

1. **Prorrateo en cambio de plan**
   - Solo pagas diferencia hasta final de ciclo
   - Ver detalles de factura para desglose

2. **Créditos SMS u otros extras**
   - Revisa conceptos en el detalle

3. **IVA incluido vs excluido**
   - Los precios en Nevent incluyen IVA
   - En factura ves desglose (base + IVA)

4. **Descuentos o promociones**
   - Cupones aplicados restan del total
   - Ver línea "Descuento" en factura

### Datos fiscales incorrectos

Si los datos en la factura son incorrectos:
1. NO edites los datos de facturación y listo
2. Contacta a facturacion@nevent.es
3. Solicita factura rectificativa

## Facturación para autónomos

### Deducción de gastos

La suscripción a Nevent es deducible como gasto:

**Categoría:**
- 629 - Otros servicios
- Software de gestión / Marketing digital

**% deducible:**
- 100% si uso profesional exclusivo
- Proporcional si uso mixto

**Documentación:**
- Factura PDF de Nevent
- Justificante de pago (extracto bancario)

:::tip[Consulta con tu gestor]
La deducibilidad puede variar según tu actividad. Consulta con tu gestor fiscal.
:::

### Declaración trimestral IVA

Para tu modelo 303 (IVA):

**IVA soportado:**
- Descarga facturas del trimestre
- Suma el IVA de todas (columna "IVA")
- Inclúyelo en tu declaración

**Ejemplo:**
```
Enero: 17.18€
Febrero: 17.18€
Marzo: 17.18€
Total IVA soportado: 51.54€
```

### Declaración anual

Para tu declaración de la renta:

**Importe total del año:**
1. Filtra facturas del año fiscal
2. Exporta a Excel
3. Suma columna "Base" (sin IVA)
4. Incluye en gastos deducibles

## Recursos adicionales

**Soporte de facturación:**
- Email: facturacion@nevent.es
- Horario: L-V 9:00-18:00 CET

**Consultas técnicas:**
- Chat en vivo (desde el panel)

**API de facturación:**
- Documentación: api.nevent.es/docs/billing

:::tip[Organiza tus facturas]
Crea una carpeta "Nevent Facturas 2024" y guarda ahí todos los PDFs mensuales. Facilitará tu cierre contable.
:::
