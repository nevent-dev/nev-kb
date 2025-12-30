---
title: Segmentación de Audiencia
description: Crea audiencias objetivo con filtros avanzados basados en comportamiento, demografía e interacciones.
---

Segmenta tu audiencia con criterios avanzados para enviar el mensaje correcto a las personas correctas.

## En esta sección

- **Constructor de criterios**: Interfaz visual para crear condiciones
- **Filtros demográficos**: Edad, ubicación, género, idioma
- **Filtros de comportamiento**: Asistencia a eventos, compras, engagement
- **Filtros de interacción**: Aperturas, clicks, respuestas
- **Filtros de proximidad**: Geolocalización y distancia
- **Filtros de frecuencia**: "Al menos X veces"
- **Filtros temporales**: "En los últimos X días/meses"
- **Filtros por etiquetas**: Usuarios con tags específicos
- **Segmentos dinámicos**: Se actualizan automáticamente
- **Segmentos estáticos**: Snapshot en el tiempo
- **Métricas en tiempo real**: Tamaño estimado del segmento

## Tipos de filtros

### Demográficos
- Edad (rango)
- Ciudad, país
- Género
- Idioma preferido
- Código postal

### Comportamiento
- **Ha asistido a eventos**: Eventos específicos o cualquier evento
- **Ha comprado entradas**: Por evento, por tipo de entrada
- **Ha comprado productos**: Por producto, por categoría
- **Valor total de compras**: Mayor/menor/igual a cantidad
- **Número de compras**: Frecuencia de transacciones

### Interacciones
- **Ha abierto emails**: De campañas específicas
- **Ha hecho click**: En enlaces de campañas
- **Ha respondido a SMS**: Engagement bidireccional
- **Ha interactuado con chatbot**: Conversaciones activas

### Etiquetas
- **Tiene etiqueta**: Una o múltiples etiquetas
- **No tiene etiqueta**: Exclusión por tag

## Modificadores avanzados

### Frecuencia
Añade condiciones como:
- "Al menos 3 veces"
- "Exactamente 1 vez"
- "Más de 5 veces"

### Marco temporal
Restringe a períodos:
- "En los últimos 30 días"
- "En los últimos 6 meses"
- "En el último año"

### Proximidad geográfica
Filtra por distancia:
- "A menos de 50km de Madrid"
- "En un radio de 10km"

## Ejemplo de segmento

**Fans VIP activos en Madrid**:
```
Condiciones:
- Tiene etiqueta "VIP"
- Ciudad = "Madrid"
- Ha asistido a eventos: al menos 3 veces en los últimos 6 meses
- Ha abierto emails: al menos 1 vez en los últimos 30 días
- Nevent Score = "Caliente" o "Tibio"
```

Tamaño estimado: 1,247 usuarios
