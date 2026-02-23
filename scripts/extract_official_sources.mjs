import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const GEN23_URL = 'https://ais.nav.pt/wp-content/uploads/AIS_Files/eAIP_Current/eAIP_Online/eAIP/html/eAIP/LP-GEN-2.3-en-PT.html';
const ENR12_URL = 'https://ais.nav.pt/wp-content/uploads/AIS_Files/eAIP_Current/eAIP_Online/eAIP/html/eAIP/LP-ENR-1.2-en-PT.html';
const ENR6_URL = 'https://ais.nav.pt/wp-content/uploads/AIS_Files/eAIP_Current/eAIP_Online/eAIP/html/eAIP/LP-ENR-6-en-PT.html';

const SYMBOL_IMG_DIR = path.join(process.cwd(), 'public', 'images', 'official-symbols');

const decodeEntities = (text) => text
  .replace(/&nbsp;|&#160;/g, ' ')
  .replace(/&amp;/g, '&')
  .replace(/&quot;/g, '"')
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/\s+/g, ' ')
  .trim();

const stripTags = (html) => decodeEntities(
  html
    .replace(/<div[\s\S]*?<\/div>/g, ' ')
    .replace(/<br\s*\/?>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\.\.\/graphics\/eAIP\/[^\s]+/g, ' ')
);

const slugify = (value) => value
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
  .slice(0, 80);

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  return await res.text();
}

async function fetchBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed ${url}: ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

function extractSymbols(html, pageUrl) {
  const items = [];
  let section = 'Uncategorized';
  let match;
  const tokenRegex = /<strong[^>]*>([0-9]+\.[\s\S]*?)<\/strong>|<td\b[^>]*>([\s\S]*?)<\/td>/gi;

  while ((match = tokenRegex.exec(html)) !== null) {
    if (match[1]) {
      const raw = stripTags(match[1]).replace(/^\d+\.\s*/, '');
      if (raw) section = raw;
      continue;
    }

    const td = match[2] ?? '';
    const relPath =
      td.match(/href="(\.\.\/\.\.\/graphics\/eAIP\/[^"]+)"/i)?.[1] ||
      td.match(/src="(\.\.\/\.\.\/graphics\/eAIP\/[^"]+)"/i)?.[1];

    if (!relPath) continue;

    const label = stripTags(td)
      .replace(/^GIF\s*/i, '')
      .replace(/^JPEG\s*/i, '')
      .trim();

    if (!label || label.length < 2) continue;

    const sourceUrl = new URL(relPath, pageUrl).href;
    const filename = sourceUrl.split('/').pop();
    if (!filename) continue;

    items.push({
      id: '',
      name: label,
      category: section,
      sourcePage: pageUrl,
      sourceImage: sourceUrl,
      imageFile: filename,
    });
  }

  const dedup = [];
  const seen = new Set();
  for (const item of items) {
    const key = `${item.name}|${item.sourceImage}`;
    if (seen.has(key)) continue;
    seen.add(key);
    dedup.push(item);
  }

  dedup.forEach((item, idx) => {
    item.id = `off-sym-${String(idx + 1).padStart(3, '0')}`;
    item.image = `/images/official-symbols/${item.imageFile}`;
    item.slug = slugify(item.name);
  });

  return dedup;
}

function extractEnr12Sections(html) {
  const sections = [];
  const regex = /<h4[^>]*>\s*<span[^>]*>[\s\S]*?<\/span>\s*([\s\S]*?)<\/h4>/gi;
  let m;
  while ((m = regex.exec(html)) !== null) {
    const title = stripTags(m[1]).replace(/^\d+\.\s*/, '').trim();
    if (title) sections.push(title);
  }
  return Array.from(new Set(sections));
}

function extractEnr6Charts(html, pageUrl) {
  const charts = [];
  const rowRegex = /<tr[^>]*>\s*<td[^>]*>([\s\S]*?)<\/td>[\s\S]*?<a[^>]+href="(\.\.\/\.\.\/graphics\/eAIP\/[^"]+\.pdf)"/gi;
  let m;
  while ((m = rowRegex.exec(html)) !== null) {
    const title = stripTags(m[1]);
    const pdf = new URL(m[2], pageUrl).href;
    if (!title || !pdf) continue;
    charts.push({ title, pdf });
  }
  return charts.slice(0, 12);
}

async function main() {
  await mkdir(SYMBOL_IMG_DIR, { recursive: true });

  const [gen23Html, enr12Html, enr6Html] = await Promise.all([
    fetchText(GEN23_URL),
    fetchText(ENR12_URL),
    fetchText(ENR6_URL),
  ]);

  const symbols = extractSymbols(gen23Html, GEN23_URL);

  for (const symbol of symbols) {
    const buf = await fetchBuffer(symbol.sourceImage);
    await writeFile(path.join(SYMBOL_IMG_DIR, symbol.imageFile), buf);
  }

  const en12Sections = extractEnr12Sections(enr12Html);
  const enr6Charts = extractEnr6Charts(enr6Html, ENR6_URL);

  const sourceLinks = {
    generatedAt: new Date().toISOString(),
    pages: [
      {
        title: 'NAV Portugal eAIP - GEN 2.3 Chart Symbols',
        url: GEN23_URL,
        purpose: 'Primary source of official chart symbol images used on this page',
      },
      {
        title: 'NAV Portugal eAIP - ENR 1.2 Visual Flight Rules',
        url: ENR12_URL,
        purpose: 'Related VFR operational context and terminology',
        extractedHeadings: en12Sections,
      },
      {
        title: 'NAV Portugal eAIP - ENR 6 En-route Charts Index',
        url: ENR6_URL,
        purpose: 'Related official chart index and linked PDF charts',
        sampleCharts: enr6Charts,
      },
    ],
  };

  await writeFile(
    path.join(process.cwd(), 'src', 'data', 'official_symbols.json'),
    `${JSON.stringify(symbols, null, 2)}\n`
  );

  await writeFile(
    path.join(process.cwd(), 'src', 'data', 'official_sources.json'),
    `${JSON.stringify(sourceLinks, null, 2)}\n`
  );

  console.log(`Extracted ${symbols.length} symbols`);
  console.log(`Saved images to ${SYMBOL_IMG_DIR}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
