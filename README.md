# Obsidian Tread

A premium, original tire e-commerce platform built with Next.js 15 (App Router), React 19, and TypeScript. Search tires by size or vehicle, compare performance ratings, manage a cart and multi-step checkout, and administer the catalog from a dedicated admin dashboard.

This is an original design and codebase — no code, layout, branding, or imagery from any existing commercial tire retailer was copied or referenced. Product photography is replaced with an original generated SVG tire illustration (`components/shared/tire-visual.tsx`) rather than any real product images.

## Tech Stack

- **Framework:** Next.js 15 (App Router, Server Components, Route Handlers)
- **UI:** React 19, TypeScript, Tailwind CSS v4, hand-vendored shadcn/ui-style components (Radix primitives)
- **Animation:** Framer Motion
- **State:** Zustand (cart, wishlist, compare, garage/saved vehicles, addresses, admin stores)
- **Data fetching:** TanStack Query
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide
- **Charts:** Recharts (admin analytics)
- **ORM:** Prisma 7 (schema + driver-adapter client; see [Database](#database) below)
- **Testing:** Vitest + Testing Library (unit), Playwright (e2e)

## Architecture

The storefront runs entirely on a **mock data layer** so it works out of the box with zero infrastructure:

- `lib/data/*` — deterministic, seeded mock datasets (products, brands, categories, vehicles, reviews, installers, coupons, blog posts) and query/filter/pagination helpers. Product images are procedurally rendered SVGs, not real photography.
- `lib/server/*` — server-only in-memory services (auth sessions, orders, pricing/tax/shipping calculation) backing the API routes. State resets on server restart, which is expected for a demo backend.
- `store/*` — Zustand stores for client state that should persist across a browser session (cart, wishlist, compare list, saved vehicles, addresses, and admin-editable products/coupons/CMS content), backed by `localStorage`.
- `prisma/schema.prisma` — the full relational schema this app would run on in production. It's independent of the mock layer above; wiring a real deployment means replacing the functions in `lib/data` / `lib/server` with calls through `lib/prisma.ts`. See [Database](#database).

This split means the entire app — homepage, catalog, vehicle fitment, cart, checkout, auth, customer dashboard, and admin dashboard — is fully interactive today, while the Prisma schema documents exactly how to graduate to a real Postgres-backed deployment.

### Folder structure

```
app/
  (marketing)/        Public storefront: home, catalog, product, vehicle search, brands, blog, about, cart
  (auth)/              Login / register
  account/             Customer dashboard: orders, wishlist, vehicles, addresses, invoices, settings
  admin/               Admin dashboard: analytics, products, inventory, orders, customers, coupons, CMS
  checkout/            Multi-step checkout + confirmation (own minimal layout)
  api/                 REST route handlers (products, search, vehicle-search, cart, orders, checkout, reviews, auth)
components/
  ui/                  Base primitives (button, card, dialog, form, table, ...)
  layout/              Header, mega menu, footer, theme toggle
  product/             Product card/grid, gallery, reviews, purchase panel
  search/              Tire size + vehicle search widgets, filter sidebar
  cart/, checkout/     Cart drawer/line items/summary, checkout steps + stepper
  account/, admin/     Dashboard-specific components
  shared/              Cross-cutting UI: rating, breadcrumbs, pagination, empty state, error boundary, tire illustration
hooks/                 TanStack Query hooks, debouncing, media queries
lib/
  data/                Mock dataset + query layer
  server/              Server-only services (auth, orders, pricing)
  validations.ts       All Zod schemas
  prisma.ts            Prisma client singleton (driver adapter), for production wiring
store/                 Zustand stores
prisma/                schema.prisma + seed.ts
tests/
  unit/                Vitest + Testing Library
  e2e/                 Playwright
```

## Getting Started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

Demo login: `alex.rivera@example.com` / `password123` (or register a new account — auth is a real in-memory service with hashed passwords and httpOnly session cookies).

## Testing

```bash
pnpm test         # Vitest unit tests (lib/utils, query/filtering, validations, cart store, components)
pnpm test:e2e      # Playwright end-to-end smoke tests (homepage, catalog, cart → checkout → confirmation)
```

`pnpm test:e2e` builds and boots a production server automatically (see `playwright.config.ts`).

## Database

The app does not require a database to run — everything above works against the mock data layer. `prisma/schema.prisma` defines the production schema (Brand, Category, Product, TireSpecification, PerformanceRating, Vehicle, Compatibility, Customer, Address, Order, OrderItem, Review, Installer, Coupon, Cart, WishlistItem, BlogPost, etc.) and is ready to point at a real Postgres database:

```bash
cp .env.example .env      # set DATABASE_URL
pnpm db:generate           # generate the Prisma client into lib/generated/prisma
pnpm db:push               # or `pnpm db:migrate` for a tracked migration
pnpm db:seed                # populate from the same mock dataset used by the demo
```

Prisma 7 uses driver adapters rather than a bundled query engine — `lib/prisma.ts` constructs the client with `@prisma/adapter-pg`. Swapping the app from mock data to Prisma means replacing the functions in `lib/data/query.ts` and `lib/server/*` with equivalent Prisma queries through `prisma` from `lib/prisma.ts`; the API route handlers and React components are already decoupled from the data source.

## Deployment

This is a standard Next.js App Router project and deploys cleanly to [Vercel](https://vercel.com/new):

1. Push this repository to GitHub and import it in Vercel.
2. If wiring a real database, set `DATABASE_URL` in the Vercel project's environment variables and run `pnpm db:migrate` / `pnpm db:seed` against it.
3. Vercel auto-detects Next.js — no custom build command is required (`next build`).

For any other Node host: `pnpm build && pnpm start`.

## Design System

- **Aesthetic:** dark "obsidian" graphite base with a warm ember accent, switchable to a platinum-white light theme (see `app/globals.css` — OKLCH tokens, both themes fully defined).
- **Typography:** Bricolage Grotesque (display/headings), Inter (body), JetBrains Mono (spec numbers).
- **Components:** hand-vendored shadcn/ui-style primitives on Radix UI — not copied from any commercial site, following the standard open-source shadcn/ui pattern of owning the component source directly.
- Dark/light themes are handled by `next-themes`; a handful of always-dark marketing surfaces (hero, footer, CTA band) intentionally force the dark token scope via a local `.dark` class wrapper for brand consistency regardless of the visitor's theme preference.

## Content Management

The homepage hero headline/subheadline is editable from `/admin/cms` and is stored in a persisted Zustand store (`store/cms-store.ts`) — edits reflect immediately on the storefront, demonstrating a lightweight CMS pattern without a database round-trip.
