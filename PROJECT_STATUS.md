# The Last Refuge: Project Status

_Last updated: 2026-11-21_

## Completed
- **Phases 1–3:** research, audit, creative direction ("An Order of Service"), design system, IA. See `docs/`.
- **Phase 4, core build:** Next.js 16 / React 19 / Tailwind v4. Routes: `/`, `/reservations`, `/menus`, `/whiskey`, `/sanctuary`, `/private-events`, `/events`, `/visit`, a 404 page, plus the old-URL redirects.
- **Phase 5, motion:** CSS hero entrance; GSAP reveals, parallax, hymn-board numerals and the pinned **Look up** Chapel scene (desktop only, loaded at idle); an IntersectionObserver/CSS reveal path for phones and tablets; Lenis smooth scroll on desktop with a fine pointer only. Reduced motion turns all of it off.
- **Phase 6, responsive:** swept all 9 routes at 360/390/430/768/1024/1280/1440/1920/2560. No horizontal overflow. Art-directed hero (portrait façade on phones, courtyard on tablet and up). Sticky mobile action bar (Menu · Call · Reserve).
- **Phase 7, SEO/perf:** per-route titles, descriptions, canonicals, OG/Twitter; JSON-LD `BarOrPub`+`Restaurant` (address, geo, hours, menu, reservations), `Menu`, and `Event` (from live calendar data only); sitemap, robots; local AVIF/WebP images; self-hosted fonts.
- **Phase 8, QA:** see results below.

## QA results (local production build, 21 Nov 2026)
Lighthouse mobile, default simulated throttling:

| Route | Perf | A11y | Best Pr. | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|
| / | 92 | 100 | 100 | 100 | 3.2 s | 110 ms | 0 |
| /menus | 96 | 100 | 100 | 100 | 2.7 s | 60 ms | 0 |
| /whiskey | 94 | 100 | 100 | 100 | 2.8 s | 130 ms | 0 |
| /private-events | 92 | 100 | 100 | 100 | 3.3 s | 50 ms | 0.026 |
| /reservations | 95 | 100 | 79* | 100 | 2.9 s | 70 ms | 0 |
| /sanctuary | 90 | 99→100† | 100 | 100 | 3.4 s | 50 ms | 0.02 |
| /events | 95 | 100 | 79* | 100 | 2.9 s | 50 ms | 0 |
| /visit | 95 | 100 | 100 | 100 | 2.8 s | 50 ms | 0.001 |

\* Third-party cookies set by the OpenTable / Surreal widgets. This is outside our control.
† The redundant-alt issue in the gallery was fixed after this run.

Notes on the numbers:
- **The LCP target of ≤ 2.5 s is not yet met under simulated mobile throttling** (2.7–3.4 s). With DevTools throttling it measures 1.9–2.9 s. Measured on localhost with no CDN, so production on a CDN edge should improve TTFB. **Re-measure after deploy before claiming the target.**
- With DevTools throttling, some routes show 700–800 ms TBT. That comes from the venue's GTM container loading its Facebook pixel, which only fires after interaction or 5 s idle.
- Functional checks: all 29 internal links and anchors resolve; 14/16 external links return 200 (Instagram 429 and OpenTable 503 reject automated clients; both URLs are correct). The mobile menu has a focus trap, closes on Escape, and returns focus to its toggle. The skip link works. The allergen filter, whiskey search/shelf/sort, the `?q=` and `?shelf=` deep links, and the homepage search → `/whiskey` all work. No-JS renders all content, including all 945 whiskeys. Reduced motion disables Lenis, the pin and reveals. No console errors from our code.

## Remaining / next
1. Deploy a preview (Netlify or Cloudflare Pages) and re-run Lighthouse and WebPageTest on the real CDN.
2. Verify the OpenTable widget renders in a real browser. Headless Chrome is bot-blocked by OpenTable, and the direct "Book on OpenTable" link is always shown as a fallback.
3. Client inputs below, then content refinements.

## Deployment
- **Cloudflare Pages, static export.** `next.config.ts` uses `output: "export"`, and `npm run build` writes the full site to `out/`. Pushes to `claude/jolly-galileo-sjje1f` auto-deploy.
- Replacements for server-only features: build-time WebP variants with a custom `next/image` loader; `public/_redirects` and `public/_headers`; whiskey data built in and refreshed client-side; homepage event list and whiskey count frozen at build time (they refresh on each deploy).

## Technical decisions
- No WebGL in v1 (see `docs/02-creative-direction.md` §6). No Framer Motion. GSAP is desktop-only and dynamically imported.
- The whiskey list stays in the bar team's Google Sheet. It is read at build time (with the snapshot fallback in `content/whiskey-snapshot.json`) and re-read in the browser on `/whiskey`.
- The live count "945 whiskeys on the list tonight" is computed from the sheet and never hard-coded.
- Founding year is shown as 1880 (the venue's claim; press says 1879).
- GTM is deferred to first interaction or idle.

## Known issues
- No video assets exist, so the hero uses stills.
- No food photography exists, so the menu is typographic by design.
- Room capacities are unverified and shown as "Ask the events team".
- Hours conflict: site (Wed–Sun) vs OpenTable (Thu–Sat). The site version is used. **Confirm with the client.**
- No newsletter signup: the Squarespace form can't be carried over. A provider is needed.
- The Surreal widget iframe logs its own React hydration error (inside their iframe).

## Asset requirements (from client)
High-res originals of the 2025 shoot · vector logo/crest · any b-roll (would enable a video hero) · room capacities/amenities · newsletter provider · confirmation of hours.
