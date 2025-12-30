---
title: Campos personalizados
description: Crea campos adicionales para adaptar Nevent a tu negocio
---

Añade campos personalizados a fans y eventos para capturar información específica de tu organización.

## ¿Qué son los campos personalizados?

Campos adicionales que defines tú para capturar información más allá de los campos estándar de Nevent.

**Campos estándar de fans:**
- Nombre, email, teléfono, ciudad, país

**Ejemplos de campos personalizados:**
- Género musical favorito específico
- Talla de camiseta
- Preferencia de dieta (vegetariano, vegano, sin gluten)
- Nivel VIP
- Origen/fuente de adquisición

## Acceder a campos personalizados

1. Ve a **Configuración** → **Organización** → **Campos personalizados**
2. Verás dos pestañas:
   - **Campos de fans** - Para perfiles de audiencia
   - **Campos de eventos** - Para información de eventos

## Crear campo personalizado

### Paso 1: Hacer clic en "Nuevo campo"

1. Selecciona pestaña (Fans o Eventos)
2. Haz clic en **+ Nuevo campo**

### Paso 2: Configurar campo

**Nombre del campo:**
```
Género musical favorito
```

**Nombre técnico (generado automáticamente):**
```
genero_musical_favorito
```

:::note[Nombre técnico]
Se usa internamente y en integraciones. No se puede cambiar después de crear el campo.
:::

**Tipo de campo:**

Selecciona el tipo apropiado:

**Texto corto**
- Una línea de texto
- Máximo 255 caracteres
- Ejemplo: Nombre de la banda favorita

**Texto largo**
- Múltiples líneas
- Hasta 2000 caracteres
- Ejemplo: Comentarios o notas

**Número**
- Solo números
- Puede ser entero o decimal
- Ejemplo: Número de eventos asistidos

**Fecha**
- Selector de fecha
- Formato: DD/MM/AAAA
- Ejemplo: Fecha de nacimiento

**Lista desplegable (select)**
- Opción única de una lista predefinida
- Ejemplo: Nivel VIP (Bronce, Plata, Oro)

**Checkbox (Sí/No)**
- Valor booleano
- Ejemplo: ¿Acepta recibir merchandising?

**Lista de opciones múltiples**
- Varias opciones de una lista
- Ejemplo: Géneros musicales de interés (puede seleccionar varios)

**URL**
- Enlace web
- Valida formato URL
- Ejemplo: Perfil de Instagram

**Email**
- Dirección de email adicional
- Valida formato email
- Ejemplo: Email alternativo

### Paso 3: Configurar opciones

**Para listas desplegables:**

Introduce las opciones separadas por línea:

```
Techno
House
Drum & Bass
Trance
Ambient
```

**Para listas múltiples:**

Igual, una opción por línea:

```
Vegetariano
Vegano
Sin gluten
Sin lactosa
Sin frutos secos
```

### Paso 4: Opciones adicionales

**Obligatorio:**
- ✅ Activar si el campo debe completarse siempre
- ❌ Desactivar si es opcional

**Visible en formularios:**
- ✅ Aparece en formularios de registro
- ❌ Solo visible en panel admin

**Descripción de ayuda:**
Texto que aparece bajo el campo para guiar al usuario.

**Ejemplo:**
```
Selecciona tu género musical favorito para recibir recomendaciones personalizadas
```

### Paso 5: Guardar

1. Haz clic en **Crear campo**
2. El campo estará disponible inmediatamente

## Ejemplos de campos por tipo de organización

### Festival de música

**Campos de fans:**

**Género musical favorito** (Lista desplegable)
```
Opciones:
- Techno
- House
- Indie
- Rock
- Hip Hop
```

**Intereses adicionales** (Lista múltiple)
```
Opciones:
- Arte e instalaciones
- Talleres
- Gastronomía
- Sostenibilidad
- Tecnología
```

**Talla de camiseta** (Lista desplegable)
```
Opciones:
- XS
- S
- M
- L
- XL
- XXL
```

**¿Primera vez en el festival?** (Checkbox)

**Campos de eventos:**

**Capacidad máxima** (Número)

**Escenarios** (Número)

**Proveedor de sonido** (Texto corto)

**Presupuesto** (Número)

### Sala de conciertos

**Campos de fans:**

**Banda favorita** (Texto corto)

**Frecuencia de asistencia** (Lista desplegable)
```
Opciones:
- Primera vez
- Ocasional (1-2 veces/año)
- Habitual (3-6 veces/año)
- Frecuente (7+ veces/año)
```

**Preferencia de ubicación** (Lista desplegable)
```
Opciones:
- Pista
- Grada
- VIP
- Sin preferencia
```

**Campos de eventos:**

