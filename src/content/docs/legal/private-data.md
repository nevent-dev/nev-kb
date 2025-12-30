---
title: Datos privados
description: Configura DPO, representante legal y datos de gestión interna
---

Configura información privada sobre la gestión de datos personales que no se muestra públicamente pero es necesaria para cumplimiento interno.

## ¿Qué son los datos privados?

A diferencia de la información legal pública (aviso legal, políticas), los datos privados son información interna sobre:

- Quién gestiona los datos personales (DPO)
- Quién es el representante legal
- Procedimientos internos de gestión de datos
- Información para auditorías y compliance

**No se muestran públicamente** - Solo se usan internamente y ante requerimientos de autoridades.

## Acceder a datos privados

1. Ve a **Configuración** → **Legal** → **Datos privados**
2. Solo usuarios con rol de Administrador pueden ver y editar

## Campos disponibles

### Delegado de Protección de Datos (DPO)

**¿Qué es el DPO?**

El Data Protection Officer (DPO) o Delegado de Protección de Datos es la persona responsable de supervisar el cumplimiento del RGPD en tu organización.

**¿Cuándo es obligatorio?**

Debes nombrar DPO si:
- Eres autoridad u organismo público
- Tus actividades principales requieren observación habitual y sistemática de interesados a gran escala
- Tratas datos sensibles a gran escala (salud, religión, orientación sexual)

**Para festivales y promotoras:**
- **Grandes festivales** (>50,000 asistentes/año): Recomendado
- **Venues medianos**: Opcional pero recomendable
- **Pequeñas promotoras**: Generalmente no obligatorio

**Información a introducir:**

**Nombre del DPO:**
```
María García López
```

**Email del DPO:**
```
dpo@tuorganizacion.com
```
O email personal si es externo:
```
maria.garcia@consultoria-gdpr.com
```

**Teléfono del DPO (opcional):**
```
+34 600 123 456
```

**Tipo de DPO:**
- ✅ Interno (empleado de tu organización)
- ✅ Externo (consultor o empresa especializada)

:::tip[DPO externo]
Si no tienes suficiente volumen para justificar un DPO interno a tiempo completo, puedes contratar servicios externos de DPO compartido desde ~500€/año.
:::

### Representante Legal

Persona que puede actuar en nombre de la organización en temas legales relacionados con protección de datos.

**Información a introducir:**

**Nombre completo:**
```
Juan Pérez Martínez
```

**Cargo:**
```
Director General
```

**Email:**
```
juan.perez@tuorganizacion.com
```

**Teléfono:**
```
+34 932 123 456
```

**DNI/NIE (solo para registros internos):**
```
12345678A
```

:::caution[Confidencialidad]
El DNI/NIE solo se almacena para registros internos y NO se muestra públicamente.
:::

### Registro de Actividades de Tratamiento (RAT)

El RGPD requiere documentar qué datos tratas y cómo.

**¿Qué es el RAT?**

Documento que registra:
- Qué datos personales recoges
- Para qué los usas
- Quién tiene acceso
- Cuánto tiempo los conservas
- Medidas de seguridad implementadas

**¿Quién debe tenerlo?**

- Empresas con más de 250 empleados: **Obligatorio**
- Empresas con menos de 250 empleados: **Obligatorio si:**
  - El tratamiento es habitual (no ocasional)
  - Incluye datos sensibles
  - Puede suponer un riesgo para derechos de los interesados

**Para eventos y promotoras:** Generalmente obligatorio porque el tratamiento es habitual.

**Cómo configurar en Nevent:**

1. Ve a **Datos privados** → **Registro de Actividades**
2. Haz clic en **Generar RAT automático**
3. Nevent genera un borrador basado en tu uso de la plataforma
4. Revisa y completa la información
5. Descarga en PDF para tus registros

**Contenido del RAT generado:**

```
REGISTRO DE ACTIVIDADES DE TRATAMIENTO

Responsable: [Tu organización]
Actividad: Gestión de venta de entradas y comunicación con fans

1. FINALIDADES DEL TRATAMIENTO
- Gestión de venta de entradas
- Envío de comunicaciones sobre eventos
- Análisis de preferencias y comportamiento

2. CATEGORÍAS DE DATOS
- Identificativos: Nombre, apellidos, DNI
- Contacto: Email, teléfono, dirección
- Preferencias: Géneros musicales, artistas favoritos
- Transaccionales: Compras, asistencia a eventos

3. CATEGORÍAS DE INTERESADOS
- Clientes (compradores de entradas)
- Potenciales clientes (suscriptores newsletter)
- Asistentes a eventos

4. DESTINATARIOS
- Proveedores de email marketing (Mailchimp, Klaviyo)
- Procesadores de pago (Stripe)
- Herramientas de análisis (Google Analytics)

5. TRANSFERENCIAS INTERNACIONALES
- Mailchimp (EE.UU.) - Standard Contractual Clauses
- Google Analytics (EE.UU.) - Data Processing Amendment

6. PLAZOS DE CONSERVACIÓN
- Durante la relación comercial
- 6 años tras última compra (obligación fiscal)

7. MEDIDAS DE SEGURIDAD
- Cifrado SSL/TLS en transmisión
- Cifrado AES-256 en almacenamiento
- Autenticación de dos factores
- Backups diarios cifrados
- Control de acceso basado en roles
- Logs de auditoría

8. EJERCICIO DE DERECHOS
- Email: privacidad@[tuorganizacion].com
- Plazo de respuesta: 1 mes
```

