import { render } from '../dist-ssr/entry-server.js';

const urls = [
  '/',
  '/expertises',
  '/solutions',
  '/portfolio',
  '/a-propos',
  '/goutte-eau-extrudee',
  '/contact',
  '/merci',
  '/mentions-legales',
  '/politique-confidentialite',
  '/nimportequoi',
];

function firstHeading(html) {
  const match = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  if (!match) return '(aucun h1)';
  return match[1]
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

let failed = 0;

for (const url of urls) {
  try {
    const html = render(url);
    console.log(`OK ${url} ${html.length} ${firstHeading(html)}`);
  } catch (error) {
    failed += 1;
    const message = error instanceof Error ? error.message : String(error);
    console.log(`ERREUR ${url} ${message}`);
  }
}

if (failed > 0) process.exit(1);
