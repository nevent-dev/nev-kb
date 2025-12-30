---
title: Integraciones
description: Conecta Nevent con tus herramientas favoritas
---

Sincroniza Nevent con plataformas externas para centralizar tu operación y automatizar flujos de trabajo.

## ¿Por qué usar integraciones?

Las integraciones te permiten:

- 🔄 **Sincronizar datos** - Mantén actualizada la información entre sistemas
- ⚡ **Automatizar procesos** - Reduce trabajo manual y errores
- 📊 **Centralizar información** - Una única fuente de verdad
- 🎯 **Mejorar experiencia** - Conecta todas las piezas de tu operación

## Integraciones disponibles

### Plataformas de venta de entradas

- **[Shotgun](/integrations/shotgun/)** - Sincroniza ventas, eventos y asistentes
- **[Xceed](/integrations/xceed/)** - Importa datos de ventas y eventos
- **[Dice](/integrations/dice/)** - Conecta tu catálogo de eventos

### Marketing y comunicación

- **[Klaviyo](/integrations/klaviyo/)** - Sincroniza audiencia para email marketing avanzado
- **[Mailchimp](/integrations/mailchimp/)** - Exporta listas para campañas externas

### Música y contenido

- **[Spotify](/integrations/spotify/)** - Enriquece eventos con datos de artistas
- **[Resident Advisor](/integrations/resident-advisor/)** - Sincroniza lineup y eventos

### Pagos y facturación

- **[Stripe](/integrations/stripe/)** - Procesa pagos de merchandising y upgrades

### CRM y productividad

- **[Webhooks](/integrations/webhooks/)** - Conecta con cualquier sistema mediante webhooks personalizados

## Cómo funcionan las integraciones

### Tipos de integración

**1. Sincronización bidireccional**
- Datos fluyen en ambas direcciones
- Ejemplo: Cambios en Nevent se reflejan en Klaviyo y viceversa
- Plataformas: Klaviyo, Shotgun (parcial)

**2. Importación (one-way)**
- Datos fluyen de la plataforma externa a Nevent
- Ejemplo: Importar eventos desde Shotgun
- Plataformas: Shotgun, Xceed, Dice, Spotify

**3. Webhooks**
- Nevent notifica a sistemas externos cuando ocurren eventos
- Ejemplo: Avisar a tu CRM cuando alguien compra una entrada
- Completamente personalizable

### Proceso general de configuración

1. **Acceder a configuración**
   - Ve a Configuración → Integraciones
   - Selecciona la integración que quieres configurar

2. **Autenticación**
   - Conecta tu cuenta de la plataforma externa
   - Autoriza el acceso de Nevent

3. **Configurar opciones**
   - Elige qué datos sincronizar
   - Define frecuencia de sincronización
   - Mapea campos personalizados

4. **Verificar y activar**
   - Prueba la conexión
   - Activa la integración

## Mejores prácticas

### Planifica antes de integrar

**Antes de conectar una integración, define:**
- ¿Qué datos necesitas sincronizar?
- ¿Con qué frecuencia?
- ¿Qué sistema es la fuente de verdad para cada tipo de dato?
- ¿Necesitas sincronización bidireccional o solo importación?

### Evita duplicados

**Problema común:** Crear registros duplicados al sincronizar.

**Solución:**
- Define campos de matching (email, ID externo)
- Usa la opción "Actualizar existentes" en lugar de "Crear siempre"
- Revisa la primera sincronización con volumen reducido

### Monitorea las sincronizaciones

Revisa regularmente el log de integraciones:
- Ve a Configuración → Integraciones → [Nombre] → Historial
- Verifica que no haya errores
- Comprueba que los datos fluyen correctamente

### Documenta tus flujos

Mantén documentación de:
- Qué integraciones están activas
- Qué datos sincronizan
- Frecuencia de sincronización
- Contacto responsable de cada integración

## Casos de uso comunes

### Festival que vende en Shotgun

