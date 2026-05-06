# Template Studio

تطبيق ويب عربي لإنشاء وتخصيص قوالب جرافيك: بطاقات أعمال، إعلانات، دعوات زفاف، بطاقات تهنئة.

## Run & Operate

- Dev: `npm run dev` (port 5000)
- Build: `npm run build` → `dist/public`
- Required env vars (see `.env.example`): `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`, `VITE_FIREBASE_STORAGE_BUCKET`, `VITE_FIREBASE_MESSAGING_SENDER_ID`, `VITE_FIREBASE_APP_ID`, `VITE_FIREBASE_MEASUREMENT_ID`

## Stack

- React 18 + TypeScript, Vite 5
- Tailwind CSS + Radix UI (shadcn/ui)
- Zustand (localStorage persist) — all state
- Wouter routing, TanStack Query, Lucide React
- html2canvas (PNG export), Framer Motion

## Where things live

- `src/pages/` — HomePage, CategoryPage, EditorPage, AboutPage, LoginPage, RegisterPage, ForgotPasswordPage, ResetPasswordPage, AdminLoginPage, AdminDashboard, UserDashboard
- `src/components/` — InlineEditor, TemplateRenderer, PaymentRequestModal
- `src/store/` — useTemplateStore, useAuthStore, useAdminStore, usePricingStore, useRequestStore
- `src/templates/{category}/` — Template components (congrats 1–23, wedding 1–14, business-card 1–11, ads 1–7, mass-wedding 1–8, specialized 1–7)
- `src/data/categories.ts` — category + template registry (source of truth)

## Architecture decisions

- **Pure frontend / no backend**: pricing and requests stored in localStorage via Zustand persist
- **Auth**: Firebase Auth for register/login/email-verification/password-reset; user plan data kept in `useAuthStore` (zustand persist)
- **Email verification required**: new accounts must verify email before logging in; `sendEmailVerification` called on register
- **Password reset**: Firebase `sendPasswordResetEmail` sends real email link
- **Admin credentials hardcoded**: username=`احمد`, password=`123456789`; session persists via `admin-auth` key (separate from Firebase)
- **Payment requests**: saved to `useRequestStore` + sent to n8n webhook (non-blocking); admin approves/rejects in dashboard
- **Pricing**: `usePricingStore` drives both HomePage pricing section and AdminDashboard editor; reset-to-default available

## Product

- Browse template categories → open editor → customize text/images/colors → export PDF
- **Free tier**: 2 editable fields (title + subtitle); rest locked behind payment
- **Auth**: register, login, forgot/reset password (all localStorage)
- **Payment flow**: user uploads receipt image → saved to request store → admin approves → plan activated
- **Subscription flow**: user picks a plan → fills name+phone → request saved → admin approves
- **Admin dashboard** (`/admin`): manage pricing plans, approve/reject activation & subscription requests, view users

## User preferences

- All UI in Arabic (RTL), font Cairo
- Admin login at `/admin/login` — credentials: احمد / 123456789
- n8n webhook: `https://ahmedaaasss.app.n8n.cloud/webhook-test/060b55ea-bd8e-4d32-9968-d37bff3b7be5`

## Gotchas

- Template registration requires 3 steps: create file, add lazy import in TemplateRenderer, add entry in categories.ts
- Mass-wedding photo grid: no photos → show all placeholder frames; any photo uploaded → hide empty slots
- `allowedHosts: true` in vite.config.ts required for Replit proxy
