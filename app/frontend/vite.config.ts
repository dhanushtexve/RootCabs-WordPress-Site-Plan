import { defineConfig, loadEnv, type Plugin, type ResolvedConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'path';
import { viteSourceLocator } from '@metagptx/vite-plugin-source-locator';
import { atoms } from '@metagptx/web-sdk/plugins';
import { vitePrerenderPlugin } from 'vite-prerender-plugin';
import { getBlogRoutes } from './prerender/blog-routes.js';
import { getSitemapLastmod } from './prerender/blog-sitemap.js';
import { cities, landmarks, routes, services } from './src/data/siteData';

function escapeHtmlAttr(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

process.env.VITE_APP_TITLE ??= process.env.OVERVIEW_TITLE ?? 'shadcnui';
process.env.VITE_APP_DESCRIPTION ??= process.env.OVERVIEW_DESCRIPTION ?? 'Atoms Generated Project';
process.env.VITE_APP_TITLE = escapeHtmlAttr(process.env.VITE_APP_TITLE);
process.env.VITE_APP_DESCRIPTION = escapeHtmlAttr(process.env.VITE_APP_DESCRIPTION);
process.env.VITE_APP_LOGO_URL ??= process.env.OVERVIEW_LOGO_URL ?? 'https://public-frontend-cos.metadl.com/mgx/img/favicon_atoms.ico';

function ensureBuildOutDir(): Plugin {
  let outDir = path.resolve(__dirname, 'dist');

  return {
    name: 'ensure-build-out-dir',
    configResolved(config: ResolvedConfig) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    writeBundle() {
      fs.mkdirSync(outDir, { recursive: true });
    },
  };
}

type SitemapRoute = {
  path: string;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  priority: string;
};

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function normalizeSitemapPath(routePath: string): string {
  if (routePath === '/') return '/';
  return `/${routePath.replace(/^\/+|\/+$/g, '')}`;
}

function createRoute(pathname: string, changefreq: SitemapRoute['changefreq'], priority: string): SitemapRoute {
  return {
    path: normalizeSitemapPath(pathname),
    changefreq,
    priority,
  };
}

function generateSitemapPlugin(siteUrl: string, blogRoutes: string[]): Plugin {
  let outDir = path.resolve(__dirname, 'dist');

  return {
    name: 'generate-root-cabs-sitemap',
    configResolved(config: ResolvedConfig) {
      outDir = path.resolve(config.root, config.build.outDir);
    },
    writeBundle() {
      const lastmodMap = getSitemapLastmod() as Record<string, Date | string>;
      const buildLastmod = new Date().toISOString();
      const serviceSlugs = new Set(services.map((service) => service.slug));
      const allRoutes: SitemapRoute[] = [
        createRoute('/', 'daily', '1.0'),
        createRoute('/book-ride', 'daily', '0.9'),
        createRoute('/services', 'weekly', '0.9'),
        createRoute('/cities', 'weekly', '0.9'),
        createRoute('/drivers', 'weekly', '0.8'),
        createRoute('/business', 'weekly', '0.8'),
        createRoute('/blog', 'weekly', '0.8'),
        createRoute('/about', 'monthly', '0.7'),
        createRoute('/support', 'monthly', '0.7'),
        createRoute('/privacy-policy', 'yearly', '0.4'),
        createRoute('/terms-of-use', 'yearly', '0.4'),
        createRoute('/wallet-policy', 'yearly', '0.4'),
        ...services.map((service) => createRoute(`/services/${service.slug}`, 'weekly', '0.8')),
        ...cities.map((city) => createRoute(`/${city.slug}`, 'weekly', city.slug === 'chennai' ? '0.9' : '0.8')),
        ...cities.flatMap((city) =>
          city.services
            .filter((serviceSlug) => serviceSlugs.has(serviceSlug))
            .map((serviceSlug) => createRoute(`/${city.slug}/${serviceSlug}`, 'weekly', '0.7')),
        ),
        ...routes.map((route) => createRoute(`/routes/${route.slug}`, 'weekly', '0.7')),
        ...landmarks.map((landmark) => createRoute(`/landmarks/${landmark.slug}`, 'weekly', '0.7')),
        ...blogRoutes.map((routePath) => createRoute(routePath, 'weekly', routePath === '/blog/' ? '0.8' : '0.7')),
      ];

      const uniqueRoutes = Array.from(
        new Map(allRoutes.map((route) => [route.path, route])).values(),
      ).sort((a, b) => a.path.localeCompare(b.path));

      const sitemap = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...uniqueRoutes.map((route) => {
          const lastmodSource =
            lastmodMap[route.path] ||
            lastmodMap[`${route.path}/`] ||
            lastmodMap[route.path.replace(/\/$/, '')] ||
            buildLastmod;
          const lastmod =
            lastmodSource instanceof Date ? lastmodSource.toISOString() : new Date(lastmodSource).toISOString();
          const loc = `${siteUrl}${route.path === '/' ? '/' : route.path}`;

          return [
            '  <url>',
            `    <loc>${escapeXml(loc)}</loc>`,
            `    <lastmod>${lastmod}</lastmod>`,
            `    <changefreq>${route.changefreq}</changefreq>`,
            `    <priority>${route.priority}</priority>`,
            '  </url>',
          ].join('\n');
        }),
        '</urlset>',
        '',
      ].join('\n');

      const robots = [
        'User-agent: *',
        'Allow: /',
        `Sitemap: ${siteUrl}/sitemap.xml`,
        '',
      ].join('\n');

      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap, 'utf8');
      fs.writeFileSync(path.join(outDir, 'robots.txt'), robots, 'utf8');
    },
  };
}

