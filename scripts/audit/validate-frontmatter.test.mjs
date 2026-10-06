import { describe, it, expect } from 'vitest';
import {
  checkFaqKeys,
  checkOrthography,
  checkTaxonomy,
  isExemptFromTaxonomy,
  matchesTitlePattern,
  checkTitlePattern,
  checkBodyHeuristics,
} from './validate-frontmatter.mjs';

function fm(fields) {
  const lines = Object.entries(fields).map(([k, v]) => `${k}: ${JSON.stringify(v)}`);
  return `---\n${lines.join('\n')}\n---\n`;
}

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

describe('isExemptFromTaxonomy', () => {
  it('exime index.mdx, 404.mdx y el locale en/', () => {
    expect(isExemptFromTaxonomy('index.mdx')).toBe(true);
    expect(isExemptFromTaxonomy('404.mdx')).toBe(true);
    expect(isExemptFromTaxonomy('en/campaigns/reference.mdx')).toBe(true);
  });

  it('no exime el resto de docs ES', () => {
    expect(isExemptFromTaxonomy('audiencia/importar-fans.mdx')).toBe(false);
  });
});

describe('checkTaxonomy', () => {
  it('no marca nada cuando diataxis/modulo/nivel son válidos', () => {
    const raw = fm({ title: 'X', diataxis: 'how-to', modulo: 'marketing', nivel: 'basic' });
    expect(checkTaxonomy('campanas/x.mdx', raw)).toEqual([]);
  });

  it('marca diataxis mixed como error', () => {
    const raw = fm({ title: 'X', diataxis: 'mixed', modulo: 'marketing', nivel: 'basic' });
    const v = checkTaxonomy('campanas/x.mdx', raw);
    expect(v.some((x) => x.code === 'diataxis-mixed')).toBe(true);
  });

  it('marca diataxis ausente como error', () => {
    const raw = fm({ title: 'X', modulo: 'marketing', nivel: 'basic' });
    const v = checkTaxonomy('campanas/x.mdx', raw);
    expect(v.some((x) => x.code === 'diataxis-missing')).toBe(true);
  });

  it('marca modulo ausente o inválido como error', () => {
    const raw = fm({ title: 'X', diataxis: 'how-to' });
    const v = checkTaxonomy('campanas/x.mdx', raw);
    expect(v.some((x) => x.code === 'modulo-missing')).toBe(true);
  });

  it('exige nivel cuando modulo no es plataforma', () => {
    const raw = fm({ title: 'X', diataxis: 'how-to', modulo: 'marketing' });
    const v = checkTaxonomy('campanas/x.mdx', raw);
    expect(v.some((x) => x.code === 'nivel-missing')).toBe(true);
  });

  it('no exige nivel cuando modulo es plataforma', () => {
    const raw = fm({ title: 'X', diataxis: 'how-to', modulo: 'plataforma' });
    expect(checkTaxonomy('organizacion/x.mdx', raw)).toEqual([]);
  });

  it('no marca nada en index.mdx, 404.mdx ni en en/', () => {
    const raw = fm({ title: 'X' });
    expect(checkTaxonomy('index.mdx', raw)).toEqual([]);
    expect(checkTaxonomy('404.mdx', raw)).toEqual([]);
    expect(checkTaxonomy('en/campaigns/x.mdx', raw)).toEqual([]);
  });
});

describe('matchesTitlePattern', () => {
  it('acepta un título tutorial que arranca por un prefijo curado', () => {
    expect(matchesTitlePattern('tutorial', 'Tu primer segmento')).toBe(true);
  });

  it('rechaza un título tutorial que no arranca por ningún prefijo curado', () => {
    expect(matchesTitlePattern('tutorial', 'Cómo crear tu primera campaña')).toBe(false);
  });

  it('acepta un how-to que arranca por Cómo', () => {
    expect(matchesTitlePattern('how-to', 'Cómo crear tu primera campaña')).toBe(true);
  });

  it('ignora el ¿ de apertura y las comillas al comparar', () => {
    expect(matchesTitlePattern('reference', '"Preguntas frecuentes sobre X"')).toBe(true);
  });

  it('acepta una reference que arranca por Qué incluye', () => {
    expect(matchesTitlePattern('reference', 'Qué incluye cada módulo y nivel')).toBe(true);
  });

  it('acepta una reference que arranca por Soporte según', () => {
    expect(matchesTitlePattern('reference', 'Soporte según tu plan')).toBe(true);
  });

  it('devuelve true si el cuadrante no tiene lista curada', () => {
    expect(matchesTitlePattern('no-existe', 'Cualquier cosa')).toBe(true);
  });
});

