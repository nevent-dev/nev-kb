# Diseño: Sistema agéntico de documentación por Diátaxis para la KB de Nevent

- **Fecha:** 2026-08-15
- **Autor:** Samuel Fraga (con Claude Code)
- **Estado:** Borrador para revisión
- **Repo objetivo del contenido:** `nev-kb/docs` (Astro + Starlight, deploy a S3 + CloudFront)

---

## 1. Contexto y drivers

La KB de Nevent (`help.nevent.ai`) tiene hoy ~165 documentos MDX organizados **por área de producto** (`campanas`, `segmentacion`, `analitica`, `audiencia`, `entregabilidad`, `paid-media`, `superapp`, `chatbot`, etc.), con sidebar manual (config Astro de ~28 KB) y estilo dominante orientado a tarea ("cómo crear tu primera campaña", "paso a paso").

Este diseño responde a **dos drivers explícitos** del negocio:

1. **Cobertura y calidad** — la KB debe ser completa y coherente en los cuatro cuadrantes Diátaxis, no solo en tutorial/how-to.
2. **SEO / GEO / citabilidad IA** — la KB debe posicionar en búsqueda orgánica y ser citada por motores generativos (ChatGPT, Perplexity, Gemini, AI Overviews).

**No** son drivers (descartados explícitamente): reducir esfuerzo manual como fin en sí mismo, ni una limitación del stack actual.

## 2. Diátaxis: el marco

Diátaxis (https://diataxis.fr) clasifica toda documentación según dos ejes —*acción vs. conocimiento* y *aprender vs. trabajar*— en cuatro tipos. La tesis central: **mezclar tipos en un mismo documento degrada los cuatro.** Cada tipo tiene una función, una voz y un lector distintos.

| Cuadrante | Función | Estado actual en la KB |
|---|---|---|
| **Tutorial** (aprender haciendo) | Primeros pasos guiados del novato | Fuerte |
| **How-to** (resolver una tarea) | Lograr X asumiendo competencia | Fuerte |
| **Reference** (información precisa) | Consultar campos, operadores, atributos exactos | Parcial |
| **Explanation** (entender el porqué) | Comprender conceptos (RFM, deliverability) | Débil / disperso |

**Diagnóstico:** la KB está sesgada a tutorial + how-to (patrón típico de help center) y floja en *reference* estructurada y *explanation*. El sistema agéntico ataca ese desequilibrio de forma dirigida.

## 3. Decisión de plataforma: seguir en Astro

**Decisión:** mantener Astro + Starlight. No migrar a "web pura + design system".

Razonamiento:
- El stack no es el cuello de botella (no es un driver). Migrar es coste puro sin retorno sobre los objetivos.
- GEO/citabilidad se sirve con HTML estático, semántico y estructurado: exactamente lo que Astro produce. Los plugins ya montados (llms.txt, LLM actions, shares — commit `NEV-1667`) refuerzan esto.
- Cobertura/calidad se sirve con un modelo de contenido tipado (content collections + frontmatter tipado: `faqs`, `sidebar.order`). Ese formato es, además, el *target* que el sistema agéntico necesita para escribir de forma fiable.
- El modo "totalmente automático" (§5) requiere un arnés de CI/verificación que Astro habilita de forma natural (build estático, git, deploy reproducible). Web pura obligaría a reconstruirlo a mano.

**Upgrade path (si algún día el theming de Starlight limita):** evolucionar Starlight → Astro "pelado" + design system propio **dentro del mismo repo**, de forma incremental. Nunca implica abandonar Astro.

## 4. Arquitectura del sistema agéntico

Principio rector: **un cuadrante Diátaxis ≠ un estilo de escritura ≠ una fuente de verdad ≠ un nivel de automatización.** Por eso no hay "un agente que escribe docs", sino especialistas por cuadrante + orquestación + puerta de calidad.

### 4.1 Piezas

**A) Auditor de cobertura (cerebro; periódico)**
- Recorre los ~165 docs y **clasifica cada uno en su cuadrante**, marcando los que mezclan tipos (violación Diátaxis).
- Construye la **matriz de cobertura = área de producto × cuadrante**.
- Cruza contra releases / changelog / Jira para detectar **huecos** (celdas vacías de la matriz) y **obsolescencia** (docs desactualizados respecto al producto).
- Salida: **backlog priorizado** de trabajo de documentación.

**B) Cuatro agentes escritores especialistas** (reglas de escritura distintas por cuadrante):
- **Tutorial** — aprender haciendo; guiado; capturas en el tenant **DEMO FEST** vía Chrome DevTools. Reutiliza `user-guide-writer`.
- **How-to** — orientado a tarea, asume competencia. Semiautomatizable.
- **Reference** — hechos precisos y estructurados. El más automatizable y de mayor ROI en GEO (tablas, JSON-LD, campos exactos). Derivable del modelo de datos / API / config.
- **Explanation** — el "porqué". El menos automatizable: el agente redacta borrador, el humano (SME) aporta la tesis conceptual.

