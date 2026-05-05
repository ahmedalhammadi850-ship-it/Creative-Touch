# Template Studio

A web-based application for creating and customizing graphic templates including business cards, advertisements, wedding invitations, and congratulations cards.

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
- `src/templates/` — Template designs organized by category (ads, business-card, congrats, specialized, wedding)
- `src/store/` — Zustand store for template state
- `src/hooks/` — Custom hooks (useExport, useAuth)
- `src/lib/` — Utility functions
- `src/types/` — TypeScript types

## Development

- Dev server runs on port 5000 at `0.0.0.0`
- `allowedHosts: true` in Vite config for Replit proxy compatibility

## Deployment

- Deployment type: **static**
- Build command: `npm run build`
- Output directory: `dist/public`
