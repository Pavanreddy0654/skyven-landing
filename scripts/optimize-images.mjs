// One-off image optimisation (Step 0 follow-up).
// Reads originals from design-source/originals/ and writes web versions into public/assets/.
// Re-run after dropping in new 2x exports: `node scripts/optimize-images.mjs`
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const SRC = "design-source/originals";
const OUT = "public/assets";
const kb = (f) => Math.round(fs.statSync(f).size / 1024);

async function webp(rel, outRel, opts = {}, pipe = (p) => p) {
  const out = path.join(OUT, outRel);
  await pipe(sharp(path.join(SRC, rel))).webp({ quality: 78, effort: 6, ...opts }).toFile(out);
  console.log(`${outRel}\t${kb(out)} KB`);
}

async function jpeg(rel) {
  const out = path.join(OUT, rel);
  await sharp(path.join(SRC, rel)).jpeg({ quality: 80, mozjpeg: true }).toFile(out);
  console.log(`${rel}\t${kb(path.join(SRC, rel))} KB -> ${kb(out)} KB`);
}

// Hero: crop the elevation to its opaque part (the bottom of the PNG is empty).
const elevation = path.join(SRC, "hero/hero-elevation.png");
const { width: W, height: H } = await sharp(elevation).metadata();
const { data } = await sharp(elevation).ensureAlpha().extractChannel(3).raw().toBuffer({ resolveWithObject: true });
let opaqueH = H;
while (opaqueH > 0 && data[(opaqueH - 1) * W + Math.floor(W / 2)] === 0) opaqueH--;
console.log(`elevation opaque height: ${opaqueH}`);

await webp("hero/hero-elevation.png", "hero/hero-elevation.webp", { quality: 72 }, (p) =>
  p.extract({ left: 0, top: 0, width: W, height: opaqueH }).flatten({ background: "#021021" }),
);
// Mobile: the 375 frame shows the tower ~2.6x smaller than the full frame width, so crop a
// 976px-wide window centred on the tower (x ≈ 959) and export at 750px (2x of 375).
await webp("hero/hero-elevation.png", "hero/hero-elevation-mobile.webp", { quality: 72 }, (p) =>
  p
    .extract({ left: 959 - 488, top: 0, width: 976, height: opaqueH })
    .flatten({ background: "#021021" })
    .resize({ width: 750 }),
);
for (const c of ["band", "left", "right"]) {
  await webp(`hero/hero-cloud-${c}.png`, `hero/hero-cloud-${c}.webp`, { quality: 80, alphaQuality: 80 });
}

// Video posters
await webp("posters/closer-look-poster.png", "posters/closer-look-poster.webp");
await webp("posters/usps-poster.png", "posters/usps-poster.webp");

// Photos over 500 KB: recompress in place, keeping the same file names.
const walk = (d) =>
  fs.readdirSync(path.join(SRC, d), { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)],
  );
for (const rel of walk("")) {
  if (/\.jpe?g$/i.test(rel) && fs.statSync(path.join(SRC, rel)).size > 500 * 1024) await jpeg(rel);
}