**C) Puerta de calidad + GEO** (todo borrador la atraviesa):
- Inyección de schema.org / JSON-LD.
- Extracción de FAQs a frontmatter.
- Actualización de llms.txt.
- Enlazado interno automático.
- Check de legibilidad.
- **Check de pureza Diátaxis** (¿mezcla tipos?).
- Reutiliza `seo-geo-auditor`.

**D) Orquestador** — coordina el ciclo, gestiona el paralelismo por item del backlog, y aplica el modelo de publicación (§5).

**E) Fuentes de verdad:**
- El producto mismo (Chrome DevTools sobre DEMO FEST).
- Release notes / changelog.
- Jira / Confluence.
- El código.
- **Tickets de soporte** (los huecos reales emergen de las preguntas reales de los usuarios).

### 4.2 Reutilización de agentes existentes

El sistema **orquesta y especializa lo que ya existe**, no inventa agentes desde cero:
- `user-guide-writer` → tutorial / how-to con capturas en DEMO FEST.
- `seo-geo-auditor` → puerta de calidad/GEO.
- `technical-writer` → apoyo de redacción.

## 5. Modelo de publicación: totalmente automático "con red"

**Decisión:** publicación totalmente automática por defecto, con caída a revisión humana solo por excepción (baja confianza). "Auto con red", no "auto a ciegas".

Tensión reconocida: automático total + calidad solo son compatibles si la puerta de calidad deja de ser un checklist y se convierte en un **sistema de seguridad adversarial y reversible**. Sin humano en el loop, el gate es la única defensa.

Salvaguardas obligatorias:
1. **Verificación automática dura**: build de Astro pasa, todos los enlaces resuelven, JSON-LD valida, las capturas existen y corresponden, y el doc pasa el check de pureza Diátaxis.
2. **Revisor adversarial**: un segundo agente cuyo único objetivo es refutar el borrador (afirmaciones falsas, pasos que no reproducen, campos inventados). ≥1 fallo material → no publica.
3. **Grounding factual**: ningún *reference* se publica sin anclaje a una fuente verificable (API, modelo de datos, captura real). Sin fuente → no es reference.
4. **Umbral de confianza**: alta confianza → publica; baja → cae a PR humano. El modo automático es el default, no una obligación ciega.
5. **Reversibilidad**: cada cambio es un commit; regresión detectada (caída de tráfico, error reportado) → revert automático.

## 6. Ciclo periódico

```
  ┌─ Semanal ─────────────────────────────────────────────┐
  │ Auditor de cobertura → matriz (área × cuadrante)       │
  │ + staleness (diff vs releases/Jira) → backlog priorizado│
  └───────────────────────────────────────────────────────┘
                 │  (por cada item del backlog, en paralelo)
                 ▼
  Agente del cuadrante (Tutorial/How-to/Reference/Explanation)
                 │  redacta contra content collection tipada
                 ▼
  Puerta calidad+GEO → Revisor adversarial → ¿confianza alta?
                 │                                   │
        sí ──────┴─ commit + deploy            no ──┴─ PR a humano
```

Cadencias:
- **Semanal**: auditoría de huecos → backlog.
- **On-release** (webhook desde el pipeline de producto): regenera solo los docs afectados por el cambio.
- **Mensual**: re-auditoría GEO + refresh completo de `reference` (barato y de alto ROI en citabilidad).

## 7. Métricas de éxito

- **Cobertura**: % de celdas cubiertas en la matriz (área × cuadrante); nº de docs que mezclan tipos (debe tender a 0).
- **Calidad**: tasa de docs que pasan el revisor adversarial a la primera; nº de reverts automáticos (proxy de errores en producción).
- **GEO**: nº de citas en motores generativos; posiciones orgánicas; cobertura de JSON-LD y FAQs; tráfico orgánico a la KB.
- **Frescura**: antigüedad media de los docs respecto al último release que los afecta.

## 8. Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Alucinación en *reference* publicado automáticamente | Grounding factual obligatorio + revisor adversarial + no-publish sin fuente |
| Capturas de DEMO FEST desde tenant equivocado | Regla fija: navegación siempre dentro de DEMO FEST; nunca por URL a IDs de otro tenant |
| Docs que mezclan cuadrantes | Check de pureza Diátaxis en la puerta de calidad |
| Deriva de calidad silenciosa | Métricas de reverts + muestreo humano periódico aunque el modo sea automático |
| Coste de tokens del ciclo semanal completo | Priorización por backlog; regeneración on-release dirigida en vez de full-rebuild |

## 9. Fuera de alcance (por ahora)

- Reorganizar la KB físicamente por cuadrante (se mantiene organización por área de producto; el cuadrante es metadato, no estructura de carpetas).
- Migración de plataforma (decidido: no).
- Internacionalización de contenido nuevo más allá del flujo ES/EN ya existente.

## 10. Preguntas abiertas

- ¿Cómo se marca el cuadrante en cada doc? (propuesta: campo `diataxis` en frontmatter, poblado por el auditor).
- ¿Dónde vive el orquestador y con qué scheduler? (cron de Claude Code / GitHub Actions / n8n).
- ¿Qué señal concreta dispara el revert automático (umbral de caída de tráfico, ventana temporal)?
- ¿El backlog se materializa como issues de Jira o como artefacto propio del sistema?
