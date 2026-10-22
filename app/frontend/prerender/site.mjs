// Finalize Vite's route HTML using the actual application and its SEO effects.
// No production/API access: only local build assets may load in a fresh context.
import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, writeFile, access } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import prettier from 'prettier';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = resolve(root, 'dist');
const routes = JSON.parse(await readFile(new URL('./audit-routes.json', import.meta.url), 'utf8'));
const verifyOnly = process.argv.includes('--verify');
const fileFor = (route) => resolve(dist, `.${route}`, 'index.html');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.webm': 'video/webm', '.mp4': 'video/mp4', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.avif': 'image/avif', '.woff2': 'font/woff2' };
const server = createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let filename = resolve(dist, `.${pathname}`);
    if (filename !== dist && !filename.startsWith(dist + sep)) throw Error('Invalid path');
    if (!extname(filename)) filename = resolve(filename, 'index.html');
    const body = await readFile(filename);
    res.writeHead(200, { 'Content-Type': types[extname(filename)] ?? 'application/octet-stream' });
    res.end(body);
  } catch { res.writeHead(404); res.end(); }
});
await new Promise((done) => server.listen(0, '127.0.0.1', done));
const origin = `http://127.0.0.1:${server.address().port}`;

async function launch() {
  if (process.env.PRERENDER_BROWSER_PATH) return chromium.launch({ executablePath: process.env.PRERENDER_BROWSER_PATH });
  for (const path of ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe']) {
    try { await access(path); return await chromium.launch({ executablePath: path }); } catch { /* Try installed Playwright browser next. */ }
  }
  return chromium.launch();
}

// Executed in a DOM parser, with scripts disabled for raw HTML inspection.
function inspect() {
  const text = (el) => el?.textContent?.replace(/\s+/g, ' ').trim() ?? '';
  const schemas = [...document.querySelectorAll('script[type="application/ld+json"]')];
  const parsed = schemas.map((el) => { try { return JSON.parse(el.textContent); } catch { return null; } });
  return {
    title: [...document.querySelectorAll('title')].map(text),
    description: [...document.querySelectorAll('meta[name="description"]')].map(el => el.content),
    canonical: [...document.querySelectorAll('link[rel="canonical"]')].map(el => el.getAttribute('href')),
    h1: [...document.querySelectorAll('h1')].map(text),
    contentCharacters: text(document.querySelector('main') ?? document.querySelector('#root')).length,
    internalLinks: [...document.querySelectorAll('a[href]')].filter(el => /^(\/|https:\/\/rootcabs\.com\/)/.test(el.getAttribute('href'))).length,
    videos: [...document.querySelectorAll('video')].map(el => el.getAttribute('src') ?? el.querySelector('source')?.getAttribute('src')),
    schemaCount: schemas.length,
    validSchemas: parsed.every(Boolean),
    schemaTypes: parsed.map(item => item?.['@type']),
  };
}