**Integración:** Shotgun
**Flujo:**
1. Crear evento en Shotgun (sistema de venta)
2. Importar evento a Nevent
3. Sincronizar compradores automáticamente
4. Usar Nevent para comunicaciones y engagement

**Beneficio:** Vendes donde tu audiencia ya está, pero mantienes control de la comunicación.

### Sala con marketing en Klaviyo

**Integración:** Klaviyo
**Flujo:**
1. Importar audiencia de Nevent a Klaviyo
2. Crear segmentos avanzados en Klaviyo
3. Lanzar campañas desde Klaviyo
4. Sincronizar interacciones de vuelta a Nevent

**Beneficio:** Combinas la potencia de Klaviyo con la gestión de eventos de Nevent.

### Promotora que enriquece con Spotify

**Integración:** Spotify
**Flujo:**
1. Crear evento en Nevent con lineup
2. Nevent busca automáticamente artistas en Spotify
3. Obtiene seguidores, géneros, popularidad
4. Usa estos datos para segmentar audiencia

**Beneficio:** Conoces mejor a tu audiencia según su afinidad musical.

### Club con sistema de reservas custom

**Integración:** Webhooks
**Flujo:**
1. Configurar webhook que se dispara al confirmar reserva
2. Tu sistema recibe notificación en tiempo real
3. Actualiza disponibilidad automáticamente

**Beneficio:** Sincronización en tiempo real con sistemas legacy o custom.

## Solución de problemas comunes

### La integración no sincroniza

**Posibles causas:**

1. **Token expirado**
   - Solución: Re-autentica la integración

2. **Permisos insuficientes**
   - Solución: Verifica que autorizaste todos los permisos necesarios

3. **Límites de API alcanzados**
   - Solución: Reduce frecuencia de sincronización o contacta al proveedor

### Datos duplicados después de sincronizar

**Causa:** No se configuró correctamente el campo de matching.

**Solución:**
1. Pausa la integración
2. Limpia duplicados manualmente
3. Configura campo de matching (email o ID externo)
4. Re-activa la integración

### Algunos campos no se sincronizan

**Causa:** Campos personalizados no mapeados.

**Solución:**
1. Ve a Configuración → Integraciones → [Nombre] → Mapeo de campos
2. Mapea campos personalizados de Nevent con campos de la plataforma externa
3. Guarda y sincroniza de nuevo

## Seguridad y privacidad

### Autenticación segura

Todas las integraciones usan:
- **OAuth 2.0** para autenticación
- **Tokens cifrados** almacenados de forma segura
- **Permisos granulares** - Solo acceso a lo necesario

### Cumplimiento RGPD

Al sincronizar datos personales:
- ✅ Los usuarios deben haber consentido el tratamiento
- ✅ Informa sobre qué datos se comparten y con quién
- ✅ Permite ejercer derechos ARCO en todos los sistemas

### Revoca acceso cuando sea necesario

Si dejas de usar una integración:
1. Desactívala en Nevent
2. Revoca el acceso en la plataforma externa
3. Elimina datos sincronizados si no los necesitas

## Próximamente

Estamos trabajando en nuevas integraciones:

- **Instagram** - Sincroniza seguidores y engagement
- **Ticketmaster** - Importa eventos y ventas
- **HubSpot** - CRM completo para promotoras
- **Zapier** - Conecta con 5000+ apps

¿Necesitas una integración específica? Contáctanos en integraciones@nevent.es

## Límites

Los límites varían por integración y plan:

**Plan Starter:**
- 1 integración activa
- Sincronización cada 24h
- Hasta 10,000 registros/mes

**Plan Pro:**
- 5 integraciones activas
- Sincronización cada 1h
- Hasta 100,000 registros/mes

**Plan Enterprise:**
- Integraciones ilimitadas
- Sincronización en tiempo real
- Registros ilimitados
- Webhooks personalizados

:::tip[Prueba antes de comprar]
Todas las integraciones tienen un periodo de prueba de 14 días para que las pruebes con datos reales.
:::