**Promotora** (Texto corto)

**Aforo permitido** (Número)

**Estado de permisos** (Lista desplegable)
```
Opciones:
- Pendiente solicitud
- Solicitado
- Aprobado
- Denegado
```

### Club nocturno

**Campos de fans:**

**Nivel VIP** (Lista desplegable)
```
Opciones:
- Regular
- Bronce
- Plata
- Oro
- Platinum
```

**Bebida favorita** (Texto corto)

**Mesa habitual** (Número)

**¿Viene con grupo?** (Checkbox)

**Número habitual de acompañantes** (Número)

**Campos de eventos:**

**DJ residente** (Sí/No - Checkbox)

**Código de vestimenta** (Lista desplegable)
```
Opciones:
- Casual
- Smart casual
- Formal
- Temática
```

## Usar campos personalizados

### En formularios de registro

Los campos marcados como "Visible en formularios" aparecen automáticamente cuando un fan se registra.

**Aparecen:**
- Formularios de registro a eventos
- Formulario de suscripción a newsletter
- Checkout de compra de entradas

**Orden:**
1. Campos estándar primero
2. Campos personalizados después
3. Puedes reordenar arrastrando

### En perfiles de fans

**Ver datos:**
1. Ve a **Audiencia** → Selecciona fan
2. Los campos personalizados aparecen en sección "Información adicional"

**Editar manualmente:**
1. Haz clic en **Editar perfil**
2. Completa o modifica campos personalizados
3. Guarda

### En segmentación

Usa campos personalizados para crear segmentos:

**Ejemplo: Fans de techno**
```
Filtro: Género musical favorito = "Techno"
```

**Ejemplo: VIPs oro o superior**
```
Filtro: Nivel VIP IN ["Oro", "Platinum"]
```

**Ejemplo: Vegetarianos**
```
Filtro: Preferencias dieta CONTIENE "Vegetariano"
```

### En campañas

Personaliza mensajes usando campos custom:

**Ejemplo de email:**
```
¡Hola {{nombre}}!

Vimos que te encanta {{genero_musical_favorito}}.

Tenemos un evento especial para ti este sábado
con los mejores DJs de {{genero_musical_favorito}}.

¿Te apuntas?
```

**Ejemplo con condicional:**
```
{% if nivel_vip == "Oro" or nivel_vip == "Platinum" %}
Como miembro VIP {{nivel_vip}}, tienes acceso prioritario.
{% endif %}
```

### En exportaciones

Al exportar audiencia:

1. Ve a **Audiencia** → **Exportar**
2. Selecciona **Incluir campos personalizados**
3. Exporta CSV o Excel

**Columnas incluidas:**
```
email,nombre,genero_musical,nivel_vip,talla_camiseta
maria@example.com,María García,Techno,Oro,M
juan@example.com,Juan López,House,Plata,L
```

## Gestionar campos existentes

### Editar campo

1. Haz clic en **⋮** → **Editar**
2. Puedes cambiar:
   - Nombre del campo (se mantiene nombre técnico)
   - Descripción de ayuda
   - Opciones (para listas)
   - Obligatorio / Opcional
   - Visible en formularios
3. Guarda

:::caution[No puedes cambiar el tipo]
Una vez creado, no puedes cambiar el tipo de campo (ej: de texto a número). Deberías crear uno nuevo y migrar datos.
:::

### Reordenar campos

**En formularios:**
1. Arrastra campos para reordenar
2. El nuevo orden se aplica automáticamente a formularios

**En perfiles:**
Los campos aparecen en el orden que los creaste.

### Ocultar campo

Si ya no necesitas un campo pero no quieres perder datos históricos:

1. Editar campo
2. Desmarcar **Visible en formularios**
3. Guardar

**Resultado:**
- No aparece en nuevos registros
- Datos históricos se conservan
- Sigue visible en perfiles de fans existentes

### Eliminar campo

:::caution[Acción irreversible]
Eliminar un campo borra permanentemente todos los datos de ese campo. No se puede recuperar.
:::

1. Haz clic en **⋮** → **Eliminar**
2. Confirma la eliminación
3. Se elimina el campo y todos sus datos

**Antes de eliminar:**
- Exporta datos si los necesitas
- Verifica que no se usa en segmentos activos
- Avisa al equipo

## Validación de datos

### Formatos específicos

**Email:**
- Valida formato email válido
- Ejemplo válido: `maria@example.com`
- Ejemplo inválido: `maria@` ❌

