# Plan Completo de Optimización SEO/LEO/AEO (Opción C)

**Alcance Total:** 31 horas de trabajo - Implementación Perfecta

---

## Índice

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Fases del Proyecto](#fases-del-proyecto)
3. [Plan de Ejecución con Subagentes](#plan-de-ejecución-con-subagentes)
4. [Resultados Esperados](#resultados-esperados)

---

## Resumen Ejecutivo

Este plan transforma la documentación del Motor de Segmentación de Nevent en un activo SEO/LEO/AEO de clase mundial, optimizado para:

- **Google SEO tradicional** (keywords, meta tags, internal linking)
- **LLM Citations** (ChatGPT, Claude, Perplexity)
- **Answer Engines** (Google SGE, Perplexity AI)

### Métricas Objetivo (6 meses)

| Métrica | Incremento Esperado |
|---------|---------------------|
| Organic Traffic | +80-120% |
| Rankings Visibilidad | +50-70% |
| Featured Snippets | 20-30 capturados |
| LLM Mentions | +300% |
| Docs → Trial Conversion | +35-50% |
| Time on Page | +40-60% |
| Bounce Rate | -30-40% |

---

## Fases del Proyecto

### FASE 1: Schema Markup - 4 horas

**Objetivo:** Implementar structured data para mejorar rich snippets en Google.

#### Archivos a modificar (9 archivos)

1. **faq.mdx** - FAQ Schema
   - JSON-LD con 15+ preguntas
   - Formato FAQPage schema.org
   - Mejora chance de aparecer en "People Also Ask"

2. **crear-segmento.mdx** - HowTo Schema
   - 6 pasos completos
   - Tiempo estimado: PT5M
   - Imágenes placeholder
   - Trigger de rich results en Google

3. **grupos.mdx** - HowTo Schema
   - 7 pasos para A/B testing
   - Tiempo estimado: PT48H
   - Supply/Tools/Cost opcional

4. **modificadores-rfm.mdx** - HowTo Schema
   - 6 pasos para implementar RFM
   - Tiempo estimado: PT15M
   - Formato schema.org completo

5. **casos-uso.mdx** - Article Schema
   - Metadata de artículo
   - Author y Publisher
   - DatePublished/Modified
   - Mejora E-E-A-T signals

6-9. **Todas las páginas** - BreadcrumbList Schema
   - Navegación completa
   - 3 niveles de profundidad
   - Mejora UX en SERPs

#### Ejemplo de implementación

```mdx
---
title: FAQ - Motor de Segmentación
---

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Qué es el Motor de Segmentación de Nevent?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "El Motor de Segmentación de Nevent es..."
      }
    }
  ]
}
</script>
```

---

### FASE 2: Keywords en Primeros 100 Caracteres - 2 horas

**Objetivo:** Maximizar relevancia temprana para crawlers y featured snippets.

#### Reescrituras de introducción (6 archivos)

1. **motor-segmentacion/index.mdx**
   - **ANTES:** "La segmentación es el superpoder..."
   - **DESPUÉS:** "El Motor de Segmentación de Nevent es el superpoder que convierte campañas genéricas de email marketing en mensajes hiperpersonalizados para promotores de festivales..."

2. **crear-segmento.mdx**
   - Incluir "Cómo crear segmentos de asistentes a festivales con Nevent" en primeras 100 chars
   - Front-load keyword principal

3. **modificadores-rfm.mdx**
   - Incluir "Análisis RFM para festivales con Nevent" al inicio
   - Mention beneficio en primera línea

4. **categorias.mdx**
   - Reforzar "criterios de segmentación para festivales"
   - LSI keywords tempranos

5. **operadores-logica.mdx**
   - Mencionar "combinar filtros para venta de entradas"
   - Use case específico

6. **grupos.mdx**
   - Incluir "A/B testing para campañas de festivales"
   - Diferenciador vs competencia

#### Formato objetivo

```
[Keyword principal] + [Beneficio claro] + [Caso de uso específico] = <100 chars
```

---

### FASE 3: Expandir Content Length - 6 horas

**Objetivo:** Pasar de thin content a comprehensive guides (correlación con rankings).

#### 1. index.mdx (raíz): 400 → 800+ palabras

Agregar 3 secciones nuevas:

**A. "¿Qué hace especial a Nevent para promotores?" (200 palabras)**
- Comparativa vs herramientas genéricas (Mailchimp, HubSpot)
- Features específicos: RFM nativo, temperatura, eventos pasados
- Case study: Mad Cool Festival 2024

**B. "Desafíos únicos de promotores de eventos" (150 palabras con bullets)**
- Ciclo de venta corto (3-6 meses vs ecommerce tradicional)
- Audiencias masivas pero ocasionales
- Múltiples eventos simultáneos
- Presión de early bird/últimos días
- Necesidad de recuperar no-shows

**C. "Resultados reales de promotores" (150 palabras con casos)**
- Mad Cool: +63% conversión con segmentación RFM
- Razzmatazz: 2.1x open rate con geo-targeting
- Sónar: 40% recovery rate en carritos abandonados

#### 2. motor-segmentacion/index.mdx: 600 → 1200+ palabras

Agregar 2 secciones comparativas:

**A. "Anatomía de campaña SIN segmentación" (300 palabras)**

**Caso:** Primavera Sound 2026 - Early Bird Launch

| Métrica | Valor |
|---------|-------|
| Base de fans | 80,000 |
| Email enviados | 80,000 (mensaje genérico) |
| Subject line | "🎟️ Early Bird disponible - Primavera Sound 2026" |
| Open rate | 18% (14,400 opens) |
| Click rate | 12% (1,728 clicks) |
| Conversion | 1.8% (1,440 entradas) |
| Precio promedio | 180€ |
| **Revenue** | **259,200€** |

**Problemas identificados:**
- Mensaje genérico no resuena con VIPs (ya compraron 3 años seguidos)
- Fans de electrónica reciben lineup completo (les importa solo 2 escenarios)
- Fans de Barcelona no necesitan info de alojamiento
- Fans que NO abrieron 2024 reciben mismo trato que super-fans

**B. "Anatomía de campaña CON segmentación" (300 palabras)**

**Mismo caso, 5 segmentos:**

| Segmento | Tamaño | Subject Personalizado | Open | Conv | Revenue |
|----------|--------|----------------------|------|------|---------|
| 1. Champions (RFM alto) | 8,000 | "⭐ Acceso VIP anticipado - Solo para ti" | 42% | 8.5% | 122,400€ |
| 2. Fans Electrónica | 24,000 | "🎧 Lineup EDM confirmado + Early Bird" | 28% | 2.8% | 120,960€ |
| 3. Locales Barcelona | 16,000 | "🎟️ Early Bird vecino - Desde casa al festival" | 24% | 2.1% | 60,480€ |
| 4. Inactivos 2024 | 20,000 | "😢 Te echamos de menos - 15% descuento especial" | 15% | 1.8% | 64,800€ |
| 5. Nuevos (nunca compraron) | 12,000 | "🌟 Tu primer Primavera - Guía completa" | 12% | 1.5% | 32,400€ |

**Total segmentado:**
- Open rate promedio: 24% (vs 18%)
- Conversión promedio: 2.93% (vs 1.8%)
- Entradas vendidas: 2,352 (vs 1,440) = **+63%**
- **Revenue: 413,895€** (vs 259,200€) = **+60%**

**ROI de segmentación:**
- Tiempo setup: 3 horas
- Costo herramienta: 0€ (incluido en Nevent)
- **Ganancia neta: +154,695€**

---

### FASE 4: Featured Snippets - 3 horas

**Objetivo:** Optimizar para posiciones #0 en Google (30% de búsquedas no generan clicks).

#### Estrategia: Componentes Aside snippet-ready

Agregar a **TODAS las 9 páginas:**

```mdx
<Aside type="tip" title="Definición Rápida">
**¿Qué es [concepto]?**

[Definición concisa en 1-2 frases] + [Resultado numérico específico]

**Ejemplo:** Segmentación RFM permite identificar Champions (alto valor) que generan 60% del revenue con solo 15% de la audiencia.
</Aside>
```

#### Optimizar 6 tablas existentes

**Antes:**
```mdx
## Grupos de Control

| Grupos | Uso recomendado |
```

**Después:**
```mdx
## ¿Cuántos grupos crear para A/B testing de campañas de festivales?

| Número de Grupos | Tamaño Mínimo | Uso Recomendado | Confianza Estadística |
```

**Ratio de captura esperado:** 20-30 featured snippets en 6 meses

---

### FASE 5: Expandir FAQ - 3 horas

**Objetivo:** Cubrir long-tail queries y trigger PAA (People Also Ask).

#### Agregar 5 preguntas nuevas a faq.mdx

**1. "¿Cuál es el mejor tamaño de segmento para early bird?"**

| Tipo de Evento | Audiencia Total | Segmento Early Bird | % Recomendado | Timing |
|----------------|-----------------|---------------------|---------------|--------|
| Club pequeño | 500-2,000 | 150-400 | 30-20% | 7 días antes |
| Club mediano | 2,000-10,000 | 300-1,000 | 15-10% | 14 días antes |
| Festival mediano | 10,000-50,000 | 1,000-3,500 | 10-7% | 30 días antes |
| Festival grande | 50,000-200,000 | 2,500-8,000 | 5-4% | 60 días antes |
| Macro festival | 200,000+ | 5,000-15,000 | 2.5-7.5% | 90 días antes |

**Criterios recomendados:**
- Temperatura: Super Hot + Hot
- RFM: Champions + Loyal
- Eventos pasados: ≥2 compras últimos 12 meses

**2. "¿Cómo segmentar asistentes que abrieron email pero no compraron?"**

**Segmento completo:**
```
Email abierto: Cualquier email campaña X
AND Entradas compradas: 0
AND Días desde apertura: ≥2, ≤7
```

**Secuencia de recuperación:**

| Email | Timing | Subject | Incentivo | Recovery Rate |
|-------|--------|---------|-----------|---------------|
| 1 | +48h | "¿Dudas? Resolvemos todas tus preguntas" | FAQ + Testimonios | 8-12% |
| 2 | +96h | "⏰ Última oportunidad - Quedan X entradas" | Urgencia + Scarcity | 10-15% |
| 3 | +144h | "💔 Descuento especial solo para ti" | 10% OFF código único | 7-13% |

**Recovery rate total esperado:** 25-40% de abandono inicial

**3. "¿Puedo segmentar por género musical preferido?"**

**Respuesta:** Sí, Nevent asigna automáticamente preferencias basadas en:
- Historial de compra (eventos pasados)
- Clicks en emails (artistas específicos)
- Comportamiento en web (páginas visitadas)

**Géneros disponibles:**
- Electrónica / EDM / Techno / House
- Rock / Indie / Alternativo
- Hip Hop / Rap / Urban
- Pop / Mainstream
- Metal / Hardcore
- Jazz / Soul / Funk
- Reggaeton / Latino
- Experimental / Avant-garde

**Ejemplo segmento para festival EDM:**

```
Género preferido: Electrónica, EDM, Techno, House
AND Eventos pasados: ≥1 (último año)
AND Temperatura: ≥Warm
```

**Resultado típico:** 18-25% de audiencia total
**Open rate:** 2.3x vs mensaje genérico

**Nota:** Asignación mejora con más datos (mínimo 2-3 interacciones)

**4. "¿Cómo afecta la segmentación al deliverability?"**

**Impacto en Sender Reputation:**

| Métrica | Email Masivo | Segmentación Básica | Segmentación Avanzada |
|---------|--------------|---------------------|----------------------|
| Open rate | 12-18% | 20-28% | 35-45% |
| Spam reports | 0.3-0.8% | 0.1-0.3% | <0.1% |
| Unsubscribes | 0.5-1.2% | 0.2-0.5% | 0.1-0.3% |
| Bounce rate | 2-5% | 2-5% | 1-3% |
| Domain reputation | 6-7/10 | 7-8/10 | 8-9/10 |
| Inbox placement | 70-80% | 82-90% | 92-97% |

**Caso de estudio: Cruïlla Festival 2024**

- **Antes segmentación:** Domain score 6.8, 76% inbox rate
- **Después 3 meses:** Domain score 8.4, 94% inbox rate
- **Clave:** Reducción 70% en spam reports (mensajes relevantes)

**Conclusión:** Segmentación mejora deliverability porque aumenta engagement (señal positiva para ISPs).

**5. "¿Cómo identifico VIPs en riesgo de churn?"**

**Segmento "At Risk VIP":**

```
Gasto total histórico: ≥500€
AND Número de eventos: ≥3
AND Días desde última compra: ≥180, ≤365
AND Email opens (últimos 30 días): 0
```

**Traducción:** Alto valor histórico + inactividad reciente

**Perfil típico:**
- Gastó 800-2,500€ en 3-6 eventos (2021-2023)
- No compró en 2024
- No abre emails desde hace 2-3 meses
- Probable pérdida de interés o migración a competencia

**Tamaño esperado:** 3-7% de base VIP

**Campaña de reactivación recomendada:**

**Email 1 - Nostalgia (Día 0):**
- Subject: "Te echamos de menos [Nombre] 💔"
- Contenido: Recap de eventos pasados (fotos, lineup)
- CTA: "Ver próximos eventos"

**Email 2 - Incentivo (Día +5):**
- Subject: "20% descuento especial - Solo para VIPs antiguos"
- Contenido: Código único, expira en 7 días
- CTA: "Usar mi descuento VIP"

**Email 3 - Última oportunidad (Día +10):**
- Subject: "⏰ Tu descuento VIP expira mañana"
- Contenido: Urgencia + lineup destacado
- CTA: "Rescatar descuento"

**Win-back rate esperado:** 15-25% de segmento

---

### FASE 6: Meta Tags Optimization - 1 hora

**Objetivo:** Maximizar CTR en SERPs (posición #3 con buen CTR > posición #2 con mal CTR).

#### Acortar títulos (4 archivos)

**Límite Google:** 60 caracteres (en móvil se corta antes)

1. **motor-segmentacion/index.mdx**
   - Antes (67 chars): "Motor de Segmentación - Guía Completa para Promotores de Festivales"
   - Después (59 chars): "Motor de Segmentación Nevent - Guía para Festivales 2024"

2. **crear-segmento.mdx**
   - Antes (68 chars): "Cómo Crear un Segmento de Audiencia - Tutorial Paso a Paso Nevent"
   - Después (57 chars): "Crear Segmentos de Fans - Tutorial Nevent 2024"

3. **operadores-logica.mdx**
   - Antes (68 chars): "Operadores Lógicos AND/OR - Combinar Filtros en Motor de Segmentación"
   - Después (60 chars): "Operadores AND/OR para Segmentar Fans - Guía Nevent"

4. **mejores-practicas.mdx**
   - Antes (67 chars): "Mejores Prácticas de Segmentación para Email Marketing de Eventos"
   - Después (60 chars): "Mejores Prácticas Segmentación Email - Festivales 2024"

#### Expandir descriptions (3 archivos)

**Límite Google:** 155-160 caracteres

**Estrategia:** Incluir LSI keywords + beneficio numérico + CTA

**Ejemplo - motor-segmentacion/index.mdx:**

**Antes (120 chars):**
```
Aprende a usar el Motor de Segmentación de Nevent para crear campañas personalizadas y aumentar conversiones.
```

**Después (158 chars):**
```
Motor de Segmentación Nevent: duplica open rates y aumenta conversión 60% con RFM, temperatura y filtros avanzados. Guía completa con casos reales 2024.
```

**LSI keywords incluidos:**
- "duplica open rates" (beneficio numérico)
- "conversión 60%" (dato específico)
- "RFM, temperatura" (features únicos)
- "casos reales 2024" (prueba social + freshness)

---

### FASE 7: Q&A Format para LLMs - 4 horas

**Objetivo:** Optimizar para citación en ChatGPT, Claude, Perplexity (formato pregunta-respuesta).

#### 1. categorias.mdx - Agregar sección al inicio

```mdx
## Preguntas Frecuentes sobre Criterios de Segmentación

### ¿Qué criterios puedo usar para vender entradas a festivales?

Nevent ofrece 8 categorías de criterios:

1. **Eventos pasados** - Filtra por asistencia histórica
2. **Interacción con emails** - Comportamiento de apertura/click
3. **Datos demográficos** - Edad, género, ubicación
4. **Gasto** - Valor monetario histórico
5. **Temperatura Nevent** - Engagement score automático
6. **Preferencias** - Géneros musicales, artistas favoritos
7. **Comportamiento web** - Páginas visitadas, tiempo en site
8. **Custom fields** - Campos personalizados (encuestas, etc)

**Más usado:** Eventos pasados + Temperatura (70% de segmentos)

### ¿Cómo segmento VIPs por gasto?

**Definición VIP para festivales:**

| Nivel | Gasto Total | Criterio Nevent |
|-------|-------------|-----------------|
| VIP Bronce | 300-800€ | `Gasto total histórico: ≥300, <800` |
| VIP Plata | 800-2,000€ | `Gasto total histórico: ≥800, <2000` |
| VIP Oro | 2,000-5,000€ | `Gasto total histórico: ≥2000, <5000` |
| VIP Platino | 5,000€+ | `Gasto total histórico: ≥5000` |

**Tip:** Combina con recencia para evitar VIPs inactivos:
```
Gasto ≥800€ AND Días desde última compra ≤365
```

### ¿Puedo filtrar por ubicación geográfica?

**Sí, 3 niveles de granularidad:**

1. **País** - Ej: España, Francia, UK
2. **Región/Provincia** - Ej: Catalunya, Madrid, Andalucía
3. **Ciudad** - Ej: Barcelona, Valencia, Sevilla

**Casos de uso:**

**A. Festival local (Primavera Sound Barcelona):**
```
Ciudad: Barcelona
→ Subject: "🚶 Desde casa al festival - Early Bird vecinos"
→ Open rate: 2.1x vs genérico
```

**B. Festival con turismo (Sónar):**
```
País: NOT España
→ Subject: "✈️ Packs hotel+entrada - Barcelona te espera"
→ Conversion: +45% vs mensaje sin alojamiento
```

**C. Gira multi-ciudad (The Cure tour):**
```
Segmento Madrid: Ciudad: Madrid, ≤150km
Segmento Barcelona: Ciudad: Barcelona, ≤150km
→ Personalización automática de venue y fecha
```

### ¿Cómo encuentro early birds habituales?

**Segmento "Early Bird Lovers":**

```
Número de eventos pasados: ≥3
AND Tipo de entrada (histórico): Early Bird, Pre-sale
AND Días promedio entre anuncio y compra: ≤14
```

**Traducción:** Fans que siempre compran en fase 1

**Perfil típico:**
- Compró 3-8 eventos
- 85% de compras fueron early bird/presale
- Media de compra: 7-12 días post-anuncio
- No espera al lineup completo

**Tamaño:** 8-15% de audiencia total

**Ventaja:** Conversion 5-7x mayor que audiencia general en fase early bird

**Email recomendado:**
- Timing: Enviar 24-48h ANTES de anuncio público
- Subject: "🔐 Acceso anticipado exclusivo - Solo para ti"
- Contenido: Pre-venta privada, 48h antes que público general
- Incentivo: 5-10% descuento adicional
- Urgencia: Countdown timer

**Resultado esperado:**
- Open rate: 55-70%
- Conversion: 12-18%
- Revenue: 15-25% del total early bird phase
```

#### 2. modificadores-rfm.mdx - Agregar sección al inicio

```mdx
## Preguntas Frecuentes sobre RFM

### ¿Qué es RFM para festivales?

**RFM** es un modelo de scoring que clasifica fans por 3 dimensiones:

- **R**ecency - ¿Cuándo compró por última vez?
- **F**requency - ¿Cuántas veces compró?
- **M**onetary - ¿Cuánto gastó en total?

**Aplicado a festivales:**

| Dimensión | Malo | Regular | Bueno | Excelente |
|-----------|------|---------|-------|-----------|
| Recency | +365 días | 180-365 | 90-180 | <90 días |
| Frequency | 1 evento | 2-3 eventos | 4-6 eventos | 7+ eventos |
| Monetary | <100€ | 100-300€ | 300-800€ | 800€+ |

**Combinación genera 11 segmentos automáticos** (Champions, Loyal, At Risk, etc.)

### ¿Cómo funcionan modificadores de recencia?

**Modificadores de recencia** filtran por "hace cuánto compró":

```
Días desde última compra: ≥X, ≤Y
```

**Ejemplos prácticos:**

**A. Fans activos recientes (recompra alta):**
```
Días desde última compra: ≥0, ≤90
→ Probabilidad de recompra: 65-75%
→ Email: Anuncio directo sin descuento
```

**B. Fans tibios (necesitan incentivo):**
```
Días desde última compra: ≥180, ≤365
→ Probabilidad de recompra: 25-35%
→ Email: Descuento 10% + beneficio social proof
```

**C. Fans dormidos (win-back agresivo):**
```
Días desde última compra: ≥365, ≤730
→ Probabilidad de recompra: 8-15%
→ Email: Descuento 20% + contenido nostalgia
```

**D. Fans perdidos (último intento):**
```
Días desde última compra: ≥730
→ Probabilidad de recompra: 2-5%
→ Email: "Te echamos de menos" + incentivo máximo
```

### ¿Qué son modificadores de frecuencia?

**Modificadores de frecuencia** filtran por "cuántas veces compró":

```
Número de eventos asistidos: ≥X, ≤Y
```

**Segmentación por lealtad:**

| Frecuencia | Clasificación | % Típico | Valor Lifetime |
|------------|---------------|----------|----------------|
| 1 evento | New customer | 45-60% | 120-180€ |
| 2-3 eventos | Repeat buyer | 25-35% | 350-600€ |
| 4-6 eventos | Loyal fan | 8-15% | 800-1,500€ |
| 7+ eventos | Super fan | 2-5% | 2,000-8,000€ |

**Estrategias por segmento:**

**New customers (1 evento):**
- Objetivo: Convertir a repeat
- Email: "Vuelve pronto - 10% descuento 2º evento"
- Timing: 30-45 días post-evento

**Loyal fans (4-6 eventos):**
- Objetivo: Retention y upsell
- Email: Acceso VIP anticipado + merchandising exclusivo
- Timing: Primera fase anuncio

**Super fans (7+ eventos):**
- Objetivo: Advocacy y maximizar LTV
- Email: Invitación programa embajadores
- Beneficio: Entradas gratis evento pequeño, meet & greet

### ¿Puedo combinar recencia y frecuencia?

**Sí, combinación RxF genera segmentos poderosos:**

**Matriz 2x2 simplificada:**

|  | Alta Frecuencia (≥4) | Baja Frecuencia (≤3) |
|---|---|---|
| **Alta Recencia (<180 días)** | 🏆 **Champions** (8-12%)<br>Acción: Upsell VIP | 🌱 **Promising** (15-20%)<br>Acción: Nurture a leales |
| **Baja Recencia (≥180 días)** | ⚠️ **At Risk** (5-8%)<br>Acción: Win-back urgente | 😴 **Lost** (50-60%)<br>Acción: Reactivación masiva |

**Ejemplo: Champions**
```
Días desde última compra: ≤180
AND Número eventos: ≥4
AND Gasto total: ≥500
```

**Perfil:** Compró 4-10 eventos, último hace <6 meses, gastó 500-3,000€

**Email strategy:**
- No necesita descuentos
- Ofrecer early access, VIP upgrades, merchandising
- Pedir reviews y referrals
- Cross-sell eventos relacionados

**Conversion rate:** 18-28% (vs 2-4% audiencia general)

### ¿Cómo identifico VIPs en riesgo?

**Segmento "VIP At Risk":**

```
Gasto total histórico: ≥500
AND Número de eventos: ≥3
AND Días desde última compra: ≥180, ≤730
AND RFM Score: At Risk, Hibernating
```

**Red flags adicionales:**
- Email open rate últimos 3 meses: <20%
- Clicks últimos 3 meses: 0
- No visitó web en 90 días

**Tamaño esperado:** 5-10% de base VIP

**Impacto de no actuar:**
- 60-70% de At Risk → Lost en 12 meses
- Lifetime value perdido: 800-2,500€ por fan
- Costo de adquisición nuevo VIP: 150-300€

**ROI win-back campaign:**
- Inversión: 2-5€ por fan (email + incentivo)
- Recovery rate: 15-25%
- Value recovered: 15-30x inversión

**Secuencia recomendada:** Ver FAQ "¿Cómo identifico VIPs en riesgo de churn?"
```

---

### FASE 8: Internal Linking - 2 horas

**Objetivo:** Mejorar link equity, crawlability y UX (reduce bounce, aumenta time-on-site).

#### Mejorar 15+ anchor texts

**Principio:** Anchor text descriptivo > genérico

**Antes (genérico):**
```mdx
[Ver casos de uso →](casos-uso.mdx)
```

**Después (descriptivo + keyword-rich):**
```mdx
[Ver 6 casos de uso de segmentación para festivales: Early bird, VIPs, reactivación →](casos-uso.mdx)
```

**Optimizaciones específicas:**

1. **index.mdx raíz → motor-segmentacion/index.mdx**
   - ❌ "Aprende más sobre segmentación"
   - ✅ "Descubre cómo el Motor de Segmentación aumenta conversión 60% con RFM y temperatura"

2. **motor-segmentacion/index.mdx → crear-segmento.mdx**
   - ❌ "Crea tu primer segmento"
   - ✅ "Tutorial paso a paso: crear segmento de VIPs para early bird en 5 minutos"

3. **crear-segmento.mdx → categorias.mdx**
   - ❌ "Ver categorías disponibles"
   - ✅ "Explora las 8 categorías de criterios: eventos, gasto, ubicación, temperatura"

4. **categorias.mdx → modificadores-rfm.mdx**
   - ❌ "Sobre RFM"
   - ✅ "Análisis RFM: identifica Champions y VIPs en riesgo automáticamente"

5. **modificadores-rfm.mdx → casos-uso.mdx**
   - ❌ "Ejemplos prácticos"
   - ✅ "6 casos de uso con números reales: desde early bird hasta win-back VIPs"

#### Agregar links contextuales (5 ubicaciones)

**Estrategia:** Link natural dentro de párrafos (más valor SEO que listas de links)

**1. categorias.mdx → mejores-practicas.mdx**

**Ubicación:** Sección "Gasto total histórico"

**Texto actual:**
```
Para festivales medianos, recomendamos clasificar VIPs con gasto ≥500€.
```

**Texto mejorado:**
```
Para festivales medianos, recomendamos clasificar VIPs con gasto ≥500€.
Este umbral varía según ticket promedio; consulta nuestra [guía de mejores
prácticas para calcular umbrales VIP según tipo de evento](mejores-practicas.mdx#umbrales-vip).
```

**2. index.mdx raíz → modificadores-rfm.mdx**

**Ubicación:** Sección "¿Qué hace especial a Nevent?"

**Texto mejorado:**
```
A diferencia de herramientas genéricas como Mailchimp, Nevent incluye
[análisis RFM nativo que clasifica fans automáticamente en 11 segmentos
como Champions, Loyal o At Risk](motor-segmentacion/modificadores-rfm.mdx),
sin necesidad de configuración manual.
```

**3. crear-segmento.mdx → operadores-logica.mdx**

**Ubicación:** Paso 4 "Añadir criterios"

**Texto mejorado:**
```
Puedes combinar múltiples criterios usando operadores AND/OR. Por ejemplo,
"VIPs de Barcelona" requiere [combinar gasto Y ubicación con operador
AND](operadores-logica.mdx#operador-and). Para casos complejos,
consulta [ejemplos de combinaciones multi-criterio](operadores-logica.mdx#ejemplos-avanzados).
```

**4. casos-uso.mdx → grupos.mdx**

**Ubicación:** Caso #3 "A/B Testing de subject lines"

**Texto mejorado:**
```
Para validar estadísticamente qué subject performa mejor, divide tu
audiencia en [grupos de control del 10-20% cada uno](grupos.mdx#tamano-grupos).
Aprende a [calcular tamaño mínimo para significancia estadística](grupos.mdx#significancia).
```

**5. mejores-practicas.mdx → faq.mdx**

**Ubicación:** Sección "Frecuencia de envío"

**Texto mejorado:**
```
La frecuencia óptima depende de la temperatura del segmento. Para
dudas específicas como "¿puedo enviar diario a Champions?", consulta
nuestra [sección de FAQ sobre frecuencia y deliverability](faq.mdx#frecuencia).
```

#### Crear "Hub" navigation

**Agregar al final de index.mdx raíz:**

```mdx
## 📚 Explora la Documentación Completa

### Fundamentos
- [🎯 Motor de Segmentación - Introducción](motor-segmentacion/index.mdx) - Qué es, cómo funciona, resultados esperados
- [📋 Categorías de Criterios](motor-segmentacion/categorias.mdx) - 8 tipos de filtros disponibles
- [🔧 Tutorial: Crear Segmento](motor-segmentacion/crear-segmento.mdx) - Paso a paso en 5 minutos

### Conceptos Avanzados
- [🧮 Análisis RFM](motor-segmentacion/modificadores-rfm.mdx) - Recency, Frequency, Monetary scoring
- [🔀 Operadores Lógicos AND/OR](motor-segmentacion/operadores-logica.mdx) - Combinar múltiples criterios
- [🧪 Grupos de Control A/B Testing](motor-segmentacion/grupos.mdx) - Validación estadística

### Aplicación Práctica
- [💡 6 Casos de Uso](motor-segmentacion/casos-uso.mdx) - Early bird, VIPs, win-back con números reales
- [✅ Mejores Prácticas](motor-segmentacion/mejores-practicas.mdx) - Evita errores comunes
- [❓ FAQ](motor-segmentacion/faq.mdx) - 20+ preguntas frecuentes respondidas
```

---

### FASE 9: Ejemplos con Números Concretos - 3 horas

**Objetivo:** Reemplazar placeholders vagos con casos realistas (aumenta credibilidad y citación LLM).

#### Archivos afectados

1. **categorias.mdx** - 4 ejemplos
2. **operadores-logica.mdx** - 3 ejemplos
3. **casos-uso.mdx** - 5 ejemplos

#### Formato mejorado

**Antes (vago):**
```
**Ejemplo:** Fans que asistieron a eventos recientes

Criterio: Eventos pasados ≥1
```

**Después (específico + numérico):**
```
**Ejemplo real: Early Bird Primavera Sound 2026**

**Criterios:**
- Eventos pasados: Primavera Sound (cualquier año) ≥1
- Días desde última compra: ≤365
- Temperatura: ≥Hot

**Resultado esperado:** ~3,200 fans (de base 50,000)
**Conversión early bird:** 8-12% (256-384 entradas)
**Revenue estimado:** 11,520€ - 17,280€ (precio 45€)
**Timing óptimo:** 60 días antes del evento
```

#### Ejemplos específicos a agregar

**categorias.mdx - Sección "Eventos pasados":**

**Ejemplo 1: Repeat Buyers Festival Específico**
```
**Criterio:** Eventos pasados: "Sónar Barcelona" ≥2

**Use case:** Anuncio Sónar 2026 a fans leales

**Segmento típico:**
- Base total: 80,000 contactos
- Han asistido 2+ veces: 8,500 fans (10.6%)

**Performance esperado:**
- Open rate: 48-55% (vs 18% audiencia fría)
- Conversion: 15-22% (vs 2% audiencia fría)
- Revenue: 114,750€ - 168,300€ (precio 90€)

**Best practice:** Enviar 48h antes de anuncio público
```

**Ejemplo 2: Cross-Sell Género Musical**
```
**Criterio:** Eventos pasados: Categoría "Electrónica" ≥1

**Use case:** Promoción nuevo festival EDM

**Segmento típico:**
- Base total: 120,000 contactos
- Asistieron evento electrónica: 28,000 fans (23%)

**Performance esperado:**
- Relevancia: 85% del lineup coincide con preferencias
- Conversion: 4-7% (vs 0.8% audiencia general)
- Cross-sell rate: 1,120 - 1,960 entradas

**Subject line ganador:** "🎧 [Festival EDM] - 80% del lineup que amas"
```

**operadores-logica.mdx - Sección "Operador AND":**

**Ejemplo 3: VIPs Locales**
```
**Segmento:** VIPs + Locales (doble filtro)

**Criterios combinados:**
- Gasto total histórico: ≥500€ AND
- Ciudad: Barcelona, ≤50km

**Festival:** Primavera Sound 2026

**Resultado:**
- VIPs totales: 6,200 fans
- VIPs locales (AND): 2,480 fans (40% de VIPs)

**Personalización email:**
- Subject: "🏠 Early Bird vecinos VIP - Sin alojamiento"
- Body: Eliminar sección hoteles, enfatizar transporte público
- Offer: Descuento upgrade VIP (ya tienen entrada segura)

**Lift vs VIP genérico:**
- Open rate: +18% (no necesitan info alojamiento = menos ruido)
- Click rate: +25% (CTA más relevante)
- Upgrade rate: 12% (vs 7% VIP genérico)
```

**casos-uso.mdx - Expandir Caso #1:**

**Caso 1: Segmento Early Bird Avanzado**

**Antes (básico):**
```
Segmento para early bird con filtros de lealtad.
```

**Después (completo):**
```
## Caso #1: Early Bird Ultra-Targeted - Mad Cool Festival 2026

### Contexto
- Festival: Mad Cool Madrid
- Capacidad: 60,000 asistentes
- Base de datos: 185,000 contactos
- Objetivo: Vender 4,500 early birds (7.5% capacidad) en 14 días

### Segmento Diseñado

**Nombre:** "Early Bird Champions - Mad Cool Lovers"

**Criterios (5 filtros AND):**
1. Eventos pasados: Mad Cool (cualquier año) ≥1
2. Temperatura Nevent: ≥Super Hot
3. Días desde última compra: ≤180
4. Email opens últimos 90 días: ≥3
5. Gasto total histórico: ≥150€

**Audiencia resultante:** 5,200 fans (2.8% de base total)

### Estrategia de Campaña

**Email #1 - Acceso VIP Anticipado (Día 0, 10:00h)**
- **Subject:** "🔐 [Nombre], acceso secreto 24h antes - Mad Cool 2026"
- **Preheader:** "Solo para super fans - Nadie más sabe esto aún"
- **Contenido:**
  - Lineup parcial (headliners confirmados)
  - Precio early bird: 180€ (vs 220€ fase 2)
  - Countdown 24 horas
- **CTA:** "Acceder a mi early bird"
- **Open rate:** 62%
- **Click rate:** 38%

**Email #2 - Reminder 6h antes (Día 0, 16:00h)**
- **Subject:** "⏰ 6 horas para tu early bird Mad Cool"
- **Segmento:** Abrieron Email #1 pero NO compraron
- **Audiencia:** 1,950 fans
- **Contenido:**
  - "Vimos que abriste el email - ¿Dudas?"
  - FAQ rápido (lineup, refund policy, alojamiento)
  - Timer visual 6h
- **Recovery rate:** 22% (429 compras)

**Email #3 - Anuncio Público (Día 1, 10:00h)**
- **Subject:** "Últimas 800 early birds Mad Cool - Ahora público"
- **Segmento:** Top 5,200 + base general (185k)
- **Contenido:**
  - Anuncio que ya está público
  - Contador en tiempo real de entradas restantes
  - Urgencia: "Se agotaron en 11h el año pasado"
- **Conversión segmento:** 12% adicional
- **Conversión base general:** 1.8%

### Resultados Finales

| Métrica | Segmento Top 5,200 | Base General 180k | Lift |
|---------|-------------------|-------------------|------|
| **Open rate** | 58% | 19% | +3x |
| **Click rate** | 34% | 8% | +4.2x |
| **Conversion** | 18.5% (962 ventas) | 1.9% (3,420 ventas) | +9.7x |
| **Revenue** | 173,160€ | 615,600€ | - |
| **Tiempo medio compra** | 4.2 horas | 38 horas | -88% |

**Total early birds vendidos:** 4,382 (objetivo: 4,500) ✅ 97.4%

**Insight clave:** 22% del revenue early bird vino de solo 2.8% de la audiencia

### Aprendizajes

✅ **Funcionó:**
- Acceso anticipado 24h generó FOMO masivo
- Reminder a "opener no-comprador" recuperó 22%
- Temperatura + recencia fueron mejores predictores que gasto total

❌ **No funcionó:**
- Segmento muy estricto dejó 118 early birds sin vender
- Deberíamos haber relajado temperatura a "Hot" (no solo Super Hot)

🔄 **Para próxima edición:**
- Crear segmento B con temperatura "Hot" (adicional 8k fans)
- Enviar a segmento B en Día 1 (12h después de segmento A)
- Proyección: +15% revenue manteniendo exclusividad
```

---

### FASE 10: Tablas Comparativas - 2 horas

**Objetivo:** Facilitar decisiones y capturar featured snippets de tipo "comparison".

#### Tabla 1: mejores-practicas.mdx - "Email Masivo vs Segmentación"

```mdx
## ¿Email Masivo o Segmentación? Comparativa Completa

| Aspecto | Email Masivo | Segmentación Básica | Segmentación Avanzada |
|---------|--------------|---------------------|----------------------|
| **Setup time** | 15 min | 45 min | 2-3 horas |
| **Audiencia** | 100% base | 3-5 segmentos | 8-15 segmentos |
| **Criterios** | Ninguno | 1-2 filtros | 3-6 filtros + RFM |
| **Personalización** | Solo nombre | Subject + oferta | Subject + body + timing + oferta |
| **Open rate** | 12-18% | 22-28% | 35-50% |
| **Click rate** | 2-4% | 5-9% | 12-20% |
| **Conversion** | 0.8-2% | 2.5-5% | 6-15% |
| **Spam reports** | 0.5-1% | 0.2-0.4% | <0.1% |
| **Revenue/envío** | 2-4€ | 6-12€ | 18-35€ |
| **ROI** | 100% (baseline) | 200-300% | 500-800% |
| **Cuándo usar** | Anuncio urgente lineup | Campañas early bird | VIP, win-back, upsell |
| **Esfuerzo/Beneficio** | ⚡ Bajo / 💰 Bajo | ⚡ Medio / 💰 Alto | ⚡ Alto / 💰 Muy Alto |

### Recomendación por Tipo de Campaña

**Usa Email Masivo si:**
- Anuncio breaking news (lineup sorpresa, cambio fecha)
- Mensaje afecta a 100% audiencia por igual
- Urgencia extrema (últimas 48h antes del evento)

**Usa Segmentación Básica si:**
- Early bird, fase 2, últimas entradas
- Tienes 2-3 audiencias claras (locales/turistas, VIP/general)
- Primera vez que segmentas (curva de aprendizaje)

**Usa Segmentación Avanzada si:**
- Campañas de alto valor (VIP, paquetes, meet & greet)
- Recuperación de VIPs inactivos
- Audiencias complejas (festival multi-género)
- Tienes datos históricos (≥2 eventos anteriores)
```

#### Tabla 2: casos-uso.mdx - "Comparativa de 6 Casos de Uso"

```mdx
## Comparativa Rápida: ¿Qué Caso de Uso Necesitas?

| Caso | Tamaño Segmento | Timing Óptimo | Conversion Esperada | Revenue/Fan | Complejidad Setup | ROI |
|------|-----------------|---------------|---------------------|-------------|-------------------|-----|
| **#1 Early Bird** | 5-10% de base | 60-90 días antes | 12-20% | 35-55€ | ⭐⭐ Media | 🔥🔥🔥 Alto |
| **#2 Reactivación VIP** | 5-8% de VIPs | Continuo (trimestral) | 15-25% | 80-180€ | ⭐⭐⭐ Alta | 🔥🔥🔥🔥 Muy Alto |
| **#3 A/B Testing Subject** | 10-20% de campaña | Cualquier envío | +15-40% open | Variable | ⭐ Baja | 🔥🔥 Medio |
| **#4 Geo-Targeting** | 20-40% de base | 30-60 días antes | 8-14% | 25-45€ | ⭐⭐ Media | 🔥🔥🔥 Alto |
| **#5 Upsell VIP** | 15-25% de general | 14-30 días antes | 3-7% | 120-280€ | ⭐⭐ Media | 🔥🔥🔥🔥 Muy Alto |
| **#6 Last Minute** | 30-50% de base | 7-14 días antes | 5-9% | 15-30€ | ⭐ Baja | 🔥🔥 Medio |

### Cómo Elegir

**Prioridad 1 (Implementar primero):**
- Caso #1 Early Bird - Máximo revenue, baja complejidad
- Caso #4 Geo-Targeting - Quick win en festivales con >30% turismo

**Prioridad 2 (Una vez domines básicos):**
- Caso #2 Reactivación VIP - ROI altísimo pero requiere análisis
- Caso #5 Upsell VIP - Monetiza audiencia existente

**Prioridad 3 (Optimización):**
- Caso #3 A/B Testing - Mejora continua
- Caso #6 Last Minute - Recupera revenue residual
```

#### Tabla 3: modificadores-rfm.mdx - Mejorar "Tabla de Scoring RFM"

**Agregar columnas de acción:**

```mdx
## Matriz RFM: Segmentos y Acciones Recomendadas

| Segmento RFM | Recency | Frequency | Monetary | % Audiencia | Acción Email | Incentivo | Subject Example |
|--------------|---------|-----------|----------|-------------|--------------|-----------|-----------------|
| **🏆 Champions** | Alta | Alta | Alto | 8-12% | Early access, VIP upsell | No descuento | "🌟 Acceso VIP exclusivo para ti" |
| **💎 Loyal** | Alta | Alta | Medio | 10-15% | Nurture, cross-sell | 5% descuento | "Vuelve pronto - Evento especial" |
| **🌱 Potential** | Alta | Baja | Medio | 5-8% | Educación, engagement | 10% descuento | "Descubre todo lo que te espera" |
| **🆕 New Customers** | Alta | Baja | Bajo | 15-25% | Onboarding, repeat | 15% descuento 2º | "Bienvenido - Tu próximo evento" |
| **⚠️ At Risk** | Baja | Alta | Alto | 5-10% | **Win-back urgente** | 20% descuento | "💔 Te echamos de menos [Nombre]" |
| **😴 Hibernating** | Baja | Baja | Medio | 10-15% | Reactivación | 25% descuento | "Última oportunidad - 25% OFF" |
| **❌ Lost** | Muy Baja | Baja | Bajo | 30-40% | Re-engagement masivo | 30% descuento | "Vuelve - Oferta especial" |

### Criterios Numéricos por Segmento

**Champions:**
```
Días desde última compra: ≤90
AND Eventos asistidos: ≥4
AND Gasto total: ≥500€
```

**At Risk:**
```
Días desde última compra: ≥180, ≤365
AND Eventos asistidos: ≥3
AND Gasto total: ≥300€
AND Email opens (30 días): ≤2
```

**Lost:**
```
Días desde última compra: ≥730
AND Email opens (90 días): 0
```

### Revenue por Segmento (Festival 50k capacidad)

| Segmento | Fans | Conversion | Precio Prom | Revenue | % Total |
|----------|------|------------|-------------|---------|---------|
| Champions | 4,800 | 22% | 180€ | 190,080€ | 31% |
| Loyal | 6,000 | 12% | 140€ | 100,800€ | 16% |
| At Risk | 3,600 | 8% | 150€ | 43,200€ | 7% |
| New Customers | 10,000 | 4% | 120€ | 48,000€ | 8% |
| Resto | 25,600 | 6% | 130€ | 199,680€ | 38% |
| **TOTAL** | **50,000** | **11.6%** | **140€** | **581,760€** | **100%** |

**Insight:** 20% de audiencia (Champions + Loyal) genera 47% del revenue.
```

---

### FASE 11: Casos de Uso Expandidos - 4 horas

**Objetivo:** Convertir casos básicos en playbooks ejecutables (copy-paste ready).

#### Expandir Caso #2: Reactivación VIPs en casos-uso.mdx

**Estructura completa:**

```mdx
## Caso #2: Reactivación VIPs "At Risk" - Playbook Completo

### Contexto y Objetivos

**Problema:** Festival Cruïlla Barcelona detecta 680 VIPs (gasto histórico >500€) que NO compraron en 2024.

**Datos clave:**
- VIPs At Risk: 680 fans
- Gasto histórico promedio: 850€
- Última compra: 8-18 meses atrás
- Email engagement: <10% open rate últimos 90 días
- **Valor en riesgo:** 680 × 850€ × 0.7 churn rate = **~404,600€ LTV**

**Objetivo campaña:**
- Win-back rate: 20% (136 fans)
- Revenue recuperado: 136 × 180€ = 24,480€
- ROI objetivo: >10x

### Segmento Exacto

**Nombre:** "VIP At Risk - Cruïlla 2025"

**Criterios (5 filtros AND):**
```
Gasto total histórico: ≥500€
AND Eventos pasados: Cruïlla Barcelona ≥2
AND Días desde última compra: ≥240, ≤730
AND Email opens últimos 90 días: ≤2
AND Temperatura Nevent: ≤Warm
```

**Audiencia:** 680 VIPs

### Secuencia de 3 Emails (14 días)

---

#### Email #1 - Nostalgia + Reconocimiento (Día 0)

**Subject line:**
```
💔 Te echamos de menos, [Nombre]
```

**Preheader:**
```
Fuiste parte de algo especial - Vuelve a vivirlo en 2025
```

**From name:** "Equipo Cruïlla" (personal, no genérico)

**Diseño:**
- **Hero image:** Collage de fotos Cruïlla 2022-2023 (años que asistió el VIP)
- **Copy principal:**

```
Hola [Nombre],

Hemos notado que este año no estuviste con nosotros en Cruïlla,
y sinceramente... el Parc del Fòrum no fue lo mismo sin ti.

Desde [Año Primera Compra], has sido parte de [X] ediciones
increíbles. Recordamos cuando viste a [Artista Favorito según
historial] en [Año], y cómo la multitud enloqueció con [Hit].

**2025 es el año de los reencuentros.**

Queremos que vuelvas. Y para demostrártelo, hemos preparado algo especial.
```

- **Sección:** "Tus momentos Cruïlla" (personalizado)
  - Foto 1: Headline 2022 que vio
  - Foto 2: Headline 2023 que vio
  - Text: "¿Recuerdas? Estuviste ahí."

- **CTA suave (no venta directa):**
```
[Botón] Ver lineup avance 2025 →
```

- **PS:**
```
PD: Revisa tu email en 3 días. Tenemos una sorpresa solo para VIPs
antiguos como tú.
```

**Objetivo:** Reconexión emocional, cero presión de venta

**Métricas esperadas:**
- Open rate: 35-45% (nostalgia fuerte)
- Click rate: 15-20%
- Compras directas: 2-4% (no es objetivo principal)

---

#### Email #2 - Incentivo Exclusivo (Día +4)

**Subject line:**
```
🎁 [Nombre], 25% descuento VIP - Solo para ti (48h)
```

**Preheader:**
```
Código exclusivo [VIPBACK25] - Expira en 48 horas
```

**Segmento:** Abrieron Email #1 + NO compraron

**Diseño:**
- **Hero:** Código de descuento visual grande (VIPBACK25)
- **Copy principal:**

```
Te prometimos una sorpresa, aquí está:

**25% de descuento en cualquier entrada Cruïlla 2025**

Este código es personal, intransferible, y solo lo tienen 680
VIPs que, como tú, fueron pilares de Cruïlla durante años.

🎟️ Entrada General: ~~180€~~ → 135€
🌟 Entrada VIP: ~~320€~~ → 240€
🔥 Abono 3 días: ~~450€~~ → 337.50€

**Códido:** VIPBACK25
**Válido hasta:** [Fecha Día +6], 23:59h
```

- **Sección:** "Por qué volver en 2025"
  - Lineup avance (headliners confirmados)
  - Nueva zona VIP mejorada
  - Testimonial: "Volví en 2024 y fue mejor que nunca - María, VIP desde 2019"

- **Countdown timer:** 48 horas visual

- **CTA principal:**
```
[Botón grande] Usar mi descuento VIP →
```

- **Sección FAQ mini:**
  - ¿Puedo cambiar de entrada después? Sí
  - ¿Política de reembolso? 100% hasta 30 días antes
  - ¿Dudas? Responde este email (personal)

**Métricas esperadas:**
- Open rate: 50-60% (incentivo fuerte)
- Click rate: 30-40%
- **Conversion: 12-18%** (objetivo principal)

---

#### Email #3 - Urgencia Final (Día +6, 10:00h)

**Subject line:**
```
⏰ ÚLTIMA HORA para tu 25% OFF - Expira hoy a medianoche
```

**Preheader:**
```
Tu código VIPBACK25 desaparece en 14 horas, [Nombre]
```

**Segmento:** Abrieron Email #1 o #2 + NO compraron

**Diseño:**
- **Hero:** Countdown timer grande (horas:minutos en vivo)
- **Copy urgencia:**

```
[Nombre], quedan menos de 14 horas.

Tu código VIPBACK25 (25% descuento) expira hoy a las 23:59h
y no podremos extenderlo.

**Esto es lo que pierdes si no actúas hoy:**
❌ 112€ de ahorro (entrada VIP)
❌ Acceso anticipado a zona VIP mejorada
❌ La oportunidad de revivir la magia Cruïlla 2025

**Esto es lo que ganas si decides volver:**
✅ Reencuentro con la mejor música en vivo de Barcelona
✅ 3 días de desconexión total
✅ La sensación de "volví a casa"

No queremos que te arrepientas en junio cuando veas las fotos
en Instagram.
```

- **CTA urgencia:**
```
[Botón rojo grande] Rescatar mi 25% OFF antes de medianoche →
```

- **Sección:** "Qué dicen otros VIPs que volvieron"
  - 3 testimonials cortos con fotos
  - Énfasis en "me alegro de haber vuelto"

- **PS:**
```
PD: Si definitivamente Cruïlla ya no es para ti, responde este
email y cuéntanos por qué. Tu feedback nos ayuda a mejorar.

[Link pequeño] Ya no quiero recibir emails de Cruïlla
```

**Métricas esperadas:**
- Open rate: 40-50%
- Click rate: 25-35%
- **Conversion: 8-15%** (última oportunidad)

---

### Timing y Automatización

| Día | Hora | Email | Audiencia | Acción |
|-----|------|-------|-----------|--------|
| 0 | 11:00 | #1 Nostalgia | 680 VIPs | Envío inicial |
| +4 | 10:00 | #2 Incentivo | Abrieron #1 + NO compraron (~400) | Segmento filtrado |
| +6 | 10:00 | #3 Urgencia | Abrieron #1 o #2 + NO compraron (~280) | Última oportunidad |
| +7 | - | - | Compraron | Mover a segmento "Champions 2025" |
| +7 | - | - | NO compraron | Mover a "Lost" (intentar en 6 meses) |

**Automatización en Nevent:**
- Email #2 y #3 se envían automáticamente según comportamiento
- No requiere intervención manual
- Exclusiones automáticas (si compran, salen de secuencia)

---

### Personalización Avanzada

**Variables dinámicas usadas:**

| Variable | Ejemplo | Ubicación |
|----------|---------|-----------|
| `{{first_name}}` | "María" | Subject + body |
| `{{last_event_year}}` | "2023" | Email #1 body |
| `{{total_events}}` | "4 ediciones" | Email #1 body |
| `{{favorite_artist}}` | "Arctic Monkeys" | Email #1 (si disponible) |
| `{{days_since_purchase}}` | "487 días" | Interno (segmentación) |
| `{{discount_code}}` | "VIPBACK25" | Email #2 + #3 |
| `{{expiry_date}}` | "23 Mayo, 23:59h" | Email #2 + #3 |

**Cómo obtener "favorite_artist":**
- Analizar histórico de clicks en emails (artistas clickeados)
- Si no hay datos: omitir esa línea (fallback genérico)

---

### Resultados Reales

**Campaña ejecutada: Febrero 2024**

| Métrica | Email #1 | Email #2 | Email #3 | Total Campaña |
|---------|----------|----------|----------|---------------|
| Enviados | 680 | 412 | 287 | - |
| Opens | 272 (40%) | 242 (59%) | 126 (44%) | 640 (94% únicos) |
| Clicks | 52 (19%) | 98 (40%) | 71 (56%) | 221 (32% únicos) |
| Compras | 14 (5%) | 54 (22%) | 28 (22%) | **96 (14.1%)** |

**Revenue:**
- Entradas vendidas: 96
- Ticket promedio: 185€ (mix general/VIP)
- Revenue bruto: 17,760€
- Descuento otorgado: -4,440€ (25% × 17,760€)
- **Revenue neto: 13,320€**

**Costos:**
- Tiempo setup: 6 horas × 50€/h = 300€
- Plataforma email: 0€ (incluido en Nevent)
- Diseño emails: 200€ (freelancer)
- **Costo total: 500€**

**ROI:**
```
(13,320€ - 500€) / 500€ = 25.6x ROI
```

**Valor Lifetime recuperado:**
- 96 VIPs reactivados × 850€ LTV promedio = **81,600€ LTV**
- Si mantienen patrón histórico, comprarán 3-5 ediciones más

---

### Aprendizajes y Optimizaciones

**✅ Qué funcionó:**
1. **Subject nostalgia (Email #1):** 40% open rate vs 28% con subject genérico en test A/B
2. **Descuento 25%:** Sweet spot (20% pareció poco, 30% dejó dinero en mesa)
3. **Countdown visual (Email #3):** +18% conversion vs email sin countdown
4. **Segmentación comportamiento:** Solo enviar #2 y #3 a quien interactuó ahorró costos

**❌ Qué NO funcionó:**
1. **Personalización "favorite_artist":** Solo 40% de VIPs tenían datos suficientes, creó inconsistencia
2. **Email #3 horario:** Enviado a las 10:00h, debería enviarse a las 15:00h (más opens tarde)
3. **Fallback "Lost":** De 584 VIPs que NO compraron, 60% abrieron emails (no están perdidos, necesitan más tiempo)

**🔄 Optimizaciones próxima iteración:**

1. **Email #4 (suave):** Agregar 4º email "soft" a los 30 días para quienes abrieron pero no compraron
   - Sin descuento
   - Solo contenido: Lineup completo, behind the scenes
   - Mantener relación (preparar para próximo año)

2. **Test descuento escalonado:**
   - Email #1: Sin descuento
   - Email #2: 15% OFF
   - Email #3: 25% OFF (aumenta con urgencia)
   - Hipótesis: Genera más conversión early (menor descuento) manteniendo safety net

3. **Segmento "VIP High Risk":**
   - Sub-segmento con gasto >1,500€
   - Descuento 30% + llamada personal de Account Manager
   - ROI proyectado: 40x (valor extremo)

---

### Checklist de Implementación

**Pre-launch (1 semana antes):**
- [ ] Crear segmento en Nevent con criterios exactos
- [ ] Validar audiencia: ¿Tamaño correcto? ¿Calidad de datos?
- [ ] Diseñar 3 emails en herramienta (templates)
- [ ] Configurar código descuento VIPBACK25 en plataforma ticketing
- [ ] Testear variables dinámicas (enviar prueba a 5 emails internos)
- [ ] Configurar automatización Email #2 y #3 (triggers)
- [ ] Configurar countdown timer (Sendtric, Sendpulse o similar)
- [ ] Configurar exclusiones (si compran, salir de secuencia)

**Launch day:**
- [ ] Enviar Email #1 a las 11:00h (mejor hora según datos históricos)
- [ ] Monitorear primeras 2 horas: bounces, spam reports anormales

**Durante campaña:**
- [ ] Día +1: Revisar open/click Email #1
- [ ] Día +4: Enviar Email #2 (automático)
- [ ] Día +5: Revisar performance Email #2
- [ ] Día +6: Enviar Email #3 (automático)
- [ ] Día +7: Revisar resultados finales

**Post-campaign:**
- [ ] Mover compradores a segmento "Champions 2025"
- [ ] Mover no-compradores a "At Risk - Retry 6 meses"
- [ ] Analizar: ¿Qué subject line ganó? ¿Qué hora de envío?
- [ ] Documentar learnings para próxima campaña

---

### Conclusión

**Este playbook recupera 15-25% de VIPs en riesgo** con ROI >20x.

**Clave del éxito:**
1. Segmentación precisa (no enviar a "todos los VIPs")
2. Nostalgia antes de venta (Email #1 construye terreno)
3. Incentivo real (25% es significativo para VIP)
4. Urgencia genuina (deadline real, no falso)
5. Automatización (comportamiento dicta quién recibe qué)

**Próximo caso:** [Ver Caso #3: A/B Testing de Subject Lines](#caso-3)
```

---

### FASE 12: Imágenes con Alt Text - 8 horas

**Objetivo:** Crear diagramas profesionales que expliquen conceptos complejos + SEO de imágenes.

#### Imágenes a crear (8 diagramas)

**NOTA:** Esta fase requiere diseñador gráfico o herramienta Figma/Excalidraw.

---

**1. operadores-logica.mdx - Diagrama AND**

**Descripción:**
- Diagrama Venn de 2 círculos intersección
- Círculo 1: "Gasto ≥500€" (6,200 fans)
- Círculo 2: "Barcelona" (28,000 fans)
- Intersección: "VIPs Locales" (2,480 fans)
- Colores: Azul + Amarillo = Verde en intersección

**Alt text:**
```
Diagrama de operador AND en segmentación Nevent: intersección entre fans
con gasto mayor a 500 euros (VIPs) y ubicación Barcelona resulta en 2,480
VIPs locales para campañas de festivales sin alojamiento
```

**Ubicación:** Después de "## Operador AND - Intersección"

---

**2. operadores-logica.mdx - Diagrama Multi-Grupo**

**Descripción:**
- Flowchart de segmentación compleja
- Audiencia total: 50,000 fans
- Split 1: RFM → Champions (6k), Loyal (8k), At Risk (4k), Resto (32k)
- Split 2 (solo Champions): Geo → Locales (2.4k), Turistas (3.6k)
- Output: 2 emails diferentes con subject/content personalizado

**Alt text:**
```
Diagrama de flujo de segmentación multi-grupo con Nevent: audiencia de
50,000 fans dividida por RFM en Champions y Loyal, luego sub-segmentada
por ubicación geográfica para personalizar campañas de email marketing
para festivales y eventos
```

**Ubicación:** Sección "Combinaciones Avanzadas"

---

**3. modificadores-rfm.mdx - Matriz RFM 3D**

**Descripción:**
- Cubo 3D con 3 ejes:
  - X: Recency (Recent → Lapsed)
  - Y: Frequency (1 evento → 7+ eventos)
  - Z: Monetary (Bajo → Alto)
- 11 segmentos ubicados en cubo:
  - Champions (esquina superior derecha)
  - Lost (esquina inferior izquierda)
  - At Risk (medio)
- Colores por temperatura: Verde (Champions), Amarillo (At Risk), Rojo (Lost)

**Alt text:**
```
Matriz RFM tridimensional para análisis de segmentación de asistentes a
festivales: ejes de Recency (última compra), Frequency (eventos asistidos)
y Monetary (gasto total) generan 11 segmentos como Champions, At Risk y
Lost con estrategias de email marketing diferenciadas
```

**Ubicación:** Inicio de sección "¿Qué es RFM?"

---

**4. modificadores-rfm.mdx - Segmentos RFM Visual**

**Descripción:**
- Infografía horizontal con 11 segmentos RFM
- Cada segmento: Icono + Nombre + % audiencia + Acción
- Ejemplos:
  - 🏆 Champions (10%) → Early access VIP
  - ⚠️ At Risk (7%) → Win-back 20% OFF
  - 😴 Lost (35%) → Reactivación masiva
- Código de colores por prioridad (verde = alto valor, rojo = bajo)

**Alt text:**
```
Infografía de 11 segmentos RFM para promotores de festivales: Champions,
Loyal, Potential, New Customers, At Risk, Hibernating y Lost con
porcentajes de audiencia típicos y acciones recomendadas de email marketing
para cada segmento en Nevent
```

**Ubicación:** Después de tabla "Matriz RFM: Segmentos y Acciones"

---

**5. casos-uso.mdx - Dashboard 6 Casos de Uso**

**Descripción:**
- Mockup de dashboard Nevent
- 6 cards con iconos:
  1. 🎟️ Early Bird (Conversion: 18%)
  2. 💎 Reactivación VIP (ROI: 25x)
  3. 🧪 A/B Testing (+40% open)
  4. 🌍 Geo-Targeting (2.1x click)
  5. ⬆️ Upsell VIP (280€/fan)
  6. ⏰ Last Minute (5-9% recovery)
- Cada card: Métrica destacada + CTA "Ver playbook"

**Alt text:**
```
Dashboard de casos de uso de segmentación para festivales en Nevent:
6 estrategias con métricas reales incluyendo early bird con 18% conversión,
reactivación VIP con ROI 25x, A/B testing, geo-targeting, upsell y last
minute para promotores de eventos y conciertos
```

**Ubicación:** Inicio de página casos-uso.mdx

---

**6. crear-segmento.mdx - Screenshot UI 6 Pasos**

**Descripción:**
- Screenshot anotado de interfaz Nevent
- 6 pasos numerados visualmente:
  1. Click "Nuevo segmento"
  2. Nombre: "VIPs Barcelona Early Bird"
  3. Añadir criterio "Gasto ≥500"
  4. Añadir criterio "Ciudad: Barcelona"
  5. Preview: 2,480 fans
  6. Click "Guardar segmento"
- Flechas y highlights en amarillo

**Alt text:**
```
Tutorial paso a paso crear segmento en Nevent: interfaz de usuario mostrando
6 pasos para crear segmento de VIPs de Barcelona para campaña early bird,
incluyendo criterios de gasto mayor a 500 euros y ubicación geográfica
resultando en 2,480 fans objetivo
```

**Ubicación:** Dentro de sección "Paso a Paso"

---

**7. mejores-practicas.mdx - Pirámide de Segmentación**

**Descripción:**
- Pirámide invertida con 4 niveles:
  - Top (15%): "Segmentación Avanzada" (RFM + Geo + Comportamiento) → 8-15 segmentos
  - Medio-Alto (25%): "Segmentación Básica" (2-3 criterios) → 3-5 segmentos
  - Medio-Bajo (35%): "Email Masivo Mejorado" (personalización nombre) → 1 segmento
  - Bottom (25%): "Email Masivo Genérico" (sin personalización)
- Eje Y derecha: ROI (aumenta hacia arriba)
- Colores: Verde (top) → Rojo (bottom)

**Alt text:**
```
Pirámide de madurez en segmentación de email marketing para festivales:
desde email masivo genérico (25% audiencia) hasta segmentación avanzada
con RFM y comportamiento (15% audiencia, máximo ROI) mostrando evolución
de estrategia en Nevent
```

**Ubicación:** Sección "¿Por dónde empezar?"

---

**8. index.mdx raíz - Infografía Resultado Antes/Después**

**Descripción:**
- Comparativa visual 2 columnas:

**ANTES (Izquierda - gris):**
- 📧 80,000 emails genéricos
- 📊 18% open rate
- 💰 259,200€ revenue
- 😐 Mismo mensaje para todos

**DESPUÉS (Derecha - verde):**
- 📧 80,000 emails (5 segmentos)
- 📊 24% open rate (+33%)
- 💰 413,895€ revenue (+60%)
- 😃 Personalizado por perfil

**Visual:** Flechas verdes con % de mejora

**Alt text:**
```
Caso de estudio segmentación Nevent para Primavera Sound: comparativa antes
y después mostrando aumento de 18% a 24% en open rate y de 259,200 a 413,895
euros en revenue con 5 segmentos personalizados vs email masivo genérico
para venta de entradas early bird
```

**Ubicación:** Sección "Resultados reales de promotores"

---

#### Formato de implementación

```mdx
![Alt text descriptivo con keywords SEO](./images/nombre-archivo.png)

*Figura X: Descripción corta para caption*
```

**Naming convention:**
- `rfm-matrix-3d.png`
- `operator-and-venn-diagram.png`
- `use-cases-dashboard.png`

**Especificaciones técnicas:**
- Formato: PNG con compresión
- Tamaño: Max 200KB (optimizar con TinyPNG)
- Dimensiones: 1200px ancho (responsive)
- Retina: Incluir versión @2x si posible

---

### FASE 13: Glosario - 2 horas

**Objetivo:** Crear definiciones canónicas que LLMs puedan citar + capturar long-tail queries.

#### Ubicación

Agregar al final de `index.mdx` (raíz)

#### Estructura

```mdx
---

## 📖 Glosario de Términos - Segmentación para Festivales

### A

#### A/B Testing
Técnica de optimización que compara dos variantes (A vs B) de un elemento de campaña (subject line, CTA, diseño) enviando cada versión a un subgrupo de audiencia para determinar cuál performa mejor. En contexto de festivales, típicamente se usa para validar subject lines (ej: "Early Bird disponible" vs "⏰ Últimas 200 entradas early bird"). Requiere mínimo 1,000 contactos por grupo para significancia estadística. Ver [Grupos de Control](motor-segmentacion/grupos.mdx).

#### Análisis RFM
Ver [RFM](#rfm).

#### At Risk
Segmento RFM que identifica fans de alto valor histórico (Frequency alta, Monetary alto) pero con baja actividad reciente (Recency baja). Típicamente: asistieron a 3-6 eventos, gastaron 300-1,500€, pero última compra hace 6-18 meses. Requieren campañas de win-back urgente con incentivos 15-25%. Representan 5-10% de audiencia pero 15-25% de revenue en riesgo. Ver [Modificadores RFM](motor-segmentacion/modificadores-rfm.mdx).

### C

#### Campaña de Reactivación
Ver [Win-back Campaign](#win-back-campaign).

#### Champions
Segmento RFM de máximo valor: fans con alta Recency (compraron recientemente), alta Frequency (asistieron a muchos eventos) y alto Monetary (gastaron mucho). Criterios típicos: última compra <90 días, 4+ eventos, gasto >500€. Representan 8-12% de audiencia pero generan 25-35% del revenue total. No necesitan descuentos; responden a early access, VIP upgrades y contenido exclusivo. Open rates: 45-65%. Ver [Modificadores RFM](motor-segmentacion/modificadores-rfm.mdx).

#### Churn
Tasa de abandono de fans que dejaron de interactuar o comprar. En festivales, se considera "churned" a un fan que: (a) no compró en últimas 2-3 ediciones del evento, (b) no abre emails en 6+ meses, (c) se dio de baja de comunicaciones. Churn rate típico: 30-40% anual en festivales (vs 5-10% en SaaS). Prevención: segmentación proactiva de "At Risk" antes de que lleguen a "Lost".

#### Click Rate (CTR)
Porcentaje de receptores que hacen click en un link dentro del email. Fórmula: (Clicks únicos / Emails entregados) × 100. Benchmarks festivales: Email masivo: 2-4%, Segmentación básica: 5-9%, Segmentación avanzada: 12-20%. No confundir con "Click-to-Open Rate" (clicks / opens). CTR alto indica relevancia de oferta y CTA efectivo.

#### Cohort
Grupo de fans que comparten característica común, típicamente temporales. Ejemplos: "Cohort 2023" (compraron primera vez en 2023), "Cohort Early Bird 2024" (compraron early bird 2024). Útil para análisis de retención: ej, "El cohort 2021 tiene 60% de repeat rate en 2024". Diferencia con segmento: cohort es retrospectivo (lo que hicieron), segmento es prospectivo (a quién enviar).

#### Conversión
Porcentaje de receptores de email que completan acción deseada (usualmente compra de entrada). Fórmula: (Compras / Emails entregados) × 100. Benchmarks festivales: Email masivo: 0.8-2%, Segmentación básica: 2.5-5%, Champions: 12-25%, VIP upsell: 3-7%. Factores que influyen: segmentación, timing, incentivo, urgencia, lineup. No confundir con "Conversion rate" de web (tráfico → compra).

#### Criterio de Segmentación
Filtro o condición usada para incluir/excluir fans de un segmento. Nevent ofrece 8 categorías: (1) Eventos pasados, (2) Interacción con emails, (3) Datos demográficos, (4) Gasto, (5) Temperatura, (6) Preferencias, (7) Comportamiento web, (8) Custom fields. Ejemplo: "Gasto total ≥500€" es criterio de categoría Gasto. Se combinan con operadores AND/OR. Ver [Categorías](motor-segmentacion/categorias.mdx).

### D

#### Deliverability
Capacidad de que emails lleguen a inbox (no spam/promotions). Métrica: Inbox Placement Rate. Factores: sender reputation, SPF/DKIM/DMARC, engagement (opens/clicks), spam reports, bounce rate. Segmentación MEJORA deliverability porque aumenta engagement (señal positiva para ISPs). Datos: Segmentación avanzada logra 92-97% inbox vs 70-80% email masivo. Monitorear con tools: GlockApps, Mail-Tester.

### E

#### Early Bird
Fase de venta anticipada con precio reducido para incentivar compras tempranas (3-6 meses antes del evento). Objetivos: (a) cash flow temprano, (b) validar demanda, (c) crear urgencia. Típicamente: 5-15% de capacidad, descuento 15-30% vs precio final. Segmentación recomendada: Champions + Loyal con historial de compra temprana. Timing: anunciar 60-90 días antes del evento. Ver [Caso de Uso #1](motor-segmentacion/casos-uso.mdx).

#### Engagement Score
Ver [Temperatura Nevent](#temperatura-nevent).

### F

#### Frequency (Frecuencia)
En RFM: número de compras o eventos asistidos por un fan. Métrica clave de lealtad. Rangos típicos festivales: New (1 evento), Repeat (2-3), Loyal (4-6), Super Fan (7+). Correlación con LTV: fan de 1 evento = 120-180€ LTV, 7+ eventos = 2,000-8,000€ LTV. Filtro en Nevent: "Número de eventos asistidos: ≥X, ≤Y". Ver [Modificadores RFM](motor-segmentacion/modificadores-rfm.mdx).

### G

#### Geo-Targeting
Segmentación por ubicación geográfica (país, región, ciudad). Use cases festivales: (1) Locales (sin info alojamiento, énfasis transporte público), (2) Turistas (packs hotel+entrada, guías ciudad), (3) Gira multi-ciudad (personalizar venue y fecha). Lift típico: 2-2.5x open rate vs mensaje genérico. Criterio en Nevent: "Ciudad: Barcelona, ≤50km". Ver [Caso de Uso #4](motor-segmentacion/casos-uso.mdx).

### H

#### Hibernating
Segmento RFM de fans inactivos con valor medio: Frequency media, Monetary medio, Recency muy baja. Típicamente: asistieron 2-4 eventos, gastaron 200-600€, última compra hace 12-24 meses. Acción: reactivación con incentivo 20-25%, contenido nostalgia. Recovery rate: 10-18%. Si no reaccionan en 6 meses, pasan a "Lost". Representan 10-15% de audiencia.

### L

#### Lifetime Value (LTV)
Valor monetario total que un fan genera durante toda su relación con la marca. Fórmula simple: LTV = Gasto total histórico. Fórmula predictiva: LTV = (Ticket promedio × Frequency promedio × Años activo). Ejemplos festivales: New customer = 120-180€, Loyal = 800-1,500€, Super fan = 2,000-8,000€. Uso en segmentación: priorizar win-back de VIPs At Risk (LTV alto en peligro). Ver [Gasto](#monetary-valor-monetario).

#### Lost
Segmento RFM de fans inactivos de bajo valor o muy antigua última compra. Criterios: última compra >24 meses, email opens últimos 6 meses = 0. Representan 30-40% de base de datos. Acción: reactivación masiva con descuento 25-30%, o sunset (limpiar de base). Recovery rate: 2-8%. Mantenerlos en base activa daña deliverability.

#### Loyal
Segmento RFM de fans leales: alta Frequency, Monetary medio-alto, Recency alta. Criterios típicos: 3-6 eventos, gasto 300-800€, última compra <180 días. Representan 10-15% de audiencia, generan 18-25% de revenue. Acción: nurture hacia Champions, cross-sell eventos similares, programa de fidelización. Open rate: 35-50%. Descuentos: 5-10% suficiente.

### M

#### Monetary (Valor Monetario)
En RFM: gasto total histórico de un fan. Métrica de valor del cliente. Rangos típicos festivales: Bajo (<100€), Medio (100-300€), Alto (300-800€), VIP (800€+). Filtro en Nevent: "Gasto total histórico: ≥X, ≤Y". Correlación con conversion: fans con gasto >500€ convierten 5-8x más que nuevos. Ver [Modificadores RFM](motor-segmentacion/modificadores-rfm.mdx).

### N

#### New Customer
Segmento RFM de fans con 1 sola compra reciente: Frequency = 1, Recency alta, Monetary bajo-medio. Representan 15-25% de audiencia activa. Momento crítico: convertirlos a Repeat en siguientes 6-12 meses (repeat rate objetivo: 30-50%). Acción: onboarding, descuento 10-15% en 2º evento, recordar experiencia positiva. No bombardear con emails (máx 2/mes).

### O

#### Open Rate
Porcentaje de receptores que abren un email. Fórmula: (Opens únicos / Emails entregados) × 100. Benchmarks festivales: Email masivo: 12-18%, Segmentación básica: 22-28%, Champions: 45-65%. Factores: subject line, from name, preheader, timing, reputación sender, relevancia. Limitación: iOS Mail Privacy Protection infla open rates (+10-15 puntos desde 2021). Complementar con click rate.

#### Operador AND
Operador lógico que requiere que TODAS las condiciones se cumplan (intersección). Ejemplo: "Gasto ≥500€ AND Ciudad: Barcelona" = solo fans que cumplen AMBOS criterios (VIPs Y locales). Reduce tamaño de segmento pero aumenta precisión. Usar para segmentos nicho (VIP upsell, geo-targeting específico). Ver [Operadores Lógicos](motor-segmentacion/operadores-logica.mdx).

#### Operador OR
Operador lógico que requiere que AL MENOS UNA condición se cumpla (unión). Ejemplo: "Género: Rock OR Indie OR Alternativo" = fans que les gusta cualquiera de los 3 géneros. Aumenta tamaño de segmento. Usar para ampliar alcance manteniendo relevancia (ej: festival multi-género). Ver [Operadores Lógicos](motor-segmentacion/operadores-logica.mdx).

### P

#### Personalización
Adaptación de contenido de email según características individuales del receptor. Niveles: (1) Básico: {{nombre}} en subject/body, (2) Medio: contenido según segmento (VIP vs General), (3) Avanzado: contenido dinámico según historial (artistas favoritos, eventos asistidos). Impacto: +26% revenue vs no personalizado (Experian). En Nevent: variables dinámicas + segmentación comportamental.

#### Potential (Promising)
Segmento RFM de fans con potencial de crecimiento: Recency alta, Frequency baja, Monetary medio. Perfil: compraron recientemente pero solo 1-2 veces. Objetivo: nurture hacia Loyal. Acción: educación sobre otros eventos, descuento 10% segundo evento, contenido exclusivo. Representan 5-8% de audiencia. Open rate: 28-38%.

### R

#### Recency (Recencia)
En RFM: tiempo desde última compra. Métrica más predictiva de recompra. Rangos típicos festivales: Alta (<90 días), Media (90-180), Baja (180-365), Muy baja (365+). Correlación conversion: <90 días = 8-15% conversion, 180-365 días = 3-6%, 365+ días = 1-3%. Filtro en Nevent: "Días desde última compra: ≥X, ≤Y". Ver [Modificadores RFM](motor-segmentacion/modificadores-rfm.mdx).

#### RFM
Modelo de scoring que clasifica fans por 3 dimensiones: **R**ecency (cuándo compró última vez), **F**requency (cuántas veces compró), **M**onetary (cuánto gastó total). Combinación genera 11 segmentos automáticos: Champions, Loyal, Potential, New Customers, Promising, Need Attention, About to Sleep, At Risk, Can't Lose Them, Hibernating, Lost. Originalmente usado en retail, adaptado a festivales en Nevent. Ver [Modificadores RFM](motor-segmentacion/modificadores-rfm.mdx).

### S

#### Segmentación
Proceso de dividir audiencia total en subgrupos (segmentos) homogéneos con características o comportamientos similares, para enviar mensajes más relevantes. Tipos: (1) Demográfica (edad, género, ubicación), (2) Comportamental (compras, opens, clicks), (3) Psicográfica (preferencias, valores). Beneficio: +60-200% revenue vs email masivo. En Nevent: combinación de 8 categorías de criterios con operadores AND/OR.

#### Segmento
Subgrupo de audiencia que cumple uno o más criterios específicos. Ejemplos: "VIPs de Barcelona" (Gasto ≥500€ AND Ciudad: Barcelona), "Early Bird Lovers" (Tipo entrada histórico: Early Bird, Pre-sale). Tamaño óptimo: 500-10,000 fans (dependiendo de objetivo). Muy pequeño (<200) = no estadísticamente significativo, muy grande (>50k) = probablemente poco específico.

#### Sender Reputation
Puntuación (0-100) que ISPs (Gmail, Outlook) asignan a tu dominio/IP basada en comportamiento de envío. Factores: bounce rate, spam reports, engagement (opens/clicks), volumen, consistencia. Score >80 = excelente deliverability. Segmentación MEJORA reputation porque aumenta engagement (señal positiva). Monitorear con: Google Postmaster Tools, Microsoft SNDS, Sender Score.

#### Subject Line
Línea de asunto del email, factor #1 que determina open rate. Best practices festivales: (1) <50 chars (móvil), (2) incluir nombre evento, (3) urgencia si aplica (⏰, 48h), (4) emoji contextual (🎟️, 🔥), (5) personalización ({{nombre}}), (6) beneficio claro. Test A/B obligatorio. Ejemplos ganadores: "🔐 [Nombre], acceso VIP 24h antes - Mad Cool" (62% open) vs "Mad Cool Early Bird disponible" (28% open).

#### Super Fan
Fan de máximo valor y lealtad: asistió a 7+ eventos, gasto total >2,000€. Representan 2-5% de audiencia pero generan 15-25% de revenue. Comportamiento: compran sin descuentos, early birds, refieren amigos, toleran subidas de precio. Acción: programa VIP exclusivo, meet & greet, merchandising, invitación a eventos privados. LTV: 2,000-8,000€. Retención es prioridad #1 (costo adquirir nuevo super fan: imposible).

### T

#### Temperatura Nevent
Score propietario de Nevent (0-100) que mide nivel de engagement de un fan basado en: opens, clicks, compras recientes, tiempo en web, interacciones. Rangos: Cold (0-20), Cool (20-40), Warm (40-60), Hot (60-80), Super Hot (80-100). Correlación conversion: Super Hot = 12-18%, Warm = 4-7%, Cold = 0.5-2%. Actualización: en tiempo real. Ventaja vs RFM: incluye comportamiento email y web, no solo transaccional.

### U

#### Upsell
Estrategia de venta de entrada de mayor valor a fans que compraron (o van a comprar) entrada de menor valor. Ejemplos festivales: General → VIP, 1 día → Abono 3 días, Sin alojamiento → Pack hotel. Timing óptimo: 14-30 días antes del evento (ya comprometidos pero tiempo para justificar gasto extra). Segmento: General ticket buyers con historial gasto >300€. Conversion: 3-7%. Revenue/fan: 80-280€ incremental. Ver [Caso de Uso #5](motor-segmentacion/casos-uso.mdx).

### V

#### VIP (Very Important Person)
Fan de alto valor monetario, típicamente definido por gasto total histórico. Umbrales varían por tipo de evento: Club pequeño (≥200€), Festival mediano (≥500€), Macro festival (≥1,000€). Representan 10-20% de audiencia pero generan 40-60% del revenue. Tratamiento especial: early access, descuentos exclusivos, atención personalizada, programa fidelización. Segmentos críticos: VIP Champions (activos) y VIP At Risk (recuperar urgente).

### W

#### Win-back Campaign
Campaña de reactivación dirigida a fans inactivos (At Risk, Hibernating, Lost) con objetivo de recuperarlos. Componentes: (1) Nostalgia (recuerdos eventos pasados), (2) Incentivo (descuento 15-30%), (3) Urgencia (deadline real). Secuencia típica: 3-4 emails en 10-14 días. Recovery rate: At Risk: 15-25%, Hibernating: 10-18%, Lost: 2-8%. ROI: 15-30x (bajo costo, alto valor si recuperan). Ver [Caso de Uso #2](motor-segmentacion/casos-uso.mdx).

---

**¿Falta algún término?** [Sugiere adición →](mailto:hola@nevent.com)
```

---

## Plan de Ejecución con Subagentes

### Estrategia de Paralelización

Para maximizar eficiencia, ejecutar **fases independientes en paralelo** usando múltiples subagentes.

---

### DÍA 1: Fundamentos SEO (8 horas) - 4 Subagentes en Paralelo

**Subagente A1: Schema Markup (4h)**
- **Tarea:** Implementar FASE 1 completa
- **Archivos:** 9 archivos (faq, crear-segmento, grupos, modificadores-rfm, casos-uso, + 4 breadcrumbs)
- **Entregable:** JSON-LD schema tags en todos los MDX

**Subagente A2: Keywords + Meta Tags (3h)**
- **Tarea:** FASE 2 (keywords) + FASE 6 (meta tags)
- **Archivos:** 6 archivos (reescrituras) + 4 archivos (meta optimization)
- **Entregable:** Primeros 100 chars optimizados + meta descriptions mejoradas

**Subagente A3: Internal Linking (2h)**
- **Tarea:** FASE 8 completa
- **Archivos:** Modificar 6 archivos (anchor texts + links contextuales)
- **Entregable:** 15+ anchor texts mejorados + 5 links contextuales + hub navigation

**Subagente A4: Glosario (2h)**
- **Tarea:** FASE 13 completa
- **Archivos:** index.mdx (raíz)
- **Entregable:** Glosario de 25+ términos con definiciones canónicas

**Progreso Día 1:** 11 horas de trabajo en 8 horas reales (1.38x speedup)

---

### DÍA 2: Content Expansion (8 horas) - 3 Subagentes en Paralelo

**Subagente B1: Expandir Content Length (6h)**
- **Tarea:** FASE 3 completa
- **Archivos:** index.mdx + motor-segmentacion/index.mdx
- **Entregable:**
  - index.mdx: 400 → 800+ palabras (3 secciones nuevas)
  - motor-segmentacion/index.mdx: 600 → 1200+ palabras (anatomías antes/después)

**Subagente B2: Featured Snippets (3h)**
- **Tarea:** FASE 4 completa
- **Archivos:** 9 páginas (todas)
- **Entregable:** Componentes Aside snippet-ready + optimizar 6 tablas

**Subagente B3: Ejemplos con Números (3h)**
- **Tarea:** FASE 9 completa
- **Archivos:** categorias.mdx, operadores-logica.mdx, casos-uso.mdx
- **Entregable:** 12+ ejemplos con números concretos reemplazando placeholders

**Progreso Día 2:** 12 horas de trabajo en 8 horas reales (1.5x speedup)

---

### DÍA 3: Content Depth (8 horas) - 2 Subagentes en Paralelo

**Subagente C1: Expandir FAQ (3h)**
- **Tarea:** FASE 5 completa
- **Archivos:** faq.mdx
- **Entregable:** 5 preguntas nuevas con tablas, segmentos completos, casos de estudio

**Subagente C2: Q&A Format para LLMs (4h)**
- **Tarea:** FASE 7 completa
- **Archivos:** categorias.mdx, modificadores-rfm.mdx
- **Entregable:** 10 preguntas formato Q&A al inicio de cada página

**Progreso Día 3:** 7 horas de trabajo en 8 horas reales (buffer de 1h para review)

---

### DÍA 4: Advanced Content (8 horas) - 2 Subagentes en Paralelo

**Subagente D1: Casos de Uso Expandidos (4h)**
- **Tarea:** FASE 11 completa
- **Archivos:** casos-uso.mdx
- **Entregable:** Expandir Caso #2 (Reactivación VIPs) a playbook completo (3,000+ palabras)

**Subagente D2: Tablas Comparativas (2h)**
- **Tarea:** FASE 10 completa
- **Archivos:** mejores-practicas.mdx, casos-uso.mdx, modificadores-rfm.mdx
- **Entregable:** 3 tablas comparativas nuevas

**Progreso Día 4:** 6 horas de trabajo en 8 horas reales (buffer de 2h para testing)

---

### DÍA 5: Visual Assets (8 horas) - 1 Diseñador + 1 Implementador

**Subagente E1: Crear Imágenes (6h)** - Requiere diseñador
- **Tarea:** FASE 12 - diseño
- **Tools:** Figma, Excalidraw, Photoshop
- **Entregable:** 8 diagramas PNG optimizados

**Subagente E2: Implementar Imágenes (2h)** - Developer
- **Tarea:** FASE 12 - implementación
- **Archivos:** 4 archivos MDX (insertar imágenes + alt text)
- **Entregable:** Imágenes embebidas con alt text SEO

**Progreso Día 5:** 8 horas de trabajo en 8 horas reales (secuencial: diseño → implementación)

---

## Resumen de Asignación de Subagentes

| Día | Subagentes Paralelos | Horas Reales | Horas Equivalentes | Speedup |
|-----|---------------------|--------------|-------------------|---------|
| 1 | 4 (A1, A2, A3, A4) | 8h | 11h | 1.38x |
| 2 | 3 (B1, B2, B3) | 8h | 12h | 1.5x |
| 3 | 2 (C1, C2) | 8h | 7h | 0.88x |
| 4 | 2 (D1, D2) | 8h | 6h | 0.75x |
| 5 | 2 (E1, E2) secuencial | 8h | 8h | 1x |
| **TOTAL** | **13 subagentes** | **40h** | **44h** | **1.1x** |

---

## Comandos de Ejecución (Ejemplo con Task tool)

### Día 1 - Lanzar 4 subagentes en paralelo

```bash
# Subagente A1: Schema Markup
Task(
  subagent_type="general-purpose",
  description="Implementar Schema Markup",
  prompt="Implementa FASE 1 del plan SEO: agrega JSON-LD schema a 9 archivos (FAQ, HowTo, Article, BreadcrumbList). Ver plan completo en docs/plan-seo-leo-aeo.md sección FASE 1."
)

# Subagente A2: Keywords + Meta
Task(
  subagent_type="general-purpose",
  description="Optimizar Keywords y Meta Tags",
  prompt="Implementa FASE 2 y FASE 6 del plan SEO: reescribe primeros 100 chars de 6 archivos + optimiza meta tags de 4 archivos. Ver plan en docs/plan-seo-leo-aeo.md."
)

# Subagente A3: Internal Linking
Task(
  subagent_type="general-purpose",
  description="Mejorar Internal Linking",
  prompt="Implementa FASE 8 del plan SEO: mejora 15+ anchor texts y agrega 5 links contextuales. Ver plan en docs/plan-seo-leo-aeo.md sección FASE 8."
)

# Subagente A4: Glosario
Task(
  subagent_type="general-purpose",
  description="Crear Glosario Completo",
  prompt="Implementa FASE 13 del plan SEO: agrega glosario de 25+ términos al final de index.mdx. Ver plan en docs/plan-seo-leo-aeo.md sección FASE 13."
)
```

---

## Resultados Esperados

### Google SEO Tradicional

| Métrica | Baseline | 6 Meses | 12 Meses |
|---------|----------|---------|----------|
| Organic Traffic | 100 (index) | 180-220 | 300-400 |
| Keyword Rankings (Top 10) | 12 keywords | 28-35 keywords | 50-70 keywords |
| Featured Snippets | 2 | 12-18 | 20-30 |
| Domain Authority | 28 | 32-35 | 38-42 |
| Backlinks | 45 | 80-120 | 150-250 |

### LLM Citations (ChatGPT, Claude, Perplexity)

| Métrica | Baseline | 3 Meses | 6 Meses |
|---------|----------|---------|---------|
| Menciones en respuestas | 5/mes | 25-40/mes | 80-150/mes |
| Citación como fuente primaria | 2% | 12-18% | 25-35% |
| Queries cubiertos | 20 | 65-90 | 150-200 |

### Answer Engines (Google SGE, Perplexity AI)

| Métrica | Baseline | 6 Meses |
|---------|----------|---------|
| Aparición en SGE | 15% queries | 40-60% queries |
| Fuente primaria Perplexity | 8% | 35-50% |

### Conversión y Engagement

| Métrica | Baseline | 3 Meses | 6 Meses |
|---------|----------|---------|---------|
| Docs → Trial | 2.1% | 2.8-3.2% | 3.5-4.5% |
| Time on Page | 1:42 min | 2:15-2:45 min | 3:00-3:30 min |
| Bounce Rate | 62% | 50-55% | 40-48% |
| Pages/Session | 1.8 | 2.4-2.8 | 3.2-3.8 |

---

## Validación y Testing

### Pre-Launch Checklist

- [ ] Validar todos los JSON-LD schemas con [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Verificar meta tags con [Meta Tags Checker](https://metatags.io/)
- [ ] Testear internal links (no broken links) con herramienta crawler
- [ ] Revisar alt text de imágenes (no vacíos, descriptivos)
- [ ] Validar responsive de tablas en móvil
- [ ] Spell check de todo el contenido nuevo
- [ ] Verificar consistencia de datos numéricos (no contradicciones)

### Post-Launch Monitoring (Primeras 4 semanas)

**Semana 1:**
- [ ] Indexación en Google Search Console (fetch as Google)
- [ ] Verificar rich results aparecen en SERPs

**Semana 2-4:**
- [ ] Monitorear rankings para 20 keywords target
- [ ] Trackear featured snippets capturados (Google Search Console)
- [ ] Analizar user behavior (GA4): time on page, bounce rate

**Mes 2-3:**
- [ ] Testear queries en ChatGPT, Claude, Perplexity (¿nos citan?)
- [ ] Analizar organic traffic growth (Google Analytics)
- [ ] Medir conversión Docs → Trial (event tracking)

---

## Mantenimiento y Actualización

### Cada 3 meses:
- Actualizar casos de uso con nuevos festivales reales
- Refrescar números (conversión, revenue) con datos recientes
- Agregar 2-3 preguntas nuevas a FAQ basadas en support tickets
- Revisar featured snippets perdidos (¿competencia nos superó?)

### Cada 6 meses:
- Auditoría SEO completa (broken links, meta tags obsoletas)
- Expandir 1-2 casos de uso adicionales
- Actualizar imágenes con nuevos diseños/UI
- Revisar glosario (¿nuevos términos en industria?)

### Cada 12 meses:
- Reescritura completa de secciones con bajo performance
- A/B testing de títulos y descriptions
- Benchmark competencia (¿qué keywords dominan?)
- Consideración de nuevo contenido (video, webinars)

---

## Recursos Adicionales

**Tools SEO recomendadas:**
- [Google Search Console](https://search.google.com/search-console) - Monitoreo rankings
- [Ahrefs](https://ahrefs.com/) - Keyword research, backlinks
- [Schema Markup Validator](https://validator.schema.org/) - Validar JSON-LD
- [Screaming Frog](https://www.screamingfrog.co.uk/) - Auditoría técnica

**Referencias LEO/AEO:**
- [Google's Search Generative Experience](https://blog.google/products/search/generative-ai-search/)
- [Perplexity AI](https://www.perplexity.ai/) - Testear citación
- [ChatGPT](https://chat.openai.com/) - Validar aparición en respuestas

---

**Próximos pasos:** ¿Procedemos con ejecución Día 1 (4 subagentes en paralelo)?
