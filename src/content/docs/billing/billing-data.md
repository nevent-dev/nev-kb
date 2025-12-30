---
title: Datos de facturación
description: Configura la información fiscal de tu organización para generar facturas
---

Introduce los datos fiscales de tu organización para que las facturas de Nevent se generen correctamente.

## Acceder a datos de facturación

1. Ve a **Configuración** → **Facturación** → **Datos de facturación**
2. Completa todos los campos obligatorios
3. Haz clic en **Guardar**

## Campos requeridos

### Tipo de entidad

Selecciona el tipo de organización:

**Empresa (persona jurídica):**
- SL (Sociedad Limitada)
- SA (Sociedad Anónima)
- SLU (Sociedad Limitada Unipersonal)
- Cooperativa
- Asociación
- Fundación

**Autónomo (persona física):**
- Empresario individual
- Profesional autónomo

:::tip[¿Cuál elijo?]
Si tienes CIF (empieza con letra): Empresa
Si tienes NIF/DNI (número + letra al final): Autónomo
:::

### Razón social / Nombre fiscal

**Para empresas:**
Denominación social completa tal como aparece en el registro mercantil.

**Ejemplos:**
```
FESTIVAL SÓNAR, S.L.
```
```
PROMOTORA EVENTOS MUSICALES BARCELONA S.L.U.
```
```
ASOCIACIÓN CULTURAL MÚSICA ELECTRÓNICA
```

**Para autónomos:**
Tu nombre completo.

**Ejemplo:**
```
Juan Pérez Martínez
```

:::caution[Debe coincidir exactamente]
La razón social debe coincidir EXACTAMENTE con tus documentos fiscales. Las facturas se generan con este nombre.
:::

### NIF/CIF

Número de identificación fiscal.

**Formato España:**
- **CIF (empresas):** Letra + 8 dígitos
  - Ejemplo: `B12345678`
  - Sin espacios, sin guiones

- **NIF (autónomos):** 8 dígitos + letra
  - Ejemplo: `12345678A`
  - Sin espacios, sin guiones

**VAT ID (otros países UE):**
- Código de país + número VAT
  - Ejemplo: `FR12345678901` (Francia)
  - Ejemplo: `DE123456789` (Alemania)
  - Ejemplo: `IT12345678901` (Italia)

:::note[Validación automática]
Nevent valida automáticamente el formato del NIF/CIF y verifica que esté activo en el registro de la Agencia Tributaria.
:::

### Dirección fiscal

Domicilio fiscal completo de tu organización.

**Calle y número:**
```
Calle Nou de la Rambla, 113
```

**Piso, puerta (opcional):**
```
2º 3ª
```

**Código postal:**
```
08004
```

**Ciudad:**
```
Barcelona
```

**Provincia/Estado:**
```
Barcelona
```

**País:**
```
España
```

:::caution[Debe coincidir con Hacienda]
La dirección fiscal debe coincidir con la registrada en Hacienda. Será la que aparezca en todas tus facturas.
:::

### Email de facturación

Email donde quieres recibir las facturas.

**Puede ser:**
- Email de administración: `admin@tuorganizacion.com`
- Email de contabilidad: `contabilidad@tuorganizacion.com`
- Email del gestor: `gestor@asesoria.com`

**Recomendación:** Usa un email de equipo (no personal) para asegurar continuidad.

:::tip[Múltiples destinatarios]
Puedes añadir múltiples emails separados por comas:
```
contabilidad@tuorg.com, gestor@asesoria.com
```
:::

## Campos opcionales

### Teléfono de contacto

Teléfono para temas de facturación.

**Formato:**
```
+34 932 123 456
```

**Útil para:**
- Consultas urgentes de facturación
- Verificación de pagos
- Contacto en caso de incidencias

### Registro mercantil

Solo para empresas (SL, SA, etc.)

**Información a incluir:**
```
Registro Mercantil de Barcelona, Tomo 45678, Folio 123, Hoja B-654321, Inscripción 1ª
```

