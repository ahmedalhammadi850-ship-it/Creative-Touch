# Template Studio

A web-based application for creating and customizing graphic templates including business cards, advertisements, wedding invitations, mass-wedding invitations, and congratulations cards.

## Tech Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS + Radix UI (shadcn/ui)
- **State Management:** Zustand (with localStorage persistence)
- **Routing:** Wouter
- **Data Fetching:** TanStack Query
- **Icons:** Lucide React, React Icons
- **Animation:** Framer Motion
- **Export:** html2canvas (PNG export)
- **Package Manager:** npm

## Project Structure

- `src/pages/` — High-level page components (HomePage, CategoryPage, EditorPage)
- `src/components/` — UI components including InlineEditor and TemplateRenderer
- `src/templates/` — Template designs organized by category:
  - `mass-wedding/` — Templates 1–8 (multi-photo grid with placeholder behavior)
  - `business-card/` — Templates 1–11
  - `ads/` — Templates 1–7
  - `wedding/` — Templates 1–14 (includes both single-invite and mass-wedding list styles)
  - `specialized/` — Templates 1–7
  - `congrats/` — Templates 1–23
- `src/store/` — Zustand store for template state
- `src/hooks/` — Custom hooks (useExport, useAuth)
- `src/lib/` — Utility functions
- `src/types/` — TypeScript types
- `src/data/categories.ts` — Category + template registry (defaultData per template)
- `src/components/TemplateRenderer.tsx` — Lazy-loads templates by category/id key

## Template Registration

When adding a new template:
1. Create `src/templates/{category}/Template{N}.tsx`
2. Add a lazy import entry in `TemplateRenderer.tsx`
3. Add a `{ id, name, defaultData }` entry in the correct category array in `categories.ts`

## Mass-Wedding Photo Behavior

Templates 1–8 follow this photo grid rule:
- **No photos uploaded** → Show all 6 decorative placeholder frames (dashed border, subtle fill, small inner shape — no person icon)
- **Any photos uploaded** → Show only slots that have a real photo; empty slots are hidden entirely

## Development

- Dev server runs on port 5000 at `0.0.0.0`
- `allowedHosts: true` in Vite config for Replit proxy compatibility

## Deployment

- Deployment type: **static**
- Build command: `npm run build`
- Output directory: `dist/public`