### Procedimiento de brechas de seguridad

Protocolo a seguir si hay una brecha de seguridad (data breach).

**¿Qué es una brecha?**

Cualquier incidente que comprometa la seguridad de datos personales:
- Acceso no autorizado
- Pérdida o robo de dispositivos
- Ransomware o malware
- Error humano (envío a destinatarios incorrectos)

**Obligaciones legales:**

**Notificar a AEPD en 72 horas** si la brecha puede suponer riesgo para derechos de los interesados.

**Notificar a los afectados sin dilación** si la brecha supone alto riesgo.

**Procedimiento recomendado:**

```
PROTOCOLO DE RESPUESTA A BRECHAS DE SEGURIDAD

1. DETECCIÓN Y CONTENCIÓN (0-2h)
□ Identificar la brecha
□ Contener el incidente
□ Preservar evidencias
□ Documentar fecha/hora de detección

2. EVALUACIÓN (2-12h)
□ ¿Qué datos se han visto comprometidos?
□ ¿Cuántos usuarios afectados?
□ ¿Qué nivel de riesgo supone?
□ ¿Hay medidas de mitigación (cifrado, pseudonimización)?

3. NOTIFICACIÓN INTERNA (12-24h)
□ Informar a DPO
□ Informar a dirección
□ Informar a departamento legal

4. NOTIFICACIÓN EXTERNA (24-72h)
□ Si riesgo para derechos: Notificar AEPD
   - Web: https://www.aepd.es
   - Formulario de notificación de brechas
□ Si alto riesgo: Notificar a afectados
   - Email directo
   - Explicar naturaleza de la brecha
   - Consecuencias probables
   - Medidas adoptadas

5. DOCUMENTACIÓN
□ Registro en el Registro de Brechas
□ Acciones correctivas implementadas
□ Lecciones aprendidas

Responsable: [DPO o Representante Legal]
Contacto de emergencia: [Email/Teléfono 24h]
```

**Configurar en Nevent:**

1. Ve a **Datos privados** → **Protocolo de brechas**
2. Introduce el nombre del responsable
3. Email de contacto de emergencia
4. Número de teléfono 24/7
5. Guarda

### Política de retención de datos

Define cuánto tiempo conservas los datos personales.

**Criterios para definir plazos:**

1. **Mientras dure la relación comercial**
   - Cliente activo: Conservar

2. **Obligaciones legales**
   - Facturas: 6 años (Ley General Tributaria)
   - Contratos: 5 años (Código Civil)

3. **Interés legítimo**
   - Clientes inactivos: Revisar cada 3 años
   - Solicitar renovación de consentimiento

**Ejemplo de política:**

```
POLÍTICA DE RETENCIÓN DE DATOS

DATOS DE CLIENTES ACTIVOS
Conservación: Mientras dure la relación comercial
Criterio: Han comprado entrada en últimos 24 meses O están suscritos a newsletter

DATOS TRANSACCIONALES (facturas, compras)
Conservación: 6 años tras última transacción
Base legal: Obligación fiscal (Ley General Tributaria)

DATOS DE CLIENTES INACTIVOS
Conservación: 36 meses tras última interacción
Acción: A los 24 meses, email solicitando confirmación de interés
Si no responde: Eliminar a los 36 meses

DATOS DE NEWSLETTER (sin compra)
Conservación: Mientras no se den de baja
Acción: Revisión anual de engagement
Si 0 opens en 12 meses: Solicitar reconfirmación

LOGS Y AUDITORÍA
Conservación: 12 meses
Base legal: Seguridad y prevención de fraude

COPIAS DE SEGURIDAD
Conservación: 90 días
Luego: Sobrescritura automática
```

**Configurar en Nevent:**

Nevent aplica automáticamente políticas de retención razonables, pero puedes personalizarlas:

1. Ve a **Datos privados** → **Retención de datos**
2. Define plazos personalizados por categoría
3. Activa eliminación automática (opcional)

## Gestión de solicitudes de ejercicio de derechos

Procedimiento para atender solicitudes ARCO (Acceso, Rectificación, Cancelación, Oposición).

### Email dedicado

Configura un email específico:
```
privacidad@tuorganizacion.com
```

