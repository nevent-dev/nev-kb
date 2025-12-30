---
title: Dominio personalizado
description: Usa tu propio dominio para páginas de eventos y formularios
---

Configura tu dominio personalizado para que tus eventos se muestren en tu propio dominio en lugar de `my.nevent.es`.

## ¿Qué es un dominio personalizado?

Por defecto, Nevent sirve tus páginas en:
```
https://my.nevent.es/tu-organizacion/evento-123
```

Con dominio personalizado, puedes usar:
```
https://eventos.tudominio.com/evento-123
```

O incluso:
```
https://tudominio.com/eventos/evento-123
```

## Beneficios

### Refuerza tu marca

**Sin dominio custom:**
```
https://my.nevent.es/sonar/festival-verano-2024
```
→ Los usuarios ven "nevent.es"

**Con dominio custom:**
```
https://eventos.sonar.es/festival-verano-2024
```
→ Los usuarios ven solo tu marca

### Mayor confianza

Los usuarios confían más en comprar entradas en tu dominio oficial que en un dominio de terceros.

### Mejor SEO

- Google indexa contenido en tu dominio
- Mejora autoridad de tu sitio
- Enlaces entrantes benefician a tu dominio

### URLs más limpias

**Antes:**
```
https://my.nevent.es/festival-electronica-madrid/summer-closing-party-2024
```

**Después:**
```
https://entradas.festivalelectronica.com/summer-closing
```

## Requisitos

### Plan Pro o Enterprise

El dominio personalizado está disponible en:
- ✅ Plan Pro
- ✅ Plan Enterprise
- ❌ Plan Starter

### Dominio propio

Necesitas:
- Tener un dominio registrado (ej: `tudominio.com`)
- Acceso a la configuración DNS
- Capacidad de añadir registros CNAME o A

**Proveedores comunes:**
- GoDaddy
- Namecheap
- Google Domains
- Cloudflare

### Certificado SSL

