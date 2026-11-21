# Phase 2–3 — Creative Direction, Design System, Information Architecture

## 1. The idea: **"An Order of Service"**

The venue already calls itself **a High Church of Bourbon**. We don't need to invent a metaphor. We need to commit to the one the brand owns, with the wit its menu already has.

A church hands every visitor a printed **order of service**: a bulletin that sets out the evening's sequence, the hymn numbers and the readings. The website *is* that bulletin. You arrive, are welcomed, look up at the painted sky, approach the altar of bourbon, break bread, hear the music, and are sent forth to make a reservation.

**Tone: reverent architecture, irreverent voice.** The building is treated with real seriousness: quiet type, generous space and real history. The copy is allowed to wink, as *Meat Jesus* and *Judas Loved Chocolate* already do. The tension between the two is the brand. Most "luxury bourbon" sites are all reverence and no personality. This one has both.

Working title for the art direction: **"The Sacred After Dark"**, as proposed in the brief. It is kept, because the photography is literally that: stained glass lit from inside at night.

### What makes it impossible to mistake for a template
Three signature devices, all drawn from real objects in a real church:

1. **The Hymn Board.** Wooden church hymn boards display slotted numbers. We use that object as the site's numbering system: section indices (`No. 03`), the hours board in the footer (slotted day and hour tiles) and, subtly, menu prices. The numbers slide into their slots when they come into view. It is a single, consistent micro-motion and not decoration.
2. **Stained-glass light.** No glassmorphism. Colour on the site comes *from the photographs*: each section takes an accent sampled from its own stained glass (ruby, cobalt, amber, verdigris) as a soft light spill on the charcoal ground, as if light is falling through a window onto stone. Most of the UI stays monochrome (charcoal, parchment, brass), so the colour lands.
3. **The Look Up.** The Chapel Room's painted ceiling is the most remarkable thing in the building. On scroll, the viewport "tilts its head back": the photo pans from the floor and lancet windows up into the painted sky, while the line *"Look up."* holds still. It is one cinematic moment and is reserved for this place only.

