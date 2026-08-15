import matter from 'gray-matter';

export const QUADRANTS = ['tutorial', 'how-to', 'reference', 'explanation'];

// relPath relativo a content/docs -> área o null (raíz / i18n)
export function areaFromPath(relPath) {
  const parts = relPath.split(/[\\/]/);
  if (parts.length < 2) return null;   // fichero de raíz
  if (parts[0] === 'en') return null;  // locale i18n
  return parts[0];
}

// raw (contenido del fichero) + relPath -> record
export function toRecord(raw, relPath) {
  const { data } = matter(raw);
  return {
    slug: relPath.replace(/\.(mdx?|md)$/, ''),
    area: areaFromPath(relPath),
    diataxis: typeof data.diataxis === 'string' ? data.diataxis : null,
    title: data.title ?? null,
  };
}

// records -> los de contenido (área != null) con cuadrante ausente/ inválido
export function findUnclassified(records) {
  return records.filter(
    (r) => r.area !== null && !QUADRANTS.includes(r.diataxis)
  );
}
