# Phase 1 — Research & Audit

Researched 21 Nov 2026 from the live site (thelastrefuge.com, Squarespace), its embedded data sources, and press coverage. **Verified** = stated by the venue itself or by named press. Anything else is marked as unverified and must not ship as fact.

---

## 1. Verified facts

### Identity & positioning (venue's own words)
- **"The Last Refuge is a High Church of Bourbon located in Downtown Louisville."** This is the brand's own positioning line, and the strongest one available.
- The homepage epigraph is Bob Dylan, *"Gotta Serve Somebody"* (1979): *"It may be the devil or it may be the Lord / But you're gonna have to serve somebody."*
- Photos page headline: **"TAKE REFUGE."** *"The Last Refuge resides within a historic church originally built in 1880 and located on the corner of East Market and Hancock in the Nulu district of downtown Louisville."*
- Operated by **Atomic Hospitality** (footer © and careers link, atomichg.com). Sister concepts are listed in the footer: City Hall, Bar Tabu, Tetto, Recess, Untitled Supper Club, Artifact Events, Morgan MFG.
- It is the brand home of **Heaven's Door** (Bob Dylan's whiskey brand). Several menu items are built on Heaven's Door, the back bar has a dedicated Heaven's Door bottle list, and a *Heaven's Door Refuge Rye* is listed.

### Building history (press, Courier Journal via Yahoo, May 2023)
- Built for a **German-American congregation**. Services were held in German until anti-German sentiment during WWI ended the practice.
- Later home to the Church of Our Lord Jesus Christ of the Apostolic Faith for 20+ years. It has also been referred to as Market Street United Methodist Church and the Refuge in Kentucky Church.
- The name came from the gym: the words **"refuge in Kentucky"** were painted on the floor of the old gymnasium. *"The idea for the brand center's name, the Last Refuge, was sparked in the old gymnasium."*
- The gymnasium, connected at the south end of the church, has **~25 ft ceilings** and now houses the restaurant and whiskey bar. A courtyard connects the two buildings.
- Plans called for the **church organ** to become part of the back bar display. This is not confirmed as built, so it must not be claimed.
- ⚠️ **Date conflict:** the venue says "originally built in 1880", and press says 1879 ("145-year-old church" in Oct 2024). **Decision: use the venue's own 1880**, or say "1880s" where the copy needs no exact year.

### Practical information (official site, current)
| | |
|---|---|
| Address | 600 East Market St, Louisville, KY 40202 (corner of E. Market & Hancock, NuLu) |
| Phone | (502) 208-4900 |
| Email | info@thelastrefuge.com |
| Hours | Mon–Tue closed · Wed–Thu 4pm–11pm · Fri–Sat 4pm–1am · Sun 4pm–10pm |
| Age | **21+ only.** "Persons under the age of 21 will not be admitted." |
| Instagram | @lastrefugeky |
| Gift cards | swipeit.com/co-branded/merchant/the-last-refuge-11350 |
| Careers | atomichg.com/careers |

⚠️ OpenTable's profile lists Thu–Sat 4pm–12am. **The venue site wins**, and the discrepancy is flagged for the client.

### Integrations already in place (all of them must be preserved)
| Function | Provider | ID / endpoint |
|---|---|---|
| Reservations | **OpenTable** | restaurant id `1335805`, slug `the-last-refuge-louisville`. Note on the page: *patio seating → note it in the reservation.* |
| Private events | **Tripleseat** lead form | `dynamic_lead_form_id=5699`, public key in page source |
| Event room blocks | The Room Block Source | bit.ly/AtomicRoomBlocks |
| Live events / tickets | **Surreal** widget | surreal.live/widget/the-last-refuge (live: trio/jazz acts at 7pm, "Vinyl Revival: All Vinyl DJ Set" nights) |
| Whiskey list | **Google Sheet** (public CSV) | sheet `1ZqlhIHhsNze3Kj3ShHfvUW0hTxsWf1So`, 6 tabs: Bourbon, Rye, American, International, Flavored, Heaven's Door Bottles |
| Analytics | GTM `GTM-NZFTH7PC`, GA4 `G-6RWRHXWDSZ` | |
| Newsletter | Squarespace form | **needs a replacement provider** (see open questions) |