**¿Dónde encontrarlo?**
- Escritura de constitución de la empresa
- Nota simple del Registro Mercantil
- Certificado de la empresa

**¿Es obligatorio?**
- No es obligatorio para facturas
- Sí es obligatorio para algunos trámites oficiales
- Recomendado incluirlo para mayor formalidad

### Nombre comercial

Si tu nombre comercial es diferente de la razón social.

**Ejemplo:**
- Razón social: `PROMOTORA EVENTOS MUSICALES BARCELONA S.L.`
- Nombre comercial: `Sonar Festival`

:::note[Aparece en facturas]
Si completas el nombre comercial, aparecerá en las facturas como:
```
PROMOTORA EVENTOS MUSICALES BARCELONA S.L.
(Sonar Festival)
```
:::

## Validación de datos

Cuando guardas, Nevent valida:

### Formato de NIF/CIF

**España:**
- CIF: Verifica letra inicial y dígito de control
- NIF: Verifica formato y letra de control

**UE:**
- VAT ID: Verifica formato según país
- Consulta base de datos VIES para confirmar validez

### Dirección fiscal

- Código postal existe y corresponde a la ciudad
- País válido

### Email

- Formato válido
- Dominio existe (verifica DNS)

:::caution[Datos incorrectos]
Si los datos no son válidos, no podrás guardar. Verifica y corrige los errores marcados en rojo.
:::

## Casos especiales

### Facturas a nombre de tercero

Si la factura debe ir a nombre de otra empresa (matriz, holding, etc.):

1. Introduce los datos de la empresa que debe aparecer en la factura
2. Añade tu email en "Email de facturación"
3. En "Observaciones" indica: "Pago realizado por [tu empresa]"

### Cambio de razón social

Si cambiaste el nombre de la empresa:

1. Actualiza "Razón social" con el nuevo nombre
2. Actualiza NIF/CIF si cambió
3. Actualiza datos de registro mercantil

**Facturas anteriores:**
- Siguen siendo válidas con la razón social antigua
- Las nuevas facturas usarán la razón social actualizada

### Empresas extranjeras

**Dentro de UE:**
- Introduce VAT ID en formato de tu país
- Verifica que esté activo en VIES
- Reverse charge: No se carga IVA español

**Fuera de UE:**
- Introduce número fiscal de tu país
- No se carga IVA
- Pueden aplicar impuestos locales

## Facturación rectificativa

### Cambiar datos después de emitir factura

Si detectas un error en los datos DESPUÉS de que se emitió una factura:

**Opción 1: Factura rectificativa**
1. Contacta a facturacion@nevent.es
2. Indica qué datos son incorrectos
3. Proporcionamos factura rectificativa

**Opción 2: Nota de crédito**
- Anulamos la factura incorrecta
- Emitimos nueva factura con datos correctos

:::caution[No edites después de emitir]
Una vez emitida una factura, NO puedes simplemente cambiar los datos en configuración. Necesitas factura rectificativa formal.
:::

## Mejores prácticas

### Verifica antes de guardar

Revisa cuidadosamente:
- ✅ Razón social exacta (copia del CIF oficial)
- ✅ NIF/CIF sin espacios ni guiones
- ✅ Dirección completa y correcta
- ✅ Email de contabilidad activo

### Actualiza cuando sea necesario

Revisa y actualiza si:
- Cambias de domicilio fiscal
- Cambias de razón social
- Cambias de gestor/contable (actualiza email)
- Cambias de número de teléfono

### Guarda una copia

Guarda los datos de facturación en:
- Documento Word/PDF con todos los datos fiscales
- Sistema de gestión documental
- Email al gestor con los datos confirmados

## Ejemplos completos

### Ejemplo 1: Empresa (SL)

```
Tipo de entidad: Sociedad Limitada (SL)
Razón social: FESTIVAL SÓNAR, S.L.
Nombre comercial: Sónar
CIF: B12345678
Dirección: Calle Nou de la Rambla, 113
Piso: —
Código postal: 08004
Ciudad: Barcelona
Provincia: Barcelona
País: España
Email facturación: contabilidad@sonar.es, gestor@asesoria.com
Teléfono: +34 932 892 244
Registro mercantil: R.M. Barcelona, T. 45678, F. 123, H. B-654321
```

