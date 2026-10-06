/**
 * howto-steps.mjs — Extracts HowTo (schema.org) steps from raw MDX body text.
 *
 * Used by `src/components/Head.astro` to build the HowTo JSON-LD block for
 * step-by-step guides. Extracted into its own module (instead of living
 * inline in the .astro file) so it can be unit tested with Vitest, since
 * `.astro` files cannot be imported directly in a Node test environment.
 */

/**
 * Strips JSX-style block comments (`{/* ... *\/}`) and HTML comments
 * (`<!-- ... -->`) from raw MDX source before any further parsing.
 *
 * These comments are used in the docs source for internal editorial notes
 * (e.g. "VÍDEO pendiente de grabar") that must never leak into public
 * output such as JSON-LD structured data. Both comment styles can span
 * multiple lines, so the regexes are non-greedy and use the `s` flag.
 *
 * @param {string} body - Raw MDX body text.
 * @returns {string} The body with all JSX and HTML comments removed.
 */
export function stripComments(body) {
  return body
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/<!--[\s\S]*?-->/g, '');
}

/**
 * @typedef {Object} HowToStepPair
 * @property {string} name - The step title (e.g. "Abre la vista de organización").
 * @property {string} text - The step's plain-text instructions.
 */

/**
 * Extracts step-by-step instructions from the MDX body.
 * Matches H2 headings of the form "## Paso N: Título" (ES) or "## Step N: Title" (EN).
 * Each becomes a HowToStep (name = step title, text = following paragraphs).
 *
 * Before parsing, all JSX (`{/* *\/}`) and HTML (`<!-- -->`) comments are
 * stripped from the source so internal editorial notes never reach the
 * extracted step text (see `stripComments`).
 *
 * Images, links, markdown emphasis and aside markers are also stripped
 * from the resulting text.
 *
 * @param {string} body - Raw MDX body text.
 * @returns {HowToStepPair[]} The extracted steps, in document order.
 */
export function extractHowToSteps(body) {
  const cleanBody = stripComments(body);
  const steps = [];
  const sections = cleanBody.split(/^##\s+/m);
  for (const section of sections.slice(1)) {
    const lines = section.split('\n');
    const heading = lines[0]?.trim() ?? '';
    const match = heading.match(/^(?:Paso|Step)\s+\d+\s*[:.-]?\s*(.+)$/i);
    if (!match) continue;
    const name = match[1].trim();
    const textLines = [];
    for (const line of lines.slice(1)) {
      if (line.startsWith('#')) break;
      textLines.push(line);
    }
    const text = textLines
      .join('\n')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '')      // remove images
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')    // [text](url) → text
      .replace(/\*\*([^*]+)\*\*/g, '$1')          // **bold** → plain
      .replace(/\*([^*]+)\*/g, '$1')              // *italic* → plain
      .replace(/`([^`]+)`/g, '$1')                // `code` → plain
      .replace(/^:::[a-z]+(\[[^\]]*\])?/gim, '')  // strip aside opening markers
      .replace(/:::/g, '')                        // strip aside closing markers
      .replace(/\s+/g, ' ')
      .trim();
    if (name && text) steps.push({ name, text });
  }
  return steps;
}