describe('checkTitlePattern', () => {
  it('no marca nada cuando el título encaja con el patrón', () => {
    const raw = fm({ title: 'Cómo crear un segmento', diataxis: 'how-to' });
    expect(checkTitlePattern('campanas/x.mdx', raw)).toEqual([]);
  });

  it('marca WARN por defecto cuando el título no encaja', () => {
    const raw = fm({ title: 'Segmentos avanzados', diataxis: 'tutorial' });
    const v = checkTitlePattern('campanas/x.mdx', raw);
    expect(v).toHaveLength(1);
    expect(v[0].level).toBe('warn');
  });

  it('marca ERROR en vez de WARN con strict:true', () => {
    const raw = fm({ title: 'Segmentos avanzados', diataxis: 'tutorial' });
    const v = checkTitlePattern('campanas/x.mdx', raw, { strict: true });
    expect(v[0].level).toBe('error');
  });

  it('no marca nada si el doc está exento (index.mdx)', () => {
    const raw = fm({ title: 'Cualquier cosa', diataxis: 'tutorial' });
    expect(checkTitlePattern('index.mdx', raw)).toEqual([]);
  });

  it('acepta un título "voz del cliente" bajo solucion-de-problemas/ aunque no encaje en los prefijos genéricos', () => {
    const raw = fm({ title: 'Por qué no me llegan mis mensajes', diataxis: 'how-to' });
    expect(checkTitlePattern('solucion-de-problemas/no-llegan-mensajes.mdx', raw)).toEqual([]);
  });

  it('marca WARN un título tipo "La Superapp: algo" con how-to fuera de solucion-de-problemas/', () => {
    const raw = fm({ title: 'La Superapp: algo', diataxis: 'how-to' });
    const v = checkTitlePattern('superapp/algo.mdx', raw);
    expect(v).toHaveLength(1);
    expect(v[0].level).toBe('warn');
  });
});

describe('checkBodyHeuristics', () => {
  it('marca WARN si un how-to tiene menos de 3 pasos numerados', () => {
    const raw = fm({ title: 'Cómo X', diataxis: 'how-to' }) + '## Paso 1: A\n## Paso 2: B\n';
    const v = checkBodyHeuristics('campanas/x.mdx', raw);
    expect(v.some((x) => x.code === 'body-steps')).toBe(true);
  });

  it('no marca nada si un how-to tiene 3 o más pasos numerados (encabezados)', () => {
    const raw = fm({ title: 'Cómo X', diataxis: 'how-to' }) + '## Paso 1: A\n## Paso 2: B\n## Paso 3: C\n';
    expect(checkBodyHeuristics('campanas/x.mdx', raw)).toEqual([]);
  });

  it('cuenta también listas ordenadas de Markdown como pasos', () => {
    const raw = fm({ title: 'Cómo X', diataxis: 'how-to' }) + '1. A\n2. B\n3. C\n';
    expect(checkBodyHeuristics('campanas/x.mdx', raw)).toEqual([]);
  });

  it('marca WARN si una explanation lleva pasos numerados', () => {
    const raw = fm({ title: 'Qué es X', diataxis: 'explanation' }) + '## Paso 1: A\n## Paso 2: B\n';
    const v = checkBodyHeuristics('campanas/x.mdx', raw);
    expect(v.some((x) => x.code === 'body-explanation-steps')).toBe(true);
  });

  it('marca WARN si una reference no tiene ninguna tabla', () => {
    const raw = fm({ title: 'Referencia de X', diataxis: 'reference' }) + 'Solo prosa, sin tablas.\n';
    const v = checkBodyHeuristics('campanas/x.mdx', raw);
    expect(v.some((x) => x.code === 'body-reference-table')).toBe(true);
  });

  it('no marca nada si una reference tiene una tabla', () => {
    const raw = fm({ title: 'Referencia de X', diataxis: 'reference' }) + '| A | B |\n| --- | --- |\n| 1 | 2 |\n';
    expect(checkBodyHeuristics('campanas/x.mdx', raw)).toEqual([]);
  });
});
