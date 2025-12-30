---
title: Usuarios y permisos
description: Invita miembros de tu equipo y gestiona sus permisos de acceso
---

Añade usuarios a tu organización en Nevent y controla qué puede hacer cada uno según su rol.

## Acceder a gestión de usuarios

1. Ve a **Configuración** → **Organización** → **Usuarios**
2. Verás la lista de todos los usuarios de tu organización

## Invitar nuevo usuario

### Paso 1: Hacer clic en "Invitar usuario"

1. Haz clic en **+ Invitar usuario**
2. Se abre el formulario de invitación

### Paso 2: Completar datos

**Email del usuario:**
```
maria.garcia@tuorganizacion.com
```

:::caution[Email personal]
Usa el email corporativo del usuario, no emails compartidos como info@ o marketing@.
:::

**Nombre completo:**
```
María García López
```

**Rol:**
Selecciona el rol apropiado (ver sección de Roles más abajo).

### Paso 3: Enviar invitación

1. Haz clic en **Enviar invitación**
2. El usuario recibirá un email con:
   - Enlace para crear su contraseña
   - Instrucciones de acceso
   - Información sobre su rol

**Email de invitación:**
```
¡Hola María!

Has sido invitado/a a unirse a Festival Sónar en Nevent como Editor.

Para aceptar la invitación y crear tu contraseña:
[Aceptar invitación]

Este enlace caduca en 7 días.

Si tienes dudas, contacta con quien te invitó.
```

### Paso 4: Usuario acepta invitación

1. Usuario hace clic en el enlace
2. Crea su contraseña
3. Accede a Nevent con su rol asignado

## Roles y permisos

### Administrador

**Acceso completo** a toda la plataforma.

**Puede:**
- ✅ Gestionar usuarios (invitar, editar, eliminar)
- ✅ Cambiar configuración global (marca, legal, integraciones)
- ✅ Ver y gestionar facturación
- ✅ Crear, editar y eliminar eventos
- ✅ Crear, enviar y gestionar campañas
- ✅ Ver toda la audiencia y exportar datos
- ✅ Acceder a analytics completo
- ✅ Gestionar campos personalizados

**Cuándo usar:**
- Propietario de la cuenta
- Director general
- Responsable técnico

:::caution[Limita administradores]
Solo asigna este rol a personas de máxima confianza. Recomendado: Máximo 2-3 administradores.
:::

### Editor

**Gestión de contenido** y operaciones del día a día.

**Puede:**
- ✅ Crear, editar y eliminar eventos
- ✅ Crear, enviar y gestionar campañas y newsletters
- ✅ Ver audiencia y crear segmentos
- ✅ Exportar datos de fans (con límites)
- ✅ Gestionar merchandising
- ✅ Ver analytics y estadísticas
- ❌ NO puede gestionar usuarios
- ❌ NO puede cambiar configuración global
- ❌ NO puede ver facturación

**Cuándo usar:**
- Equipo de marketing
- Community manager
- Responsable de comunicación
- Equipo de producción

### Visualizador

**Solo lectura** - Puede ver pero no modificar.

**Puede:**
- ✅ Ver eventos y su información
- ✅ Ver campañas enviadas
- ✅ Ver estadísticas y analytics
- ✅ Ver audiencia (datos limitados)
- ❌ NO puede crear ni editar nada
- ❌ NO puede enviar campañas
- ❌ NO puede exportar datos completos
- ❌ NO puede ver facturación

**Cuándo usar:**
- Dirección / socios (visibilidad sin riesgo)
- Consultores externos
- Inversores
- Auditores

### Operador

**Gestión de eventos in situ** - Check-ins y asistencia.

**Puede:**
- ✅ Ver lista de asistentes del evento asignado
- ✅ Marcar check-in / check-out
- ✅ Escanear QR de entradas
- ✅ Ver estado de entrada (válida, ya usada, etc.)
- ❌ NO puede ver datos completos de fans
- ❌ NO puede acceder a otros módulos
- ❌ NO puede crear eventos

**Cuándo usar:**
- Personal de puerta
- Equipo de check-in
- Voluntarios de eventos

## Gestionar usuarios existentes

### Ver detalles de usuario

1. Haz clic en el nombre del usuario en la lista
2. Verás:
   - Información básica (nombre, email)
   - Rol actual
   - Fecha de última actividad
   - Permisos específicos
   - Eventos asignados (si rol Operador)

### Editar usuario

1. Haz clic en **⋮** → **Editar**
2. Puedes cambiar:
   - Nombre
   - Rol
   - Permisos específicos
   - Eventos asignados
3. Haz clic en **Guardar**

:::note[Notificación de cambios]
Si cambias el rol de un usuario, se le notifica por email automáticamente.
:::