**URL:**
- Requiere protocolo (http:// o https://)
- Ejemplo válido: `https://instagram.com/usuario`
- Ejemplo inválido: `instagram.com/usuario` ❌

**Número:**
- Solo acepta números
- Decimales con punto (no coma)
- Ejemplo válido: `42` o `3.14`
- Ejemplo inválido: `3,14` ❌

### Valores obligatorios

Si marcas campo como **Obligatorio**:
- Formularios no se pueden enviar sin completarlo
- Al editar fan manualmente, también es obligatorio
- Importaciones CSV rechazan filas sin el campo

### Valores únicos

Para ciertos campos personalizados, puedes activar **Valor único**:

**Ejemplo: Código de socio**
- Cada fan debe tener código único
- No se permiten duplicados
- Útil para identificadores internos

## Mejores prácticas

### Naming conventions

**Buenos nombres:**
- ✅ Género musical favorito
- ✅ Talla de camiseta
- ✅ Preferencia de dieta

**Malos nombres:**
- ❌ Campo1
- ❌ Info
- ❌ Otro

### No creates campos redundantes

**Mal:**
```
- Email 2
- Email 3
- Email 4
```

**Bien:**
```
- Email alternativo (1 campo adicional si realmente necesitas)
```

### Usa listas cuando sea posible

**Menos eficiente:**
Campo de texto libre donde fans escriben su género favorito:
- "Techno"
- "techno"
- "TECHNO"
- "Tec no"
→ Imposible segmentar limpiamente

**Más eficiente:**
Lista desplegable con opciones predefinidas:
- Techno ✅
- House ✅
- Drum & Bass ✅
→ Segmentación perfecta

### Limita cantidad de campos

**Recomendación:** Máximo 10-15 campos personalizados activos.

**Por qué:**
- Formularios muy largos reducen conversión
- Demasiados datos complican análisis
- Mantenimiento más difícil

**Pregúntate:**
- ¿Realmente necesito este dato?
- ¿Voy a usarlo para segmentar o analizar?
- ¿Justifica alargar el formulario?

### Revisa regularmente

**Cada 6 meses:**
1. Revisa campos creados
2. Verifica cuáles se usan activamente
3. Elimina campos sin uso
4. Actualiza opciones de listas si es necesario

## Migración de datos

### Importar valores a campo personalizado

Si tienes datos históricos en CSV:

1. Exporta fans actuales
2. Añade columna con el nombre técnico del campo custom
3. Completa valores
4. Importa de nuevo con opción "Actualizar existentes"

**Ejemplo CSV:**
```csv
email,nombre,genero_musical_favorito
maria@example.com,María García,Techno
juan@example.com,Juan López,House
```

### Migrar de un campo a otro

Si creaste campo incorrecto y necesitas migrar:

1. Exporta datos del campo antiguo
2. Crea campo nuevo correcto
3. Importa valores al campo nuevo
4. Verifica que todo migró correctamente
5. Elimina campo antiguo

## Integraciones

### Klaviyo

Los campos personalizados se sincronizan automáticamente como propiedades custom:

**Nevent** → **Klaviyo**
```
genero_musical_favorito → Custom Property: "genero_musical_favorito"
nivel_vip → Custom Property: "nivel_vip"
```

Puedes usarlos para segmentar en Klaviyo.

### Webhooks

Los campos personalizados se incluyen en el payload:

```json
{
  "fan": {
    "email": "maria@example.com",
    "nombre": "María García",
    "custom_fields": {
      "genero_musical_favorito": "Techno",
      "nivel_vip": "Oro",
      "talla_camiseta": "M"
    }
  }
}
```

### API

Accede vía API:

```bash
GET /api/fans/123
```

**Response:**
```json
{
  "id": 123,
  "email": "maria@example.com",
  "custom_fields": {
    "genero_musical_favorito": "Techno",
    "nivel_vip": "Oro"
  }
}
```

## Límites

**Plan Starter:**
- Hasta 5 campos personalizados

**Plan Pro:**
- Hasta 20 campos personalizados

**Plan Enterprise:**
- Ilimitados

## Solución de problemas

### El campo no aparece en formularios

**Posibles causas:**

1. **No está marcado como "Visible en formularios"**
   - Solución: Editar campo y activar la opción

2. **Formulario usa plantilla antigua**
   - Solución: Actualiza plantilla de formulario

### Los datos no se guardan

**Causa:** Validación fallida.

**Solución:**
- Verifica formato (email, URL, número)
- Si es obligatorio, asegúrate de completarlo

### No puedo eliminar un campo

**Causa:** El campo se usa en segmentos activos o automatizaciones.

**Solución:**
1. Identifica dónde se usa (aparece warning)
2. Elimina/edita esos segmentos primero
3. Luego elimina el campo

:::tip[Empieza simple]
No crees todos los campos desde el día 1. Empieza con 3-5 campos clave y ve añadiendo según necesites. Es mejor crecer gradualmente que abrumar a los usuarios.
:::
