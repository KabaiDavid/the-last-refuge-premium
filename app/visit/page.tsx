import { HymnBoardHours } from "@/components/layout/HymnBoardHours";
import { PageHero } from "@/components/layout/PageHero";
import { Button, ReserveButton } from "@/components/ui/Button";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { img } from "@/content/images";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Visit: Hours, Directions & Contact",
  description:
    "The Last Refuge is at 600 E. Market St. on the corner of Hancock in NuLu, Louisville, KY 40202. Open Wednesday to Sunday from 4pm. 21+. Call (502) 208-4900.",
  path: "/visit",
  image: "/images/aerial-night.jpg",
});

export default function VisitPage() {
  return (
    <>
      <PageHero
        n={8}
        label="Directions"
        title={
          <>
            Find your <span className="italic text-amber">refuge</span>
          </>
        }
        lede={<OpenStatus className="text-amber" />}
        photo={img["aerial-night"]}
        position="50% 60%"
      >
        <Button href={site.links.directions} external arrow>
          Get directions
        </Button>
        <ReserveButton variant="outline" />
      </PageHero>

      <section className="bg-nave" aria-label="Visiting information">
        <div className="shell section-y grid gap-14 lg:grid-cols-12">
          <div className="space-y-12 lg:col-span-5">
            <div>
              <h2 className="t-label text-brass">Address</h2>
              <address className="mt-4 not-italic">
                <span className="block font-serif text-2xl leading-snug">
                  {site.name}
                  <br />
                  {site.address.street}
                  <br />
                  {site.address.city}, {site.address.region} {site.address.postalCode}
                </span>
                <span className="mt-3 block text-parchment/75">
                  On the corner of {site.address.corner}, in the {site.address.neighborhood} district of downtown Louisville.
                </span>
              </address>
            </div>
            <div>
              <h2 className="t-label text-brass">Contact</h2>
              <p className="mt-4 space-y-1">
                <a href={site.phone.href} className="block font-display text-3xl hover:text-amber">{site.phone.display}</a>
                <a href={`mailto:${site.email}`} className="block text-lg text-parchment/85 hover:text-amber">{site.email}</a>
                <a href={site.links.instagram} target="_blank" rel="noopener" className="block text-lg text-parchment/85 hover:text-amber">
                  {site.links.instagramHandle} on Instagram<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
            </div>
            <div className="border border-brass/40 p-6">
              <h2 className="t-label text-brass">21 and over</h2>
              <p className="mt-3 text-parchment/85">{site.ageNotice} Please bring a valid ID.</p>
            </div>
            <div>
              <h2 className="t-label text-brass">Gift cards</h2>
              <p className="mt-3 text-parchment/80">Give someone a night at the refuge.</p>
              <div className="mt-4">
                <Button href={site.links.giftCards} variant="outline" external arrow>
                  Buy a gift card
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-8 lg:col-span-6 lg:col-start-7">
            <HymnBoardHours caption="Opening hours" />
            <div className="relative aspect-[4/3] overflow-hidden border border-oak bg-pew">
              <iframe
                title="Map showing The Last Refuge at 600 East Market Street, Louisville"
                src={`https://www.google.com/maps?q=${encodeURIComponent("The Last Refuge, 600 E Market St, Louisville, KY 40202")}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0 [filter:grayscale(0.6)_contrast(1.05)_brightness(0.85)]"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