### Desactivar usuario (temporal)

Para suspender acceso temporalmente sin eliminar:

1. Haz clic en **⋮** → **Desactivar**
2. El usuario no puede acceder
3. Sus datos y actividad se conservan
4. Puedes reactivar cuando quieras

**Útil para:**
- Empleados de baja temporal
- Consultores entre proyectos
- Accesos estacionales

### Eliminar usuario (permanente)

1. Haz clic en **⋮** → **Eliminar**
2. Confirma la eliminación
3. El usuario ya no puede acceder
4. Sus acciones pasadas siguen visibles en logs

:::caution[Eliminar vs Desactivar]
Eliminar es permanente. Si hay posibilidad de que vuelva, mejor desactiva.
:::

## Permisos granulares

Para usuarios con necesidades específicas, puedes personalizar permisos:

### Limitar acceso por módulo

**Ejemplo:** Editor que solo gestiona newsletters, no eventos.

1. Crea usuario con rol "Editor"
2. Haz clic en **⋮** → **Permisos personalizados**
3. Desmarca "Acceso a Eventos"
4. Mantén activado "Acceso a Campañas"
5. Guarda

**Módulos:**
- Eventos
- Audiencia / Fans
- Campañas
- Merchandising
- Analytics

### Limitar acceso por evento

**Ejemplo:** Operador solo para Festival de Verano, no para otros eventos.

1. Crea usuario con rol "Operador"
2. En **Eventos asignados** selecciona solo "Festival de Verano 2024"
3. Guarda

**Resultado:** Solo ve ese evento en su panel.

### Limitar exportación de datos

**Ejemplo:** Editor que puede ver fans pero no exportar base de datos completa.

1. Usuario con rol "Editor"
2. En **Permisos personalizados** desmarca "Exportar audiencia completa"
3. Puede seguir viendo fans y creando segmentos
4. No puede hacer export masivo

## Invitaciones pendientes

### Ver invitaciones enviadas

1. Ve a **Usuarios** → **Invitaciones pendientes**
2. Verás todas las invitaciones no aceptadas

**Información mostrada:**
- Email invitado
- Rol asignado
- Fecha de invitación
- Estado (pendiente, caducada)

### Reenviar invitación

Si el usuario no recibió el email:

1. Busca la invitación en la lista
2. Haz clic en **Reenviar**
3. Se envía nuevo email con enlace fresco

### Cancelar invitación

Si invitaste por error:

1. Haz clic en **⋮** → **Cancelar invitación**
2. El enlace se invalida
3. El usuario no podrá aceptarla

## Invitación masiva (CSV)

Para invitar múltiples usuarios a la vez:

### Paso 1: Preparar CSV

Crea archivo CSV con esta estructura:

```csv
email,nombre,rol
maria.garcia@org.com,María García,Editor
juan.lopez@org.com,Juan López,Editor
ana.martin@org.com,Ana Martín,Operador
```

### Paso 2: Importar

1. Ve a **Usuarios** → **Importar usuarios**
2. Sube el archivo CSV
3. Verifica la previsualización
4. Haz clic en **Enviar invitaciones**

**Resultado:** Se envían todas las invitaciones de golpe.

:::tip[Útil para eventos grandes]
Si tienes 20+ voluntarios para un festival, prepara CSV e importa de una vez.
:::

## Seguridad

### Autenticación de dos factores (2FA)

**Activar para tu cuenta:**

1. Ve a **Mi perfil** (esquina superior derecha)
2. Haz clic en **Seguridad**
3. Activa **Autenticación de dos factores**
4. Escanea QR con app (Google Authenticator, Authy)
5. Introduce código de 6 dígitos para confirmar

**Requiere app de autenticación:**
- Google Authenticator
- Microsoft Authenticator
- Authy
- 1Password

**Futuras sesiones:**
1. Introduces email + contraseña
2. Introduces código de 6 dígitos de la app
3. Accedes

:::caution[Obligatorio para administradores]
Las cuentas de Administrador DEBEN tener 2FA activado por seguridad.
:::

### Políticas de contraseña

Nevent requiere contraseñas seguras:

