// Build-time responsive images for the static export.
// next/image's runtime optimizer needs a server, so every width the site can
// request (next.config.ts deviceSizes + imageSizes) is pre-rendered here as WebP,
// and lib/image-loader.ts points next/image at these files.
import sharp from "sharp";
import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";

const SRC = "public/images";
const OUT = "public/_img";
export const WIDTHS = [256, 384, 390, 640, 828, 1080, 1440, 1920, 2400];

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png)$/i.test(f));
let made = 0;
const t0 = Date.now();
await Promise.all(
  files.map(async (file) => {
    const name = file.replace(/\.[^.]+$/, "");
    const input = path.join(SRC, file);
    const srcTime = (await stat(input)).mtimeMs;
    for (const w of WIDTHS) {
      const out = path.join(OUT, `${name}-${w}.webp`);
      const existing = await stat(out).catch(() => null);
      if (existing && existing.mtimeMs >= srcTime) continue;
      await sharp(input)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: 72, effort: 4 })
        .toFile(out);
      made++;
    }
  }),
);
console.log(`[images] ${files.length} sources × ${WIDTHS.length} widths: ${made} generated in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