### Ejemplo 2: Autónomo

```
Tipo de entidad: Autónomo
Nombre fiscal: María López García
NIF: 12345678A
Dirección: Calle Valencia, 234, 3º 2ª
Código postal: 08007
Ciudad: Barcelona
Provincia: Barcelona
País: España
Email facturación: maria.lopez@djproducer.com
Teléfono: +34 600 123 456
```

### Ejemplo 3: Asociación

```
Tipo de entidad: Asociación
Razón social: ASOCIACIÓN CULTURAL MÚSICA ELECTRÓNICA
CIF: G12345678
Dirección: Calle Bailén, 56
Código postal: 08010
Ciudad: Barcelona
Provincia: Barcelona
País: España
Email facturación: tesoreria@asociacion.org
Teléfono: +34 931 234 567
Registro: Registro de Asociaciones de la Generalitat, nº 12345
```

### Ejemplo 4: Empresa UE (Alemania)

```
Tipo de entidad: GmbH (equivalente SL)
Razón social: Techno Events Berlin GmbH
VAT ID: DE123456789
Dirección: Warschauer Str. 34
Código postal: 10243
Ciudad: Berlin
País: Alemania
Email facturación: buchhaltung@technoberlin.de
Teléfono: +49 30 1234567
```

## Solución de problemas

### El NIF/CIF no valida

**Posibles causas:**

1. **Formato incorrecto**
   - Verifica que no tenga espacios: `B 12345678` ❌ → `B12345678` ✅
   - Verifica que no tenga guiones: `B-12345678` ❌ → `B12345678` ✅

2. **NIF/CIF no existe**
   - Verifica que lo copiaste correctamente de tu documentación oficial
   - Para empresas recién constituidas, puede tardar 24-48h en aparecer en sistema

3. **NIF/CIF inactivo**
   - Contacta a tu gestor para verificar que esté activo en Hacienda

**Solución:**
- Copia el NIF/CIF exactamente desde tu documentación oficial
- Quita espacios, guiones, puntos
- Si el problema persiste: facturacion@nevent.es

### No recibo las facturas por email

**Posibles causas:**

1. **Email incorrecto**
   - Verifica que el email en "Email de facturación" es correcto
   - Verifica que no tenga espacios ni typos

2. **Llega a spam**
   - Busca en carpeta de spam/correo no deseado
   - Añade `facturas@nevent.es` a contactos seguros

3. **Buzón lleno**
   - Verifica que tu buzón tiene espacio

**Solución:**
- Siempre puedes descargar facturas desde Configuración → Facturación → Facturas
- Añade `facturas@nevent.es` a la lista blanca de tu email

### Necesito cambiar datos en factura ya emitida

No puedes editar facturas ya emitidas. Contacta a facturacion@nevent.es para:
- Emisión de factura rectificativa
- Anulación y re-emisión

### ¿Puedo tener varias direcciones de facturación?

No directamente, pero puedes:
- Mantener una dirección principal
- Para eventos específicos con facturación diferente, contacta a facturacion@nevent.es

## Requisitos legales

### España

**Factura válida debe incluir:**
- Razón social completa ✅
- NIF/CIF ✅
- Dirección fiscal completa ✅
- Número de factura ✅ (generado automáticamente)
- Fecha de emisión ✅ (automática)
- Base imponible, IVA y total ✅ (automático)

**Conservación:**
- Debes conservar facturas 6 años (obligación fiscal)
- Nevent las mantiene disponibles indefinidamente en tu panel

### Otros países UE

Requisitos similares, consulta con tu gestor fiscal local.

:::tip[Consulta con tu gestor]
Si tienes dudas sobre qué datos introducir o cómo completar algún campo, consulta con tu gestor fiscal o contable. Ellos conocen tus datos oficiales exactos.
:::
