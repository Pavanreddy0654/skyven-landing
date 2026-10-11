# Skyven Residences: landing page

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4. Built from `LANDING_PAGE_SPEC.md`; open items are in `OPEN-QUESTIONS.md`.

## Run

```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm start
```

## Environment variables (set before `npm run build`)

`NEXT_PUBLIC_*` values are baked in at build time, so set them in the hosting environment before building.

| Variable | Example | Effect |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://www.your-domain.com` | Canonical URL, sitemap, Open Graph image URLs. Defaults to `http://localhost:3000`. |
| `NEXT_PUBLIC_SITE_ENV` | `production` | Only `production` makes the site indexable. Any other value (or none) gives `noindex` and a `robots.txt` that blocks crawling, for staging and preview builds. |

## Where things live

| What | Where |
|---|---|
| All page copy | `src/data/content.ts` |
| Design tokens (colours, type scale, spacing) | `src/app/globals.css` (`@theme`) |
| Sections | `src/components/sections/` |
| Shared UI (Button, Accordion, Carousel, forms, video) | `src/components/ui/` |
| Form validation (client and server) | `src/lib/enquiry.ts` |
| Form endpoint | `src/app/api/enquiry/route.ts` (CRM/email hand-off still a `TODO`, see Q11) |
| Images | `public/assets/` (originals in `design-source/originals/`) |

## Scripts

- `node scripts/optimize-images.mjs`: recompresses images from `design-source/originals/` into `public/assets/` (WebP hero layers and posters, mobile hero crop).
- `node scripts/generate-icons.mjs`: regenerates `favicon.ico`, `icon.png`, `apple-icon.png` and `public/og-image.jpg`.

Replacing a photo with a 2x export: keep the same file name in `public/assets/`; layouts use aspect-ratio boxes, so no code changes are needed.

## Logo

The logo is one component (`src/components/ui/Logo.tsx`). To switch to an SVG, change the `src` (and width/height ratio) in `logo` in `src/data/content.ts`, then point `LOGO` / `EMBLEM_ROWS` in `scripts/generate-icons.mjs` at the new file (or an emblem-only export) and re-run it.
