import path from 'node:path';
import { seoContentDir, normalizeRouteFromMarkdown, collectMarkdownFiles } from './utils.js';

export function getBlogRoutes() {
  const routes = new Set([
    '/blog/',
    '/blog/launch-of-root-cabs/',
    '/blog/root-cabs-success-stories/',
    '/blog/how-root-cabs-helps-drivers-earn-up/',
    '/blog/growth-of-root-cabs-in-chennai/',
    '/blog/what-our-driver-partners-say-about-root-cabs/',
    '/blog/future-of-root-cabs/',
  ]);

  for (const filePath of collectMarkdownFiles(seoContentDir)) {
    const relativePath = path.relative(seoContentDir, filePath);
    routes.add(normalizeRouteFromMarkdown(relativePath));
  }

  return Array.from(routes).sort();
}
