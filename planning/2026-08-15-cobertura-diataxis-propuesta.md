# Propuesta de cobertura Diátaxis — KB Nevent

> Fecha: 2026-08-15 · Generado por el Plan 2 (clasificador). **Propuesta**: las etiquetas aún NO están escritas en el frontmatter; pendiente de aprobación.

Clasificados 92 docs sin etiquetar + 1 ya anotado = **93 docs de contenido** (excluye locale `en/` y ficheros de raíz). Confianza alta: 0 baja confianza, 1 `mixed`.

## Distribución global

| Cuadrante | Docs | % |
| --- | --- | --- |
| how-to | 46 | 49% |
| reference | 26 | 28% |
| explanation | 19 | 20% |
| tutorial | 1 | 1% |
| mixed | 1 | 1% |

## Matriz de cobertura (área × cuadrante)

| Área | tutorial | how-to | reference | explanation | mixed |
| --- | --- | --- | --- | --- | --- |
| analitica | — | 6 | 10 | — | — |
| audiencia | — | 2 | — | — | — |
| campanas | 1 | 7 | — | 1 | 1 |
| chatbot | — | 1 | — | — | — |
| consumo | — | 1 | — | — | — |
| entregabilidad | — | 3 | — | 1 | — |
| experiencias | — | 2 | — | — | — |
| herramientas | — | 1 | — | — | — |
| nevent-ai | — | 9 | 7 | 13 | — |
| paid-media | — | 1 | — | — | — |
| segmentacion | — | 11 | 9 | 4 | — |
| superapp | — | 1 | — | — | — |
| suscripciones | — | 1 | — | — | — |

## Huecos prioritarios

1. **Tutorial casi inexistente (1/93).** 12 de 13 áreas no tienen ningún doc de aprendizaje guiado para principiantes. Es el hueco sistémico #1: la KB asume competencia en casi todo.
2. **Reference ausente en áreas núcleo.** `campanas`, `audiencia`, `entregabilidad`, `experiencias` no tienen reference (ni catálogo de campos/estados de campaña, ni de atributos de fan a nivel operativo).
3. **Explanation concentrado.** 13 de 19 explanation están en `nevent-ai`; 9 áreas no explican el 'porqué' de nada.
4. **Áreas delgadas.** `chatbot`, `consumo`, `herramientas`, `paid-media`, `superapp`, `suscripciones`: 1 solo how-to cada una, sin reference ni explanation.

## Clasificación por documento (propuesta)

