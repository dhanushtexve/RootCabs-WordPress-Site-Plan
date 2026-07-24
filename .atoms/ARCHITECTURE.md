---
last_updated: 2026-07-16T18:30:00Z
---

# Architecture Design

## System Overview
Root Cabs is a frontend-only taxi booking website built with React + TypeScript + Vite + Tailwind CSS + shadcn/ui. It uses a data-driven architecture where all city, service, route, and landmark content is defined in a central data file, and dynamic routes render pages from that configuration. This allows easy content updates (simulating WordPress-like updatability through data objects).

## Tech Stack
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS + shadcn/ui components
- React Router v6 (dynamic routing)
- Lucide React (icons)

## Module Design
| Module | Responsibility | Key Files |
|--------|---------------|-----------|
| Data Layer | All site content - cities, services, routes, landmarks, fares | src/data/siteData.ts |
| Shared Components | Navbar, Footer, FareCalculator, BookingForm, SEO structured data | src/components/*.tsx |
| Pages | Static pages (Home, BookRide, About, Support, Blog, Drivers, Business) | src/pages/*.tsx |
| Dynamic Pages | City, CityService, Route, Landmark pages rendered from data | src/pages/*.tsx |
| App Router | All route definitions with dynamic segments | src/App.tsx |

## Tech Decisions
| Decision | Choice | Rationale |
|----------|--------|-----------|
| Data-driven pages | Central siteData.ts | Simulates CMS updatability, single source of truth |
| Dynamic routing | React Router params | Handles 100+ pages from templates without individual files |
| 8-file limit strategy | Combine related pages | Keep within constraint while covering full site |
| SEO approach | JSON-LD structured data in components | AI-search friendly, schema.org compliant |

## File Tree Plan
```
src/
├── data/siteData.ts          (all content data)
├── components/
│   ├── Layout.tsx            (Navbar + Footer + SEO)
│   └── FareCalculator.tsx    (reusable fare calculator widget)
├── pages/
│   ├── Index.tsx             (Homepage)
│   ├── BookRide.tsx          (Booking page)
│   ├── ServicesPages.tsx     (Services hub + individual service pages)
│   ├── CitiesPages.tsx       (Cities hub + individual city + city-service pages)
│   ├── RoutesAndLandmarks.tsx (Route pages + Landmark pages)
│   └── InfoPages.tsx         (Drivers, Business, Blog, About, Support)
├── App.tsx                   (Router)
├── main.tsx
└── index.css
```

## Implementation Guide
1. Set up design tokens in index.css and tailwind.config.ts
2. Build siteData.ts with all content
3. Build Layout.tsx (Navbar with mega menu, Footer, SEO)
4. Build FareCalculator.tsx (reusable widget)
5. Build all page files with dynamic routing
6. Set up App.tsx with complete route tree
7. Generate images and integrate