**Requisitos mínimos:**
- Mínimo 8 caracteres
- Al menos 1 mayúscula
- Al menos 1 minúscula
- Al menos 1 número
- Al menos 1 carácter especial (!@#$%^&*)

**Buenas prácticas:**
- Usa gestor de contraseñas (1Password, Bitwarden)
- No reutilices contraseñas
- Cambia cada 90 días (recomendado)

### Sesiones activas

Ver desde dónde estás conectado:

1. Ve a **Mi perfil** → **Sesiones activas**
2. Verás:
   - Dispositivo / navegador
   - Ubicación aproximada (IP)
   - Última actividad

**Cerrar sesión remota:**

Si ves una sesión sospechosa:
1. Haz clic en **Cerrar sesión** en esa sesión
2. Cambia tu contraseña inmediatamente

## Log de actividad por usuario

Ver qué ha hecho cada usuario:

1. Ve a **Usuarios** → Selecciona usuario
2. Haz clic en **Ver actividad**

**Información mostrada:**
- Fecha y hora de cada acción
- Tipo de acción (crear, editar, eliminar)
- Recurso afectado (evento, campaña, etc.)
- IP desde donde se hizo

**Útil para:**
- Auditorías
- Investigar incidentes
- Verificar cumplimiento de procesos

## Notificaciones

Configura notificaciones por usuario:

### Notificaciones de sistema

**Para administradores:**
- Nuevo usuario invitado/aceptado
- Usuario eliminado
- Cambio de plan/facturación
- Pago fallido

**Para editores:**
- Campaña enviada con éxito
- Campaña fallida
- Nuevo fan registrado (opcional)

**Para operadores:**
- Asignación a nuevo evento
- Cambios en evento asignado

### Configurar

1. Ve a **Mi perfil** → **Notificaciones**
2. Activa/desactiva según preferencias
3. Elige: Email, In-app, o ambos

## Mejores prácticas

### Onboarding de nuevos usuarios

Cuando invites a alguien nuevo:

1. **Antes de invitar:**
   - Explica qué es Nevent y para qué lo usarán
   - Define claramente su rol y responsabilidades

2. **Al invitar:**
   - Usa email corporativo
   - Asigna rol correcto desde el inicio
   - Envía email de contexto aparte de la invitación

3. **Después de que acepten:**
   - Sesión de onboarding de 30min
   - Comparte guía rápida o video tutorial
   - Asigna primera tarea pequeña para practicar

### Revisión periódica

**Cada trimestre:**

1. Revisa lista de usuarios activos
2. Verifica que los roles siguen siendo apropiados
3. Elimina usuarios que ya no trabajan contigo
4. Verifica 2FA activado (especialmente administradores)

**Checklist:**
- ✅ ¿Todos los usuarios actuales siguen en la empresa?
- ✅ ¿Los roles reflejan sus responsabilidades actuales?
- ✅ ¿Hay usuarios desactivados que podemos eliminar?
- ✅ ¿Administradores tienen 2FA activado?

### Documentación interna

Mantén documentado:

**Quién tiene qué acceso:**
```
María García (maria@org.com) - Administrador
- Responsable de configuración general
- Contacto para issues técnicos

Juan López (juan@org.com) - Editor
- Gestiona todas las campañas de email
- Responsable de newsletters semanales

Ana Martín (ana@org.com) - Operador
- Check-ins en eventos de Madrid
```

**Procesos:**
- Cómo solicitar acceso a Nevent
- A quién contactar para dudas técnicas
- Procedimiento de offboarding

## Solución de problemas

### El usuario no recibió la invitación

**Posibles causas:**

1. **Está en spam**
   - Pide que revise carpeta de spam/correo no deseado
   - Añade `invitaciones@nevent.es` a contactos seguros

2. **Email incorrecto**
   - Verifica que escribiste bien el email
   - Cancela invitación y reenvía a email correcto

3. **Bloqueado por servidor de email**
   - Algunos servidores corporativos bloquean emails automáticos
   - Pide a IT que añada `@nevent.es` a whitelist

**Solución:** Reenvía invitación desde el panel.

### El usuario no puede acceder a cierto módulo

**Causa:** Su rol no tiene permisos para ese módulo.

**Solución:**
1. Verifica su rol actual
2. Si necesita más acceso, cambia a rol con más permisos
3. O personaliza permisos específicos

### Olvidé mi contraseña

1. En pantalla de login, haz clic en **¿Olvidaste tu contraseña?**
2. Introduce tu email
3. Recibirás email con enlace para resetear
4. Crea nueva contraseña
5. Accede normalmente

### No puedo eliminar un usuario

**Causa:** El usuario es el único Administrador.

**Solución:**
1. Primero asigna rol Administrador a otra persona
2. Luego puedes eliminar al usuario original

## Límites por plan

**Plan Starter:**
- 1 usuario incluido
- Usuarios adicionales: +10€/mes/usuario

**Plan Pro:**
- 5 usuarios incluidos
- Usuarios adicionales: +8€/mes/usuario

**Plan Enterprise:**
- Usuarios ilimitados sin coste adicional

:::tip[Optimiza costes]
Si necesitas muchos operadores (solo check-ins), considera usar la app de check-in guest que no consume licencias.
:::
