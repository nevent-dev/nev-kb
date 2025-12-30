---
title: Facturación
description: Gestiona datos fiscales, métodos de pago y facturas
---

Configura la información fiscal de tu organización y gestiona la facturación de tu suscripción a Nevent.

## ¿Qué configuras en esta sección?

- 💳 **Datos de facturación** - Información fiscal para generar facturas
- 📄 **Facturas** - Consulta y descarga facturas de tu suscripción
- 💰 **Método de pago** - Tarjeta o domiciliación bancaria
- 📊 **Plan actual** - Consulta tu plan y uso

## En esta sección

- **[Datos de facturación](/billing/billing-data/)** - Configura razón social, CIF, dirección fiscal
- **[Facturas](/billing/invoices/)** - Consulta y descarga tus facturas

## Cómo funciona la facturación en Nevent

### Planes de suscripción

Nevent ofrece diferentes planes según el tamaño de tu operación:

**Plan Starter** - Para promotoras y salas pequeñas
- Hasta 5,000 contactos
- 1 usuario
- Funcionalidades básicas
- Desde 29€/mes

**Plan Pro** - Para festivales y venues medianos
- Hasta 50,000 contactos
- 5 usuarios
- Integraciones avanzadas
- Analytics completo
- Desde 99€/mes

**Plan Enterprise** - Para organizaciones grandes
- Contactos ilimitados
- Usuarios ilimitados
- Todas las funcionalidades
- Soporte premium
- Pricing personalizado

### Ciclo de facturación

**Mensual:**
- Cargos el mismo día cada mes
- Ejemplo: Si contratas el 15 de marzo, se cargará el 15 de cada mes

**Anual:**
- Pago único anual
- 2 meses gratis (equivalente a 16% descuento)
- Ejemplo: Plan Pro 99€/mes → 990€/año (vs 1,188€ en mensual)

### Qué se factura

**Suscripción base:**
- Cargo fijo mensual/anual según tu plan

**Extras (si aplica):**
- Créditos SMS (0.05€/SMS)
- Usuarios adicionales (10€/usuario/mes)
- Contactos adicionales (variable según plan)
- Integraciones premium

### Impuestos

**España:**
- IVA 21% incluido en precio mostrado

**UE (fuera de España):**
- IVA de tu país si eres particular (reverse charge si eres empresa)

**Fuera de UE:**
- Sin IVA

## Cambios de plan

### Upgrade (cambiar a plan superior)

1. Ve a **Configuración** → **Facturación** → **Plan actual**
2. Haz clic en **Cambiar plan**
3. Selecciona el nuevo plan
4. Confirma el cambio

**¿Cómo se factura?**
- Cambio prorrateado inmediato
- Solo pagas la diferencia hasta el final del ciclo actual
- Ejemplo: Pasas de Starter (29€) a Pro (99€) a mitad de mes
  - Ya pagaste 29€ por el mes completo
  - Diferencia: 70€
  - Prorrateo: 35€ (mitad de mes)
  - Cargo inmediato: 35€
  - Próximo cargo: 99€ (fecha habitual)

### Downgrade (cambiar a plan inferior)

1. Ve a **Configuración** → **Facturación** → **Plan actual**
2. Haz clic en **Cambiar plan**
3. Selecciona el nuevo plan
4. Confirma el cambio

**¿Cómo se factura?**
- El cambio aplica al final del ciclo actual
- No hay cargo ni reembolso hasta el próximo ciclo
- Ejemplo: Pasas de Pro (99€) a Starter (29€) el día 10
  - Sigues en Pro hasta fin de mes
  - El día 1 del próximo mes, cambias a Starter
  - Cargo siguiente: 29€

:::caution[Límites del plan]
Si haces downgrade, asegúrate de estar dentro de los límites del nuevo plan (número de contactos, usuarios, etc.). Si excedes los límites, deberás limpiar datos antes del cambio.
:::

### Cancelar suscripción

1. Ve a **Configuración** → **Facturación** → **Plan actual**
2. Haz clic en **Cancelar suscripción**
3. Indica el motivo (opcional)
4. Confirma la cancelación

**¿Qué pasa con mis datos?**
- Sigues teniendo acceso hasta el final del periodo pagado
- Al finalizar, tu cuenta pasa a modo "solo lectura"
- Puedes exportar tus datos durante 90 días
- Después de 90 días, los datos se eliminan permanentemente

**¿Puedo reactivar?**
- Sí, en cualquier momento durante los 90 días
- Tus datos se mantienen intactos
- Vuelves a facturación normal

## Métodos de pago

