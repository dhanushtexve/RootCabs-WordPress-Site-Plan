// Additional read-only artifact inspection. Writes reports, never production HTML.
import { chromium } from 'playwright';
import { readFile, writeFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { createHash } from 'node:crypto';
const root = fileURLToPath(new URL('../', import.meta.url));
const dist = resolve(root, 'dist');
const routes = JSON.parse(await readFile(new URL('./audit-routes.json', import.meta.url), 'utf8'));
const browser = await chromium.launch({ executablePath: process.env.PRERENDER_BROWSER_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe' });
const context = await browser.newContext({ javaScriptEnabled: false });
await context.route('**/*', route => route.abort());
const page = await context.newPage();
const rows = [];
const destinations = new Map();
try {
  for (const path of routes) {
    try {
    const html = await readFile(resolve(dist, `.${path}`, 'index.html'), 'utf8');
    await page.setContent(html);
    const data = await page.evaluate(() => {
      const normalize = value => Array.isArray(value) ? value.map(normalize) : value && typeof value === 'object' ? Object.fromEntries(Object.keys(value).sort().map(key => [key, normalize(value[key])])) : value;
      const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')].map(el => JSON.parse(el.textContent));
      const unique = new Set(schemas.map(value => JSON.stringify(normalize(value))));
      const body = document.querySelector('main') ?? document.querySelector('#root');
      const copy = body.cloneNode(true);
      copy.querySelectorAll('script,style,nav,footer').forEach(el => el.remove());
      return {
        h1: [...document.querySelectorAll('h1')].map(el => el.textContent.replace(/\s+/g, ' ').trim()),
        title: [...document.querySelectorAll('title')].map(el => el.textContent),
        description: [...document.querySelectorAll('meta[name="description"]')].map(el => el.content),
        canonical: [...document.querySelectorAll('link[rel="canonical"]')].map(el => el.getAttribute('href')),
        schemas, duplicateSchemaBlocks: schemas.length - unique.size,
        contentCharacters: copy.textContent.replace(/\s+/g, ' ').trim().length,
        links: [...new Set([...document.querySelectorAll('a[href]')].map(el => el.getAttribute('href')))],
        ids: [...document.querySelectorAll('[id]')].map(el => el.id),
      };
    });
    const unresolvedLinks = [];
    const internalLinks = [];
    for (const href of data.links) {
      const url = new URL(href, `https://rootcabs.com${path}`);
      if (url.origin !== 'https://rootcabs.com') continue;
      internalLinks.push(url.href);
      const target = url.pathname.replace(/\/+$/, '') || '/';
      let status = 'generated HTML exists';
      try { await access(resolve(dist, `.${target}`, 'index.html')); }
      catch {
        try { await access(resolve(dist, `.${target}`)); status = 'static file exists'; }
        catch { status = 'not in build; requires route/live verification'; unresolvedLinks.push(url.href); }
      }
      if (!destinations.has(url.href)) destinations.set(url.href, { url: url.href, status, sources: [] });
      destinations.get(url.href).sources.push(path);
      if (target === path && url.hash && url.hash !== '#' && !data.ids.includes(decodeURIComponent(url.hash.slice(1)))) unresolvedLinks.push(`${url.href} (missing fragment target)`);
    }
    const badPageSchemaUrls = data.schemas.filter(schema => ['WebPage', 'CollectionPage', 'BlogPosting', 'Article'].some(type => [].concat(schema['@type']).includes(type)) && schema.url && schema.url.replace(/\/$/, '') !== `https://rootcabs.com${path}`.replace(/\/$/, '')).map(schema => schema.url);
    rows.push({ url: `https://rootcabs.com${path}`, artifactSha256: createHash('sha256').update(html).digest('hex'), ...data, internalLinks, unresolvedLinks, badPageSchemaUrls });
    } catch (error) {
      rows.push({ url: `https://rootcabs.com${path}`, artifactError: error.message, h1: [], title: [], description: [], canonical: [], schemas: [], duplicateSchemaBlocks: 0, contentCharacters: 0, internalLinks: [], unresolvedLinks: [], badPageSchemaUrls: [] });
    }
  }
  const liveChecks = [];
  if (process.argv.includes('--live')) {
    const run = promisify(execFile);
    for (const target of [...destinations.values()].filter(item => item.status.startsWith('not'))) {
      const { stdout } = await run('curl.exe', ['-sS', '-L', '--max-time', '20', '-o', 'NUL', '-w', '%{http_code}', target.url]);
      liveChecks.push({ url: target.url, status: Number(stdout), check: 'GET following redirects' });
      if (Number(stdout) === 200) {
        target.status = 'Separate live application: HTTP 200; preserve existing server files';
        rows.forEach(row => { row.unresolvedLinks = row.unresolvedLinks.filter(url => url !== target.url); });
      }
    }
    for (const url of [...routes.filter(path => path !== '/').map(path => `https://rootcabs.com${path}/`), 'http://rootcabs.com/', 'https://www.rootcabs.com/']) {
      const { stdout } = await run('curl.exe', ['-sS', '-I', '--max-time', '20', url]);
      liveChecks.push({ url, status: Number(stdout.match(/HTTP\/\S+\s+(\d+)/)?.[1]), location: stdout.match(/^location:\s*(.+)/im)?.[1].trim(), check: 'HEAD without following redirects' });
    }
  }
  let browserReport = [];
  try { browserReport = JSON.parse(await readFile(resolve(dist, 'seo-verification.json'), 'utf8')); } catch { /* Missing evidence is recorded as a failure. */ }
  for (const row of rows) {
    row.expectedCanonical = row.url;
    row.routeStatus = row.artifactError ? 'Build artifact failed' : 'Generated HTML inspected (not a live HTTP status)';
    row.failures = row.artifactError ? [row.artifactError] : [];
    for (const key of ['h1', 'title', 'description', 'canonical']) {
      if (row[key].length !== 1 || !row[key][0]?.trim()) row.failures.push(`${key}: expected exactly one nonempty value`);
    }
    if (row.canonical[0] !== row.expectedCanonical) row.failures.push('Incorrect canonical');
    if (!row.contentCharacters || !row.internalLinks.length) row.failures.push('Missing main content or internal links');
    if (!row.schemas.length || row.duplicateSchemaBlocks || row.badPageSchemaUrls.length) row.failures.push('Missing, duplicated or incorrect structured data');
    if (row.unresolvedLinks.length) row.failures.push('Unresolved internal destinations');
    const browserRow = browserReport.find(item => item.url === row.url);
    row.browserStatus = browserRow && browserRow.artifactSha256 === row.artifactSha256 && !browserRow.failures.length ? 'PASS' : 'FAIL or missing/stale browser evidence';
    if (row.browserStatus !== 'PASS') row.failures.push(row.browserStatus);
    for (const key of ['h1', 'title', 'description', 'canonical']) {
      if (browserRow && JSON.stringify(row[key]) !== JSON.stringify(browserRow.reloaded[key])) row.failures.push(`${key} differs from React result`);
    }
    row.videoStatus = row.url === 'https://rootcabs.com/' ? (row.browserStatus === 'PASS' && browserRow.after.videos.length === 1 ? 'PASS: markup and playback' : 'FAIL') : 'Not applicable';
    row.result = row.failures.length ? 'FAIL' : 'PASS';
    row.fix = row.failures.length ? 'Resolve reported failures and rerun verification' : 'Verified existing route-specific prerendered content';
  }
  await writeFile(resolve(dist, 'seo-final-audit.json'), JSON.stringify({ verifiedAt: new Date().toISOString(), evidence: ['generated build artifact', 'automated browser testing matched by SHA256', ...(liveChecks.length ? ['live HTTP: existing redirects and separate application only'] : [])], externalCrawlerVerification: 'Not performed', pages: rows, destinations: [...destinations.values()], liveChecks }, null, 2));
  const quote = value => `"${String(value).replaceAll('"', '""')}"`;
  const csv = [['Input URL','Expected canonical','Route verification','H1','Title','Description','Actual canonical','Main content characters','Crawlable internal links','Valid JSON-LD blocks','Duplicate JSON-LD blocks','Incorrect schema URLs','Unresolved links','Video','React browser status','Result','Exact failures','Fix'], ...rows.map(row => [row.url, row.expectedCanonical, row.routeStatus, row.h1.join(' | '), row.title.join(' | '), row.description.join(' | '), row.canonical.join(' | '), row.contentCharacters, row.internalLinks.length, row.schemas.length, row.duplicateSchemaBlocks, row.badPageSchemaUrls.join(' | '), row.unresolvedLinks.join(' | '), row.videoStatus, row.browserStatus, row.result, row.failures.join('; '), row.fix])].map(row => row.map(quote).join(',')).join('\n');
  await writeFile(resolve(dist, 'seo-final-audit.csv'), csv);
  const redirectFailures = liveChecks.filter(check => check.check.startsWith('HEAD') && (check.status !== 301 || check.location !== (new URL(check.url).pathname === '/' ? 'https://rootcabs.com/' : check.url.replace(/\/$/, ''))));
  if (redirectFailures.length) console.error('Redirect verification failures:', JSON.stringify(redirectFailures));
  if (rows.some(row => row.failures.length) || redirectFailures.length) process.exitCode = 1;
  console.log(JSON.stringify({ pages: rows.length, duplicateSchemas: rows.filter(row => row.duplicateSchemaBlocks).map(row => row.url), badSchemaUrls: rows.filter(row => row.badPageSchemaUrls.length).map(row => ({url:row.url, schema:row.badPageSchemaUrls})), destinations: destinations.size, unresolved: [...destinations.values()].filter(row => row.status.startsWith('not')), missingFragments: rows.flatMap(row => row.unresolvedLinks.filter(link => link.includes('missing fragment')).map(link => ({source: row.url, link}))) }, null, 2));
} finally { await browser.close(); }
