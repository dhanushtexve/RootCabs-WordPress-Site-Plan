# Shadcn-UI Template Usage Instructions

## technology stack

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

All shadcn/ui components have been downloaded under `@/components/ui`.

## File Structure

- `index.html` - HTML entry point
- `vite.config.ts` - Vite configuration file
- `tailwind.config.ts` - Tailwind CSS configuration file
- `package.json` - NPM dependencies and scripts
- `src/main.tsx` - Project entry point
- `src/App.tsx` - Router shell (imports pages and sets up routes)
- `src/pages/Index.tsx` - Main page entry point for `/` by default; replace the placeholder page here unless you explicitly reroute `/` elsewhere
- `src/index.css` - Existing CSS configuration

## Components

- All shadcn/ui components are pre-downloaded and available at `@/components/ui`

## Styling

- Add global styles to `src/index.css` or create new CSS files as needed
- Use Tailwind classes for styling components

## Development

- Import components from `@/components/ui` in your React components
- Customize the UI by modifying the Tailwind configuration
- Do not stop after editing isolated components or only `src/App.tsx`. The default template homepage lives in `src/pages/Index.tsx`, and leaving `Welcome to Atoms` there means the app is still unfinished.
- Completion check: either replace `src/pages/Index.tsx` with your real homepage, or update the `/` route in `src/App.tsx` so the live homepage no longer renders the default placeholder page.

## Note

- The `@/` path alias points to the `src/` directory
- Do NOT modify the title, description, and logo in `index.html` — they are managed by the overview system via `data-mgx-overview` markers.

# Commands

**Install Dependencies**

```shell
pnpm i
```

**Start Preview**

```shell
pnpm run dev
```

**To build**

```shell
pnpm run build
```

## Initial HTML SEO

The build scripts run the existing Vite prerenderer, then `prerender/site.mjs`.
The final step captures the real application for the 38 URLs in
`prerender/audit-routes.json` (the supplied export is named "39 urls", but has
38 data rows). This retains route-specific markup and the metadata set by page
effects. Static blog pages retain their existing behavior.

The finalizer requires a Chromium browser. It uses installed Chrome/Edge on
Windows, or the Playwright Chromium installation elsewhere. Set
`PRERENDER_BROWSER_PATH` to use another installed compatible browser. Playwright
is already a project dependency; no production browser or Node server is needed.

All API and external requests are blocked during generation, and each page uses
a fresh browser context. No customer session, live fare, OTP, or booking is
captured. Existing runtime configuration and API loading still run for visitors.
React's existing `createRoot` replaces the initial snapshot; this is deliberately
not hydration. The same components own both versions, avoiding duplicated body
content and hydration errors, though the mount can restart video playback or
replace an early interaction before initialization finishes. Captured schemas
are replaced when page effects install their own, and discarded on navigation
away from the document's original route.

Run `npm run build:prod`, followed by `npm run test:seo`. The build produces
`dist/seo-audit.csv` and `.json`, with before/after evidence for each URL.
Verification writes `dist/seo-verification.csv` and `.json`, checks initial HTML
over local HTTP with JavaScript disabled, reloads with React enabled, compares
desktop/mobile heading dimensions, and exercises homepage navigation and booking
form input without sending an OTP or booking. These reports need not be uploaded.

Deploy the normal `dist` artifacts only after review. The existing `.htaccess`
already serves route `index.html` files at the canonical slashless URLs. After
deployment, fetch each URL with `curl -L`, inspect View Source, and crawl the
original list in Screaming Frog HTML mode. Local verification does not establish
that a new build is live, and does not test real payment, OTP, or fare services.

### Final local verification

Using the existing npm lockfile and installed dependencies, run:

```shell
npm ls --depth=0
npm run typecheck
npm run lint
npm run test:unit
npm run build:prod
npm run test:seo
npm run test:browser
node prerender/final-audit.mjs --live
```

The unit tests exercise booking API payloads and session handling with mocked
fetch. Browser tests use the production build with intercepted APIs; no real OTP
or booking is sent. The browser suite covers success/failure, registration,
address/category selection, session persistence, video fallback and navigation.
It does not establish live backend, payment or delivery availability.

The final audit writes `dist/seo-final-audit.csv` and `.json`, matching browser
evidence to HTML SHA256 hashes to reject stale results. `--live` performs read-only
HTTP checks of existing redirects and the separate returntrips application.
Browser results are in `dist/browser-regression.json`. A new build clears these
generated reports, so always rerun verification after rebuilding.