| Slug | Cuadrante | Confianza | Razón |
| --- | --- | --- | --- |
| analitica/agrupar-y-filtrar | reference | high | Describe qué dimensiones y filtros existen (fecha, evento, canal, segmento) con tabla de valores posibles y para qué sirve cada uno; es un catálogo consultado mientras se trabaja, no una guía de pasos. |
| analitica/audiencia | reference | high | Catálogo de métricas de audiencia (LTV, churn, RFM, cohortes) con tabla de "qué responde / cuándo usarla"; definiciones precisas para consultar, no pasos de acción. |
| analitica/campanas | reference | high | Tabla de métricas de campaña (open rate, click rate, conversión, ROAS) con benchmarks del sector; listado de indicadores consultado mientras se revisan resultados. |
| analitica/casos/atribucion-por-canal | how-to | high | Responde la pregunta concreta "¿qué canales generan más revenue?" y describe paso a paso cómo medir y comparar la atribución por canal con una tabla de resultado esperado. |
| analitica/casos/cohortes-primera-compra | how-to | med | Explica cómo construir y leer el análisis de cohortes por primera compra para responder una pregunta de negocio específica; incluye algo de concepto pero el objetivo es aplicar el análisis. |
| analitica/casos/email-por-tier | how-to | high | Caso práctico orientado a resolver una pregunta de negocio ("¿cuánta cuota me queda?") con tabla de resultado esperado y cuándo aplicarlo; tarea concreta con competencia básica asumida. |
| analitica/casos/index | reference | med | Índice de los 6 casos prácticos con descripción de cada uno; funciona como catálogo de casos disponibles, no ejecuta ningún análisis ni enseña. |
| analitica/casos/open-rate-diario | how-to | high | Caso orientado a monitorizar el open rate día a día (pregunta de negocio + fórmula + tabla de patrones a detectar + cuándo actuar); pasos para completar una tarea recurrente. |
| analitica/casos/roas-ultimos-30-dias | how-to | high | Guía para calcular y leer el ROAS de los últimos 30 días con fórmula, resultado esperado, benchmarks y cuándo usarlo o no; orientada a completar una tarea de análisis concreta. |
| analitica/casos/top-eventos-revenue | how-to | high | Describe cómo obtener e interpretar el ranking de top 10 eventos por revenue (pregunta de negocio, cálculo, tabla de resultado); tarea concreta de análisis de cartera. |
| analitica/deliverability | reference | high | Tabla de métricas de deliverability (sender reputation, inbox placement, bounce rate, spam complaints) con umbrales de alerta; catálogo de indicadores para consulta rápida. |
| analitica/eventos-y-entradas | reference | high | Catálogo completo de métricas de eventos y entradas (ocupación, ingresos, velocidad, ticket medio) con tabla de "qué responde / cuándo usarla"; referencia a consultar mientras se trabaja. |
| analitica/faq | reference | med | Preguntas frecuentes con respuestas precisas sobre comportamiento del sistema (latencia, exportación, retención, privacidad); información factual de consulta, no pasos ni conceptos amplios. |
| analitica/index | reference | high | Catálogo de las 7 áreas de métricas disponibles en Nevent (más de 80 indicadores) con tabla de qué mide cada área; visión general de referencia del sistema de analítica. |
| analitica/paid-media | reference | high | Tabla de métricas de paid media (inversión, impresiones, clics, CPC, ROAS, CPA, atribución multi-touch) con "qué responde / cuándo usarla"; referencia de indicadores publicitarios. |
| analitica/tracking-y-atribucion | reference | high | Catálogo de métricas de tracking de enlaces (clics, clics únicos, conversión post-clic, revenue atribuido) con tabla descriptiva; referencia a consultar al revisar resultados de campaña. |
| audiencia/gestion-de-fans | how-to | high | Guía paso a paso para localizar un fan en la base de datos y navegar por todas las secciones de su perfil; orientada a una tarea concreta con pasos numerados y capturas. |
| audiencia/importar-fans | how-to | high | Guía paso a paso para subir un archivo CSV/Excel de contactos a Nevent; pasos numerados desde acceder al asistente hasta revisar el resultado. |
| campanas/crear-primera-campana | tutorial | high | ya anotado (smoke test) |
| campanas/gestionar-campanas | how-to | high | Explica cómo revisar, filtrar y actuar sobre la lista de campañas: leer estados, usar el menú de acciones y consultar resultados; orientado a tareas operativas del día a día. |
| campanas/informe/aperturas-y-clics | how-to | high | Guía para ver la lista de destinatarios filtrada por nivel de interacción (abiertos, clicados, rebotados) y usar esa lista para mejorar futuras campañas; pasos concretos con capturas. |
| campanas/informe/audiencia | how-to | med | Explica cómo ver los segmentos a los que llegó una campaña enviada y cómo usar esa información; contiene algo de explicación interpretativa pero el propósito dominante es completar una consulta concreta. |
| campanas/informe/desuscripciones | mixed | med | Combina pasos para ver los datos de bajas (how-to) con interpretación de umbrales saludables y explicación de qué hace Nevent automáticamente (explanation); las dos partes tienen peso similar. |
| campanas/informe/rebotes | how-to | high | Guía para abrir la sección de Entregabilidad, leer las tarjetas de rebotes suaves y duros, e interpretar qué hacer si hay rebotes; dominantemente orientada a una tarea de consulta. |
| campanas/informe/resultados | how-to | high | Pasos para abrir el informe de una campaña enviada, leer las cuatro métricas principales y actuar si los resultados son bajos; el propósito dominante es guiar una tarea concreta de revisión. |
| campanas/mejores-practicas | explanation | high | Reúne el razonamiento detrás de las decisiones de campaña (segmentación, asunto, frecuencia, limpieza de lista, medición); no enseña a hacer nada paso a paso, sino que explica el porqué de cada práctica. |
| campanas/plantillas-email | how-to | high | Guía paso a paso para crear y editar una plantilla de email con el editor visual de Nevent, desde acceder a la biblioteca hasta añadir y configurar bloques. |
| campanas/plantillas-whatsapp | how-to | high | Guía paso a paso para crear una plantilla de WhatsApp en Nevent, rellenar los datos que exige Meta y enviarla a revisión; pasos numerados con capturas. |
| chatbot/configuracion | how-to | high | Explica cómo configurar el chatbot de Nevent: escribir instrucciones, subir documentos de referencia, activar fuentes de datos e instalarlo en la web; pasos concretos orientados a completar la configuración. |
| consumo/plan-de-uso | how-to | high | Guía para consultar la pantalla de créditos disponibles y consumo por canal; pasos concretos (abrir menú de usuario, entrar en "Uso del plan") con explicación de cómo leer cada número. |
| entregabilidad/activar-canales | how-to | high | Guía paso a paso con capturas para revisar y activar los canales de email, SMS, WhatsApp y analytics desde Configuración; tarea concreta con pasos numerados. |
| entregabilidad/dominio-dedicado | how-to | high | Asistente paso a paso con capturas para configurar un dominio dedicado (introducir dominio, elegir subdominio, crear registros DNS); tarea de configuración con objetivo claro. |
| entregabilidad/envio-de-emails | how-to | med | Recorre la pantalla de Envío de emails explicando cada componente (dirección efectiva, tipo de dominio, estado de componentes) y cómo provisionarlos; dominantemente tarea de revisión y configuración aunque contiene algo de referencia. |
| entregabilidad/reputacion-y-spam | explanation | high | Explica qué es la reputación de remitente, por qué importa y cuáles son los hábitos que la construyen (autenticación, listas limpias, contenido, ramping); orientado al entendimiento conceptual y las buenas prácticas, no a pasos de interfaz. |
| experiencias/analytics | how-to | high | Guía paso a paso con capturas para navegar y leer la sección Analytics de un evento (KPIs, gráfico de ventas, entradas por tipo, ventas por RRPP); tarea guiada de lectura e interpretación de datos. |
| experiencias/perfil-musical | how-to | high | Guía paso a paso con capturas para configurar el perfil musical de un evento (artistas, géneros, tags) y activar la segmentación por gusto musical; tarea de configuración con pasos numerados. |
| herramientas/magic-links | how-to | high | Pasos para crear un Magic Link, rellenar el formulario, copiar el enlace corto y leer los clics; orientado a completar una tarea operativa con capturas en cada paso. |
| nevent-ai/casos-practicos/cierre-de-mes-y-reporting | how-to | high | Flujo paso a paso para realizar el reporting mensual multi-cliente; objetivo concreto y real, no de aprendizaje |
| nevent-ai/casos-practicos/diagnosticar-campana-floja | how-to | high | Guia paso a paso con prompts reales para diagnosticar una campana de bajo rendimiento; tarea especifica con un objetivo claro |
| nevent-ai/casos-practicos/index | explanation | high | Pagina de indice que describe la estructura de los casos practicos y orienta al lector hacia otros recursos; no enseña ni da pasos |
| nevent-ai/casos-practicos/lanzar-un-evento | how-to | high | Flujo completo paso a paso para lanzar un evento con Nevent IA (segmento, campana, programacion); objetivo real y concreto |
| nevent-ai/casos-practicos/optimizar-inversion-publicitaria | how-to | high | Guia paso a paso para analizar y reasignar presupuesto publicitario en Meta usando Nevent IA; tarea real con objetivo concreto |
| nevent-ai/casos-practicos/recuperar-audiencia-dormida | how-to | high | Flujo paso a paso para crear una campana de reactivacion de contactos inactivos; objetivo real y especifico |
| nevent-ai/conectar-chatgpt | how-to | high | Instrucciones numeradas para conectar ChatGPT a Nevent MCP; tarea de configuracion pura sin contenido conceptual |
| nevent-ai/conectar-claude | how-to | high | Instrucciones paso a paso para conectar Claude Desktop a Nevent MCP en menos de 3 minutos; configuracion sin tecnicismos |
| nevent-ai/developers/claude-code | how-to | high | Comandos concretos para anadir Nevent MCP a Claude Code CLI en modo HTTP y stdio; procedimiento tecnico de instalacion |
| nevent-ai/developers/claude-desktop | reference | high | Fragmentos JSON de configuracion con rutas, variables de entorno y opciones para Claude Desktop; consultado al configurar, no leido de inicio a fin |
| nevent-ai/developers/cursor-cline-continue | reference | high | Configuracion JSON para Cursor, Cline, Continue y VS Code; catalogo de snippets por cliente, sin narrativa |
| nevent-ai/developers/herramientas | reference | high | Catalogo de las 52 herramientas de Nevent MCP agrupadas por categoria con descripciones y workflows; documento de referencia consultado al trabajar |
| nevent-ai/developers/index | reference | med | Vision general tecnica de arquitectura, transportes y estructura del repositorio; informacion seca orientada a integradores, aunque incluye algo de contexto conceptual |
| nevent-ai/developers/instalacion-local | how-to | high | Guia de instalacion del paquete mcp-nevent con opciones (npx, global, repo) y tabla completa de variables de entorno; tarea de configuracion |
| nevent-ai/developers/multi-tenant | reference | med | Describe el modelo jerarquico de tenants, el contrato de switch/reset y garantias de aislamiento; es referencia tecnica aunque tiene un flujo de ejemplo |
| nevent-ai/developers/troubleshooting | reference | high | Tabla de codigos de error, formato de respuesta y soluciones a problemas comunes; tipico documento de referencia consultado al encontrar un error |
| nevent-ai/frases-listas-para-usar | reference | high | Catalogo de preguntas organizadas por area para copiar y pegar; lista de referencia pura, no narrativa ni instructiva |
| nevent-ai/index | explanation | high | Explica que es Nevent MCP, como funciona conceptualmente (sin tecnicismos) y que areas cubre; orientado a entender el producto, no a usarlo |
| nevent-ai/permisos-y-seguridad | explanation | high | Explica los tres modos de acceso, que puede y no puede hacer la IA en cada modo, y el modelo OAuth; orientado a entender el sistema de permisos |
| nevent-ai/preguntas-frecuentes | explanation | med | Respuestas a dudas conceptuales y de politica (compatibilidad, privacidad, deshacer envios, acceso de equipo); explica el comportamiento y los limites del sistema |
| nevent-ai/que-puedes-hacer/analitica | explanation | high | Describe el alcance de las capacidades de analitica — que se puede preguntar y por que funciona — con ejemplos ilustrativos; no es una guia de pasos |
| nevent-ai/que-puedes-hacer/audiencia | explanation | high | Describe el alcance de las capacidades de segmentacion de audiencia con ejemplos narrativos; orienta sobre lo posible, no instruye con pasos |
| nevent-ai/que-puedes-hacer/campanas | explanation | high | Describe que puede consultar y preparar el asistente en campanas de email, SMS y WhatsApp; alcance y limites, con ejemplo narrativo |
| nevent-ai/que-puedes-hacer/deliverability | explanation | high | Describe las capacidades de consulta de entregabilidad y alertas; explica que puede y no puede hacer el asistente, con ejemplo narrativo |
| nevent-ai/que-puedes-hacer/index | explanation | high | Indice de todas las areas de Nevent IA con descripcion breve de cada capacidad; pagina de orientacion conceptual que enlaza a las subpaginas |
| nevent-ai/que-puedes-hacer/multi-cuenta | explanation | high | Describe como funciona el cambio de cuenta en sesion, que puede hacer el asistente y los limites; orientacion conceptual con ejemplo narrativo |
| nevent-ai/que-puedes-hacer/paid-media | explanation | high | Describe el alcance del analisis de publicidad de pago (Meta, Google, TikTok) y la atribucion UTM; explica capacidades y limites con ejemplo |
| nevent-ai/que-puedes-hacer/plantillas | explanation | med | Describe las capacidades de gestion de plantillas de email desde el chat; mezcla lista de acciones con ejemplo narrativo, pero el proposito dominante es explicar el alcance |
| nevent-ai/que-puedes-hacer/short-urls | explanation | high | Describe las capacidades de generacion y medicion de links de seguimiento; explica que puede hacer el asistente con ejemplo narrativo |
| paid-media/introduccion | how-to | med | Explica cómo leer el panel de Paid Media y navegar por sus secciones (filtros, detalle de campaña, conjuntos de anuncios); el título dice "introduccion" pero el contenido son pasos para usar el módulo, no conceptos puros. |
| segmentacion/capacidades/asistencia | reference | high | Catálogo de criterios de asistencia (eventos asistidos, ciudad, frecuencia, recencia) presentado como tabla de referencia con ejemplos de uso; se consulta mientras se construye un segmento, no enseña ni guía paso a paso. |
| segmentacion/capacidades/atributos-del-fan | reference | high | Describe y lista los atributos de perfil del fan (edad, ciudad, idioma, campos personalizados) con sus operadores y casos de uso; es un catálogo de referencia, no un procedimiento. |
| segmentacion/capacidades/combinaciones | reference | med | Explica qué son la lógica Y/O, marcos temporales y modificadores geográficos: contenido de referencia sobre cómo funciona la sintaxis de combinación, aunque incluye algunos ejemplos orientativos. |
| segmentacion/capacidades/engagement | reference | high | Cataloga los criterios de engagement digital (apertura, clic, conversión, carrito abandonado) en formato tabla descriptiva; es una referencia de criterios disponibles, no un how-to ni un tutorial. |
| segmentacion/capacidades/gasto-y-consumo | reference | high | Catálogo de criterios monetarios (gasto total, ticket medio, tipo de entrada, cashless) con tabla y ejemplos de uso; referencia consultable mientras se segmenta. |
| segmentacion/capacidades/index | reference | high | Índice de todos los criterios de segmentación disponibles (más de 60, en 6 categorías); es el punto de entrada de referencia de la sección de capacidades. |
| segmentacion/capacidades/rfm | explanation | high | Explica qué es el modelo RFM, cómo lo calcula Nevent automáticamente y qué significan los 11 perfiles pre-construidos; orientado a entender el concepto, no a ejecutar pasos. |
| segmentacion/capacidades/score-y-temperatura | explanation | high | Explica qué es el Nevent Score (0-100) y la Temperatura (6 niveles), cómo se calculan y cuándo usarlos; contenido conceptual sobre métricas predictivas, no procedimental. |
| segmentacion/casos/audiencia-con-preferencia | how-to | high | Guía con situación real, pasos concretos y criterios específicos para construir un segmento basado en preferencia musical declarada mediante campo personalizado; objetivo claro y audiencia competente. |
| segmentacion/casos/audiencia-geolocalizada | how-to | high | Describe una situación concreta (evento regional) y explica paso a paso cómo construir un segmento por proximidad geográfica; orientado a ejecutar una tarea real. |
| segmentacion/casos/carrito-abandonado | how-to | high | Caso práctico con situación, criterios exactos y configuración para identificar y comunicar a fans que abandonaron el carrito en las últimas 48 horas; tarea real con objetivo específico. |
| segmentacion/casos/fans-tempranos | how-to | high | Explica cómo identificar fans con historial de compra early bird y activarlos antes de abrir la venta general; es un procedimiento orientado a una tarea de campaña concreta. |
| segmentacion/casos/index | how-to | med | Página índice de 6 casos prácticos; aunque es principalmente navegacional, su propósito es orientar al promotor hacia tareas concretas de segmentación por objetivo de campaña. |
| segmentacion/casos/reactivar-fans-inactivos | how-to | high | Guía para identificar y reactivar fans de alto valor que llevan más de un año inactivos; presenta situación, criterios de segmento y lógica de campaña orientada a una tarea real. |
| segmentacion/casos/top-rfm-vip | how-to | high | Explica cómo usar el perfil Champions del RFM para llegar al top 10% y comunicar experiencias premium; caso con objetivo específico y criterios accionables. |
| segmentacion/motor-segmentacion/casos-uso | how-to | med | Presenta 6 casos de uso prácticos de segmentación (bienvenida, VIP, early bird localizado, cross-sell, super fans, carrito); es una colección de how-tos aunque con menos detalle paso a paso que los casos individuales. |
| segmentacion/motor-segmentacion/categorias | reference | high | Referencia completa de las 6 categorías de criterios con más de 60 atributos, organizada como catálogo consultable mientras se trabaja con el motor de segmentación. |
| segmentacion/motor-segmentacion/crear-segmento | how-to | high | Tutorial paso a paso (5 pasos en schema HowTo) para crear un segmento desde cero en Nevent; título y estructura son claramente procedimentales orientados a completar una tarea. |
| segmentacion/motor-segmentacion/faq | reference | med | Preguntas frecuentes sobre límites de filtros, comportamiento dinámico/estático, exportación y deliverability; es información de referencia consultada puntualmente, no un procedimiento. |
| segmentacion/motor-segmentacion/grupos | how-to | high | Guía paso a paso (schema HowTo) para dividir segmentos en grupos y hacer A/B testing con envíos progresivos; orientado a ejecutar una tarea específica de experimentación. |
| segmentacion/motor-segmentacion/index | explanation | med | Página de entrada al motor de segmentación que explica qué es, cómo funciona y qué resultados consiguen los promotores que lo usan; predomina la comprensión conceptual sobre la ejecución. |
| segmentacion/motor-segmentacion/mejores-practicas | explanation | med | Lista 9 reglas de oro para segmentar bien (tamaños mínimos, frecuencia, limpieza de inactivos); es orientación conceptual sobre cómo pensar la segmentación, no pasos para completar una tarea. |
| segmentacion/motor-segmentacion/modificadores-rfm | how-to | high | Guía paso a paso (schema HowTo, 15 min, pasos numerados) para implementar análisis RFM con modificadores de recencia y frecuencia; claramente orientado a ejecutar una tarea avanzada. |
| segmentacion/motor-segmentacion/operadores-logica | reference | high | Describe los 12 operadores lógicos AND/OR disponibles con definiciones, comportamiento y casos de uso; es una referencia de sintaxis consultada mientras se configura un segmento. |
| superapp/introduccion | how-to | med | Describe cómo configurar cada sección de la Superapp (Home, Actividad, Enviar push, Onboarding) con pasos concretos; pese al nombre "introducción", el contenido es operativo y orientado a tareas. |
| suscripciones/crear-formulario | how-to | high | Asistente paso a paso para crear un formulario de suscripción: información básica, campos, diseño e instalación en la web; propósito completamente orientado a la tarea. |
