# Templates Studio

An Arabic RTL web app where users browse professional templates (congratulations, wedding, business cards, ads), customize them in an inline editor, and export to PDF.

## Run & Operate

- **Dev**: `pnpm run dev` (Vite on port 5000)
- **Build**: `pnpm run build`
- **Typecheck**: `pnpm run typecheck`
- No required environment variables — auth is handled locally via localStorage

## Stack

- **Frontend**: React 18 + TypeScript + Vite 5
- **Routing**: wouter
- **Styling**: Tailwind CSS (RTL global layout)
- **UI**: Radix UI + Shadcn components
- **State**: Zustand (with localStorage persistence)
- **Auth**: Local localStorage-based auth (no Firebase SDK used)
- **Export**: html-to-image + jsPDF

## Where things live

- `src/App.tsx` — root routes and auth guards
- `src/pages/` — page components
- `src/templates/` — per-category template components
- `src/components/` — shared UI (InlineEditor, TemplateRenderer, etc.)
- `src/store/` — Zustand stores (auth, admin, template, pricing, requests)
- `src/data/categories.ts` — category/template config and default data
- `src/lib/firebase.ts` — Local auth implementation (email/password stored in localStorage)

## Architecture decisions

- Pure frontend SPA — no server; all state persisted in localStorage via Zustand
- Auth is fully local: user accounts and sessions stored in localStorage (no external auth provider)
- User plan data (free/starter/weekly/monthly) stored in Zustand persist store
- Admin dashboard uses a separate `useAdminStore` with hardcoded credentials (local only)
- Template export captures the `#export-target` DOM node via html-to-image → jsPDF
- Payment requests send a notification to an n8n webhook for the admin to review

## Product

- Browse templates by category (congrats, wedding, business-card, ads, mass-wedding)
- Inline editor for customizing template fields (text, colors, images)
- PDF/image export of the final design
- User registration/login (local, no email verification needed)
- Subscription plans with a payment request flow
- Admin dashboard for managing users and payment requests

## User preferences

_Populate as you build_

## Gotchas

- The app sets `document.documentElement.dir = "rtl"` globally — all layout is right-to-left
- Template components are lazy-loaded; new templates must be registered in `TemplateRenderer.tsx`
- The `firebase` npm package is listed in dependencies but the actual `src/lib/firebase.ts` is a fully local implementation — no Firebase SDK calls are made
- Google Fonts are fetched at runtime for PDF export (Cairo font family)
