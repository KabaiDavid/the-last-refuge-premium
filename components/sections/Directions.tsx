import { HymnBoardHours } from "@/components/layout/HymnBoardHours";
import { Button } from "@/components/ui/Button";
import { ServiceMark } from "@/components/ui/Liturgy";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { Photo } from "@/components/ui/Photo";
import { img } from "@/content/images";
import { site } from "@/content/site";

/** 08 · Directions. Practical, fast, and still in the building's light. */
export function Directions() {
  return (
    <section aria-labelledby="directions-title" className="bg-nave">
      <div className="grid lg:grid-cols-12">
        <div className="relative min-h-[60svh] overflow-hidden lg:col-span-6 lg:min-h-full">
          <Photo photo={img["aerial-night"]} sizes="(min-width:1024px) 50vw, 100vw" position="50% 55%" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-nave/80 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-nave/30" />
        </div>
        <div className="shell py-20 lg:col-span-6 lg:max-w-none lg:px-16 lg:py-32 xl:px-24">
          <ServiceMark n={8} label="Directions" />
          <h2 id="directions-title" className="t-h2 mt-8" data-reveal>
            Find your refuge
          </h2>
          <address className="mt-8 not-italic" data-reveal>
            <span className="block font-serif text-2xl leading-snug">
              {site.address.street}
              <br />
              {site.address.city}, Kentucky {site.address.postalCode}
            </span>
            <span className="mt-3 block t-small text-vellum">
              On the corner of {site.address.corner}, in {site.address.neighborhood}.
            </span>
          </address>
          <OpenStatus className="mt-8 text-amber" />
          <HymnBoardHours className="mt-6 max-w-md" />
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href={site.links.directions} variant="outline" external arrow>
              Directions
            </Button>
            <Button href={site.phone.href} variant="ghost">
              {site.phone.display}
            </Button>
          </div>
          <p className="mt-8 max-w-md t-small text-vellum">{site.ageNotice}</p>
        </div>
      </div>
    </section>
  );
}