O si tu volumen es bajo:
```
info@tuorganizacion.com
```

### Plazo de respuesta

**Obligatorio:** 1 mes desde la recepción de la solicitud.
**Ampliable:** +2 meses si la solicitud es compleja (notificando al interesado).

### Proceso recomendado

```
PROCEDIMIENTO EJERCICIO DE DERECHOS

1. RECEPCIÓN
□ Email recibido en privacidad@[org].com
□ Registrar en sistema de tickets
□ Acusar recibo en 24-48h

2. VERIFICACIÓN DE IDENTIDAD
□ Solicitar DNI/NIE si no está claro que es el titular
□ Verificar que el email coincide con el registrado

3. TRAMITACIÓN (según derecho)

ACCESO
□ Exportar todos los datos del usuario
□ Generar PDF con información completa
□ Enviar en 1 mes

RECTIFICACIÓN
□ Verificar datos incorrectos
□ Actualizar en sistema
□ Confirmar cambios al usuario

SUPRESIÓN
□ Verificar que no hay obligación legal de conservar
□ Eliminar datos (incluyendo backups)
□ Confirmar eliminación al usuario

OPOSICIÓN
□ Detener tratamiento específico (e.g., marketing)
□ Mantener solo datos con base legal diferente
□ Confirmar cambios

LIMITACIÓN
□ Marcar datos como "restringidos"
□ Solo usar para fines limitados
□ Confirmar limitación

PORTABILIDAD
□ Exportar datos en formato estructurado (JSON, CSV)
□ Enviar al usuario o transferir a otro responsable

4. RESPUESTA
□ Enviar respuesta por email
□ Documentar en registro de solicitudes
□ Archivar para auditorías

Responsable: [Nombre del DPO o encargado]
SLA: Máximo 30 días
```

### Automatización en Nevent

Nevent facilita el ejercicio de derechos:

**Auto-servicio para usuarios:**
1. El fan accede a su perfil
2. Puede descargar sus datos (Acceso)
3. Puede actualizar su información (Rectificación)
4. Puede eliminar su cuenta (Supresión)

**Para el administrador:**
1. Ve a **Audiencia** → Buscar fan
2. Haz clic en **⋮** → **Exportar datos**
3. O **⋮** → **Eliminar usuario**

## Auditorías de cumplimiento

### Registro de auditorías

Documenta cuándo y quién realizó auditorías de cumplimiento RGPD.

**Información a registrar:**

```
REGISTRO DE AUDITORÍAS

Fecha: 15/03/2024
Auditor: María García (DPO interno)
Alcance: Revisión completa de cumplimiento RGPD
Resultado: Conforme con observaciones menores
Acciones correctivas:
- Actualizar política de privacidad (mención a nuevo proveedor)
- Implementar eliminación automática de inactivos >3 años
Plazo: 30 días
Próxima auditoría: 15/03/2025
```

### Frecuencia recomendada

- **Grandes organizaciones:** Auditoría anual
- **Medianas:** Cada 18-24 meses
- **Pequeñas:** Revisión interna cada 2 años

## Solución de problemas

### ¿Necesito realmente un DPO?

**Si cumples alguno de estos criterios, SÍ:**
- Eres organismo público
- Procesas datos de >10,000 personas al año de forma sistemática
- Tratas datos sensibles a gran escala

**Si no, puedes:**
- Designar un responsable de privacidad (sin ser DPO formal)
- Usar servicios de DPO externo compartido

### No sé qué poner en el RAT

Usa la función "Generar RAT automático" de Nevent. Generará un borrador basado en tu uso real de la plataforma.

### ¿Dónde guardo estos documentos?

**Copias físicas:**
- Archivo físico en oficina
- Caja fuerte para documentos críticos

**Copias digitales:**
- Carpeta cifrada en Google Drive / Dropbox
- Sistema de gestión documental con control de versiones
- Backup offline en disco externo cifrado

## Recursos y consultoría

### Servicios de DPO externo

- **[GDPR Local](https://gdprlocal.com/)** - Desde 500€/año
- **[DataProtectionOfficer.es](https://dataprotectionofficer.es/)** - Servicios para PYMES
- Consultoras legales especializadas en RGPD

### Software de compliance

- **[OneTrust](https://www.onetrust.com/)** - Enterprise
- **[TrustArc](https://trustarc.com/)** - Compliance completo
- **[Cookiebot](https://www.cookiebot.com/)** - Gestión de cookies

### Formación

- **[AEPD - Cursos gratuitos](https://www.aepd.es/prensa-y-comunicacion/formacion)**
- Webinars de asociaciones sectoriales
- Cursos online de RGPD básico

:::tip[Empieza simple]
Si estás empezando, lo más importante es:
1. Tener textos legales públicos correctos
2. Email dedicado para privacidad
3. Procedimiento básico para atender derechos

El resto puedes ir implementándolo progresivamente.
:::
