#!/usr/bin/env node
/**
 * Generate sitemap.xml and _redirects for the Harold static build.
 * Harold copies src/statics to build/, so generated deploy files live there.
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = 'src/docs';
const OUTPUT_FILE = 'src/statics/sitemap.xml';
const REDIRECTS_FILE = 'src/statics/_redirects';
const BASE_URL = 'https://www.haroldjs.com';

const STATIC_PAGES = [
  {
    path: '/',
    source: 'src/pages/index.hbs',
    priority: '1.0',
    changefreq: 'weekly',
  },
  {
    path: '/docs.html',
    source: 'src/pages/docs.hbs',
    priority: '0.9',
    changefreq: 'weekly',
  },
];

const REDIRECT_ONLY_PAGES = ['/404.html'];

const LEGACY_REDIRECTS = [
  {
    from: '/docs/configuration.html',
    to: '/docs/configuration-reference.html',
  },
];

function getToday() {
  return new Date().toISOString().split('T')[0];
}

function getFileLastModified(filepath) {
  if (!fs.existsSync(filepath)) {
    return getToday();
  }

  const stats = fs.statSync(filepath);
  return stats.mtime.toISOString().split('T')[0];
}

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function readFrontMatter(filepath) {
  const content = fs.readFileSync(filepath, 'utf-8');
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};

  return match[1].split('\n').reduce((metadata, line) => {
    const field = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!field) return metadata;

    const key = field[1];
    const value = field[2].trim().replace(/^['"]|['"]$/g, '');
    metadata[key] = value;
    return metadata;
  }, {});
}

function findDocs() {
  if (!fs.existsSync(DOCS_DIR)) return [];

  return fs
    .readdirSync(DOCS_DIR)
    .filter((filename) => filename.endsWith('.md'))
    .map((filename) => {
      const filepath = path.join(DOCS_DIR, filename);
      const metadata = readFrontMatter(filepath);
      const docPath = `/docs/${filename.replace(/\.md$/, '.html')}`;

      return {
        path: docPath,
        source: filepath,
        title: metadata.title || filename,
        priority: '0.8',
        changefreq: 'monthly',
        lastmod: metadata.publicationDate || getFileLastModified(filepath),
      };
    })
    .sort(
      (a, b) =>
        b.lastmod.localeCompare(a.lastmod) || a.path.localeCompare(b.path)
    );
}

function addRedirect(lines, seen, redirect, force = false) {
  const status = redirect.status || '301';
  const forceMarker = force ? '!' : '';
  const line = `${redirect.from} ${redirect.to} ${status}${forceMarker}`;

  if (seen.has(redirect.from)) return;

  seen.add(redirect.from);
  lines.push(line);
}

function addLegacyRedirect(lines, seen, redirect) {
  addRedirect(lines, seen, redirect);

  if (!redirect.from.endsWith('.html')) return;

  const extensionlessPath = redirect.from.replace(/\.html$/, '');
  addRedirect(lines, seen, {
    from: extensionlessPath,
    to: redirect.to,
    status: redirect.status,
  });
  addRedirect(lines, seen, {
    from: `${extensionlessPath}/`,
    to: redirect.to,
    status: redirect.status,
  });
}

function addCanonicalHtmlRedirects(lines, seen, pagePath) {
  const extensionlessPath = pagePath.replace(/\.html$/, '');
  const sources = [extensionlessPath, `${extensionlessPath}/`];

  sources.forEach((from) => {
    addRedirect(lines, seen, { from, to: pagePath, status: '301' }, true);
  });
}

function generateSitemap(docs) {
  const staticPages = STATIC_PAGES.map((page) => ({
    ...page,
    lastmod: getFileLastModified(page.source),
  }));

  const urls = [...staticPages, ...docs];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <!-- Static Pages -->
`;

  staticPages.forEach((page) => {
    const loc = page.path === '/' ? BASE_URL : `${BASE_URL}${page.path}`;

    xml += `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>

`;
  });

  xml += `  <!-- Docs -->
`;

  docs.forEach((doc) => {
    xml += `  <url>
    <loc>${escapeXml(`${BASE_URL}${doc.path}`)}</loc>
    <lastmod>${doc.lastmod}</lastmod>
    <changefreq>${doc.changefreq}</changefreq>
    <priority>${doc.priority}</priority>
  </url>

`;
  });

  xml += `</urlset>
`;

  return { xml, totalUrls: urls.length };
}

function generateRedirects(docs) {
  const seen = new Set();
  const lines = [
    '# Redirect rules. Auto-generated - do not edit by hand.',
    '# Keep legacy URL mappings in generate-static.js.',
  ];

  lines.push('');
  lines.push('# Legacy URLs');
  LEGACY_REDIRECTS.forEach((redirect) =>
    addLegacyRedirect(lines, seen, redirect)
  );

  lines.push('');
  lines.push('# Canonical homepage URL');
  addRedirect(
    lines,
    seen,
    { from: '/index.html', to: '/', status: '301' },
    true
  );
  addRedirect(lines, seen, { from: '/index', to: '/', status: '301' }, true);
  addRedirect(lines, seen, { from: '/index/', to: '/', status: '301' }, true);

  lines.push('');
  lines.push('# Canonical URLs: extensionless -> .html');
  STATIC_PAGES.filter((page) => page.path !== '/').forEach((page) =>
    addCanonicalHtmlRedirects(lines, seen, page.path)
  );
  REDIRECT_ONLY_PAGES.forEach((pagePath) =>
    addCanonicalHtmlRedirects(lines, seen, pagePath)
  );
  docs.forEach((doc) => addCanonicalHtmlRedirects(lines, seen, doc.path));

  lines.push('');
  lines.push('# Serve 404 for missing URLs');
  lines.push('/* /404.html 404');

  return `${lines.join('\n')}\n`;
}

function main() {
  console.log('Generating sitemap.xml and _redirects...\n');

  const docs = findDocs();
  const { xml, totalUrls } = generateSitemap(docs);
  const redirects = generateRedirects(docs);

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, xml, 'utf-8');
  fs.writeFileSync(REDIRECTS_FILE, redirects, 'utf-8');

  console.log(`Found ${docs.length} docs pages`);
  console.log(`Sitemap generated: ${OUTPUT_FILE}`);
  console.log(`Redirects generated: ${REDIRECTS_FILE}`);
  console.log(`Total URLs: ${totalUrls}`);
}

main();
