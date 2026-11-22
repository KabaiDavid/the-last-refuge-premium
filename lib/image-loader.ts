// next/image loader for the static export. Maps a local image and a requested
// width to the WebP variant generated at build time by scripts/optimize-images.mjs.
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  if (!src.startsWith("/images/")) return src;
  const name = src.slice("/images/".length).replace(/\.(jpe?g|png)$/i, "");
  return `/_img/${name}-${width}.webp`;
}
