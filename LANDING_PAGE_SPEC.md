# Skyven Residences: Landing Page Build Spec

> **For Claude Code:** This file is the single source of truth for building the Skyven landing page.
> Read it fully before writing code. Build in the order given in **§12 Build Order**, one step at a time,
> and stop after each step so the developer can check it in the browser.
>
> **Visual reference:** `design-reference/desktop-1920.png`, `design-reference/desktop-1440.png`, `design-reference/mobile-375.png`.
> Open the matching screenshot before building each section and match it as closely as possible.
>
> **How this spec was made:** Frame widths, gutters, brand colors and font families are **confirmed from Figma** by the developer.
> Font sizes and spacing inside sections are estimated from screenshot exports. Anything marked **⚠ CONFIRM** must be checked
> against Figma (click the layer → right panel) before final delivery. Section **§13** lists every open question.

---

## 1. Project Overview

| Item | Value |
|---|---|
| Project | Skyven Residences, Kokapet, Hyderabad (luxury 4BHK single tower, 63 floors, 210 homes) |
| Page type | Single-page real estate lead-generation landing page |
| Primary goal | Capture enquiries ("Enquire Now" / "Book a Site Visit") |
| Stack | **Next.js (App Router) + TypeScript + Tailwind CSS** |
| Mood | Dark navy luxury, warm gold accents, one cream "light" band in the middle, thin flared serif display type |

---

## 2. Project Setup

```bash
npx create-next-app@latest skyven-landing --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd skyven-landing
npm install embla-carousel-react framer-motion clsx
```

- **embla-carousel-react**: the horizontal carousels (clubhouse sections, mobile gallery).
- **framer-motion**: scroll reveal and the scroll-driven effects in §9.
- **clsx**: conditional class names.

### Folder structure

```
src/
  app/
    layout.tsx          # fonts, metadata, <body> bg
    page.tsx            # assembles all sections in order
    globals.css         # Tailwind layers + CSS variables
    api/enquiry/route.ts  # form POST handler (stub, see §10)
  components/
    ui/
      Button.tsx
      SectionHeading.tsx
      GlowDivider.tsx
      Accordion.tsx
      Carousel.tsx
      EnquiryForm.tsx
      VideoCard.tsx
    sections/
      Header.tsx
      Hero.tsx
      EnquireBar.tsx
      Comparison.tsx
      CloserLook.tsx
      Usps.tsx
      RooftopClubhouse.tsx
      ConstructionUpdate.tsx
      Clubhouse456.tsx
      Location.tsx
      Engineering.tsx
      Gallery.tsx
      Faq.tsx
      Landmarks.tsx
      MapEmbed.tsx
      Footer.tsx
  data/
    content.ts          # ALL text content lives here (see §8)
public/
  assets/               # images & icons (see §7)
design-reference/       # the 3 screenshots (not shipped)
```

---

## 3. Design Tokens

### 3.1 Colors

Brand colors (✅ confirmed from Figma):

| Token | Hex | Used for |
|---|---|---|
| `navy-900` | `#021021` | Main dark background (enquire area, comparison, clubhouse 4-6, location, FAQ, landmarks, footer) |
| `navy-800` | `#02152C` | Second dark background: "Strength, by engineering" + "A higher view of life" band |
| `cream` | `#FFF5D9` | Light pastel band: USP's → Rooftop Clubhouse → Construction Update |
| `gold` | `#E5D37D` | Gold text: eyebrows and gold sub-headings on dark backgrounds; gold headings on the cream band ⚠ CONFIRM (see note) |

