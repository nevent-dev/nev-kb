import { describe, it, expect } from 'vitest';
import { extractHowToSteps, stripComments } from './howto-steps.mjs';

describe('stripComments', () => {
  it('elimina un comentario JSX de una sola línea', () => {
    expect(stripComments('antes {/* nota interna */} después')).toBe('antes  después');
  });

  it('elimina un comentario JSX multilínea', () => {
    const body = 'antes\n{/* nota\ninterna\npendiente */}\ndespués';
    expect(stripComments(body)).toBe('antes\n\ndespués');
  });

  it('elimina un comentario HTML', () => {
    expect(stripComments('antes <!-- nota interna --> después')).toBe('antes  después');
  });

  it('elimina varios comentarios mezclados', () => {
    const body = '{/* uno */}\ntexto\n<!-- dos -->\nmás texto';
    expect(stripComments(body)).toBe('\ntexto\n\nmás texto');
  });

  it('no toca el texto cuando no hay comentarios', () => {
    expect(stripComments('texto normal sin comentarios')).toBe('texto normal sin comentarios');
  });
});

describe('extractHowToSteps', () => {
  it('extrae pasos numerados en español', () => {
    const body = '## Paso 1: Abre la vista\nTexto del primer paso.\n\n## Paso 2: Confirma\nTexto del segundo paso.\n';
    const steps = extractHowToSteps(body);
    expect(steps).toEqual([
      { name: 'Abre la vista', text: 'Texto del primer paso.' },
      { name: 'Confirma', text: 'Texto del segundo paso.' },
    ]);
  });

  it('extrae pasos numerados en inglés', () => {
    const body = '## Step 1: Open the view\nSome text.\n\n## Step 2: Confirm\nMore text.\n';
    const steps = extractHowToSteps(body);
    expect(steps).toEqual([
      { name: 'Open the view', text: 'Some text.' },
      { name: 'Confirm', text: 'More text.' },
    ]);
  });

  it('no filtra el contenido de un comentario JSX de notas de trabajo al texto del paso', () => {
    const body = [
      '## Paso 1: Crea la marca',
      'Texto visible del paso.',
      '',
      '{/* VÍDEO: crear una marca, pendiente de grabar */}',
      '',
      '## Paso 2: Confirma',
      'Otro texto visible.',
    ].join('\n');
    const steps = extractHowToSteps(body);
    expect(steps).toHaveLength(2);
    for (const step of steps) {
      expect(step.text).not.toMatch(/VÍDEO/i);
      expect(step.text).not.toMatch(/pendiente/i);
    }
  });

  it('no filtra el contenido de un comentario HTML al texto del paso', () => {
    const body = [
      '## Paso 1: Crea la marca',
      'Texto visible del paso.',
      '<!-- nota interna: revisar antes de publicar -->',
      '',
      '## Paso 2: Confirma',
      'Otro texto visible.',
    ].join('\n');
    const steps = extractHowToSteps(body);
    expect(steps[0].text).toBe('Texto visible del paso.');
    expect(steps[0].text).not.toMatch(/nota interna/i);
  });

  it('ignora encabezados que no siguen el patrón Paso/Step N', () => {
    const body = '## Introducción\nTexto que no es un paso.\n\n## Paso 1: Real\nTexto real.\n';
    const steps = extractHowToSteps(body);
    expect(steps).toEqual([{ name: 'Real', text: 'Texto real.' }]);
  });

  it('limpia markdown (imágenes, enlaces, énfasis, código) del texto extraído', () => {
    const body = [
      '## Paso 1: Formatea',
      '![alt](img.png) Un [enlace](https://x.com) con **negrita**, *cursiva* y `código`.',
    ].join('\n');
    const steps = extractHowToSteps(body);
    expect(steps[0].text).toBe('Un enlace con negrita, cursiva y código.');
  });

  it('devuelve un array vacío si no hay pasos', () => {
    expect(extractHowToSteps('Solo texto sin encabezados de paso.')).toEqual([]);
  });
});
