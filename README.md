# mudbeaversikkim — frontend

Next.js (App Router) website for Mud Beaver Sikkim. Markup, CSS and jQuery/Bootstrap
plugins are carried over unchanged from the original EJS site.

## Setup

```bash
cp .env.example .env.local   # BACKEND_URL points at the Express API
npm install
npm run dev                  # http://localhost:3000
```

Browser requests to `/api/*` are proxied to `BACKEND_URL` (see `next.config.mjs`).
Rewrites are resolved at build time, so set `BACKEND_URL` **before** `npm run build`.

- `public/` — original static assets (css, img, js, lib, brochure)
- `components/` — `Header`, `Footer`, `SiteChrome` (stylesheets + spinner + header),
  `SiteScripts` (loads the template JS), `ApiForm` (submits forms to the API)
- `app/(site)/` — site pages; `app/internship-data/` — internship entries table

## made with ❤️ by Waglogy.
