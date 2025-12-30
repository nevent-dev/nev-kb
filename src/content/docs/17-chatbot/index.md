---
title: Chatbot e IA Conversacional
description: Asistente virtual con IA para atención automatizada 24/7 a tu audiencia.
---

Configura un chatbot inteligente que atienda a tus fans automáticamente usando IA generativa.

## En esta sección

- **Configuración del bot**: Personalidad, tono y comportamiento
- **Base de conocimiento**: Sube documentos (PDF, TXT) para entrenar al bot
- **Fuentes de datos personalizadas**: Conecta APIs y bases de datos
- **Historial de conversaciones**: Revisa interacciones pasadas
- **Testing y validación**: Simulador en vivo antes de publicar
- **Configuración avanzada**: Temperatura, longitud, fallback a humano
- **Integración con perfiles**: Contexto del usuario en cada conversación

## ¿Qué puede hacer el chatbot?

### Responder preguntas frecuentes
- "¿Cuándo es el festival?"
- "¿Dónde está el venue?"
- "¿Puedo transferir mi entrada?"
- "¿Qué artistas tocan el viernes?"

### Asistir en compras
- "¿Qué tipos de entrada hay?"
- "¿Hay descuentos disponibles?"
- "¿Puedo pagar a plazos?"

### Informar sobre eventos
- "¿Cuáles son los próximos eventos?"
- "¿Eventos de techno en Madrid?"
- "Dame el lineup de [evento]"

### Gestión de cuenta
- "¿Cómo descargo mis entradas?"
- "Quiero cambiar mi email"
- "¿Dónde está mi historial de compras?"

### Derivar a humano
Si el bot no puede ayudar, transfiere a soporte:
- "Quiero hablar con un humano"
- "Necesito ayuda personalizada"

## Configuración básica

### Personalidad y tono
Define cómo habla el bot:

**Tono**:
- 🤝 Formal y profesional
- 😊 Amigable y cercano
- 🎉 Entusiasta y energético
- 🧘 Calmado y servicial

**Personalidad**:
- Nombre del bot (ej: "Nevent Assistant", "Nev")
- Saludo inicial ("¡Hola! ¿En qué puedo ayudarte?")
- Despedida ("¡Nos vemos en el evento!")
- Emojis: Activar/desactivar

**Idioma**:
- Español (primario)
- Inglés, Francés, Alemán, etc.
- Detección automática del idioma del usuario

### Instrucciones de comportamiento
Indicaciones que el bot debe seguir:

```
- Siempre sé amable y servicial
- Si no sabes una respuesta, admítelo y ofrece derivar a soporte
- Nunca inventes información sobre precios o fechas
- Personaliza las respuestas con el nombre del usuario
- Sugiere eventos relacionados cuando sea relevante
```

### Limitaciones y disclaimers
Define qué NO puede hacer el bot:

```
- No puede procesar reembolsos (derivar a soporte)
- No puede modificar datos de pago (derivar a soporte)
- No puede confirmar disponibilidad en tiempo real (verificar en web)
```

## Base de conocimiento

### Subir documentos
El bot aprende de:
- **PDFs**: FAQs, términos legales, guías de evento
- **TXT/MD**: Documentación, procedimientos
- **URLs**: Páginas web específicas

Proceso:
1. Sube archivo (máx 10MB)
2. El sistema extrae texto
3. Indexa el contenido
4. El bot puede buscar información en el documento

### Documentos recomendados
- FAQ completo
- Guía del evento (qué llevar, cómo llegar)
- Política de reembolsos
- Términos y condiciones
- Procedimientos de acceso y check-in

### Gestión de documentos
- Listar todos los documentos subidos
- Ver cuántas veces se usa cada documento
- Eliminar documentos obsoletos
- Actualizar documentos (sube nueva versión)

## Fuentes de datos personalizadas

### Conectar APIs
Integra el bot con tus sistemas:
- **API de tickets**: Consulta disponibilidad en tiempo real
- **API de eventos**: Info actualizada de lineup, horarios
- **CRM externo**: Datos de clientes
- **Base de datos propia**: Información custom

Configuración:
1. Endpoint URL
2. Método (GET/POST)
3. Headers (autenticación)
4. Parámetros
5. Formato de respuesta (JSON)

### Bases de datos
Conecta directamente a:
- MySQL, PostgreSQL
- MongoDB
- Firebase
- Otros sistemas

El bot puede hacer queries para:
- Verificar stock de productos
- Consultar entradas de usuario
- Obtener histórico de compras

