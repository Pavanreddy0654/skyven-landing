# Open Questions

Running list of everything still to confirm with the designer or client. Each item shows the
**default currently built**, so the page works while the question is open. Spec references are to
`LANDING_PAGE_SPEC.md`.

## Assets

| # | Question | Default built | Ref |
|---|---|---|---|
| A1 | Carousel captions taken from file names: **Boxing, Cigar Room** (rooftop), **Cafe & Library, Indoor Swimming Pool, Play Area, Squash Court, Yoga & Dance** (clubhouse 4-6). "Play Area" shows the podium exterior with an outdoor court, not an indoor room. | File-name captions | §6.7, §6.9 |
| A2 | Slide order: design-visible slides first, then the rest alphabetically. | As described | §6.7, §6.9 |
| A3 | Logo: both PNGs read "SKYVEN" only, without the "RESIDENCES" line seen in the design. SVG logo to follow. | `logo-header.png` / `logo-footer.png` via one `Logo` component | §6.1, §6.16, §7.3 |
| A4 | Favicon: no emblem-only file. | Bird cropped from `logo-footer.png` | §7.3 |
| A5 | Carousel, engineering and gallery photos are 1x exports (e.g. 808×456, mobile gallery 336×200); soft on retina screens. | Current files; 2x replacements with the same names drop straight in | §7.1 |
| A6 | Construction Update video poster: none supplied. | YouTube thumbnail | §6.8 |
| A7 | Mobile hero: no mobile exports of the elevation/cloud images. | Mobile elevation is a crop of the desktop image centred on the tower, matched to the 375 screenshot | §6.2 |
| A8 | `og-image.jpg` (1200×630) not supplied. | Cropped from the hero elevation | §7.3 |

## Hero scroll section

| # | Question | Default built | Ref |
|---|---|---|---|
| H1 | Exact X/Y of each cloud and label layer (1920, 1440, 375 frames). | Positions measured from the screenshots / spec table | §6.2, §13.1 |
| H2 | Plain parallax or a pinned/sticky reveal? | Plain parallax (no scroll hijacking) | §6.2, §13.3 |
| H3 | Is the ~830px dark space under the Enquire card intentional? | Kept, as in the design | §6.3, §13.4 |

## Rest of the page

| # | Question | Default built | Ref |
|---|---|---|---|
| Q1 | Hosting: Vercel / Node server, or static (cPanel, S3)? | Node build (`next build && next start`), `/api/enquiry` route | §11.6, §13.5 |
| Q2 | Final domain. | Read from `NEXT_PUBLIC_SITE_URL` (falls back to `http://localhost:3000`); set it before launch | §11.2, §13.6 |
| Q3 | GA4 / GTM / Meta Pixel IDs. | None loaded until IDs are provided | §11.7, §13.7 |
| Q4 | Gold headings on the cream band: `#E5D37D` or darker/gradient? | `gold-deep #B0A562` | §3.1, §13.8 |
| Q5 | Exact font sizes and Karla weights. | Spec type scale (§3.3), weights 400/500/600/700 | §3.3, §13.9 |
| Q6 | Budget dropdown options. | ₹6–7 Cr, ₹7–8 Cr, ₹8 Cr+ | §5.6, §13.10 |
| Q7 | Fourth comparison row (label ends "…per floor") and what "Get detailed comparison" does. | 3 rows shown; button scrolls to the enquire form | §6.4, §13.11 |
| Q8 | Healthcare and Lifestyle location entries. | Category headings shown with no entries | §6.10, §13.12 |
| Q9 | Sticky header? Floating WhatsApp/call button on mobile? | Header is fixed: transparent at the top of the page, navy/blur after 80px of scroll; no floating button | §6.1, §6.16, §13.13 |
| Q10 | Large gaps after the closer-look video and before the footer text: animation space or spacing? | Normal section padding after the video; footer gap kept | §6.5, §9, §13.14 |
| Q11 | Where form submissions go (CRM, email, Google Sheet). | `/api/enquiry` validates and logs; `TODO` for the integration | §10, §13.15 |
| Q12 | Google Maps embed URL / exact pin. | Search-based embed for the address | §6.15, §13.16 |
| Q13 | Corner radius: all sharp? | 0 everywhere | §3.4, §13.17 |
| Q14 | "EXPLORE SKYVEN" hero button target. | Scrolls to `#usps` | §6.2 |
| Q15 | "EXPLORE THE LOCATION" target. | Google Maps link for the address, new tab | §6.10 |
| Q16 | Closer-look video: ~2.2:1 crop or plain 16:9? | 2.2:1 poster crop on desktop, 16:9 on mobile | §6.5 |
| Q17 | Carousel aspect (~16:9?) and whether arrows are wanted. | Aspect of the supplied images (808×456), no arrows | §5.5 |
| Q18 | FAQ default state: all open (as drawn) or first only? | First open | §6.13 |
| Q19 | VideoObject `uploadDate` for each YouTube video. | Taken from the public YouTube page if available; otherwise left out until confirmed | §5.7 |
| Q20 | Section vertical padding and the ~4.2vw carousel inset. | Spec values (140 / 120 / 64px, 4.2vw) | §3.4 |
| Q21 | Target of the other "EXPLORE SKYVEN" buttons (USP's, rooftop, construction, clubhouse, gallery). | Scroll to the enquire form (`#enquire`) | §6.6–§6.12 |
| Q22 | Sizes measured from the 1:1 desktop exports where the spec's estimates were far off: buttons 40px (1440) → 46px (1920) tall with 14–16px text (spec ~36px / 12–13px); header ENQUIRE NOW 50px tall at both desktop frames; hero stat labels 18px and values 40px (spec ~22px). Spec type scale kept everywhere else, though the design's hero line 2 is ~60px at both 1440 and 1920 (spec 52 / 64). | Measured values for the items listed; spec for the rest | §3.3, §5.1, §6.2 |
| Q23 | Hero layout at 1440: the 1440 frame draws the tower ~1.08× viewport width and ~178px lower than a scaled 1920 frame. | Stage scale and offset interpolated between the 1440 and 1920 frames (see `.hero` in globals.css) | §6.2 |
| Q24 | Floating labels start at 40% opacity per the spec's animation; in the Figma start frame they are fully opaque but partly covered by clouds. | Spec animation (0.4 → 1) | §6.2 |
