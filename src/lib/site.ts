// Deployment settings (Q2): set these in the hosting environment.
//   NEXT_PUBLIC_SITE_URL  final domain, e.g. https://www.example.com (used for canonical, sitemap, Open Graph)
//   NEXT_PUBLIC_SITE_ENV  "production" makes the site indexable; anything else is noindex (staging/preview)
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
export const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";