> **Note on gold over cream:** `#E5D37D` on `#FFF5D9` has very low contrast. In the exports the headings on the cream band
> (USP'S, ROOFTOP CLUBHOUSE…, ONE FLOOR CLOSER…) render darker (around `#B0A562`). Check those text layers in Figma: they may
> use a gradient, a different gold, or reduced opacity. Until confirmed, use token `gold-deep: #B0A562` for headings on cream.

Supporting colors (estimated from screenshots; ⚠ CONFIRM):

| Token | Hex | Used for |
|---|---|---|
| `gold-deep` | `#B0A562` | Headings on the cream band (until confirmed, see note) |
| `ivory` | `#F5F3EC` | Headings and body text on navy |
| `ivory-muted` | `rgba(245,243,236,0.7)` | Secondary body text on navy |
| `ink` | `#1A1A1A` | Body text on cream |
| `line` | `rgba(255,255,255,0.25)` | Table row dividers, input underlines, FAQ dividers, form card border |
| `btn-from` | `#E9D9B8` | Button gradient start |
| `btn-to` | `#FFFBEF` | Button gradient end / highlight |
| `btn-text` | `#021021` | Button label |

### 3.2 Typography (✅ confirmed from Figma)

| Role | Font | Notes |
|---|---|---|
| Display / headings, eyebrows, stat values, hero labels | **Aboreto** (Google Font) | Single weight (400). Capitals-style display face, so headings look uppercase by design. Still write the text in uppercase in `content.ts` so it reads the same if the font fails to load. |
| Body, labels, form fields, buttons, captions | **Karla** (Google Font) | Variable weight; weights in use look like 400, 500, 600, 700 ⚠ CONFIRM |

Load both with `next/font/google` in `layout.tsx`:

```ts
import { Aboreto, Karla } from "next/font/google";
const aboreto = Aboreto({ weight: "400", subsets: ["latin"], variable: "--font-aboreto", display: "swap" });
const karla = Karla({ subsets: ["latin"], variable: "--font-karla", display: "swap" });
// <html lang="en" className={`${aboreto.variable} ${karla.variable}`}>
```

### 3.3 Type scale (px; estimated from exports, ⚠ CONFIRM sizes in Figma)

Use fluid sizes with `clamp()` so 1440 and 1920 both match, and widths in between scale smoothly.

| Style | 1920 | 1440 | 375 (mobile) | Notes |
|---|---|---|---|---|
| `display-xl` (hero H1 lines) | 64 | 52 | 32 | Aboreto, line-height 1.15 |
| `display-xxl` (footer "A LIVING THAT'S ABOVE ALL") | 150 | 112 | 44 | Aboreto, silver gradient text (see §9) |
| `h2` (section titles) | 40 | 34 | 24 | Aboreto |
| `h3` (feature titles, table headers, location categories) | 26 | 22 | 18 | Aboreto |
| `eyebrow` | 16 | 14 | 12 | Aboreto, tracking 0.08em, `gold` |
| `body` | 18 | 16 | 14 | Karla, line-height 1.6 |
| `small` | 14 | 13 | 12 | Karla; captions, sub-labels in table |
| `micro` | 11 | 10 | 10 | Karla; consent text, RERA label |
| `button` | 13 | 12 | 12 | Karla, uppercase, tracking 0.06em, weight 500 |

### 3.4 Spacing, radius, effects

Gutters (✅ confirmed from Figma frames):

| Frame | Side gutter | Content width |
|---|---|---|
| Desktop 1920 | 348px | 1224px |
| Desktop 1440 | 192px | 1056px |
| Mobile 375 | 20px | 335px |

Content container rule (matches both desktop frames exactly and scales in between):

```css
.container-content {
  width: min(1224px, calc(35vw + 552px), calc(100vw - 2 * var(--gutter)));
  margin-inline: auto;
}
/* --gutter: 20px (<768), 40px (768–1023), 48px (≥1024): safety minimum on narrow screens */
```

Check: 1920 → 1224 ✓, 1440 → 1056 ✓, 1024 → ~910, 768 → 688.

| Token | Value |
|---|---|
| Content container | `.container-content` above: text sections, forms, table, video cards, engineering rows, gallery, FAQ, map |
| Header row | ✅ The frame measurements are the header: left gutter → logo, the gap between logo and Enquire button, button → right gutter. Gap = 955 (1920), 789 (1440), 127 (375). So the logo's left edge and the button's right edge sit exactly on the content-container edges; build the header as `flex justify-between` inside `.container-content`. |
| Wide rows | Carousels start ~4.2vw from the left edge (~80px at 1920, ~60px at 1440) and run off the right edge. The "closer look" image uses the same ~4.2vw inset on both sides. ⚠ CONFIRM |
| Section vertical padding | 1920 `140px`, 1440 `120px`, mobile `64px` ⚠ CONFIRM |
| Radius | `0` everywhere (sharp corners on images, buttons, cards) ⚠ CONFIRM |
| Button glow | `box-shadow: 0 0 18px rgba(255, 236, 190, 0.45)` |
| Glow divider | horizontal line fading at both ends, bright warm core in centre (see §5.3) |

### 3.5 Tailwind config

Tailwind v4 (default in new Next.js apps) uses CSS-based config. In `globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-navy-900: #021021;
  --color-navy-800: #02152C;
  --color-cream: #FFF5D9;
  --color-gold: #E5D37D;
  --color-gold-deep: #B0A562;
  --color-ivory: #F5F3EC;
  --color-ink: #1A1A1A;
  --color-line: rgb(255 255 255 / 0.25);

  --font-display: var(--font-aboreto), serif;
  --font-body: var(--font-karla), sans-serif;

  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1440px;
  --breakpoint-2xl: 1920px;
}

body { @apply bg-navy-900 text-ivory font-body antialiased; }
```

If the project is on Tailwind v3, put the same values in `tailwind.config.ts` under `theme.extend`.

---

## 4. Breakpoints & Responsive Rules

The Figma file has **three frames: 1920, 1440 and 375** (✅ confirmed). There is no dedicated tablet frame.

| Name | Range | Design source | Tailwind prefix |
|---|---|---|---|
| Mobile | `< 768px` | Mobile 375 frame | default (no prefix) |
| Tablet | `768–1023px` | **Desktop 1440 design, scaled down** (✅ agreed), with the small tablet adjustments listed below | `md:` |
| Desktop | `1024–1919px` | Desktop 1440 frame (pixel-match at exactly 1440; scales smoothly down to 1024) | `lg:` |
| Large desktop | `≥ 1920px` | Desktop 1920 frame (pixel-match at exactly 1920; content stays 1224 wide above that) | `2xl:` |

**Mobile-first:** write mobile classes first, then override with `md:`, `lg:` and `2xl:`.
"Desktop / Tablet" in the sections below means the desktop layout (≥ 768px). Verify at 375, 768, 820, 1024, 1440 and 1920.

### Tablet adjustments (768–1023px)

The 1440 design fits tablets once it shrinks, except where a row holds too many items for the narrower width:

| Section | Adjustment on tablet |
|---|---|
| Enquire bar form | 4 fields + button in one row is too tight (~115px per field). Use a 2×2 grid of fields with the button on its own row, right-aligned |
| Location | Keep two columns, but 50/50 instead of 45/55 |
| Carousels | ~1.6 cards visible instead of ~2.3 |
| Engineering | Keep the zig-zag; image 50% width, smaller text |
| Gallery mosaic | Keep the layout; row heights scale with width |
| Type | Use the lower end of each `clamp()` range; never below the mobile size |
| Hero | Uses the **desktop** stage and positions (scaled by width), same scroll animation |

### Summary of what changes per breakpoint

| Section | Desktop / Tablet | Mobile |
|---|---|---|
| Hero stats | 3 items in one row, vertical dividers | 2 items row 1, "Location" centred row 2 |
| Enquire bar form | 4 fields + button in one row | Fields stacked, button full width |
| Comparison table | 3-column table | Accordion; each row opens to show SKYVEN vs OTHERS |
| Carousels | ~2.3 cards visible, last card bleeds off right edge | 1 card visible + peek |
| Location | Text/accordion left, map right | Map on top, accordion below |
| Engineering | Zig-zag: image/text alternate sides | Stacked: image, then title + text |
| Gallery | 5-image mosaic (2 on top, 3 below) | Swipe carousel with dot indicators |
| Landmarks form | 2×2 grid | Single column |
| Footer | Logo left, contact list right | Everything centred, stacked |
| "A LIVING THAT'S ABOVE ALL" | One line | Two lines |

---

## 5. Reusable Components

### 5.1 `Button`
- Variants:
  - `primary` (default): cream-gold gradient fill (`btn-from` → `btn-to`, top-left to bottom-right), thin 1px gold border, label `btn-text`, glow shadow. Used for EXPLORE SKYVEN, BOOK A SITE VISIT, GET DETAILED COMPARISON, EXPLORE THE LOCATION.
  - `outline`: transparent, 1px ivory border, ivory label. Used for the header ENQUIRE NOW.
- Size: height ~36px, horizontal padding 20px, sharp corners, uppercase `button` text.
- Hover: glow intensifies (`0 0 28px rgba(255,236,190,0.7)`), slight lift `-translate-y-0.5`, 200ms ease.
- Focus: visible 2px gold outline offset 2px.
- Must work as `<button>` and as a link (`href` → `<a>`/`<Link>`).

### 5.2 `SectionHeading`
Props: `eyebrow?`, `title` (string or array of lines), `subtitle?`, `tone: "dark" | "light"`, `align: "center" | "left"`.
- Dark tone (on navy): eyebrow `gold`, title `ivory`, subtitle `ivory-muted`.
- Light tone (on cream): eyebrow `ink`, title `gold-deep` (⚠ CONFIRM, see §3.1 note), subtitle `ink/70`.
- Stack spacing: eyebrow → 12px → title → 16px → subtitle.

### 5.3 `GlowDivider`
A decorative 280px-wide (mobile 180px) 1px line: `linear-gradient(90deg, transparent, #FFE7B0, transparent)` plus a small radial glow in the centre (`radial-gradient(circle, rgba(255,231,176,0.9), transparent 70%)`, ~40×12px). Placed above section headings in: Location, Engineering, Gallery, Landmarks (and on the top border of the Enquire card, offset to the right).

### 5.4 `Accordion`
- Each item: title row with chevron on right, divider line below.
- Chevron rotates 180° when open; content animates height (framer-motion `AnimatePresence`, 250ms).
- Props: `items`, `defaultOpen?: number[]`, `allowMultiple?: boolean`.
- Accessible: `button` with `aria-expanded`, `aria-controls`.

### 5.5 `Carousel`
- Built on Embla. Cards: image (aspect ~16:9 on desktop ⚠ CONFIRM) + caption below in body font, weight 600, 15px.
- Desktop: card width ~42% of viewport, gap 16px, starts aligned to the left gutter, overflows right (no arrows visible in design ⚠ CONFIRM).
- Mobile: card width ~88%, gap 12px.
- Drag/swipe enabled, `loop: false`, `align: "start"`.
- Caption colour: `ink` on cream sections, `ivory` on navy sections.

### 5.6 `EnquiryForm`
Props: `layout: "inline" | "grid" | "stacked"`, `submitLabel`, `source` (string sent with the lead, e.g. `"hero-bar"` / `"landmarks"`).
- Fields: Full Name (text), Email (email), Phone (tel), Budget (select, ⚠ CONFIRM options; placeholder suggestion: "₹6–7 Cr", "₹7–8 Cr", "₹8 Cr+").
- Field style: no box, transparent background, 1px `line` bottom border, label/placeholder in ivory 14px, chevron icon on the select.
- Consent checkbox (required) with micro text:
  "I authorize Skyven and its representatives to Call, SMS, Email or WhatsApp me about its updates and notifications. This consent overrides any registration for DND / NDNC as per TRAI regulations."
- Validation: all fields required; email format; phone = 10-digit Indian mobile (allow optional +91). Show inline error text under the field in a soft red, 12px.
- On submit: POST JSON to `/api/enquiry` (see §10). Show loading state on the button and a success message replacing the form ("Thank you. Our team will contact you shortly.").

### 5.7 `VideoCard` (YouTube, click-to-play)
All three videos are on YouTube (✅ confirmed, IDs in §7.2). Use a **lite embed** so the page stays fast:
- Props: `videoId`, `title` (used for the iframe title and alt text), `poster` (optional local image), `className`.
- Before click: render a `<button>` containing the poster image (`next/image`) and a centred play icon (gold circle, navy triangle, ~72px desktop / 56px mobile, hover glow like `Button`). If no local poster exists, use `https://i.ytimg.com/vi/{videoId}/maxresdefault.jpg` (add `i.ytimg.com` to `images.remotePatterns` in `next.config.ts`).
- On click: replace the poster with an iframe: `https://www.youtube-nocookie.com/embed/{videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`, `allow="autoplay; encrypted-media; picture-in-picture; fullscreen"`, `allowFullScreen`, `title={title}`.
- Do **not** load the iframe or YouTube scripts before the click (protects page speed).
- Aspect 16:9, sharp corners, width = content container.
- Strip the `?si=` share parameter from the links; use only the video ID.
- SEO: add `VideoObject` JSON-LD for each video (name, description, thumbnailUrl, uploadDate ⚠ CONFIRM, embedUrl `https://www.youtube.com/embed/{id}`, contentUrl `https://www.youtube.com/watch?v={id}`).

---

## 6. Section-by-Section Spec

Order on the page (top to bottom). Background colour for each section is listed so transitions match the design.

### 6.1 Header — `Header.tsx`
- Background: transparent over the hero.
- Left: Skyven logo (bird emblem + "SKYVEN RESIDENCES"), height ~40px desktop, ~32px mobile.
- Right: `Button variant="outline"` "ENQUIRE NOW" → scrolls to the enquire form (`#enquire`).
- ✅ Logo's left edge and button's right edge sit exactly on the content-container edges (gutters 348 / 192 / 20px at 1920 / 1440 / 375); the gap between them is 955 / 789 / 127px. Build as `flex justify-between` inside `.container-content`.
- Behaviour: ⚠ CONFIRM whether sticky. Recommended: becomes sticky after scrolling past the hero, with `navy-900/90` background + backdrop blur.

### 6.2 Hero (elevation scroll section) — `Hero.tsx` · bg: layered images

This is the most important section on the page. In Figma (Desktop 1920 frame) it is built from **one tall elevation
image, three cloud layers and text layers** (✅ confirmed from the Figma layer panel and the exported assets).
The Figma frame shows the **start state**: clouds partly cover the floating labels. As the user scrolls, the clouds
drift away and the labels become clear.

**Assets (✅ exported by the developer)**

| File | Size (1920 frame) | What it is |
|---|---|---|
| `hero-elevation.png` | 1920 × 3019 | Sky, lake, city and the lit tower. The picture fills the **top 1856px**; the bottom ~1163px is transparent, so the dark navy page background shows through there. This dark area is where the Enquire Now card sits (§6.3). Convert to WebP; keep the transparency or crop to 1920 × 1856 and let the section background continue below. |
| `hero-cloud-band.png` | 1920 × 618 (layer is 2111 wide, overflows the frame) | Main bright, dense cloud band across the middle of the tower. Fully opaque in places; covers the ROOFTOP and 210 HOMES labels. |
| `hero-cloud-left.png` | 600 × 974 | Soft, semi-transparent haze on the left (alpha max ~47%). |
| `hero-cloud-right.png` | 740 × 627 (layer is 1353 wide, overflows the right edge) | Soft, semi-transparent haze on the right (alpha max ~34%). |

All three clouds are white with transparency, so they must be layered over the elevation image (they look blank on a white background).
⚠ CONFIRM mobile: export the mobile frame's versions of these 4 images if their crop/position differs.

**Layer positions in the 1920 frame** (measured from the Figma screenshot, ±10px, ⚠ CONFIRM with the layer X/Y values)

| Layer | x | y | w × h | Notes |
|---|---|---|---|---|
| Elevation image | 0 | 0 | 1920 × 3019 | Tower ≈ x 873–1045, crown at y ≈ 717, base at y ≈ 1434 |
| Left cloud | ≈ −78 | ≈ 171 | 600 × 974 (visible part) | Behind the headline area, left side |
| Right cloud | ≈ 1176 | ≈ 295 | 1353 × 627 (overflows right) | Right side, beside the headline |
| Cloud band | ≈ −95 | ≈ 616 | 2111 × 618 | Across the tower's upper half |
| "ROOFTOP CLUBHOUSE / 62 & 63 FLOORS" | ≈ 420–822 | ≈ 814 | text, right-aligned | Left of the crown, under the cloud band |
| "210 / HOMES" | ≈ 1100 | ≈ 1020 | text, left-aligned | Right of the tower |
| "63 / FLOORS" | ≈ 688–826 | ≈ 1143 | text, right-aligned | Left of the tower, lower |
| Headline block (RERA → button) | centred | ≈ 222 → 550 | | §6.2 content below |
| Header (logo + Enquire Now) | gutters | ≈ 20 → 68 | | §6.1 |

**How to build positions responsively:** the hero is one scaled "stage". Size it in `vw` units based on the 1920 frame
(1px in Figma = `100vw / 1920`), i.e. stage height `3019/1920 × 100vw ≈ 157.2vw`, and place every layer with
`left/top/width` in those units (e.g. cloud band `top: calc(616 / 1920 * 100vw)`). This keeps the labels locked to the
tower at every desktop width. Headline text uses the normal type scale (§3.3), not stage units.
Mobile uses its own stage based on the 375 frame (`1px = 100vw / 375`) with the mobile frame's positions ⚠ CONFIRM.

**Scroll animation (proposed — the designer has no prototype, so this is the recommended interpretation)**

The page scrolls normally through the tall hero (no hijacking), and the clouds move at different speeds from the
tower (parallax), clearing the labels during roughly the first screen-height of scrolling.

`p` = progress from the hero's top reaching the viewport top (0) to the tower base reaching the viewport centre (1).
Use framer-motion `useScroll({ target: heroRef, offset: ["start start", "start -60vh"] })` and tune.

| Progress | Layer | Change |
|---|---|---|
| 0 → 1 | Cloud band | moves outward and thins: `y: 0 → +12vw` (sinks below the labels) and `opacity: 1 → 0.15`; optionally `scale: 1 → 1.15` |
| 0 → 1 | Left cloud | `x: 0 → −25vw`, `opacity: 1 → 0` |
| 0 → 1 | Right cloud | `x: 0 → +25vw`, `opacity: 1 → 0` |
| 0 → 1 | Elevation image | slight parallax: moves up slower than the page (`y: 0 → +8vw`) so the clouds appear to pass in front of the tower |
| 0.2 → 0.8 | Floating labels | `opacity: 0.4 → 1`, `y: 24px → 0`; staggered so ROOFTOP clears first, then 210 HOMES, then 63 FLOORS |
| always | Headline, stats, button | scroll away normally with the page (they are at the top of the hero) |

Rules:
- Animate only `transform` and `opacity` (`will-change: transform`) to stay at 60fps; no layout properties.
- **Same animation on mobile and tablet** (✅ confirmed), using the mobile stage below 768px and the desktop stage from 768px up.
- `prefers-reduced-motion`: show the end state (clouds faded, labels fully visible), no parallax.
- Alternative if the client wants a stronger effect: pin the top screen (`position: sticky`) for ~1 extra screen-height while the clouds clear, then release. Build the parallax version first; switching later only changes the scroll offsets.

**Content (layer 5)**

- Headline block sits at the top of the stage (y ≈ 222–550 in the 1920 frame).
- Centered content near the top (top padding ~120px desktop):
  1. Micro text: `RERA: P02400009501` (ivory/70, 10px)
  2. H1 line 1: `SKYVEN`
  3. H1 line 2: `KOKAPET'S TALLEST SINGLE TOWER` (mobile wraps to 2 lines: "KOKAPET'S TALLEST / SINGLE TOWER")
  4. Stats row (label small ivory/70 above, value in display font ~22px):
     - Starting from → `₹ 6.5 CR*`
     - Residences → `4BHK`
     - Location → `KOKAPET`
     - Desktop/tablet: 3 columns separated by thin vertical lines. Mobile: Starting from + Residences on row 1 (with divider), Location centred on row 2.
  5. `Button` "EXPLORE SKYVEN" → scrolls to `#usps` (⚠ CONFIRM target).
- Floating labels (layer 3; Aboreto, ivory, ~24px at 1920, two lines each, right-aligned when left of the tower):
  - "ROOFTOP CLUBHOUSE / 62 & 63 FLOORS" (left of the tower, level with the crown)
  - "210 / HOMES" (right of the tower, mid-height)
  - "63 / FLOORS" (left of the tower, lower)
  Position them relative to the tower (percentages of the hero image), not the viewport, so they stay attached to the tower at every width.
  Build them as real text, not baked into the image.
- Bottom of the hero fades into `navy-900`, flowing into the Enquire section.

### 6.3 Enquire Bar — `EnquireBar.tsx` · id `enquire` · bg `navy-900`
- Card: content-container width, 1px `line` border (slightly brighter, ~ivory/60), padding 24px desktop / 20px mobile.
- A `GlowDivider` sits on the card's top border, positioned toward the right (~65% across).
- Title: `ENQUIRE NOW` (display, ~28px desktop).
- `EnquiryForm layout="inline"` on desktop/tablet (Full Name, Email, Phone, Budget, then "BOOK A SITE VISIT" button on the same row), `stacked` on mobile.
- **Position:** this card sits inside the hero's dark lower area (the transparent bottom of `hero-elevation`), at y ≈ 1940–2190 in the 1920 frame. The hero stage ends at y = 3019, so ≈ 830px of dark space follows the card before the Comparison section. Keep that space for now; it gives the sinking cloud band room to move. ⚠ CONFIRM with the designer whether it should be reduced.

### 6.4 Comparison — `Comparison.tsx` · bg `navy-900`
- `SectionHeading` eyebrow `ASK FOR IT`, title `EVERY RUPEE EXTRA SHOULD COME / WITH A REASON`, subtitle `Ask what each number actually buys you, not just what it says.`
- Table (desktop/tablet), columns ~ 50% / 25% / 25%:
  - Header row: `VALUE` · `SKYVEN` · `OTHERS` (display h3, underlined by a short 1px line under each header word).
  - Rows (label in body 15px ivory, sub-label small ivory/60 under it; values body 15px):

| Value | Sub-label | Skyven | Others |
|---|---|---|---|
| Price per sq. ft. | More home for every crore invested | ₹10,999 | ₹13,500–₹17,000 |
| Outdoor living space | A true open-air extension of your home | Up to 913 sq. ft. | Up to 641 sq. ft. |
| Total residences | A more private residential community | Only 210 | 594–1,398 |
| ⚠ CONFIRM 4th row (visible faded on mobile, label ends "…per floor") | ⚠ | ⚠ | ⚠ |

  - Row dividers: 1px `line`.
  - The **last visible row fades out** (gradient mask from transparent to `navy-900`), suggesting more content.
- `Button` "GET DETAILED COMPARISON" centred below. Suggested behaviour: expands the table to show all rows, or scrolls to the enquire form ⚠ CONFIRM.
- **Mobile:** turn the table into an `Accordion`. Each item title = row label; open state shows two columns "SKYVEN" / "OTHERS" with the values. First item open by default. Last item faded as on desktop.

### 6.5 Closer Look — `CloserLook.tsx` · bg `navy-900`
- Centred h2: `EVERY GREAT VIEW DESERVES A CLOSER LOOK`.
- ✅ This is a **video**: `VideoCard videoId="wDzI8VEbt5s"` (title "Skyven Residences: Every great view deserves a closer look"). The sunset image in the design is the poster: use the matching image from the assets folder if there is one, otherwise the YouTube thumbnail.
- Size: wider than other videos. Desktop width = viewport minus ~4.2vw each side, aspect as in the design (~2.2:1, crop the poster with `object-cover`; the playing video letterboxes inside at 16:9) ⚠ CONFIRM whether it should simply be 16:9. Mobile: full width minus 20px gutters, 16:9.
- Large empty space after it in the design (≈ 1,300px desktop): ⚠ CONFIRM with the designer. Default: use normal section padding (no scroll-zoom), since this block is now a video.

### 6.6 USP's — `Usps.tsx` · id `usps` · bg `cream`
- Centred title `USP'S` in `gold-deep` (h2).
- `VideoCard videoId="60lmxpAgAzE"` (title "Skyven Residences USPs: interview with E-Infra leadership"), content container width. Poster: the interview still from the assets folder if present, else the YouTube thumbnail.
- `Button` "EXPLORE SKYVEN" centred below.

### 6.7 Rooftop Clubhouse — `RooftopClubhouse.tsx` · bg `cream`
- `SectionHeading tone="light"`: title `ROOFTOP CLUBHOUSE FLOORS 62 & 63`, subtitle `RISE. UNWIND. LOOK BEYOND.` (small, uppercase, tracking).
- `Carousel` with captions (ink). **Images: every image in `public/assets/rooftop-clubhouse/`** (§7.1), in file-name order. The folder may hold more slides than the 3 visible in the design; show all of them.
  - Captions visible in the design: Infinity Rooftop Swimming Pool, Stargazing Deck, Bar & Lounge. For other images, derive the caption from the file name (e.g. `sky-lounge.jpg` → "Sky Lounge") and list them for the developer to confirm.
- `Button` "EXPLORE SKYVEN".

### 6.8 Construction Update — `ConstructionUpdate.tsx` · bg `cream`
- Eyebrow (ink, display): `CONSTRUCTION UPDATE - AUGUST 2026`
- Title (`gold-deep` h2): `ONE FLOOR CLOSER TO THE SKY` (mobile: 2 lines)
- Subtitle: `What began as a vision is steadily taking shape in the sky. Take a look at Skyven's latest construction update.`
- `VideoCard videoId="LBiZ_50sdOM"` (title "Skyven construction update, August 2026"), content container width. Poster: the construction still from the assets folder if present, else the YouTube thumbnail.
- `Button` "EXPLORE SKYVEN".

### 6.9 Clubhouse Floors 4, 5 & 6 — `Clubhouse456.tsx` · bg `navy-900`
- Top: full-bleed image of the podium/clubhouse levels at night (`clubhouse-456-bg.jpg`), ~420px tall desktop, with a bottom gradient into `navy-900`.
- Title overlaid on the lower part of the image: `THE CLUBHOUSE FLOORS 4, 5 & 6` (h2, ivory), subtitle `LIVE. WORK. PLAY. CONNECT.`
- `Carousel` (captions ivory). **Images: every image in `public/assets/clubhouse-4-5-6/`** (§7.1), in file-name order; captions as for the rooftop carousel.
  - Captions visible in the design: Salon & Spa (a two-photo collage), Kids Play Area, Banquet Hall.
  - The full-width background photo at the top of this section is also expected in this folder or the assets root; identify it by its wide shape.
- `Button` "EXPLORE SKYVEN".

### 6.10 Location — `Location.tsx` · bg `navy-900`
- `GlowDivider`, then `SectionHeading`: eyebrow `CLOSE TO EVERYTHING`, title `FAR ABOVE THE ORDINARY`, subtitle `Set along Gandipet Main Road in Kokapet, Skyven keeps Hyderabad's key business, education, healthcare and lifestyle destinations within easy reach.`
- Two columns desktop/tablet (≈ 45% text / 55% map). Mobile: map first, then text.
- Left: `Accordion allowMultiple` with category titles in display h3 (underlined when collapsed):
  - **BUSINESS** (open): `Financial District - 11 Mins` (bold) with note `Minutes from Hyderabad's major corporate hub.`; `One DownTown - 1 Mins`
  - **EDUCATION** (open): `Phoenix Greens - 4 Mins`, `Rockwell International School - 9 Mins`, `Oakridge International School - 15 Mins`, `Delhi Public School - 17 Mins` (place name regular, time bold)
  - **HEALTHCARE** (collapsed): ⚠ CONFIRM content
  - **LIFESTYLE** (collapsed): ⚠ CONFIRM content
- Right: location map illustration (`location-map.svg` or `.png`) — dark map with white roads, blue lakes, tower marker.
- `Button` "EXPLORE THE LOCATION" under the accordion (left aligned desktop, full width mobile). ⚠ CONFIRM target (Google Maps link?).

### 6.11 Engineering — `Engineering.tsx` · bg `navy-800`
- `GlowDivider` on the top edge, `SectionHeading`: eyebrow `BEAUTY, BY DESIGN`, title `STRENGTH, BY ENGINEERING`, subtitle `Behind Skyven's striking architecture is a carefully engineered foundation designed for comfort, resilience and long-term performance.`
- Three feature rows inside the content container. Image ≈ 52% width, aspect ~ 4:3.4; text column vertically centred; title in `gold` display h3, body ivory 14px, max-width ~320px.
  Images: the three images in `public/assets/engineering/` (§7.1), matched by content (lift lobby / balconies / tower at night) or file name.
  1. Image left — lift lobby image — **HIGH-SPEED ELEVATORS** — "6 passenger elevators + 3 service elevators designed for efficient vertical movement."
  2. Image right — corner balconies image — **AI-ENABLED RESIDENCES** — "Technology that works intelligently in the background, so life feels effortless."
  3. Image left — tower-at-night image — **ENGINEERED FOR EVERYDAY LIVING** — "Smooth, seamless experiences designed around the way you live"
- Rows overlap slightly vertically on desktop (each next image starts a little above the previous one's bottom). Mobile: image then text, stacked, 32px gap.

### 6.12 Gallery — `Gallery.tsx` · bg `navy-800`
- `GlowDivider`, eyebrow `SEE SKYVEN`, title `A HIGHER VIEW OF LIFE`.
- Images: the images in `public/assets/gallery/` (§7.1). The mosaic has 5 slots; match by content and shape (landscape vs portrait):
- Desktop/tablet mosaic (content container, gap 12px):
  - Row 1: aerial view of the tower (~59% width) + rooftop infinity pool (~41%), equal height ~290px.
  - Row 2: three columns, height ~365px:
    - podium/clubhouse levels at dusk (full height)
    - Middle column: balconies at night (~290px tall) with `Button` "EXPLORE SKYVEN" centred below it
    - man on terrace at sunset (full height)
  - If the folder has more than 5 images, use the first 5 in the mosaic and include all of them in the mobile carousel.
- Mobile: single-image swipe carousel (`Carousel`, 1 per view) with dot indicators below, then the button.

### 6.13 FAQ — `Faq.tsx` · bg `navy-900`
- Title `FAQ` left-aligned, display h2 with underline.
- `Accordion` (questions body 16px weight 500 ivory, answers body 14px ivory/75, dividers `line`). Design shows all three expanded ⚠ CONFIRM default state; recommended: first open.
  1. **What makes Skyven stand out?** — Skyven is a monotower surrounded by an already-developed neighbourhood, with no surrounding building as tall. Every residence is a corner home with L-shaped balconies, giving you greater privacy and open views.
  2. **How does Skyven compare on livable space?** — Skyven offers 10% more livable space than nearby homes, giving you more space to live, at a lesser cost.
  3. **What are the views from Skyven?** — With homes oriented across four aspects, every residence at Skyven comes with its own distinct view. Explore the four-aspect floor plate to discover the view from each home.
- Add FAQ structured data (JSON-LD `FAQPage`) in this component.

### 6.14 Landmarks CTA — `Landmarks.tsx` · bg `navy-900`
- `GlowDivider`, eyebrow `SOME ADDRESSES EXIST`, title `SOME BECOME LANDMARKS`, subtitle `Skyven is being created for those who believe an address should do more than locate you. It should reflect the way you see life, and the way you choose to live it.`
- `EnquiryForm layout="grid"` (2×2 desktop/tablet, max-width ~600px, centred; stacked mobile), consent, centred `Button` "BOOK A SITE VISIT".

### 6.15 Map — `MapEmbed.tsx` · bg `navy-900`
- Google Maps `<iframe>` for "SY no. 153, Gandipet Main Road, Kokapet, Hyderabad" (⚠ CONFIRM exact pin/embed URL from the client).
- Content container width, height ~390px desktop / 300px mobile, `loading="lazy"`, title attribute for accessibility.
- Large empty space after the map before the footer text (≈ 300px desktop): part of the footer reveal effect (§9).

### 6.16 Footer — `Footer.tsx` · bg `navy-900`
- Huge display line `A LIVING THAT'S ABOVE ALL` spanning nearly the full width (desktop one line, mobile two lines: "A LIVING THAT'S / ABOVE ALL"), silver gradient that fades out toward the bottom of the letters.
- Below, two columns (mobile: centred, stacked):
  - Left: logo (larger version, ~110px wide), then micro text: `Copyright © 2026. Skyven by E-Infra & PVR Pingle | Designed by 8Views`
  - Right: list with dividers (`line`), body 14px:
    - 📍 icon — `SY no. 153, Gandipet Main Road, Kokapet, Hyderabad, Telangana, 500075`
    - `RERA No: P02400009501`
    - 📞 icon — `+91 83400 06304` → `tel:+918340006304`
    - WhatsApp icon — `+91 83400 06304` → `https://wa.me/918340006304`
- ⚠ CONFIRM: whether a floating WhatsApp/call button is wanted on mobile (common on Indian RE landing pages, not shown in design).

---

## 7. Assets

The developer has already placed all images, logo versions and other files in an assets folder, with one sub-folder per
slider section. **Step 0 of the build (§12) is to inventory that folder and map every file to this section list.**
Use `next/image` for every raster image (set `sizes`; the hero uses `priority`).

### 7.1 Folder setup (do this first)

1. Make sure the assets live under `public/assets/` (Next.js only serves files from `public/`). If the folder is elsewhere (e.g. `src/assets` or the project root), move it into `public/`.
2. **Rename the section folders to URL-safe names.** Spaces, `&` and `,` in folder names break or complicate image URLs:

| Developer's folder name | Rename to |
|---|---|
| `Rooftop Clubhouse Floors 62 & 63` | `public/assets/rooftop-clubhouse/` |
| `THE CLUBHOUSE Floors 4, 5 & 6` | `public/assets/clubhouse-4-5-6/` |
| `STRENGTH, BY ENGINEERING` | `public/assets/engineering/` |
| `A HIGHER VIEW OF LIFE` | `public/assets/gallery/` |

3. Rename files inside to lowercase-kebab-case (`Infinity Pool.JPG` → `infinity-pool.jpg`). Prefix with a number to fix the slider order (`01-infinity-pool.jpg`, `02-stargazing-deck.jpg`…).
4. **Look at every image** (open it) and print a table for the developer: file → section → slot/caption → dimensions → file size. Flag: unused files, missing images for a section, images over 500KB (convert to WebP, max 2560px wide), and anything unclear. Wait for the developer to confirm the table before building sections that use the images.
5. Logo versions: identify which logo file is the header logo (small, light), the footer logo (larger, with "RESIDENCES" wordmark) and the favicon/emblem source. Prefer SVG.

### 7.2 Videos (✅ YouTube; no video files needed)

| Section | YouTube ID | Original link |
|---|---|---|
| §6.5 Every great view deserves a closer look | `wDzI8VEbt5s` | https://youtu.be/wDzI8VEbt5s |
| §6.6 USP's | `60lmxpAgAzE` | https://youtu.be/60lmxpAgAzE |
| §6.8 One floor closer to the sky | `LBiZ_50sdOM` | https://youtu.be/LBiZ_50sdOM |

If the assets folder also contains MP4 files of these videos, do **not** self-host them; the YouTube embeds are lighter. Keep the MP4s out of `public/` so they are not deployed.

### 7.3 Expected assets (single files)

| Asset | Section | Notes |
|---|---|---|
| Logo (header) | Header | Light version, SVG preferred |
| Logo (footer) | Footer | Larger version with "RESIDENCES" |
| Emblem / favicon source | `app/icon.png`, `apple-icon.png` | Bird emblem only |
| `hero-elevation` | Hero | Tall elevation image 1920×3019 (transparent bottom) |
| `hero-cloud-band`, `hero-cloud-left`, `hero-cloud-right` | Hero | Transparent cloud layers (§6.2) |
| Hero mobile versions | Hero | Only if the mobile frame uses different crops ⚠ CONFIRM |
| Video posters (3) | §6.5, §6.6, §6.8 | Optional; fall back to YouTube thumbnails |
| Clubhouse 4-6 background | §6.9 | Wide podium-at-night photo |
| Location map | §6.10 | SVG or PNG 2x |
| Icons: chevron, location pin, phone, WhatsApp | Accordions, select, footer | SVG; if missing, use `lucide-react` icons (WhatsApp: simple SVG) |
| `og-image.jpg` | Metadata | 1200×630; if missing, crop from the hero elevation image |

---

## 8. Content Source

Put every string from §6 into `src/data/content.ts` as typed objects (hero, stats, comparison rows, carousels, location, engineering, FAQs, footer). Components only read from this file. This keeps copy changes to one place.

---

## 9. Motion & Interactions

Keep everything subtle and slow (luxury feel). Respect `prefers-reduced-motion`: disable all transforms and just show content.

| Where | Effect | Implementation |
|---|---|---|
| All section headings, cards, images | Fade-up on enter (opacity 0 → 1, y 24 → 0, 700ms, ease-out) | framer-motion `whileInView`, `viewport={{ once: true, amount: 0.3 }}` |
| Hero | Pinned elevation section: clouds drift apart on scroll and the floating labels become fully visible | Full timeline in §6.2 |
| Closer Look | Video poster fades/scales in on enter (no scroll-zoom, it is a click-to-play video) | `whileInView` |
| Comparison | Last row fade mask; "Get detailed comparison" reveals remaining rows | CSS mask-image + state |
| Glow dividers | Gentle pulse of the centre glow (opacity 0.7 ↔ 1, 3s loop) | CSS keyframes |
| Footer "A LIVING THAT'S ABOVE ALL" | Text rises into place and the gradient brightens as it enters view | `whileInView` + gradient `background-clip: text` |
| Buttons | Glow + lift on hover | Tailwind transitions |
| Carousels | Drag/swipe | Embla |

The large empty gaps in the desktop design (after the enquire card, after the closer-look image, before the footer text) are treated as **scroll-animation space**, not literal padding. ⚠ CONFIRM with the designer; if they are not animations, use normal section padding instead.

---

## 10. Form Handling

- `src/app/api/enquiry/route.ts`: accept `POST` with `{ name, email, phone, budget, consent, source }`; validate server-side; return `{ ok: true }`.
- Leave a clear `TODO` where the CRM / email / Google Sheet integration goes (⚠ CONFIRM destination with the client).
- Capture UTM parameters from the URL (`utm_source`, `utm_medium`, `utm_campaign`) and send them with the lead.
- Add basic spam protection: hidden honeypot field.

---

## 11. SEO, Crawlability & Quality (required: the page will be hosted and must be indexed by Google)

### 11.1 Rendering: all content must be in the HTML
- Build the page as a **statically rendered Server Component page** (`app/page.tsx` with no `"use client"` at the top). Next.js then sends fully rendered HTML, so Google and other bots see every heading, paragraph, FAQ answer and image alt text without running JavaScript.
- Only the interactive pieces are Client Components (`"use client"`): Hero scroll layers, Carousel, Accordion, EnquiryForm, VideoCard, motion wrappers. They must receive their text as props from Server Components so the text is still in the initial HTML.
- **Never hide content from the HTML:** accordion answers, collapsed location lists, carousel slides and the faded comparison row must all be rendered in the DOM (hidden visually with height/opacity, not removed). Do not use `display:none` on text that matters for SEO; never render text only after scroll.
- Animations may start at low opacity, but the text must exist in the server HTML.
- Real text everywhere: headings, labels ("210 HOMES" etc.) and prices are HTML text, never baked into images.

### 11.2 Metadata (Next.js Metadata API in `app/layout.tsx` / `app/page.tsx`)
- `metadataBase`: the final domain ⚠ CONFIRM.
- `title`: "Skyven Residences Kokapet | 4BHK Luxury Apartments from ₹6.5 Cr | Tallest Single Tower" (≤ 60–65 chars ideally; trim if needed).
- `description` (150–160 chars): e.g. "Skyven Residences: Kokapet's tallest single tower with 63 floors, only 210 4BHK homes, rooftop clubhouse on floors 62 & 63. Book a site visit today."
- `alternates.canonical: "/"`.
- `openGraph` (title, description, url, siteName "Skyven Residences", locale `en_IN`, type `website`, image `og-image.jpg` 1200×630) and `twitter` (`summary_large_image`).
- `robots: { index: true, follow: true }` on production only. Staging/preview deployments must be `noindex` (use an env variable such as `NEXT_PUBLIC_SITE_ENV`).
- Favicon set in `app/`: `icon.png` (512×512), `apple-icon.png` (180×180), `favicon.ico` (from the Skyven emblem).
- `<html lang="en">`; `themeColor` `#021021` via the `viewport` export.

### 11.3 Crawl files
- `app/robots.ts`: allow all, point to the sitemap; disallow `/api/`.
- `app/sitemap.ts`: the home URL with `lastModified` and `priority: 1`.
- After launch: submit the sitemap in Google Search Console and Bing Webmaster Tools.

### 11.4 Structured data (JSON-LD `<script type="application/ld+json">`, rendered on the server)
- `RealEstateListing` / `Residence` for the project (name, description, image, address SY no. 153, Gandipet Main Road, Kokapet, Hyderabad, Telangana 500075, IN; offers with price from ₹6.5 Cr, `priceCurrency: INR`).
- `Organization` for the developers (E-Infra & PVR Pingle) with logo and telephone +91 83400 06304.
- `FAQPage` with the three FAQs (text must match the visible FAQ exactly).
- Validate with Google's Rich Results Test before launch.

### 11.5 On-page SEO
- One `<h1>` (hero: "SKYVEN — KOKAPET'S TALLEST SINGLE TOWER"); every section title is an `<h2>`, feature/category titles `<h3>`. Eyebrows are `<p>`, not headings.
- Semantic landmarks: `<header>`, `<main>`, `<section aria-labelledby>`, `<footer>`, address in `<address>`.
- Every image has a descriptive `alt` that includes context (e.g. "Infinity rooftop swimming pool on floor 62 at Skyven, Kokapet"). Decorative cloud layers: `alt=""` + `aria-hidden`.
- Descriptive file names for images (already in §7).
- Phone and WhatsApp as real links (`tel:`, `https://wa.me/`).
- Videos: lazy embeds with a poster image; if YouTube, use `youtube-nocookie.com` and add `VideoObject` JSON-LD if the video URL is public.
- Map iframe lazy-loaded; the full address also appears as text in the footer.

### 11.6 Performance (Core Web Vitals are a ranking factor)
- Targets on mobile: **LCP < 2.5s, CLS < 0.1, INP < 200ms**; Lighthouse Performance ≥ 90, SEO = 100, Accessibility ≥ 95, Best Practices ≥ 95.
- Hero elevation image: `next/image` with `priority`, `fetchPriority="high"`, correct `sizes`, WebP/AVIF, under ~350KB on mobile. Cloud layers load right after (not lazy, they are above the fold) but are small WebP files.
- All other images lazy-loaded with fixed width/height or aspect-ratio boxes (no layout shift).
- Fonts via `next/font` (self-hosted, `display: swap`), no external font requests.
- Videos load only on click; no autoplaying video in the first screen.
- Keep client JavaScript small: import framer-motion features only where used (`LazyMotion` + `domAnimation`).
- **Hosting:** if the server runs Node.js (VPS, Vercel, Netlify), use the normal `next build && next start` (or the platform default). If it is static hosting only (cPanel, S3, plain Apache/Nginx), use `output: "export"` in `next.config.ts`; then `/api/enquiry` cannot run there, so the form must post to an external endpoint (CRM webhook, Google Apps Script, Formspree, etc.) and `next/image` needs `images.unoptimized: true` with pre-optimised WebP files ⚠ CONFIRM hosting (§13).

### 11.7 Analytics & tracking (if the client provides IDs)
- Google Tag Manager / GA4 via `@next/third-parties/google`, loaded after interaction-ready (does not block rendering).
- Fire a `generate_lead` event on successful form submit (with `source` = which form).
- Meta Pixel, if required, through GTM.

### 11.8 Accessibility
- Every image has meaningful `alt`; headings in order; form fields have labels (visually hidden is fine); text contrast AA; everything keyboard reachable with visible focus; `prefers-reduced-motion` respected.
- **No horizontal scroll** at any width from 320px to 2560px.

---

## 12. Build Order (prompts for Claude Code)

Run these one at a time in Claude Code and check the result in the browser after each:

0. "Read LANDING_PAGE_SPEC.md. Do §7.1: check my assets folder, move it into public/assets, rename the section folders and files, open every image, and show me the mapping table. Don't build anything yet."
1. "Do §2 project setup and §3 tokens/fonts. Render a test page showing the colours and type scale."
2. "Build the §5 UI components (Button, SectionHeading, GlowDivider, Accordion, Carousel, EnquiryForm, VideoCard) and the §8 content file."
3. "Build §6.1 Header and §6.2 Hero for all three breakpoints. Compare with design-reference screenshots."
4. "Build §6.3 Enquire Bar and §6.4 Comparison (table on md+, accordion on mobile)."
5. "Build §6.5 Closer Look, §6.6 USP's, §6.7 Rooftop Clubhouse, §6.8 Construction Update."
6. "Build §6.9 Clubhouse 4-6 and §6.10 Location."
7. "Build §6.11 Engineering and §6.12 Gallery."
8. "Build §6.13 FAQ, §6.14 Landmarks, §6.15 Map, §6.16 Footer."
9. "Add §9 motion, respecting reduced motion."
10. "Add §10 form handling and everything in §11 (metadata, robots, sitemap, JSON-LD, performance). Run `npm run build`, then check the page source (View Source) to confirm all text is in the HTML. Fix all errors."
11. "Go through the §14 checklist and report anything that doesn't match."

---

## 13. Open Questions (⚠ CONFIRM in Figma or with the designer)

### Hero scroll section
Confirmed: 3 cloud layers (band, left, right) + tall elevation image + text labels; same animation on mobile and tablet.
Still open (the §6.2 proposal is used until answered):
1. Exact X/Y of each cloud and label layer in Figma (right panel), for the 1920, 1440 and 375 frames.
2. Mobile versions of the elevation and cloud images, if the crops differ.
3. Whether the client wants plain parallax (recommended) or a pinned/sticky reveal.
4. Whether the ~830px dark space under the Enquire card is intentional.

### Rest of the page
5. Where will the site be hosted (Vercel, a Node.js server/VPS, or static hosting such as cPanel/S3)? This decides between a Node build and a static export (§11.6).
6. Final domain name (needed for canonical URL, sitemap and Open Graph).
7. Tracking: Google Analytics 4 / Google Tag Manager / Meta Pixel IDs, if any.
8. Gold headings on the cream band: `#E5D37D` or a darker/gradient gold (see §3.1 note)?
9. Exact font sizes and Karla weights for each text style.
10. Budget dropdown options.
11. Fourth comparison row content (label ends "…per floor") and what "Get detailed comparison" does.
12. Healthcare and Lifestyle location entries.
13. Is the header sticky? Is there a floating WhatsApp/call button on mobile?
14. The large empty gaps after the "closer look" video and before the footer text: animation space or just spacing?
15. Where should form submissions go (CRM, email, Google Sheet)?
16. Google Maps embed URL / exact pin.
17. Corner radius: confirm all corners are sharp.

---

## 14. Acceptance Checklist

- [ ] Section order and all copy match §6 exactly (spelling, ₹ symbols, en dashes).
- [ ] Colours and fonts match Figma at all three breakpoints.
- [ ] 1920 and 1440 match the desktop frames exactly; 375 matches the mobile frame; 360, 768 and 1024 look correct (no frame); no horizontal scroll at any width.
- [ ] Hero stats, enquire form, comparison table, location, engineering, gallery and footer switch layouts as in §4.
- [ ] Both forms validate, require consent, submit to `/api/enquiry`, show loading + success states.
- [ ] "Enquire Now" in the header scrolls to the enquire form.
- [ ] Phone link dials, WhatsApp link opens chat.
- [ ] All carousels swipe on touch and drag on desktop.
- [ ] Accordions work by keyboard and screen reader (`aria-expanded`).
- [ ] Animations are smooth and disabled under `prefers-reduced-motion`.
- [ ] Every image is from `public/assets`, uses `next/image`, has alt text.
- [ ] `npm run build` passes with no TypeScript or ESLint errors.
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, SEO = 100.
- [ ] View Source shows all headings, paragraphs, FAQ answers and location lists as text (not only after JavaScript runs).
- [ ] `/robots.txt` and `/sitemap.xml` load; JSON-LD passes Google's Rich Results Test; Open Graph preview looks right (e.g. when the link is shared on WhatsApp).
- [ ] Staging/preview builds are `noindex`; production is indexable.
