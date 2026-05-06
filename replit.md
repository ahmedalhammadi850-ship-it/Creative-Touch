# Templates Studio

An Arabic RTL web app where users browse professional templates (congratulations, wedding, business cards, ads), customize them in an editor, and export to PDF.

## Run & Operate

- **Dev**: `npm run dev` (Vite on port 5000)
- **Build**: `npm run build`
- **Typecheck**: `npm run typecheck`
- Required env vars: `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`, `VITE_FIREBASE_MEASUREMENT_ID`

## Stack

- **Frontend**: React 18 + TypeScript + Vite 5
- **Routing**: wouter
- **Styling**: Tailwind CSS (RTL global layout)
- **UI**: Radix UI components
- **State**: Zustand (with localStorage persistence)
- **Auth**: Firebase Authentication
- **Export**: html-to-image + jsPDF

## Where things live

- `src/App.tsx` — root routes and auth guards
- `src/pages/` — page components
- `src/templates/` — per-category template components
- `src/components/` — shared UI (InlineEditor, TemplateRenderer, etc.)
- `src/store/` — Zustand stores (auth, admin, template, pricing, requests)
- `src/data/categories.ts` — category/template config and default data
- `src/lib/firebase.ts` — Firebase Auth setup

## Architecture decisions

- Pure frontend SPA — no server; all state persisted in localStorage via Zustand
- Firebase Auth used for email/password login with email verification flow
- User plan data (free/starter/weekly/monthly) stored in Zustand persist store
- Admin dashboard uses a separate `useAdminStore` with hardcoded credentials (local only)
- Template export captures the `#export-target` DOM node via html-to-image → jsPDF

## Product

- Browse templates by category (congrats, wedding, business-card, ads, mass-wedding)
- Inline editor for customizing template fields (text, colors, images)
- PDF/image export of the final design
- User registration/login with email verification
- Subscription plans with a payment request flow
- Admin dashboard for managing users and payment requests

## User preferences

_Populate as you build_

## Gotchas

- The app sets `document.documentElement.dir = "rtl"` globally — all layout is right-to-left
- Firebase config is stored as plain env vars (VITE_ prefix, exposed to browser) — this is intentional for a frontend-only app
- Template components are lazy-loaded; new templates must be registered in `TemplateRenderer.tsx`

## Pointers

- Firebase Console: https://console.firebase.google.com/project/projectcard-6a6dd