function removeBrowserOriginHeaders(proxyReq: { removeHeader: (header: string) => void }) {
  proxyReq.removeHeader('origin');
  proxyReq.removeHeader('referer');
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const blogPrerenderRoutes = command === 'build' ? getBlogRoutes() : [];
  const apiProxyTarget = env.VITE_API_BASE_URL || `http://localhost:${env.BACKEND_PORT || '8000'}`;
  const bookingApiProxyTarget =
    env.VITE_BOOKING_API_BASE_URL || 'https://perihelial-ariella-unserious.ngrok-free.dev';
  const siteUrl = (env.VITE_SITE_URL || 'https://rootcabs.com').replace(/\/+$/, '');

  return {
    plugins: [
      viteSourceLocator({
        prefix: 'mgx', // Prefix used to identify source locations; do not change.
      }),
      react(),
      atoms(),
      ensureBuildOutDir(),
      generateSitemapPlugin(siteUrl, blogPrerenderRoutes),
      ...(blogPrerenderRoutes.length > 0
        ? vitePrerenderPlugin({
            renderTarget: '#root',
            prerenderScript: path.resolve(__dirname, 'prerender/blog.js'),
            additionalPrerenderRoutes: blogPrerenderRoutes,
          })
        : []),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: '0.0.0.0', // Listen on all network interfaces.
      port: parseInt(env.VITE_PORT || '3000'),
      hmr: false,
      proxy: {
        '/api/customer/dev/website': {
          target: bookingApiProxyTarget,
          changeOrigin: true,
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
          configure(proxy) {
            proxy.on('proxyReq', removeBrowserOriginHeaders);
          },
        },
        '/api/customer/dev/verify': {
          target: bookingApiProxyTarget,
          changeOrigin: true,
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
          configure(proxy) {
            proxy.on('proxyReq', removeBrowserOriginHeaders);
          },
        },
        '/api/customer/dev/otp-verify': {
          target: bookingApiProxyTarget,
          changeOrigin: true,
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
          configure(proxy) {
            proxy.on('proxyReq', removeBrowserOriginHeaders);
          },
        },
        '/api/customer/dev/zone-packages': {
          target: bookingApiProxyTarget,
          changeOrigin: true,
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
          configure(proxy) {
            proxy.on('proxyReq', removeBrowserOriginHeaders);
          },
        },
        '/api/customer/dev/add-rental-booking': {
          target: bookingApiProxyTarget,
          changeOrigin: true,
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
          configure(proxy) {
            proxy.on('proxyReq', removeBrowserOriginHeaders);
          },
        },
        '/api': {
          target: apiProxyTarget,
          changeOrigin: true,
        },
      },
      watch: { usePolling: true, interval: 600 },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // Vendor chunks
            'react-vendor': ['react', 'react-dom'],
            'router-vendor': ['react-router-dom'],
            'ui-vendor': [
              '@radix-ui/react-accordion',
              '@radix-ui/react-alert-dialog',
              '@radix-ui/react-aspect-ratio',
              '@radix-ui/react-avatar',
              '@radix-ui/react-checkbox',
              '@radix-ui/react-collapsible',
              '@radix-ui/react-context-menu',
              '@radix-ui/react-dialog',
              '@radix-ui/react-dropdown-menu',
              '@radix-ui/react-hover-card',
              '@radix-ui/react-label',
              '@radix-ui/react-menubar',
              '@radix-ui/react-navigation-menu',
              '@radix-ui/react-popover',
              '@radix-ui/react-progress',
              '@radix-ui/react-radio-group',
              '@radix-ui/react-scroll-area',
              '@radix-ui/react-select',
              '@radix-ui/react-separator',
              '@radix-ui/react-slider',
              '@radix-ui/react-slot',
              '@radix-ui/react-switch',
              '@radix-ui/react-tabs',
              '@radix-ui/react-toast',
              '@radix-ui/react-toggle',
              '@radix-ui/react-toggle-group',
              '@radix-ui/react-tooltip',
            ],
            'form-vendor': ['react-hook-form', '@hookform/resolvers', 'zod'],
            'utils-vendor': [
              'axios',
              'clsx',
              'tailwind-merge',
              'class-variance-authority',
              'date-fns',
              'lucide-react',
            ],
            'query-vendor': ['@tanstack/react-query'],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
    },
  };
});