### Tarjeta de crédito/débito

**Aceptamos:**
- Visa
- Mastercard
- American Express

**Proceso:**
1. Introduce número de tarjeta
2. Fecha de caducidad
3. CVV
4. Nevent guarda la tarjeta de forma segura (no vemos el número completo)

**Seguridad:**
- Procesamiento vía Stripe (PCI-DSS compliant)
- Tarjeta cifrada
- 3D Secure para mayor protección

### Domiciliación bancaria (SEPA Direct Debit)

**Disponible para:**
- Cuentas bancarias de la zona SEPA (Europa)
- Solo para planes anuales o >100€/mes

**Proceso:**
1. Introduce IBAN
2. Acepta mandato SEPA
3. Primer cargo tarda 5-7 días laborables
4. Siguientes cargos: automáticos

**Ventajas:**
- No caducan (como tarjetas)
- Automático y sin intervención

## Historial de pagos

Ve a **Configuración** → **Facturación** → **Historial**

Verás:
- Fecha de cada cargo
- Importe
- Concepto
- Estado (pagado, pendiente, fallido)
- Factura descargable (PDF)

## Problemas de pago

### Pago rechazado

**Causas comunes:**
- Fondos insuficientes
- Tarjeta caducada
- Tarjeta bloqueada por el banco
- Límite de gasto excedido

**Qué hacer:**
1. Verifica saldo y límites
2. Contacta a tu banco si está bloqueada
3. Actualiza tarjeta en Nevent si caducó
4. Reintenta el pago

**¿Qué pasa si no pago?**
- Día 1: Reintento automático
- Día 3: Email recordatorio
- Día 7: Segundo reintento
- Día 10: Cuenta suspendida (solo lectura)
- Día 30: Cuenta eliminada

:::caution[Suspensión de cuenta]
Durante la suspensión, no puedes enviar campañas ni crear eventos. Tus fans no se ven afectados (pueden seguir comprando entradas de eventos activos).
:::

### Actualizar método de pago

1. Ve a **Configuración** → **Facturación** → **Método de pago**
2. Haz clic en **Actualizar tarjeta** o **Cambiar a domiciliación**
3. Introduce nuevos datos
4. Haz clic en **Guardar**

El nuevo método se usará en el próximo cargo.

## Descuentos y promociones

### Códigos promocionales

Si tienes un código promocional:

1. Ve a **Configuración** → **Facturación** → **Aplicar código**
2. Introduce el código
3. Haz clic en **Aplicar**

**Tipos de descuentos:**
- % de descuento (ej: 20% durante 3 meses)
- Importe fijo (ej: 20€ de descuento)
- Meses gratis (ej: primer mes gratis)

### Programas especiales

**Nevent para Startups:**
- 50% descuento durante 12 meses
- Para startups con menos de 2 años
- Solicita en startups@nevent.es

**Nevent para ONGs:**
- 30% descuento permanente
- Para organizaciones sin ánimo de lucro
- Solicita en nonprofits@nevent.es

**Nevent para Educación:**
- Gratis para instituciones educativas
- Uso académico y de investigación
- Solicita en education@nevent.es

## Facturación para revendedores

Si eres agencia o consultor que gestiona cuentas de múltiples clientes:

**Nevent Partner Program:**
- Facturación consolidada
- Panel multi-cliente
- Comisión por referidos
- Soporte prioritario

Más información: partners@nevent.es

## Cumplimiento fiscal

### España

**Facturas automáticas:**
- Generadas automáticamente cada mes
- Incluyen todos los datos fiscales
- Formato PDF descargable
- Enviadas por email

**Datos incluidos:**
- Razón social del emisor (Nevent)
- CIF emisor
- Razón social del cliente (tu organización)
- CIF/NIF cliente
- Base imponible
- IVA (21%)
- Total

### Otros países UE

**Reverse charge (inversión del sujeto pasivo):**
- Si eres empresa con VAT ID válido
- No se carga IVA español
- Debes auto-liquidar IVA en tu país

**Particulares:**
- Se aplica IVA de tu país

### Fuera de UE

- No se aplica IVA
- Pueden aplicar impuestos locales

## Soporte de facturación

Para consultas sobre facturación:

**Email:** facturacion@nevent.es
**Horario:** L-V 9:00-18:00 (CET)

**Para consultas urgentes:**
- Chat en vivo (desde el panel)
- Soporte prioritario (planes Enterprise)

:::tip[Documenta tus gastos]
Guarda todas las facturas de Nevent en tu contabilidad. Son deducibles como gasto de software/marketing.
:::
