import { ThirdPartyScript } from "@/components/embeds/ThirdPartyScript";
import { PageHero } from "@/components/layout/PageHero";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { img } from "@/content/images";
import { site } from "@/content/site";
import { spaces } from "@/content/spaces";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Private Events & Venue Hire",
  description:
    "Host a wedding reception, rehearsal dinner, corporate event or bourbon tasting in a restored 1880 church in Louisville’s NuLu: the Chapel Room, the Gym, the Lounges and the Courtyard.",
  path: "/private-events",
  image: "/images/chapel-room.jpg",
});

const occasions = [
  { title: "Weddings & receptions", text: "Vows elsewhere, celebration here, under the painted sky or the bourbon wall." },
  { title: "Rehearsal dinners", text: "The night before, with the people who matter, in a room with a story." },
  { title: "Corporate gatherings", text: "Team dinners, client evenings and launches that people remember." },
  { title: "Celebrations", text: "Birthdays, anniversaries, graduations and any good excuse." },
  { title: "Bourbon tastings", text: "Pours chosen from a back bar of hundreds of whiskeys." },
  { title: "Something else", text: "Tell us what you have in mind. We’ll tell you what’s possible." },
];

const tripleseat = `https://api.tripleseat.com/ts/dynamic_leads/ts_script.js?dynamic_lead_form_id=${site.tripleseat.formId}&public_key=${site.tripleseat.publicKey}`;

export default function PrivateEventsPage() {
  return (
    <>
      <PageHero
        n={7}
        label="Fellowship"
        title={
          <>
            Gather <span className="italic text-amber">here</span>
          </>
        }
        lede="Four rooms inside an 1880 church: a sanctuary under a painted sky, a two-storey bourbon hall, velvet lounges and a firelit courtyard."
        photo={img["chapel-room"]}
        position="50% 35%"
        tall
      >
        <Button href="#enquire" arrow>Start an enquiry</Button>
        <Button href={site.phone.href} variant="outline">{site.phone.display}</Button>
      </PageHero>

      <section aria-labelledby="spaces-title" className="bg-nave">
        <div className="shell section-y">
          <h2 id="spaces-title" className="t-h2 max-w-[18ch]">The rooms</h2>
          <div className="mt-16 space-y-24 lg:space-y-32">
            {spaces.map((s, i) => (
              <article key={s.id} id={s.id} aria-labelledby={`${s.id}-name`} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-12">
                <div className={`relative aspect-[4/3] overflow-hidden lg:col-span-7 ${i % 2 ? "lg:order-2 lg:col-start-6" : ""}`} data-reveal="mask">
                  <div className="absolute inset-[-6%_0]" data-parallax="0.08">
                    <Photo photo={s.photo} sizes="(min-width:1024px) 58vw, 100vw" position={s.position} />
                  </div>
                </div>
                <div className={`lg:col-span-4 ${i % 2 ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-9"}`} data-reveal>
                  <p className="font-display text-brass tabular">{String(i + 1).padStart(2, "0")}</p>
                  <h3 id={`${s.id}-name`} className="t-h2 mt-3">{s.name}</h3>
                  <p className="mt-2 font-serif text-lg italic text-amber">{s.line}</p>
                  <p className="mt-6 text-parchment/80">{s.description}</p>
                  <dl className="mt-8 border-t border-oak pt-6 t-small">
                    <dt className="t-label text-[0.65rem] text-vellum">Capacity &amp; layouts</dt>
                    <dd className="mt-1">
                      <a href="#enquire" className="underline decoration-brass/60 underline-offset-4 hover:text-amber">Ask the events team</a>
                    </dd>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="occasions-title" className="on-parchment bg-parchment text-ink">
        <div className="shell section-y">
          <h2 id="occasions-title" className="t-h2">For every kind of occasion</h2>
          <ul className="mt-14 grid gap-px bg-sepia/25 sm:grid-cols-2 lg:grid-cols-3">
            {occasions.map((o) => (
              <li key={o.title} className="bg-parchment p-8" data-reveal>
                <h3 className="font-display text-2xl">{o.title}</h3>
                <p className="mt-3 text-ink/75">{o.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="enquire" aria-labelledby="enquire-title" className="scroll-mt-20 bg-nave">
        <div className="shell section-y grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="t-label text-brass">Enquire</p>
            <h2 id="enquire-title" className="t-h2 mt-4">Tell us about your event</h2>
            <p className="mt-6 text-parchment/80">
              Share a date, a headcount and what you have in mind. The events team will come back to you shortly with
              availability and options.
            </p>
            <div className="mt-10 space-y-2 border-t border-oak pt-8">
              <p className="t-label text-[0.65rem] text-vellum">Prefer to talk?</p>
              <a href={site.phone.href} className="block font-display text-2xl hover:text-amber">{site.phone.display}</a>
              <a href={`mailto:${site.email}?subject=Private%20event%20enquiry`} className="block text-parchment/80 hover:text-amber">{site.email}</a>
            </div>
            <div className="mt-10 border-t border-oak pt-8">
              <p className="t-label text-[0.65rem] text-vellum">Guests travelling in?</p>
              <p className="mt-2 text-parchment/80">Hotel room blocks for your group are arranged through The Room Block Source.</p>
              <div className="mt-4">
                <Button href={site.links.roomBlocks} variant="outline" external arrow>
                  Room blocks
                </Button>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <div className="on-parchment bg-parchment p-5 text-ink sm:p-10 [&_input]:min-h-11 [&_input]:w-full [&_input]:border [&_input]:border-sepia/40 [&_input]:bg-white/70 [&_input]:px-3 [&_label]:text-sm [&_label]:font-semibold [&_select]:min-h-11 [&_select]:w-full [&_select]:border [&_select]:border-sepia/40 [&_select]:bg-white/70 [&_textarea]:w-full [&_textarea]:border [&_textarea]:border-sepia/40 [&_textarea]:bg-white/70 [&_textarea]:p-3 [&_button]:min-h-12 [&_button]:bg-ink [&_button]:px-6 [&_button]:text-parchment [&_input[type=submit]]:bg-ink [&_input[type=submit]]:text-parchment [&_table]:w-full">
              <ThirdPartyScript
                src={tripleseat}
                title="Private event enquiry form (Tripleseat)"
                minHeight={520}
                fallback={
                  <p className="t-small text-sepia">
                    Form not loading? Email{" "}
                    <a className="underline underline-offset-4" href={`mailto:${site.email}?subject=Private%20event%20enquiry`}>
                      {site.email}
                    </a>{" "}
                    or call <a className="underline underline-offset-4" href={site.phone.href}>{site.phone.display}</a>.
                  </p>
                }
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