let browser;
const report = [];
try {
  browser = await launch();
  const rawContext = await browser.newContext({ javaScriptEnabled: false });
  await rawContext.route('**/*', async request => {
    const url = new URL(request.request().url());
    if (url.origin !== origin || url.pathname.startsWith('/api/')) return request.abort();
    if (!verifyOnly && ['image', 'media', 'font'].includes(request.request().resourceType())) return request.abort();
    return request.continue();
  });
  const raw = await rawContext.newPage();
  for (const route of routes) {
    await raw.goto(origin + route);
    const before = await raw.evaluate(inspect);
    const context = await browser.newContext();
    await context.route('**/*', async request => {
      const url = new URL(request.request().url());
      if (url.origin !== origin || url.pathname.startsWith('/api/')) return request.abort();
      if (!verifyOnly && ['image', 'media', 'font'].includes(request.request().resourceType())) return request.abort();
      return request.continue();
    });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(origin + route, { waitUntil: 'networkidle' });
    await page.waitForSelector('h1');
    const rendered = await page.evaluate(inspect);
    if (!verifyOnly) {
      await page.evaluate(() => {
        const all = [...document.querySelectorAll('script[type="application/ld+json"]')];
        // Page effects append their authoritative schema alongside the build's
        // older static schema. Keep the runtime version, not both definitions.
        if (all.some(el => document.head.contains(el) && !el.hasAttribute('data-static-schema'))) {
          all.filter(el => el.hasAttribute('data-static-schema')).forEach(el => el.remove());
        }
        if (!document.querySelector('script[type="application/ld+json"]')) {
          const schema = document.createElement('script');
          schema.type = 'application/ld+json';
          schema.textContent = JSON.stringify({
            '@context': 'https://schema.org', '@type': 'WebPage',
            url: document.querySelector('link[rel="canonical"]').href,
            name: document.title,
            description: document.querySelector('meta[name="description"]').content,
          }).replace(/</g, '\\u003c');
          document.head.appendChild(schema);
        }
        document.querySelectorAll('script[type="application/ld+json"]').forEach(el => el.setAttribute('data-build-schema', location.pathname));
        const marker = document.createElement('meta');
        marker.name = 'prerender-content'; marker.content = 'true';
        document.head.appendChild(marker);
      });
      const renderedHtml = await page.content();
      // Keep the published document readable in view-source while preserving
      // the same prerendered DOM and SEO content.
      await writeFile(fileFor(route), await prettier.format(renderedHtml, {
        parser: 'html',
        printWidth: 120,
        tabWidth: 2,
      }));
    }
    await raw.goto(origin + route);
    const after = await raw.evaluate(inspect);
    const failures = [];
    for (const key of ['title', 'description', 'canonical', 'h1']) {
      if (after[key].length !== 1 || !after[key][0]) failures.push(`${key}: expected exactly one nonempty value`);
    }
    if (after.canonical[0] !== `https://rootcabs.com${route === '/' ? '/' : route}`) failures.push('canonical differs from requested URL');
    if (after.contentCharacters < 150) failures.push('main content missing');
    if (!after.internalLinks) failures.push('internal links missing');
    if (!after.schemaCount || !after.validSchemas) failures.push('structured data missing/invalid');
    if (JSON.stringify(after.h1) !== JSON.stringify(rendered.h1)) failures.push('initial and rendered headings differ');
    if (JSON.stringify(after.videos) !== JSON.stringify(rendered.videos)) failures.push('initial and rendered video markup differs');
    if (errors.length) failures.push(...errors);
    for (const video of after.videos) {
      try { await access(resolve(dist, `.${new URL(video, origin).pathname}`)); }
      catch { failures.push(`video asset missing: ${video}`); }
    }
    // Reload the final artifact: catches duplicate content/schema on React mount.
    await page.reload({ waitUntil: 'networkidle' });
    const reloaded = await page.evaluate(inspect);
    if (reloaded.h1.length !== 1) failures.push('duplicate/missing H1 after React mounts');
    if (reloaded.schemaCount !== after.schemaCount) failures.push('schema count changes after React mounts');
    if (verifyOnly) {
      for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
        await page.setViewportSize(viewport);
        await raw.setViewportSize(viewport);
        const initialBox = await raw.locator('h1').boundingBox();
        const mountedBox = await page.locator('h1').boundingBox();
        if (!initialBox || !mountedBox || Math.abs(initialBox.width - mountedBox.width) > 2 || Math.abs(initialBox.height - mountedBox.height) > 2) failures.push(`H1 layout changed after mount at ${viewport.width}px`);
      }
      if (route === '/') {
        await page.waitForFunction(() => document.querySelector('video')?.readyState >= 2);
        if (!await page.locator('video').evaluate(video => video.muted && video.loop && video.playsInline && !video.paused)) failures.push('hero video did not retain autoplay/mute/loop/inline playback');
        await page.getByRole('button', { name: 'See More', exact: true }).click();
        await page.getByRole('button', { name: 'Show Less', exact: true }).waitFor();
        await page.getByRole('button', { name: 'Show Less', exact: true }).click();
        await page.getByRole('button', { name: 'Toggle menu', exact: true }).click();
        await page.getByRole('button', { name: 'Toggle menu', exact: true }).click();
        await page.getByRole('link', { name: 'Book a Ride', exact: true }).first().click();
        await page.waitForURL('**/book-ride');
        await page.getByRole('heading', { name: 'Book Your Ride', exact: true }).waitFor();
        await page.getByPlaceholder('Enter your name').fill('SEO regression test');
        await page.getByPlaceholder('Enter 10-digit number').fill('9000000000');
        if (!(await page.getByRole('button', { name: 'Send OTP', exact: true }).isEnabled())) failures.push('booking form did not react to input');
        await page.goBack({ waitUntil: 'networkidle' });
        if (await page.locator('h1').count() !== 1) failures.push('back navigation duplicated H1');
      }
    }
    const component = route === '/' ? 'Index' : route.startsWith('/routes/') ? 'RoutePage' : route.startsWith('/taxi-in-') ? (route.includes('kumbakonam') ? 'KumbakonamPage' : 'CityPage') : route.startsWith('/services/') ? 'ServicePage' : route === '/services' ? 'ServicesHub' : route.startsWith('/blog/') ? 'BlogRoutes' : ({ '/blog': 'BlogLandingPage', '/about': 'AboutPage', '/cities': 'CitiesHub', '/drivers': 'DriversPage', '/business': 'BusinessPage', '/book-ride': 'BookRide', '/support': 'SupportPage', '/privacy-policy': 'PrivacyPolicyPage', '/terms-of-use': 'TermsOfUsePage', '/wallet-policy': 'WalletPolicyPage' })[route];
    const classify = (value, expected) => !value.length ? 'missing' : value.length > 1 ? 'duplicated' : value[0] !== expected[0] ? 'incorrect' : 'present';
    const status = (data) => ({
      title: classify(data.title, rendered.title), description: classify(data.description, rendered.description),
      canonical: classify(data.canonical, after.canonical),
      jsonLd: !data.schemaCount ? 'missing' : !data.validSchemas ? 'incorrect' : 'present',
      h1: classify(data.h1, rendered.h1), content: data.contentCharacters >= 150 ? 'present' : 'missing',
      internalLinks: data.internalLinks ? 'present' : 'missing',
      heroVideo: !rendered.videos.length ? 'not applicable' : data.videos.length === rendered.videos.length ? 'present' : 'missing',
    });
    for (const key of ['title', 'description', 'canonical', 'contentCharacters', 'internalLinks']) {
      if (JSON.stringify(after[key]) !== JSON.stringify(reloaded[key])) failures.push(`${key} changed after React mount`);
    }
    const artifactSha256 = createHash('sha256').update(await readFile(fileFor(route))).digest('hex');
    report.push({ url: `https://rootcabs.com${route}`, artifactSha256, verifiedAt: new Date().toISOString(), evidence: 'local HTTP with JavaScript disabled and automated browser reload', result: failures.length ? 'FAIL' : 'PASS', component, cause: before.h1.length ? 'Existing prerendered content; compare metadata with runtime component' : 'Metadata-only HTML shell; body previously required React execution', beforeStatus: status(before), afterStatus: status(after), before, after, reloaded, failures });
    console.log(`${failures.length ? 'FAIL' : 'PASS'} ${route} H1=${after.h1[0]} ${failures.join('; ')}`);
    await context.close();
  }
  await writeFile(resolve(dist, verifyOnly ? 'seo-verification.json' : 'seo-audit.json'), JSON.stringify(report, null, 2));
  const columns = ['title', 'description', 'canonical', 'jsonLd', 'h1', 'content', 'internalLinks', 'heroVideo'];
  const csv = [ ['URL', 'Component', 'Cause', ...columns.map(key => `Before ${key}`), ...columns.map(key => `After ${key}`), 'H1', 'Failures'], ...report.map(row => [row.url, row.component, row.cause, ...columns.map(key => row.beforeStatus[key]), ...columns.map(key => row.afterStatus[key]), row.after.h1[0], row.failures.join('; ')]) ].map(row => row.map(value => `"${String(value ?? '').replaceAll('"', '""')}"`).join(',')).join('\n');
  await writeFile(resolve(dist, verifyOnly ? 'seo-verification.csv' : 'seo-audit.csv'), csv);
  if (report.some(row => row.failures.length)) process.exitCode = 1;
} finally {
  await browser?.close();
  await new Promise(done => server.close(done));
}
