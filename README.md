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


## Blog detail pages and search appearance

Articles use `/blog/descriptive-title-ID`. The ID keeps links working after a title change; an old title or `/blog/ID` permanently redirects to the current article URL. Deleted/invalid articles return 404, while a backend outage displays a retry error rather than pretending that an article was deleted.

Set `SITE_URL` to the exact public production origin (default `https://mudbeaversikkim.in`) before deploying. This controls canonical links, Article/Breadcrumb structured data, sharing metadata, and `/sitemap.xml`. The dynamic sitemap uses database modification dates and includes every current article. `/robots.txt` advertises it. Local and preview environments should be protected from public indexing by their hosting configuration.

In the blog admin, expand **Search appearance** to set an optional search title and description. Defaults come from the title and opening text. Separate paragraphs with blank lines; write `## Section title` in its own paragraph for a subheading. Text is rendered safely without accepting arbitrary HTML. Use original practical content and real experience; metadata and structured data improve clarity and discoverability, not a guarantee of indexing or rankings. Submit the deployed sitemap to your verified Google Search Console property.
