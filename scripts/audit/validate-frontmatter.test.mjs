import { describe, it, expect } from 'vitest';
import { checkFaqKeys, checkOrthography } from './validate-frontmatter.mjs';

describe('checkFaqKeys', () => {
  it('no marca violaciones cuando las faqs usan q/a', () => {
    const raw = `---\ntitle: X\nfaqs:\n  - q: "¿Uno?"\n    a: "Sí."\n---\nCuerpo`;
    expect(checkFaqKeys(raw)).toEqual([]);
  });

  it('marca claves erróneas (question/answer)', () => {
    const raw = `---\ntitle: X\nfaqs:\n  - question: "¿Uno?"\n    answer: "Sí."\n---\nCuerpo`;
    const v = checkFaqKeys(raw);
    expect(v).toHaveLength(1);
    expect(v[0].badKeys.sort()).toEqual(['answer', 'question']);
    expect(v[0].missing.sort()).toEqual(['a', 'q']);
  });

  it('marca claves erróneas (pregunta/respuesta)', () => {
    const raw = `---\ntitle: X\nfaqs:\n  - pregunta: "¿Uno?"\n    respuesta: "Sí."\n---\nCuerpo`;
    expect(checkFaqKeys(raw)).toHaveLength(1);
  });

  it('no marca nada si no hay faqs', () => {
    expect(checkFaqKeys(`---\ntitle: X\n---\nCuerpo`)).toEqual([]);
  });
});

describe('checkOrthography', () => {
  it('marca palabras acabadas en -cion/-sion sin tilde', () => {
    const flags = checkOrthography('Abre la configuracion y revisa la seccion.');
    expect(flags.map((f) => f.word).sort()).toEqual(['configuracion', 'seccion']);
    expect(flags.find((f) => f.word === 'configuracion').suggestion).toBe('configuración');
  });

  it('marca palabras de la lista curada (tambien, categoria)', () => {
    const flags = checkOrthography('Esto tambien afecta a la categoria elegida.');
    expect(flags.map((f) => f.word).sort()).toEqual(['categoria', 'tambien']);
  });

  it('no marca prosa correcta con tildes', () => {
    expect(checkOrthography('Abre la configuración y revisa la sección; también la categoría.')).toEqual([]);
  });

  it('no marca slugs dentro de destinos de enlaces markdown', () => {
    expect(checkOrthography('Consulta la [Atribución por canal](/analitica/casos/atribucion-por-canal).')).toEqual([]);
  });

  it('no marca palabras dentro de URLs', () => {
    expect(checkOrthography('Mira "item": "https://docs.nevent.com/segmentacion/motor".')).toEqual([]);
  });

  it('no marca rutas en atributos entrecomillados (href/url multilínea)', () => {
    expect(checkOrthography('    href="/analitica/faq/"')).toEqual([]);
  });

  it('no marca identificadores dentro de bloques de código con vallas', () => {
    const raw = 'Texto.\n```json\n{ "Conversion": 12, "segmentacion": true }\n```\nMás texto.';
    expect(checkOrthography(raw)).toEqual([]);
  });
});
