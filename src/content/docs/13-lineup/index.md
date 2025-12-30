---
title: Lineup de Artistas
description: Gestiona el lineup de tus eventos con sincronización de Spotify y catálogo global.
---

Organiza y publica el lineup de artistas de tus eventos con datos enriquecidos desde Spotify.

## En esta sección

- **Búsqueda unificada**: Local, catálogo global y Spotify en tiempo real
- **Creación manual**: Añade artistas sin estar en Spotify
- **Import desde Spotify**: Datos completos automáticos
- **Vinculación posterior**: Enriquece datos existentes
- **Gestión de sesiones**: Organiza por día/horario/escenario
- **Publicación granular**: Publica sesiones individualmente
- **Datos sincronizados**: Popularidad, followers, géneros, top tracks
- **Vista pública**: Grid visual para tus fans

## Arquitectura: Evento → Sesiones → Artistas

### Sesiones
Agrupa artistas por período temporal o escenario:
- **Nombre**: "Viernes Noche", "Sábado Main Stage"
- **Fecha/hora inicio y fin**: Período de la sesión
- **Escenario**: (Opcional) Main Stage, Club Room, etc.
- **Publicación**: Borrador o Publicado

### Artistas (Performers)
Cada artista tiene:
- Nombre, imagen, descripción
- Género musical
- Redes sociales (Instagram, TikTok, YouTube)
- Tags personalizados
- **Datos de Spotify** (si está vinculado):
  - Popularidad (0-100)
  - Followers
  - Géneros
  - Top tracks
  - URL de perfil

## Añadir artistas al lineup

### Opción 1: Buscar en Spotify
1. Haz clic en "Añadir artista"
2. Busca por nombre
3. Resultados de 3 fuentes simultáneas:
   - **Local**: Artistas ya creados en tu cuenta
   - **Master Catalog**: Catálogo global de Nevent (multi-tenant)
   - **Spotify**: API en tiempo real
4. Selecciona el artista
5. Se importa automáticamente con todos sus datos

### Opción 2: Crear manualmente
1. Click en "Crear artista"
2. Completa:
   - Nombre (obligatorio)
   - Género musical (38 géneros disponibles)
   - Imagen (upload manual)
   - Descripción
   - Redes sociales
3. Guarda
4. Opcionalmente, vincúlalo después con Spotify

### Opción 3: Vincular después
Si creaste un artista manualmente:
1. Abre el panel de detalle
2. Click en "Vincular con Spotify"
3. Busca el artista en Spotify
4. Elige si:
   - **Enriquecer**: Mantén datos locales, añade datos de Spotify
   - **Sobrescribir**: Reemplaza todo con datos de Spotify

## Gestión de sesiones

### Crear sesión
1. Nombre (ej: "Viernes Noche")
2. Fecha/hora inicio y fin
3. Escenario (opcional)
4. Notas (opcional)

### Reordenar sesiones
Arrastra y suelta sesiones para cambiar el orden visual

### Publicar/Despublicar
- **Borrador**: Solo visible en admin
- **Publicado**: Visible en la vista pública del lineup

### Añadir artistas a sesión
1. Selecciona la sesión
2. Click en "Añadir artista"
3. Busca o crea el artista
4. Se añade automáticamente a esa sesión

## Datos sincronizados de Spotify

Cuando vinculas un artista con Spotify, se importa:
- **Imágenes**: Múltiples resoluciones
- **Popularidad**: Métrica 0-100 de Spotify
- **Followers**: Número de seguidores
- **Géneros musicales**: Lista de géneros según Spotify
- **Top tracks**: 5 canciones más populares
- **URL perfil**: Link directo a Spotify

### Sincronización continua
Los datos se pueden **re-sincronizar** periódicamente para:
- Actualizar popularidad (cambia con el tiempo)
- Actualizar followers
- Obtener nuevos géneros y top tracks

## Catálogo global (Master Performers)

### ¿Qué es?
Sistema multi-tenant que consolida información de artistas a nivel global en Nevent.

### Beneficios
- **Evita duplicados**: Reutiliza artistas ya creados por otros organizadores
- **Datos consistentes**: Mismo artista, misma info en toda la plataforma
- **Sincronización compartida**: Un admin actualiza, todos se benefician

### Cómo funciona
1. Buscas "Amelie Lens"
2. Si está en el Master Catalog, lo vinculas
3. Heredas todos sus datos (Spotify, imágenes, géneros)
4. Si actualizas datos de Spotify, puedes propagarlos al Master (requiere permisos)

## Vista pública del lineup

### Estructura
- Lista plana de sesiones ordenadas por fecha/hora
- Grid de artistas por sesión
- Información de cada artista:
  - Imagen
  - Nombre
  - Género musical
  - Tags
  - Popularidad (si está en Spotify)

### Opciones de visualización
- Por sesión (tabs o acordeón)
- Por día (agrupado automáticamente)
- Grid completo (todos los artistas)

## Gestión de redes sociales

Para cada artista, puedes añadir:
- **Instagram**: Handle sin @ (ej: `amelielens`)
- **TikTok**: Handle sin @ (ej: `amelielens`)
- **YouTube**: Handle o channel ID

Los links se generan automáticamente en la vista pública.

## Tags y géneros musicales

### Géneros pre-definidos (38)
- Techno, House, Trance, Drum & Bass
- Hip Hop, Reggaeton, Trap
- Rock, Indie, Pop
- Jazz, Blues, Soul
- ... y 26 más

### Tags personalizados
Añade etiquetas libres:
- "Headliner"
- "Live Set"
- "DJ Set"
- "Special Guest"
- "B2B"

## Usuarios que han dado like

En el panel de detalle de cada artista, puedes ver:
- Lista de usuarios que marcaron like
- Paginada (20 por página)
- Email y nombre de cada fan
- Link directo al perfil del fan

**Uso**: Segmenta fans por interés en artistas específicos para targeting ultra-personalizado.
