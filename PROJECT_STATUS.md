# The Last Refuge: Project Status

_Last updated: 2026-11-21_

## Completed
- Phase 1 Research & audit → `docs/01-research-audit.md`
- Phase 2–3 Creative direction, design system, IA → `docs/02-creative-direction.md`
- Live whiskey sheet snapshot (6 tabs, ~940 rows) → `research/whiskey-sheet/`
- Image inventory + contact sheet → `research/`

## Current
- Awaiting sign-off on the creative direction ("An Order of Service") before Phase 4 build.

## Remaining
Phase 4 core build → 5 motion → 6 responsive → 7 SEO/perf → 8 QA → 9 polish.

## Technical decisions
- Next.js App Router + TS + Tailwind v4; GSAP/ScrollTrigger + Lenis (desktop only); no Framer Motion; no WebGL in v1.
- Keep the providers: OpenTable (rid 1335805), Tripleseat (form 5699), Surreal (events), Google Sheet (whiskey list, ISR 15 min + snapshot fallback).
- Fonts: Libre Caslon Display/Text + Instrument Sans, self-hosted.
- Founding year shown as 1880 (venue's own claim; press says 1879).

## Known issues / risks
- No video assets exist. The hero uses stills until footage is supplied.
- No food photography. The food menu is typographic by design.
- Room capacities are unverified and show "Ask us".
- Hours conflict between the site (Wed–Sun) and OpenTable (Thu–Sat). The site version is used.
- The newsletter needs a provider (Squarespace form is retired).

## Asset requirements (from client)
High-res originals of the 2025 shoot · vector logo/crest · any b-roll · capacities · newsletter provider.

## Performance concerns
HDR photography is large. Re-encode to AVIF with a ≤ 180KB LCP target. Lazy-load GSAP. Load the Tripleseat and OpenTable scripts only on their own routes.
