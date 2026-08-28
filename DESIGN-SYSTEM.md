# Sistema de diseño del centro de ayuda

**Este sitio no tiene sistema de diseño propio. Usa el de nevent.ai.**

La fuente de verdad es `nev-landing-nevent/nevent-web/src/styles/tokens.css`.
Aquí solo se vendorizan sus valores y se mapean a las variables de Starlight.
Si algo tiene que cambiar de aspecto en los dos sitios, se cambia primero allí.

## Las reglas

Son cinco, y las comprueba `scripts/style-guard.mjs` en cada PR. No son
recomendaciones: si se incumplen, el CI se cae.

| Regla | Qué prohíbe | Por qué |
|---|---|---|
| `no-hardcoded-color` | `#hex`, `rgb()`, `hsl()` fuera de la capa de tokens | Un color literal deja de responder a un cambio de marca. La web acumuló ~1.300 |
| `no-font-family-literal` | `font-family` con un nombre de fuente | La familia se elige en el token, no en cada componente |
| `no-webfont` | `@font-face` | Añadir una fuente es una decisión de marca, no de una hoja suelta |
| `no-important` | `!important` | Es lo que impide que el token mande. En la web es el motivo de que cambiar un token no cambie nada |
| `no-hover` | `:hover` | El feedback va por `:active` y `:focus-visible`, que funcionan con teclado y en táctil |

Las cinco corren en **modo ratchet**: solo sobre los ficheros que tocas. El
legacy no bloquea; lo que escribas hoy, sí.

## La capa que no admite excepciones

Además de las reglas anteriores, el guard comprueba **en cada PR, toques lo que
toques**, que estos valores siguen siendo exactamente los de nevent.ai:

- Los **12 tokens de marca**: el negro `#1a1e2a`, el acento `#a64eff` y la
  escala morada completa del 50 al 900.
- Las **dos familias tipográficas**: `--font-display` y `--font-body` deben
  resolver a la pila del sistema.

Cambiar cualquiera de ellos rompe el CI aunque el CSS sea impecable. Es
deliberado: son marca, y la marca no se decide en este repositorio.

## Tipografía

Todo el texto va en la pila del sistema, igual que nevent.ai, cuyos titulares
resuelven a `system-ui` en 700 con `letter-spacing: -0.03em`.

**Manuka se retiró el 2026-08-28.** Vivía solo en la hoja legacy de Webflow de
la web, siempre en mayúsculas y en secciones concretas; el centro de ayuda la
usaba en minúsculas para todos los H2, un uso que la marca no hace en ninguna
parte y que rompía la lectura en tamaños pequeños. La regla `no-webfont` existe
para que no vuelva por la puerta de atrás.

## Cómo ejecutarlo

```bash
npm run guard:style                       # solo integridad de marca
npm run guard:style src/styles/custom.css # marca + reglas sobre esos ficheros
npx vitest run scripts/style-guard.test.mjs
```

Las propias reglas están cubiertas por tests. Debilitar el guard para colar una
violación también rompe el CI.

## Si necesitas algo que el sistema no tiene

No lo añadas aquí. El orden es:

1. Se decide y se añade en `nev-landing-nevent`, que es la fuente de verdad.
2. Se copia el valor a `src/styles/nevent-tokens.css`.
3. Si es un token de marca, se añade también a `BRAND_TOKENS` en el guard.

Saltarse el paso 1 es como acabaron los cuatro sistemas de spacing y los cinco
morados que documenta el ADR 0001 de la web.
