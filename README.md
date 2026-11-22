# The Last Refuge: website

A High Church of Bourbon at 600 East Market Street, Louisville. This is the website for the venue, built with Next.js (App Router), TypeScript and Tailwind CSS v4.

- Strategy and research: [`docs/01-research-audit.md`](docs/01-research-audit.md), [`docs/02-creative-direction.md`](docs/02-creative-direction.md)
- Status, decisions and open items: [`PROJECT_STATUS.md`](PROJECT_STATUS.md)

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export → out/ (deployed by Cloudflare Pages)
npm start          # serves out/ locally
```

Node 22 (see `.node-version`). **Deploys:** pushing to `claude/jolly-galileo-sjje1f` triggers Cloudflare Pages, which runs `npm run build` and publishes `out/`.

`npm run build` first runs `prebuild`, which generates responsive WebP variants of every photo into `public/_img/` (git-ignored). Static export has no runtime image optimizer, so `lib/image-loader.ts` points `next/image` at these files.

## Where things live

| What | Where |
|---|---|
| Address, phone, hours, links, provider IDs | `content/site.ts` |
| Food, cocktails, wine, beer (names, prices, allergens) | `content/menu.ts` |
| Event spaces | `content/spaces.ts` |
| Photography and alt text | `public/images/` + `content/images.ts` |
| Whiskey list | **The bar team's Google Sheet** (unchanged). Read at build time into the HTML, then re-read in the browser on `/whiskey` |
| Live events | The venue's Surreal calendar: build-time list via `lib/events.ts`, plus the live embedded calendar on `/events` |
| Homepage sections (one file each) | `components/sections/` |
| Motion (GSAP desktop / IntersectionObserver mobile) | `components/motion/` |

### Updating content
- **Whiskey:** edit the Google Sheet exactly as today. The `/whiskey` list picks up changes on the next page load. The homepage count updates on the next deploy. If the sheet becomes unreachable, the site falls back to `content/whiskey-snapshot.json`. Refresh the snapshot with `node scripts/snapshot-whiskey.mjs`.
- **Hours / menu:** edit `content/site.ts` or `content/menu.ts`. The hours board, the "open now" status and the structured data all update from these files.
- **Photos:** `npm run assets` re-downloads the venue photography from the current Squarespace CDN. To swap in high-res originals, replace the files in `public/images/` (same names) and update `content/image-dimensions.json`.

## Integrations (all preserved from the current site)
- **Reservations:** OpenTable, restaurant id `1335805`. Every "Reserve" CTA leads to `/reservations`, which shows the widget plus a direct OpenTable link.
- **Private events:** the Tripleseat lead form (id `5699`) on `/private-events#enquire`.
- **Events:** the Surreal widget on `/events`.
- **Analytics:** GTM `GTM-NZFTH7PC`. It is deferred until the first interaction or 5 seconds of idle time.
- Old URLs redirect (`public/_redirects`): `/whiskey-list → /whiskey`, `/photos → /sanctuary`, `/contact → /visit`, `/gift-cards →` swipeit. Cache headers are in `public/_headers`.
