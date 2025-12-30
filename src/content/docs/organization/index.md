---
title: Organización
description: Gestiona usuarios, roles y estructura de tu equipo
---

Configura tu equipo, permisos de acceso y campos personalizados para adaptar Nevent a tu forma de trabajar.

## ¿Qué configuras en esta sección?

- 👥 **Usuarios** - Gestiona quién tiene acceso a Nevent
- 🔐 **Roles y permisos** - Define qué puede hacer cada usuario
- 🏢 **Estructura organizativa** - Organiza tu equipo por departamentos
- 📝 **Campos personalizados** - Añade campos específicos para tus fans y eventos

## En esta sección

- **[Usuarios y permisos](/organization/users/)** - Invita usuarios y gestiona roles
- **[Campos personalizados](/organization/custom-fields/)** - Crea campos adicionales para fans y eventos

## Colaboración en equipo

### Roles predefinidos

Nevent incluye roles estándar con permisos preconfigurados:

**Administrador**
- Acceso completo a todas las funcionalidades
- Puede gestionar usuarios y configuración
- Puede ver facturación
- Recomendado: 1-2 personas (propietario, director)

**Editor**
- Puede crear y editar eventos, campañas, contenido
- No puede cambiar configuración global
- No ve facturación
- Recomendado: Marketing, comunicación

**Visualizador**
- Solo lectura
- Puede ver eventos, fans, estadísticas
- No puede crear ni editar nada
- Recomendado: Dirección, socios, consultores

**Operador**
- Puede gestionar check-ins y asistencia a eventos
- Puede ver lista de asistentes
- No puede editar eventos ni acceder a datos sensibles
- Recomendado: Personal de puerta, voluntarios

### Equipos comunes

**Festival pequeño (1-5 personas):**
- 1 Administrador (propietario)
- 2 Editores (marketing + producción)
- 2 Operadores (puerta)

**Sala mediana (5-10 personas):**
- 1 Administrador (propietario)
- 1 Editor (responsable comunicación)
- 3 Editores (equipo marketing)
- 1 Visualizador (dirección)
- 4 Operadores (personal puerta)

**Promotora grande (10+ personas):**
- 2 Administradores (propietario + director general)
- 5 Editores (marketing, contenido, producción)
- 3 Visualizadores (dirección, finanzas, socios)
- 10 Operadores (personal eventos)

## Casos de uso

### Delegar comunicación al equipo de marketing

**Escenario:** Quieres que tu equipo de marketing cree y envíe campañas, pero no cambien la configuración general.

**Solución:**
1. Invita al equipo con rol "Editor"
2. Pueden crear eventos, campañas y newsletters
3. No pueden cambiar marca, legal, facturación

### Personal de puerta para check-ins

**Escenario:** Necesitas que el personal de puerta pueda hacer check-in de asistentes pero sin acceso a datos sensibles.

**Solución:**
1. Invita con rol "Operador"
2. Asigna al evento específico
3. Solo verán lista de asistentes de ese evento
4. Pueden marcar check-in/check-out

### Consultor externo para análisis

**Escenario:** Un consultor necesita ver estadísticas pero no debe poder editar nada.

**Solución:**
1. Invita con rol "Visualizador"
2. Puede ver todos los datos y estadísticas
3. No puede crear ni editar contenido
4. No ve facturación ni datos fiscales

### Agencia externa gestiona comunicación

**Escenario:** Una agencia gestiona toda tu comunicación digital.

**Solución:**
1. Invita con rol "Editor"
2. Limita acceso solo a módulos de Comunicación y Campañas
3. No ven datos sensibles de fans (solo email)
4. No pueden exportar base de datos completa

## Seguridad y buenas prácticas

### Principio de mínimo privilegio

Da a cada usuario solo los permisos que necesita:
- ✅ Personal de puerta → Operador
- ✅ Marketing → Editor
- ✅ Dirección → Visualizador
- ❌ Todos Administrador (inseguro)

### Revisa usuarios regularmente

**Cada 3-6 meses:**
- Revisa lista de usuarios activos
- Elimina usuarios que ya no trabajan contigo
- Verifica que los permisos siguen siendo correctos

