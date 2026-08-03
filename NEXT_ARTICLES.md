# Plan de contenido — Knowledge Base de Nevent (Marketing y engagement)

> Reemplaza al plan anterior, que estaba desalineado con el producto real (describía una KB
> genérica tipo Klaviyo: Featured Resources, Flows, WooCommerce, Reviews…). Nevent es una
> plataforma de eventos en vivo. Este plan refleja lo que ya existe en esta KB y lo que
> falta, verificado contra la UI real de `admin.nevent.es` (`nev-admin-web`).

**Fecha**: 2026-08-03
**Repo canónico**: `github.com/nevent-dev/nev-kb` (este repo). Publica en el centro de ayuda.
**Scope**: Marketing y engagement. Fuera de alcance por ahora → Contenido
(Eventos/Experiencias, Ventas, Merch) y Página web.

---

## Método de generación

Las guías se generan con el agente `user-guide-writer`:
- Navega el panel real (`admin.nevent.es`) con capturas de producción, tenant DEMO FEST.
- Escribe para promotores de eventos sin perfil técnico.

Apoyo para anticipar fricción: `UX_AUDIT_INVENTORY.md` (issues UX del flujo real).

### Estilo de redacción (obligatorio)

- Sin emojis en el cuerpo de los artículos.
- Lenguaje sencillo. Los términos técnicos imprescindibles se explican en una frase la
  primera vez que aparecen.
- Sin tics de escritura de IA. No usar la raya larga; usar frases cortas, comas o dos puntos.
- Tono directo y cercano, tratando de "tú" al lector.
- Frases y párrafos cortos.
- Imágenes paso a paso recortadas a la zona relevante (botón, campo, aviso), con pie o texto
  alternativo que describa qué se ve.

---

## Lo que YA existe (no rehacer)

| Área | Estado |
|------|--------|
| Segmentación (motor + capacidades + casos) | Completo (ES + EN) |
| Analítica: eventos, audiencia, campañas, publicidad de pago, tracking y atribución, deliverability, casos | Completo (ES + EN) |
| Nevent AI / MCP (conectar, qué puedes hacer, casos, developers) | Completo (ES + EN) |
| Campañas → Crear tu primera campaña | Recién creado (rama `docs/kb-crear-primera-campana`) |

Nota importante: la **analítica** de campañas, publicidad de pago y deliverability YA está
documentada. Lo que falta es la parte de **operativa en la interfaz** (cómo se hace cada cosa
en el panel), no la lectura de métricas.

---

## Prioridad ALTA

### Campañas (operativa de la interfaz)
- [x] `campanas/crear-primera-campana.mdx` — "Cómo crear tu primera campaña"
- [ ] `campanas/plantillas-email.mdx` — "Diseña plantillas de email (editor drag & drop)"
- [ ] `campanas/plantillas-whatsapp.mdx` — "Crea plantillas de WhatsApp"
- [ ] `campanas/canales-email-sms-whatsapp.mdx` — "Diferencias al enviar por Email, SMS y WhatsApp"
- [ ] `campanas/gestionar-campanas.mdx` — "Estados de una campaña y acciones (duplicar, borrador, cancelar)"

### Audiencia (gestión, complementa Segmentación ya existente)
- [ ] `audiencia/gestion-de-fans.mdx` — "Gestiona tus fans"
- [ ] `audiencia/importar-fans.mdx` — "Importa contactos de forma masiva"
- [ ] `audiencia/perfil-del-fan.mdx` — "El perfil de un fan (intereses, tier, historial, compras)"
- [ ] `suscripciones/crear-formulario.mdx` — "Crea un formulario de suscripción"
- [ ] `suscripciones/campos-y-apariencia.mdx` — "Campos y apariencia del formulario"
- [ ] `suscripciones/instalacion.mdx` — "Instala el formulario en tu web"

### Paid Media (conexión; la analítica ya está en `analitica/paid-media`)
- [ ] `paid-media/conectar-cuentas.mdx` — "Conecta tus cuentas de anuncios (Meta, Google, TikTok)"
- [ ] `paid-media/entender-el-panel.mdx` — "Recorre el panel: campañas, conjuntos y anuncios"
      · Módulo `src/app/paid-ads/`. Puede estar oculto si la organización no tiene el módulo activo.

---

## Prioridad MEDIA

### Herramientas
- [ ] `herramientas/magic-links.mdx` — "Magic Links: acorta enlaces y mide clics"

### Chatbot
- [ ] `chatbot/introduccion.mdx` — "Qué es el chatbot y para qué sirve"
- [ ] `chatbot/configuracion.mdx` — "Configura tu chatbot"
- [ ] `chatbot/conversaciones.mdx` — "Gestiona las conversaciones con tus fans"

### Superapp
- [ ] `superapp/introduccion.mdx` — "Qué es la Superapp"
- [ ] `superapp/home-y-onboarding.mdx` — "Configura la home y el onboarding de tu app"
- [ ] `superapp/monedas-virtuales.mdx` — "Monedas virtuales: tipos de cambio, paquetes y métricas"
- [ ] `superapp/coleccionables.mdx` — "Coleccionables"
- [ ] `superapp/retos.mdx` — "Retos: recompensas, participantes y estadísticas"

### Consumo
- [ ] `consumo/plan-de-uso.mdx` — "Tu plan de uso: créditos de email y SMS"

---

## Prioridad BAJA (configuración técnica, dejar para el final)

Onboarding técnico. La analítica de entregabilidad ya existe; falta la CONFIGURACIÓN.

- [ ] `entregabilidad/activar-canales.mdx` — "Activa tus canales (Email, SMS, Push, WhatsApp)"
- [ ] `entregabilidad/dominio-dedicado.mdx` — "Configura tu dominio dedicado (registros DNS)"
- [ ] `entregabilidad/verificar-dns.mdx` — "Verifica tus registros DNS y resuelve errores"
- [ ] `entregabilidad/envio-de-emails.mdx` — "Ajustes de envío de emails"

---

## Orden de ejecución recomendado

1. Campañas: plantillas de email, luego gestión de campañas y canales.
2. Audiencia: gestión e importación de fans, luego formularios de suscripción.
3. Paid Media: conectar cuentas y recorrido del panel.
4. Chatbot y Superapp (engagement).
5. Magic Links y Plan de uso.
6. Configuración técnica de entregabilidad (al final).

---

**Última actualización**: 2026-08-03