### Content inventory
- **Food menu:** Shareables (6), Salads (2), Tavern-style pizza (7 + build-your-own, gluten-free 20" Detroit-style), Large plates (1), Sandwiches (2), Desserts (3). Prices and **allergens** are given per item.
- **Cocktails:** 9 signatures + 2 zero-proof (Dry County, Contrantino). Ingredients and prices are complete.
- **Wine:** 3 reds, 4 white/rosé, 1 sparkling (glass/bottle). **Beer:** 7 draft + 7 packaged, with ABV.
- **Exclusive bottles:** Woodford Reserve Baccarat Edition.
- **Whiskey list:** ~940 rows across 6 tabs, with proof and 1oz/2oz pricing. It is maintained live by staff in the Google Sheet, so it is the single most valuable dataset on the site.
- **Menu voice:** reverent-irreverent and funny. *Meat Jesus, Judas Loved Chocolate, The Devil's Eggs, Sin + Grits, Friar's Bacon, Parishioner's Popcorn, Holy Fire Dip, Madonna's Crazy Cousin, Purgatory 2.0.* Several cocktails are built on Heaven's Door. (An early draft claimed the cocktail names were Dylan songs; that is unverified and has been dropped.) **This wit is core brand equity, so the design must leave room for it and not sand it into generic luxury.**
- Live calendar items: *Gospel of Grain* (17 Sep 2026, bourbon event) and a New Year's Eve event.

### Photography (genuine, professional, 2025 shoot, ~25 usable)
See `research/contact-sheet.jpg` and `research/image-inventory.txt`. The images, catalogued by role:
- **Exterior:** red brick, lancet stained-glass windows, a spire lit magenta at dusk (#24), a drone night pano (#04), the entry sign with crest (#06), a large Dylan mural/billboard on the facade (#06, #11).
- **The Chapel Room (sanctuary):** white walls, lancet windows, and a **vast painted ceiling in a Baroque-style cloudscape of rose, amber and blue** (#12, #23, #27). This is the single most extraordinary visual asset.
- **The Gym bar:** a two-storey bourbon wall, a steel mezzanine, chandeliers and long tables (#02, #18).
- **Lounges:** damask wallpaper, velvet sofas, gilt mirrors and stained glass (#03, #15, #17). There is also a **whiskey library room** with backlit bottle cubbies and stained glass (#01).
- **Bar & drinks:** bar front with Gothic arches (#05), Heaven's Door bottles backlit (#07), bottle wall (#19), a cocktail in front of stained glass (#22), a pour (#16).
- **Courtyard:** fire tables, string lights, purple-lit brick at night (#08, #10, #14, #25).
- **Iconography:** a gold crest with crowns, a Jerusalem cross and a "TLR" monogram (#09). The logo PNG is in the OG image.
- **Missing:** food photography (none exists online), video (none on the site), people and bartenders in action (only #16, #21).

---

## 2. Audit of the current site

| Area | Finding | Severity |
|---|---|---|
| First impression | The hero is an 11-slide carousel with no headline, no CTA and no story. The best line ("High Church of Bourbon") sits below the fold in small type. | High |
| Brand story | 1880 church, German congregation, "refuge in Kentucky" on the gym floor, Dylan/Heaven's Door: **almost none of it is told.** One sentence on /photos. | High |
| Reservations | The OpenTable widget is buried on its own page. There is no persistent CTA and no mobile sticky CTA. | High |
| Menus | The tabbed list is usable, but price markup is duplicated (each price renders twice) and pizza prices are garbled ("$18\|12" $23\|16"). There is no dietary filtering or imagery. | Medium |
| Whiskey list | Loads client-side from a Google Sheet. It shows "Loading…", isn't indexable, has no search, and is hidden behind a small link. | High (biggest missed opportunity) |
| Private events | The page is just a form. The spaces aren't named, the Chapel Room isn't shown and nothing explains why to book. | High (revenue) |
| Events | An image plus a third-party iframe. | Medium |
| SEO | Empty meta description, generic titles, WebSite-only JSON-LD (no `BarOrPub`/`Restaurant`, hours, geo or menu), image alt text is camera filenames. | High |
| Accessibility | Alt text = filenames, carousel without pause, low-contrast grey text. | High |
| Footer | Newsletter copy still says "updates on our opening". | Low |

---

## 3. Context & audience
- **Location:** NuLu, Louisville's East Market District, a walkable design and dining district near downtown. It is on the Urban Bourbon Trail circuit, so visitors include bourbon tourists.
- **Audiences:**
  1. Bourbon pilgrims and tourists planning a Louisville trip. They have high intent, look for the whiskey list, and book ahead.
  2. Local date-night and group dinners. They are mobile, decide quickly, and need hours, menu and booking.
  3. Event planners (weddings, rehearsal dinners, corporate, celebrations). They have high value, need space proof, and enquire.
  4. Dylan and music fans for live music and vinyl nights.
- **Competitive landscape:** Louisville is dense with bourbon bars and distillery tasting rooms. Most present themselves with dark wood, brown and gold, and a "speakeasy" look. **Differentiators no competitor has:** a consecrated 1880s building, a painted-sky Chapel Room, the Bob Dylan / Heaven's Door brand home, and a confident irreverent sense of humour. The site should lead with these and not with generic "bourbon luxury".

---

## 4. Unverified (do not publish without client confirmation)
- Room capacities and square footage for the Chapel Room, Gym, lounges and courtyard
- Whether the church organ is in the back bar
- The vinyl listening room and retail store (planned in 2023; DJ vinyl nights are confirmed)
- The art gallery / Dylan art centre status
- "1,500+ whiskeys" (third-party figure). **We will show the live count computed from the sheet instead.**
- Chef and bar staff names, awards, reviews

## 5. Open questions for the client
1. Video footage: does an existing b-roll exist? None is published. Until then the hero uses still photography with a slow, restrained "light pass".
2. Room capacities and amenities for private events.
3. Newsletter provider (Squarespace form is being retired). Klaviyo, Mailchimp or OpenTable marketing?
4. Original high-res photography and the vector logo/crest (current sources are web exports).
5. Confirm the hours discrepancy with OpenTable.
6. Rights: Dylan lyric use on the homepage (already used by the venue, so assumed cleared).

Sources: [thelastrefuge.com](https://www.thelastrefuge.com/) and its subpages · [Courier Journal via Yahoo, "Incredible serendipity" (May 2023)](https://www.yahoo.com/news/incredible-serendipity-bob-dylan-heaven-090123595.html) · [WDRB, 145-year-old church transformed (Oct 2024)](https://www.wdrb.com/news/business/145-year-old-church-in-louisvilles-nulu-district-transformed-into-bob-dylans-bourbon-showcase/article_396c88c4-87e9-11ef-9e05-dbafe1e52acc.html) · [OpenTable profile](https://www.opentable.com/r/the-last-refuge-louisville)
