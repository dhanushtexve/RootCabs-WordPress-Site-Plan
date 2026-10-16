import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { loadRuntimeConfig } from './lib/config.ts';

// Load runtime configuration before rendering the app
async function initializeApp() {
  // Prerendered blog pages are served as pure static HTML for SEO.
  // Intentionally skip React mounting so the crawler-facing markup stays
  // lightweight and self-contained — no client-side hydration needed.
  if (
    document
      .querySelector('meta[name="prerender-static-page"]')
      ?.getAttribute('content') === 'blog'
  ) {
    return;
  }

  try {
    await loadRuntimeConfig();
    console.log('Runtime configuration loaded successfully');
  } catch (error) {
    console.warn(
      'Failed to load runtime configuration, using defaults:',
      error
    );
  }

  // Render the app
  // The build captures real page markup. createRoot replaces that snapshot;
  // remove captured schemas owned by page effects before they append fresh ones.
  // Pages without runtime schema effects retain their build-time WebPage schema.
  const capturedSchemas = [...document.querySelectorAll('script[data-build-schema]')];
  const schemaObserver = new MutationObserver((mutations) => {
    if (mutations.some(mutation => [...mutation.addedNodes].some(node =>
      node instanceof HTMLScriptElement && node.type === 'application/ld+json' && !node.hasAttribute('data-build-schema')
    ))) {
      capturedSchemas.forEach(node => node.remove());
      schemaObserver.disconnect();
    }
  });
  if (capturedSchemas.length) schemaObserver.observe(document.head, { childList: true });
  createRoot(document.getElementById('root')!).render(<App />);
}

// Initialize the app
initializeApp();
