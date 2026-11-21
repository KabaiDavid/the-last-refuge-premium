import { PageHero } from "@/components/layout/PageHero";
import { Button, ReserveButton } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { img } from "@/content/images";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "The Sanctuary: An 1880 Church in NuLu",
  description:
    "The Last Refuge occupies a historic church built in 1880 at East Market and Hancock in Louisville’s NuLu: its stained glass, its old gymnasium and a Chapel Room under a painted sky.",
  path: "/sanctuary",
  image: "/images/chapel-room.jpg",
});

const chapters = [
  {
    year: "1880",
    title: "A church on East Market",
    text: "Built on the corner of East Market and Hancock in what is now NuLu, for a German-American congregation that held its services in German, until the First World War put an end to it.",
    photo: img["facade-night"],
    position: "50% 50%",
  },
  {
    year: "Later",
    title: "Other congregations",
    text: "The building passed through other congregations over the following century. One of them painted refuge in Kentucky across the floor of the gymnasium behind the church.",
    photo: img["windows-closeup"],
    position: "50% 25%",
  },
  {
    year: "Now",
    title: "The Last Refuge",
    text: "The church was restored and the gym became a bourbon hall. The courtyard between them filled with fire tables, and the name came from those words on the gym floor.",
    photo: img["gym-mezzanine"],
    position: "50% 50%",
  },
];

const gallery = [
  { photo: img["parlour"], span: "md:col-span-7", ratio: "aspect-[3/2]" },
  { photo: img["lounge-window"], span: "md:col-span-5", ratio: "aspect-[3/4]" },
  { photo: img["library-room"], span: "md:col-span-5", ratio: "aspect-[4/5]" },
  { photo: img["bar-front"], span: "md:col-span-7", ratio: "aspect-[3/2]" },
  { photo: img["courtyard-aerial"], span: "md:col-span-6", ratio: "aspect-[3/2]" },
  { photo: img["patio-day"], span: "md:col-span-6", ratio: "aspect-[3/2]" },
  { photo: img["entrance-sign"], span: "md:col-span-8", ratio: "aspect-[3/2]" },
  { photo: img["spire-dusk"], span: "md:col-span-4", ratio: "aspect-[4/5]" },
];

export default function SanctuaryPage() {
  return (
    <>
      <PageHero
        n={3}
        label="The Sanctuary"
        title={
          <>
            Take <span className="italic text-amber">refuge</span>
          </>
        }
        lede="A historic church originally built in 1880, on the corner of East Market and Hancock in the NuLu district of downtown Louisville."
        photo={img["chapel-wide"]}
        position="50% 40%"
        tall
      />

      <section aria-label="History" className="on-parchment bg-parchment text-ink">
        <div className="shell section-y">
          <ol className="space-y-24 lg:space-y-36">
            {chapters.map((c, i) => (
              <li key={c.title} className="grid items-center gap-10 md:grid-cols-12">
                <div className={`relative aspect-[4/5] overflow-hidden md:col-span-5 ${i % 2 ? "md:order-2 md:col-start-8" : ""}`} data-reveal="mask">
                  <div className="absolute inset-[-6%_0]" data-parallax="0.08">
                    <Photo photo={c.photo} sizes="(min-width:768px) 40vw, 100vw" position={c.position} />
                  </div>
                </div>
                <div className={`md:col-span-6 ${i % 2 ? "md:col-start-1 md:row-start-1" : "md:col-start-7"}`} data-reveal>
                  <p className="font-display text-[clamp(3.5rem,2rem+5vw,7rem)] leading-none text-communion/90">{c.year}</p>
                  <h2 className="t-h2 mt-4">{c.title}</h2>
                  <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-ink/80">{c.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="chapel-title" className="relative isolate overflow-hidden bg-crypt">
        <div className="relative h-[85svh] min-h-[32rem]">
          <Photo photo={img["chapel-ceiling"]} sizes="100vw" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-crypt via-crypt/20 to-crypt/40" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="shell pb-16">
              <p className="t-label text-amber">The Chapel Room</p>
              <h2 id="chapel-title" className="t-display mt-4 max-w-[14ch]">
                A sky painted <span className="italic">indoors</span>
              </h2>
              <div className="mt-8">
                <Button href="/private-events#chapel-room" arrow>
                  Host an event here
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="gallery-title" className="bg-nave">
        <div className="shell section-y">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2 id="gallery-title" className="t-h2">Room by room</h2>
            <p className="max-w-[40ch] text-parchment/75">Lounges, the library of bottles, the bar, the courtyard and the spire over NuLu.</p>
          </div>
          <ul className="mt-14 grid gap-4 md:grid-cols-12 md:gap-6">
            {gallery.map((g) => (
              <li key={g.photo.src} className={`${g.span}`} data-reveal>
                <figure>
                  <div className={`relative overflow-hidden ${g.ratio}`}>
                    <Photo photo={g.photo} alt="" sizes="(min-width:768px) 55vw, 100vw" className="transition-transform duration-[1.4s] ease-exhale hover:scale-[1.03]" />
                  </div>
                  <figcaption className="mt-3 t-small text-vellum">{g.photo.alt}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <div className="mt-20 flex flex-wrap gap-4">
            <ReserveButton />
            <Button href="/private-events" variant="outline" arrow>
              Private events
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
