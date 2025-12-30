---
title: Email
description: Configura las opciones del canal de email
---

Personaliza cómo funcionan los emails enviados desde Nevent.

## Acceder a configuración de email

1. Ve a **Configuración** → **Comunicación** → **Email**
2. Verás las opciones disponibles para el canal de email

## Opciones disponibles

### Emails en copia (CC)

Añade direcciones de email que recibirán copia de todas las comunicaciones enviadas desde Nevent.

**¿Para qué sirve?**

- Mantener un archivo de todas las comunicaciones en otra bandeja
- Que tu equipo de marketing reciba copia de campañas
- Supervisar las comunicaciones automáticas
- Integrar con sistemas externos que leen emails

**Cómo configurar:**

1. Introduce una o varias direcciones de email separadas por comas
2. Haz clic en **Guardar**

**Formato:**
```
marketing@tuorganizacion.com, archivo@tuorganizacion.com
```

**Ejemplo:**
```
comunicacion@festivalelectronica.com, ceo@festivalelectronica.com
```

:::caution[Privacidad]
Las direcciones en CC recibirán **todos** los emails enviados desde Nevent, incluyendo comunicaciones transaccionales con datos personales de usuarios. Asegúrate de que las personas que reciban estos emails tengan autorización para acceder a esta información.
:::

### Configuración adicional

**Remitente predeterminado**

El nombre y email que aparecerá como remitente en tus comunicaciones se configura en la sección **[Tu marca](/brand/brand-settings/)**.

**Plantillas de email**

Las plantillas visuales de tus emails se configuran en la sección **Plantillas** (próximamente documentado).

## Mejores prácticas

### Usa emails corporativos

**Recomendado:**
- ✅ `comunicacion@tuorganizacion.com`
- ✅ `marketing@tuorganizacion.com`

**No recomendado:**
- ❌ Emails personales (gmail, hotmail)
- ❌ Emails genéricos tipo `info@` o `contacto@` que reciben spam

### Limita el número de direcciones en CC

Cada dirección en CC genera una copia adicional. Para alto volumen de emails, considera:

- Usar un email compartido en lugar de múltiples individuales
- Configurar reglas de filtrado en tu cliente de email
- Usar herramientas de archivo de emails externas

### Revisa la configuración periódicamente

Actualiza las direcciones en CC cuando:
- Cambie tu equipo de marketing
- Termine una campaña que requería supervisión especial
- Cambien los responsables de comunicación

## Casos de uso comunes

### Festival que archiva todas las comunicaciones

```
archivo@festivalsonar.com
```

**Razón:** Compliance y auditoría. Mantener registro de todas las comunicaciones enviadas.

### Sala con equipo de marketing

```
marketing@salaapolo.com, direccion@salaapolo.com
```

**Razón:** El equipo de marketing supervisa campañas y la dirección revisa comunicaciones importantes.

### Promotora con CRM externo

```
crm+import@promotora.com
```

**Razón:** El CRM externo procesa emails automáticamente para sincronizar datos.

### Club que coordina con booking

```
comunicacion@club.com, booking@club.com
```

**Razón:** El equipo de booking necesita ver las comunicaciones sobre eventos para coordinar con artistas.

## Solución de problemas

### No llegan las copias a la dirección CC

**Posibles causas:**

1. **Formato incorrecto**
   - Verifica que no haya espacios extra
   - Usa comas para separar múltiples emails
   - Ejemplo correcto: `email1@domain.com,email2@domain.com`

2. **Filtros de spam**
   - Los emails pueden estar llegando a la carpeta de spam
   - Añade el dominio de Nevent a tu lista de remitentes seguros
   - Verifica las reglas de tu servidor de email

3. **Límites del servidor**
   - Algunos servidores bloquean alto volumen de emails
   - Contacta a tu proveedor de email corporativo

### Quiero recibir solo ciertos tipos de emails

Actualmente, las direcciones en CC reciben **todos** los emails.

**Alternativas:**
- Configura reglas de filtrado en tu cliente de email (Gmail, Outlook)
- Usa direcciones de email con filtros automáticos (`+campañas`, `+transaccional`)
- Crea una dirección de archivo y filtra desde ahí

### Los emails en CC afectan la entregabilidad

No, los emails en CC se envían como BCC (copia oculta ciega) para no afectar:
- La privacidad de los destinatarios
- Las tasas de entregabilidad
- La reputación del dominio

## Límites y restricciones

- **Máximo de direcciones CC:** 10 direcciones
- **Formato requerido:** Emails válidos separados por comas
- **Tipo de copia:** BCC (los destinatarios no ven las direcciones en CC)

:::note[Coste]
Los emails enviados a direcciones en CC **no** cuentan como emails adicionales en tu facturación. Son copias del mismo email.
:::
