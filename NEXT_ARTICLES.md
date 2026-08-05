# Plan de contenido — Knowledge Base de Nevent (Marketing y engagement)

> Refleja el estado real de la KB. Nevent es una plataforma de eventos en vivo; este plan
> documenta las funcionalidades que existen en `admin.nevent.es` (`nev-admin-web`).

**Última actualización**: 2026-08-05
**Repo canónico**: `github.com/nevent-dev/nev-kb` (este repo). Publica en help.nevent.ai.
**Scope**: Marketing y engagement. Fuera de alcance por ahora → Contenido
(Eventos/Experiencias, Ventas, Merch) y Página web.

---

## Método y estilo

Las guías se generan con el agente `user-guide-writer`, con capturas reales de producción
tomadas SIEMPRE en el tenant **DEMO FEST**. Aviso: navegar por URL a IDs de recursos de otra
organización cambia el tenant; verificar "DF DEMO FEST" antes de cada captura.

Estilo obligatorio: sin emojis, sin raya larga (usar frases cortas, comas o dos puntos),
lenguaje sencillo (términos técnicos explicados la primera vez), tono de "tú", frases cortas,
imágenes paso a paso recortadas a la zona relevante con texto alternativo.

---

## Publicado (ya en help.nevent.ai)

Base preexistente:
- [x] **Segmentación** completa (motor + capacidades + casos).
- [x] **Analítica** completa (eventos, audiencia, campañas, publicidad de pago, tracking y
      atribución, deliverability, casos).
- [x] **Nevent AI / MCP** completa.

Publicado en la tanda de agosto 2026:
- [x] `campanas/crear-primera-campana.mdx`
- [x] `campanas/plantillas-email.mdx`
- [x] `campanas/plantillas-whatsapp.mdx`
- [x] `campanas/gestionar-campanas.mdx`
- [x] `audiencia/importar-fans.mdx`
- [x] `audiencia/gestion-de-fans.mdx` (perfil del fan completo)
- [x] `suscripciones/crear-formulario.mdx` (creación, campos, apariencia, instalación, automatizaciones)
- [x] `herramientas/magic-links.mdx`
- [x] `chatbot/configuracion.mdx` (config, documentos, fuentes, bandeja de entrada, canal web)
- [x] `superapp/introduccion.mdx` (home, actividad, push, onboarding)
- [x] `paid-media/introduccion.mdx` (panel, campañas, conjuntos, anuncios)
- [x] `consumo/plan-de-uso.mdx`

Publicado el 2026-08-05 (Experiencias e informe de campaña, con enfoque de valor de negocio):
- [x] `experiencias/analytics.mdx` (analítica del evento: general, comportamiento, patrones temporales)
- [x] `experiencias/perfil-musical.mdx` (artistas, géneros y afinidad musical de la audiencia)
- [x] `campanas/informe/resultados.mdx` — "¿Cómo interpretar los resultados de tu campaña?"
- [x] `campanas/informe/rebotes.mdx` — "¿Cómo consultar los rebotes de tus campañas?"
- [x] `campanas/informe/desuscripciones.mdx` — "¿Quién se dio de baja tras tu campaña?"
- [x] `campanas/informe/audiencia.mdx` — "¿A qué audiencia llegó tu campaña?"
- [x] `campanas/informe/aperturas-y-clics.mdx` — "¿Quién abrió y clicó tu campaña?"

---

## Pendiente

### Prioridad BAJA — Configuración técnica (onboarding, dejada para el final)
La analítica de entregabilidad ya existe; falta la CONFIGURACIÓN de canales.
- [ ] `entregabilidad/activar-canales.mdx` — "Activa tus canales (Email, SMS, Push, WhatsApp)"
- [ ] `entregabilidad/dominio-dedicado.mdx` — "Configura tu dominio dedicado (registros DNS)"
- [ ] `entregabilidad/verificar-dns.mdx` — "Verifica tus registros DNS y resuelve errores"
- [ ] `entregabilidad/envio-de-emails.mdx` — "Ajustes de envío de emails"
      · Apoyo: `UX_AUDIT_INVENTORY.md` (issues UX del flujo real de dominio y SMS).

### Ampliaciones opcionales
- [ ] `paid-media/atribucion.mdx` — reincorporar la atribución CUANDO deje de ser una maqueta
      (el módulo actual `paid-ads-attribution` es un mock visual no funcional; se omitió a propósito).
- [ ] `superapp/` — monedas virtuales, coleccionables y retos, SI se activan en el tenant
      (el menú actual de DEMO FEST solo expone home, actividad, push y onboarding).
- [ ] `campanas/mejores-practicas.mdx` — buenas prácticas de campañas (transversal).
- [ ] `entregabilidad/reputacion-y-spam.mdx` — reputación de envío y evitar el spam (transversal).

---

## Notas de mantenimiento

- El sidebar de `astro.config.mjs` es MANUAL (no autogenerate): cada guía nueva requiere añadir
  su entrada.
- El deploy es automático (GitHub Actions `deploy-aws.yml`) al mergear a `main`; sitemap,
  `llms-full.txt` y robots se regeneran en el build. `dist/` no se versiona.
- `.nvmrc` en Node 22 (Astro 6 lo exige).
