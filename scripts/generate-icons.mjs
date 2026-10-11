// Generates the favicon set and the Open Graph image (§7.3, §11.2).
//   app/icon.png (512), app/apple-icon.png (180), app/favicon.ico (16/32/48): bird emblem from the footer logo
//   public/og-image.jpg (1200×630): cropped from the original hero elevation
// Re-run after replacing the logo: `node scripts/generate-icons.mjs`
import sharp from "sharp";
import fs from "node:fs";

const NAVY = "#021021";
const LOGO = "public/assets/brand/logo-footer.png";
const EMBLEM_ROWS = 71; // the bird sits above the "SKYVEN" wordmark (rows 0–70 of the 215×113 logo)

const { width } = await sharp(LOGO).metadata();
const band = await sharp(LOGO).extract({ left: 0, top: 0, width, height: EMBLEM_ROWS }).png().toBuffer();
const emblem = await sharp(band).trim().png().toBuffer();

async function icon(size) {
  const mark = await sharp(emblem).resize({ width: Math.round(size * 0.84) }).png().toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background: NAVY } })
    .composite([{ input: mark, gravity: "center" }])
    .png()
    .toBuffer();
}

fs.writeFileSync("src/app/icon.png", await icon(512));
fs.writeFileSync("src/app/apple-icon.png", await icon(180));

// favicon.ico: ICO container holding PNG images (supported by all current browsers)
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map(icon));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = sizes.map((size, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(size, 0);
  e.writeUInt8(size, 1);
  e.writeUInt16LE(1, 4);
  e.writeUInt16LE(32, 6);
  e.writeUInt32LE(pngs[i].length, 8);
  e.writeUInt32LE(offset, 12);
  offset += pngs[i].length;
  return e;
});
fs.writeFileSync("src/app/favicon.ico", Buffer.concat([header, ...entries, ...pngs]));

// Open Graph image: sky, crown and tower from the elevation (tower crown ≈ y 717, base ≈ y 1434)
await sharp("design-source/originals/hero/hero-elevation.png")
  .extract({ left: 0, top: 440, width: 1920, height: 1008 })
  .flatten({ background: NAVY })
  .resize(1200, 630)
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile("public/og-image.jpg");

console.log("icons and og-image written");