Nevent proporciona certificado SSL automático (Let's Encrypt) de forma gratuita.

No necesitas comprar ni configurar SSL tú mismo.

## Configuración

### Paso 1: Decidir subdominio

Elige qué subdominio usar:

**Opción 1: Subdominio dedicado (recomendado)**
```
eventos.tudominio.com
entradas.tudominio.com
tickets.tudominio.com
```

**Ventajas:**
- No afecta tu web principal
- Fácil de configurar
- Sin riesgo

**Opción 2: Subdirectorio del dominio principal**
```
tudominio.com/eventos
tudominio.com/entradas
```

**Ventajas:**
- URL más limpia
- Mejor para SEO

**Desventajas:**
- Configuración más compleja
- Puede requerir proxy reverso

:::tip[Recomendación]
Para la mayoría de casos, usa subdominio dedicado tipo `eventos.tudominio.com`. Es más simple y funciona perfectamente.
:::

### Paso 2: Obtener configuración DNS de Nevent

1. Ve a **Configuración** → **Avanzado** → **Dominio personalizado**
2. Haz clic en **Configurar dominio personalizado**
3. Introduce el (sub)dominio que quieres usar:
   ```
   eventos.tudominio.com
   ```
4. Haz clic en **Siguiente**

Nevent te mostrará la configuración DNS exacta:

```
Tipo: CNAME
Nombre: eventos
Valor: custom.nevent.es
TTL: 3600
```

O en algunos casos:

```
Tipo: A
Nombre: eventos
Valor: 104.26.10.123
TTL: 3600
```

### Paso 3: Configurar DNS

#### En tu proveedor de dominio

1. Inicia sesión en tu proveedor (GoDaddy, Namecheap, etc.)
2. Ve a gestión de DNS de tu dominio
3. Añade el registro proporcionado por Nevent

**Ejemplo en GoDaddy:**
1. Mis dominios → tudominio.com → Administrar DNS
2. Añadir registro CNAME
3. Host: `eventos`
4. Apunta a: `custom.nevent.es`
5. TTL: 1 hora
6. Guardar

**Ejemplo en Cloudflare:**
1. DNS → Añadir registro
2. Tipo: CNAME
3. Nombre: `eventos`
4. Destino: `custom.nevent.es`
5. Proxy status: DNS only (desactivar proxy naranja)
6. Guardar

:::caution[Desactiva proxy en Cloudflare]
Si usas Cloudflare, asegúrate de desactivar el proxy (nube gris, no naranja) para el registro de Nevent.
:::

### Paso 4: Verificar DNS

Espera a que el DNS se propague (5 minutos - 24 horas).

**Verificar propagación:**

Usa herramientas online:
- [whatsmydns.net](https://www.whatsmydns.net/)
- [dnschecker.org](https://dnschecker.org/)

O en terminal:
```bash
dig eventos.tudominio.com
```

Deberías ver el valor de Nevent en la respuesta.

### Paso 5: Activar en Nevent

1. Vuelve a **Configuración** → **Avanzado** → **Dominio personalizado**
2. Haz clic en **Verificar DNS**
3. Si está correcto, verás ✅ "DNS verificado"
4. Haz clic en **Activar dominio personalizado**

**Provisión de SSL (automático):**

Nevent genera certificado SSL automáticamente (tarda 2-5 minutos).

Verás:
```
⏳ Generando certificado SSL...
```

Luego:
```
✅ Certificado SSL activo
✅ Dominio personalizado configurado
```

### Paso 6: Probar

Visita tu dominio:
```
https://eventos.tudominio.com
```

Deberías ver la página de inicio de tus eventos de Nevent, pero en tu dominio.

## Personalización adicional

### Página de inicio custom

Por defecto, `eventos.tudominio.com` muestra listado de todos tus eventos.

Puedes personalizar:
1. Ve a **Configuración** → **Avanzado** → **Dominio personalizado** → **Página de inicio**
2. Opciones:
   - **Listado de eventos** (predeterminado)
   - **Redirigir a evento específico**
   - **Página HTML custom**

**Ejemplo: Redirigir a un solo evento**

Si solo tienes un evento activo, redirige directamente:
```
eventos.tudominio.com → eventos.tudominio.com/festival-verano-2024
```

### Subdirectorio en lugar de raíz

Si quieres `tudominio.com/eventos/` en lugar de subdomain separado:

**Opción 1: Reverse proxy (avanzado)**

Configura reverse proxy en tu servidor web:

**Nginx:**
```nginx
location /eventos {
    proxy_pass https://my.nevent.es/tu-organizacion;
    proxy_set_header Host my.nevent.es;
}
```

**Apache:**
```apache
ProxyPass /eventos https://my.nevent.es/tu-organizacion
ProxyPassReverse /eventos https://my.nevent.es/tu-organizacion
```

**Opción 2: Cloudflare Workers (medio)**

Usa Workers para reescribir rutas.

**Opción 3: Subdomain + redirect (simple)**

Usa subdominio y redirige desde tu web principal:
```javascript
// En tudominio.com/eventos
window.location = 'https://eventos.tudominio.com';
```

## Mejores prácticas

### Usa HTTPS siempre

Nevent proporciona SSL automático, no uses HTTP.

### Mantén TTL bajo inicialmente

Cuando configures el DNS por primera vez, usa TTL bajo (300-600 segundos).

Una vez todo funcione, puedes subir a 3600 (1 hora).

### Verifica regularmente

El certificado SSL se renueva automáticamente, pero verifica cada 3 meses que todo funciona.

### Monitoriza uptime

Usa herramientas como UptimeRobot para monitorizar que tu dominio custom responde.

## Múltiples dominios

Si tienes varias marcas o eventos, puedes configurar múltiples dominios:

**Ejemplo:**
- `sonar.com` → Festival Sónar
- `primaverasound.com` → Primavera Sound
- `apolo.com` → Sala Apolo

**Configuración:**
1. Configura cada dominio por separado
2. Asigna eventos específicos a cada dominio
3. Ve a **Eventos** → Evento → **Configuración** → **Dominio**
4. Selecciona dominio para ese evento

## Solución de problemas

### El DNS no se verifica

**Posibles causas:**

1. **Propagación DNS aún pendiente**
   - Espera 24-48h
   - Verifica con whatsmydns.net

2. **Registro incorrecto**
   - Verifica tipo (CNAME vs A)
   - Verifica valor exacto
   - Sin espacios ni caracteres extra

3. **Proxy de Cloudflare activo**
   - Desactiva proxy (nube gris)

**Solución:** Vuelve a verificar configuración DNS paso a paso.

### Error de certificado SSL

**Causa:** El certificado aún se está generando.

**Solución:** Espera 5-10 minutos y prueba de nuevo.

Si persiste después de 1 hora, contacta a soporte.

### "Este sitio no es seguro"

**Causa:** Estás accediendo por HTTP en lugar de HTTPS.

**Solución:** Usa siempre `https://eventos.tudominio.com` (con la 's').

### La página se ve rota o sin estilos

**Causa:** Mixed content (HTTPS con recursos HTTP).

**Solución:**
- Asegúrate de acceder por HTTPS
- Verifica que todas las imágenes/recursos usen HTTPS

### Quiero cambiar de dominio

1. Ve a **Configuración** → **Avanzado** → **Dominio personalizado**
2. Haz clic en **Cambiar dominio**
3. Configura el nuevo dominio
4. Espera verificación
5. El antiguo dominio se desactiva automáticamente

## Casos de uso

### Festival con web corporativa

**Situación:**
- Web corporativa en `sonar.es`
- Quieres vender entradas en subdominio

**Solución:**
```
entradas.sonar.es → Nevent (venta de entradas)
sonar.es → Web corporativa (info, lineup, etc.)
```

**Enlace desde web corporativa:**
```html
<a href="https://entradas.sonar.es">Comprar entradas</a>
```

### Sala con múltiples eventos

**Situación:**
- Sala que hace 50+ eventos/año
- Quieres página central de eventos

**Solución:**
```
eventos.salaapolo.com → Listado de todos los eventos
eventos.salaapolo.com/concierto-xyz → Evento específico
```

### Promotora white-label

**Situación:**
- Promotora que trabaja con múltiples clientes
- Cada cliente quiere su dominio

**Solución:**
```
entradas.cliente1.com → Eventos del cliente 1
entradas.cliente2.com → Eventos del cliente 2
```

Configura dominio custom por cliente.

## Límites

- **Plan Pro:** 1 dominio personalizado
- **Plan Enterprise:** Dominios ilimitados

## SEO

### Mejora SEO con dominio custom

**Title y meta tags:**

Nevent genera automáticamente:
```html
<title>Festival Verano 2024 | Tu Marca</title>
<meta name="description" content="Compra entradas para Festival Verano 2024. 15 de junio en Barcelona.">
```

**Open Graph para redes sociales:**
```html
<meta property="og:title" content="Festival Verano 2024">
<meta property="og:image" content="https://eventos.tudominio.com/og-image.jpg">
<meta property="og:url" content="https://eventos.tudominio.com/festival-verano">
```

### Sitemap

Nevent genera sitemap automático:
```
https://eventos.tudominio.com/sitemap.xml
```

Envía a Google Search Console:
1. Verifica propiedad del dominio
2. Añade sitemap
3. Google indexará tus eventos

### Schema markup

Nevent incluye schema.org automático para eventos:
```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Festival Verano 2024",
  "startDate": "2024-06-15T18:00",
  "location": {
    "@type": "Place",
    "name": "Fira Barcelona"
  }
}
```

Esto mejora cómo aparece en resultados de búsqueda.

## Soporte

Para ayuda con dominios personalizados:
- Email: dominios@nevent.es
- Chat en vivo (L-V 9:00-18:00)

:::tip[Tiempo de configuración]
Reserva 2-3 días para configurar dominio personalizado (principalmente por propagación DNS). No lo dejes para última hora antes del lanzamiento de un evento.
:::
