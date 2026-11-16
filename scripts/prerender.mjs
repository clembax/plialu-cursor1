import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { render, buildHead, PRERENDER_ROUTES, sitemapEntries } from '../dist-ssr/entry-server.js';

const root = dirname(fileURLToPath(import.meta.url));
const distDir = join(root, '..', 'dist');
const templatePath = join(distDir, 'index.html');
const template = readFileSync(templatePath, 'utf8');

if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
  console.error('dist/index.html ne contient pas les marqueurs <!--app-head--> et <!--app-html-->');
  process.exit(1);
}

let failed = 0;

for (const route of PRERENDER_ROUTES) {
  const fileName = route.path === '/' ? 'index.html' : `${route.path.slice(1)}.html`;
  try {
    const html = render(route.path);
    if (!/<h1\b/i.test(html)) {
      failed += 1;
      console.error(`ERREUR ${route.path} H1 absent`);
      continue;
    }
    const page = template
      .replace(/^[ \t]*<!--app-head-->[ \t]*$/m, buildHead(route.pageKey, route.path))
      .replace('<!--app-html-->', html);
    writeFileSync(join(distDir, fileName), page);
    console.log(`OK ${route.path} → ${fileName} ${html.length}`);
  } catch (error) {
    failed += 1;
    const message = error instanceof Error ? error.message : String(error);
    console.error(`ERREUR ${route.path} ${message}`);
  }
}

const urls = sitemapEntries();
const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map((entry) => `  <url><loc>${entry.loc}</loc><lastmod>${entry.lastmod}</lastmod></url>`),
  '</urlset>',
  '',
].join('\n');
writeFileSync(join(distDir, 'sitemap.xml'), sitemap);
console.log(`OK sitemap.xml ${urls.length} URL`);

if (failed > 0) process.exit(1);