### Usa autenticación de dos factores

**Para administradores (obligatorio):**
- Activa 2FA para cuentas de administrador
- Reduce riesgo de acceso no autorizado

**Para todos (recomendado):**
- Anima a todo el equipo a activar 2FA
- Mayor seguridad para datos sensibles

### No compartas cuentas

**Mal:**
```
Usuario: marketing@tuorganizacion.com (usada por 3 personas)
```

**Bien:**
```
Usuario: maria.garcia@tuorganizacion.com (María García)
Usuario: juan.lopez@tuorganizacion.com (Juan López)
Usuario: ana.martin@tuorganizacion.com (Ana Martín)
```

**Ventajas:**
- Trazabilidad (quién hizo qué)
- Control de acceso individual
- Fácil revocar acceso cuando alguien se va

## Campos personalizados

Adapta Nevent a tu negocio añadiendo campos custom.

### Para fans

**Ejemplos:**
- Género musical favorito específico (ej: "Techno melodic", "Minimal")
- Origen (cómo te conoció)
- Nivel VIP (Bronce, Plata, Oro, Platinum)
- Alergias/intolerancias (para eventos con catering)
- Talla de camiseta (para merchandising)
- Nº de acompañantes habitual

**Útil para:**
- Segmentación más precisa
- Personalización de comunicaciones
- Gestión logística

### Para eventos

**Ejemplos:**
- Número de interno de producción
- Proveedor de sonido
- Proveedor de iluminación
- Presupuesto total
- Estado de permisos (solicitado, aprobado, denegado)
- Responsable de producción

**Útil para:**
- Gestión interna
- Coordinación de equipos
- Reporting ejecutivo

## Límites por plan

### Plan Starter

- 1 usuario incluido
- Usuarios adicionales: +10€/usuario/mes
- Roles: Todos disponibles
- Campos custom: Hasta 5

### Plan Pro

- 5 usuarios incluidos
- Usuarios adicionales: +8€/usuario/mes
- Roles: Todos disponibles
- Campos custom: Hasta 20

### Plan Enterprise

- Usuarios ilimitados
- Sin coste adicional
- Roles personalizados disponibles
- Campos custom: Ilimitados

## Migración de equipos

Si vienes de otra plataforma:

**Exporta de plataforma anterior:**
1. Lista de usuarios y sus roles
2. Permisos específicos de cada uno

**Importa a Nevent:**
1. Invita usuarios uno a uno o en lote (CSV)
2. Asigna roles equivalentes
3. Verifica que cada persona tiene acceso correcto

**Comunica el cambio:**
- Email a todo el equipo con nuevas credenciales
- Breve formación (30min) sobre interfaz
- Documenta procesos nuevos

## Auditoría y compliance

### Log de actividad

Nevent registra todas las acciones:
- Quién creó/editó/eliminó cada elemento
- Cuándo se hizo
- Desde qué IP

**Acceso:**
1. Ve a **Configuración** → **Organización** → **Log de auditoría**
2. Filtra por usuario, fecha, acción

**Útil para:**
- Auditorías de seguridad
- Investigación de incidentes
- Compliance RGPD

### Exportar actividad

Para auditorías externas:
1. Ve a **Log de auditoría**
2. Selecciona rango de fechas
3. Haz clic en **Exportar** → **CSV**

**Formato:**
```csv
Timestamp,Usuario,Acción,Recurso,IP
2024-03-15 10:30:00,maria@org.com,Creó,Evento: Festival 2024,192.168.1.1
2024-03-15 11:00:00,juan@org.com,Editó,Campaña: Newsletter Marzo,192.168.1.2
```

## Recursos

**Onboarding de nuevo equipo:**
- [Guía de primeros pasos](/getting-started/)
- [Video tutoriales](https://youtube.com/@nevent)
- Sesión de formación (contacta a soporte)

**Soporte:**
- Email: soporte@nevent.es
- Chat en vivo (L-V 9:00-18:00)
- Base de conocimiento

:::tip[Empieza simple]
No invites a todo el equipo desde el día 1. Empieza con 2-3 personas clave, domina la plataforma, y luego escala a más usuarios.
:::