Supporting motifs, used sparingly: the **lancet arch** as an image mask (hero frame and space cards; this is the building's own window shape), the **TLR crest** as a watermark or seal, and **Dylan as scripture**. Real lyrics are already used by the venue, and cocktail names are Dylan songs, so we set them as "readings". No more than one quotation per page, and each is attributed.

### What we will *not* do
- No 3D bottle. There is no official model, a fake bottle would misrepresent product, and it adds weight for nothing. *(See §6 for the one place WebGL is justified, and why it is deferred.)*
- No custom cursor, no floating particles, no smoke loops, no generic "speakeasy" gold filigree.
- No AI-generated food or venue images. There is no food photography yet, so the food menu leads with type and the venue's own wit, not stock plates.
- No invented capacities, awards, reviews or history.

---

## 2. Narrative structure (homepage)

The structure follows the order of service. Each section carries its hymn-board number and the title of a part of the service as a small label; the real headline does the work.

| No. | Liturgical label | Content | Primary asset | Conversion |
|---|---|---|---|---|
| 01 | **Prelude** | Full-bleed night exterior (spire, stained glass glowing). Wordmark, *"A High Church of Bourbon."* NuLu · Louisville · Since 1880. | #24 dusk spire (portrait/mobile), #08 courtyard night (desktop) | Reserve a Table · Explore |
| 02 | **Invocation** | The Dylan epigraph, set large. One paragraph: a church built in 1880 for a German-speaking congregation, then a gym where someone painted "refuge in Kentucky" on the floor, and now the home of Heaven's Door. | Crest | — |
| 03 | **The Sanctuary** | Architecture story: brick, lancet windows, the gym, the courtyard, in layered image reveals → **The Look Up** (Chapel ceiling). | #11, #13, #02, #23/#27, #12 | → Private Events |
| 04 | **The Altar** | The back bar. A live count, "**{n} whiskeys on the list tonight**", is computed from the staff-maintained sheet. Heaven's Door bottles are spotlit, and a search field lets you search the back bar. | #07, #19, #01 | → /whiskey |
| 05 | **Communion** | Food and cocktails with the venue's names given room. Three signature cocktails as "readings" (name = Dylan song). | #22, #16, #05 | → /menus |
| 06 | **Hymns** | Live music and Vinyl Revival nights. The next three events are pulled from Surreal. | #10 courtyard night | → /events |
| 07 | **Fellowship** | Private events: the Chapel Room, the Gym, the lounges and the courtyard. | #27, #18, #15, #14 | Enquire |
| 08 | **Directions** | Map, hours on the hymn board, 21+ notice, phone and email. | #04 drone pano | Directions · Call |
| 09 | **Benediction** | *"Go in peace. Come back thirsty."* Large final reservation CTA. | #21 friends entering | Reserve |

The copy line above is a proposal and follows the menu's register. All copy is in `content/` so the client can edit it.

---

## 3. Site map (clean URLs)

```
/                     Order of Service (narrative homepage)
/reservations         OpenTable widget + patio note + large-party → events
/menus                Food · Cocktails · Zero Proof · Wine · Beer · Exclusive Bottles
/whiskey              The Back Bar: searchable live whiskey list (6 shelves)
/sanctuary            The building: history, spaces, photo essay
/private-events       Spaces, event types, Tripleseat enquiry form, room blocks
/events               Live music & whiskey events (Surreal)
/visit                Hours, directions, parking/transit note, 21+, contact
/gift-cards           → swipeit (external, but routed so it is linkable from nav)
```
Global: **Reserve** is always visible in the nav. On mobile a **sticky bottom bar** shows *Reserve · Menu · Call*. The footer carries the hymn-board hours, the address, the 21+ notice, socials, Atomic Hospitality's concepts and careers.

---

## 4. Design system

### Colour (tokens)
| Token | Hex | Use |
|---|---|---|
| `nave` | `#14110F` | Base ground: warm charcoal, never pure black |
| `pew` | `#221C17` | Raised surfaces, deep brown |
| `oak` | `#3A2C22` | Hairline borders, wood |
| `brass` | `#B8945A` | Accent, rules, numerals; ≥ 4.5:1 on `nave` for text use |
| `amber` | `#D9A35B` | Hover / active, "bourbon in the glass" |
| `parchment` | `#EFE6D6` | Primary text on dark; light sections' ground |
| `vellum` | `#B9AE9C` | Secondary text (checked ≥ 4.5:1 on `nave`) |
| `ink` | `#1B1612` | Text on parchment |
| `communion` | `#6E1E2A` | Burgundy, used very sparingly (live/"tonight" states, focus underline on light) |
| glass accents | ruby `#9E2B2F`, cobalt `#2B4C8C`, verdigris `#3F7A6B` | Only as light spills sampled from photos, never as UI fills |

The site is dark by default (the venue is a night place). **Parchment sections** (Invocation, menus, the bulletin-like pages) give contrast and readability. They are the paper of the order of service.

### Typography
- **Display: *Libre Caslon Display*.** Caslon is the face of 18th- and 19th-century American printing, of hymnals and of founding documents. It reads as heritage without "luxury template" cliché (no Cormorant, no Playfair).
- **Text serif / italics: *Libre Caslon Text*.** Used for readings, quotes and long-form story.
- **Sans: *Instrument Sans*.** Contemporary and highly legible at small sizes on mobile, with good tabular figures for prices and proof.
- **Nod to existing brand:** the current site uses Josefin Sans and Courier Prime. We retire them; the crest and wordmark carry continuity.
- Labels: sans, uppercase, +0.18em tracking, 12–13px. Numerals for the hymn board: Caslon lining figures in brass.
- Fluid scale (`clamp`): 13 · 15 · 17 (body) · 21 · 28 · 40 · 60 · 96 · 160 (hero only). Body 17px mobile / 18px desktop, measure ≤ 68ch, line-height 1.6.
- Fonts are self-hosted via `next/font`, subset, `display: swap`, and only the display weight preloaded.

### Space & grid
- 4px base; spacing scale 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 192.
- 12-column grid, 1440 max content width with full-bleed escapes. Gutters 16 (mobile) → 24 → 40. Section rhythm 96–192px vertical; mobile 64–96px.
- Editorial asymmetry: images rarely sit centred in equal columns. Compositions borrow from book design, with a narrow text column against a wide image and offset captions.

### Components (not "cards everywhere")
- **Buttons**: secondary is a **brass outline that fills on hover**, with sharp corners and a label in tracked sans. Primary (Reserve) is solid parchment with ink text, which holds up on any photograph. Every button has a 44px minimum target and visible focus (2px amber outline, 3px offset).
- **Lancet frame**: CSS `clip-path` / SVG mask with a pointed-arch top, used for hero inset and space tiles.
- **Hymn board**: numbered tile component used for section numbers, the hours board and event dates.
- **Menu line**: name (Caslon) … dotted leader … price (sans tabular); ingredients set as the venue writes them, joined with `·`; allergen chips in small caps; a `GF available` marker.
- **Whiskey ledger row**: name, proof, 1oz, 2oz; sortable; search with instant filter.
- **Reading**: large italic quote with a brass rule and attribution.

### Image treatment
- The real photography is HDR-heavy. We apply a consistent grade through CSS: a light warm overlay and a vignette on dark sections, **never filters that change what the place looks like**.
- Aspect ratios: 4:5 portraits for mobile hero crops, 3:2 and 21:9 for desktop. `object-position` is art-directed per breakpoint.
- All images go through `next/image` (AVIF/WebP, responsive `sizes`, blur placeholder). Alt text is written as descriptions, not filenames.

### Motion principles
- **One idea per section, never constant motion.** Easing `cubic-bezier(.2,.7,.1,1)` ("slow exhale"); durations 600–1200ms for reveals, 180–240ms for UI.
- Vocabulary: (1) masked line reveals for headlines, (2) image unveil through a rising lancet mask, (3) hymn-board numeral slot-in, (4) slow parallax ≤ 8% on full-bleed photos, (5) **The Look Up** (pinned scroll scene, desktop and tablet; on mobile it becomes a gentle auto-pan on enter).
- **GSAP + ScrollTrigger** for scroll scenes, with **Lenis** for smooth scroll on desktop only. No Framer Motion: CSS handles UI transitions, and adding both would duplicate libraries.
- `prefers-reduced-motion`: every scene degrades to static, readable compositions; no smooth scroll; no parallax.

---

## 5. Key experiences

### The Back Bar (`/whiskey`)
This is the strongest functional upgrade and a real reason to visit the site. Staff already maintain the Google Sheet, so **they keep editing it as they do now.**
- Server fetch of the 6 CSV tabs with ISR (`revalidate: 900`), parsed into typed data. The page is **server-rendered and indexable**. If the sheet is unreachable it falls back to a build-time snapshot.
- Shelves as tabs: Bourbon · Rye · American · International · Flavored · Heaven's Door. Instant search across all shelves, sort by name/proof/price, a "Barrel proof (≥ 110)" filter, and a price shown as 1oz / 2oz.
- Rows where price is `xxx` (not poured at that size) display "—". Empty prices display "Ask your bartender".
- The Heaven's Door shelf gets editorial treatment (#07 photograph).

### Menus (`/menus`)
- Sticky category rail (scroll-spy) on desktop and a horizontal snap rail on mobile. Food data is structured from the live menu (`content/menu.ts`).
- Allergen and dietary filtering ("hide items containing: dairy, gluten, tree nuts…") uses the venue's own allergen data, with a notice to tell the server about allergies.
- Pizza prices are re-modelled cleanly: 12″ / 16″ / GF 20″.
- No PDF required.

### Private events (`/private-events`)
- Opens with the Chapel Room ceiling. Event types: weddings & receptions, rehearsal dinners, corporate gatherings, celebrations, bourbon tastings. These are offered as possibilities, not as claims.
- The four spaces are named as in the venue's own image files: **Chapel Room · Gym · Lounges · Courtyard**. Capacities will show **"Ask us"** until the client confirms them.
- **Tripleseat form** embedded via its official script. The page also links to The Room Block Source for accommodation.

### Reservations
- The OpenTable integration uses rid `1335805` through OpenTable's official widget on `/reservations`, plus deep links (`opentable.com/r/the-last-refuge-louisville`) from every CTA. We don't rebuild booking.
- The patio note is preserved. Parties beyond normal size are pointed to private events.

---

## 6. 3D / WebGL decision
**No WebGL in v1.** The brief asks for 3D only where it serves the story. The two candidates:
- *3D bottle*: rejected (no official model; risk of misrepresenting product; no gain over the real photograph of the Heaven's Door shelf).
- *Light through stained glass* (a shader that "projects" window colour across the Chapel ceiling image as you scroll): this is plausible and on-brand. **It is deferred to Phase 5** and will only ship if it lands under 30KB gz, lazy-loads after LCP, is desktop-only, and is clearly better than the CSS light-spill. Otherwise it stays out.

---

## 7. Technical architecture
- **Next.js (App Router) + TypeScript + Tailwind CSS v4** (tokens as CSS variables) + targeted CSS modules for complex scenes.
- **GSAP/ScrollTrigger + Lenis**, dynamically imported, client components only where motion lives. Content and layout are server components.
- Structure:
  ```
  app/                 routes, metadata, sitemap.ts, robots.ts, opengraph images
  components/layout/   Header, MobileReserveBar, Footer, HymnBoard
  components/sections/ homepage sections (one file each)
  components/ui/       Button, LancetFrame, Reading, MenuLine, Ledger
  components/motion/   Reveal, LookUp, Parallax (client, reduced-motion aware)
  content/             site.ts (facts), menu.ts, copy.ts, spaces.ts, images.ts
  lib/                 whiskey.ts (sheet fetch/parse), events.ts, seo.ts
  public/images/       optimised local copies of venue photography
  ```
- **SEO**: per-route metadata, canonical URLs, `sitemap.ts`, `robots.ts`, JSON-LD `BarOrPub` + `Restaurant` (address, geo, hours, `servesCuisine`, `acceptsReservations`, `hasMenu`), `Menu` schema for /menus, `Event` schema only from real Surreal data, and OG images from real photography.
- **Performance budget**: LCP image ≤ 180KB AVIF with `priority`; initial JS ≤ 120KB gz on the homepage; GSAP loaded after first paint; fonts ≤ 3 files preloaded. Lighthouse mobile is measured and reported, not assumed.
- **Hosting**: Netlify or Cloudflare Pages (both connected to this environment). The client's DNS stays as is until sign-off.

---

## 8. Phase plan
1. ✅ Research & audit
2. ✅ Creative direction & design system (this document)
3. ✅ IA & UX (§2–3)
4. Core build: tokens, layout, all routes with real content, integrations
5. Motion: reveals, hymn board, The Look Up, parallax, reduced-motion paths
6. Responsive pass: 360 / 390 / 430 / 768 / 1024 / 1280 / 1440 / 1920 / 2560
7. SEO & performance: schema, sitemap, Lighthouse runs, image budgets
8. QA: every route, link, CTA, form, console, a11y (axe), keyboard
9. Polish