## Historial de conversaciones

### Lista de threads
Ver todas las conversaciones:
- Usuario (email + nombre)
- Fecha y hora de inicio
- Duración de la conversación
- Número de mensajes
- Estado (activa, cerrada, derivada a humano)

### Detalle de conversación
Transcript completo:
- Mensajes del usuario
- Respuestas del bot
- Timestamp de cada mensaje
- Documentos consultados por el bot
- APIs llamadas durante la conversación

### Métricas
- **Satisfacción**: Rating del usuario (1-5 estrellas)
- **Resolución**: ¿Se resolvió la consulta?
- **Tiempo promedio**: Duración de conversaciones
- **Tasa de derivación**: % de conversaciones derivadas a humano

### Filtros
- Por fecha
- Por usuario
- Por tema (compras, eventos, soporte)
- Solo derivadas a humano
- Solo con rating bajo

## Testing y validación

### Simulador en vivo
Prueba el bot antes de publicarlo:
1. Abre el simulador en la configuración
2. Escribe mensajes como lo haría un usuario
3. Verifica las respuestas del bot
4. Revisa qué documentos/APIs consultó
5. Ajusta configuración si es necesario

### Casos de prueba
Define escenarios para testing:
- "Usuario pregunta por precios"
- "Usuario quiere reembolso"
- "Usuario consulta lineup"
- "Usuario escribe en otro idioma"

### A/B Testing
Compara variaciones:
- **Versión A**: Tono formal
- **Versión B**: Tono casual
- Mide cuál tiene mejor satisfacción

## Configuración avanzada

### Temperatura del modelo
Controla la creatividad del bot:
- **0.0**: Muy predecible, siempre la misma respuesta
- **0.5**: Balanceado (recomendado)
- **1.0**: Muy creativo, respuestas variadas

### Longitud de respuestas
Limita extensión:
- **Corta**: Máximo 50 palabras
- **Media**: Máximo 150 palabras (recomendado)
- **Larga**: Máximo 300 palabras

### Fallback a humano
Cuándo derivar automáticamente:
- Después de 3 preguntas sin resolver
- Si el usuario pide explícitamente
- Si la confianza de la respuesta es < 60%
- Temas sensibles (reembolsos, quejas)

### Context window
Cuántos mensajes anteriores recordar:
- **Corto**: 5 mensajes (rápido pero olvida contexto)
- **Medio**: 15 mensajes (recomendado)
- **Largo**: 30 mensajes (lento pero máxima memoria)

## Integración con perfiles de usuario

### Contexto automático
El bot tiene acceso a:
- Nombre del usuario
- Email
- Eventos a los que ha asistido
- Compras previas
- Preferencias (géneros musicales, etc.)
- Historial de conversaciones pasadas

### Personalización
Usa el contexto para:
- Saludar por nombre: "Hola María!"
- Recomendar eventos: "Veo que te gusta el techno, no te pierdas..."
- Recordar conversaciones: "La última vez preguntaste sobre..."
- Ofrecer ayuda relevante: "¿Quieres descargar tus entradas para [evento]?"

## Idiomas y traducción

### Detección automática
El bot detecta el idioma del usuario y responde en consecuencia.

### Idiomas soportados
- 🇪🇸 Español
- 🇬🇧 Inglés
- 🇫🇷 Francés
- 🇩🇪 Alemán
- 🇮🇹 Italiano
- 🇵🇹 Portugués

### Traducción de documentos
Sube documentos en múltiples idiomas:
- FAQ_ES.pdf
- FAQ_EN.pdf
- FAQ_FR.pdf

El bot usa el documento del idioma correcto.

## Métricas y analytics

### Dashboard principal
- 📊 **Conversaciones totales**: Por día/semana/mes
- 👥 **Usuarios únicos**: Cuántos fans han usado el bot
- ⭐ **Satisfacción promedio**: Rating 1-5
- ✅ **Tasa de resolución**: % de consultas resueltas
- 🤝 **Tasa de derivación**: % derivadas a humano

### Top consultas
Qué preguntas se hacen más:
1. "¿Cuándo es el evento?"
2. "¿Dónde puedo descargar mi entrada?"
3. "¿Hay descuentos?"
4. "¿Qué artistas tocan?"
5. "¿Cómo llego al venue?"

### Oportunidades de mejora
Detecta automáticamente:
- Preguntas frecuentes sin respuesta satisfactoria
- Temas que siempre derivan a humano
- Documentos que nunca se consultan (obsoletos)
