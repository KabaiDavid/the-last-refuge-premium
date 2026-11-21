import { getImageProps } from "next/image";
import { ReserveButton, Button } from "@/components/ui/Button";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { img } from "@/content/images";
import { site } from "@/content/site";

/**
 * 01 · Prelude. Art-directed hero: the lit church façade (portrait) on
 * phones, the courtyard at dusk (landscape) from tablet up. Pure CSS
 * entrance so the LCP never waits for JavaScript.
 */
export function Prelude() {
  const common = { alt: "", fill: true, priority: true, quality: 70 as const };
  const {
    props: { srcSet: desktop },
  } = getImageProps({ ...common, src: img["courtyard-dusk"].src, sizes: "100vw" });
  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({ ...common, src: img["facade-night"].src, sizes: "100vw" });

  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-crypt grain">
      <div className="absolute inset-0 -z-10 animate-[hero-settle_2.8s_var(--ease-exhale)_both]">
        <picture>
          <source media="(min-width: 768px)" srcSet={desktop} sizes="100vw" />
          <source media="(max-width: 767px)" srcSet={mobile} sizes="100vw" />
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img
            {...rest}
            alt="The Last Refuge at dusk: the red-brick church, its stained-glass windows lit, above the courtyard"
            className="h-full w-full object-cover object-[50%_40%] md:object-[50%_55%]"
          />
        </picture>
      </div>
      {/* Night falls on the image: legibility without flattening the glass. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_50%_10%,transparent_30%,rgba(13,11,10,.55)_75%)]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-crypt via-crypt/55 to-crypt/10" />

      <div className="shell mt-auto pb-28 pt-40 sm:pb-20 lg:pb-16">
        <p className="mb-6 flex items-center gap-4 t-label text-amber animate-[rise_1.2s_var(--ease-exhale)_.35s_both]">
          <span aria-hidden className="h-px w-10 bg-amber/70" />
          {site.tagline}
        </p>
        <h1 id="hero-title" className="t-hero max-w-[12ch]">
          {/* Painted at first frame (it is the LCP); motion is transform-only so it never delays paint. */}
          <span className="block animate-[settle-type_1.6s_var(--ease-exhale)_both]">The Last</span>
          <span className="block animate-[settle-type_1.6s_var(--ease-exhale)_.12s_both] italic text-parchment/95">Refuge</span>
        </h1>

        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:items-end">
          <p className="t-lede max-w-[34ch] text-parchment/85 lg:col-span-5 animate-[rise_1.2s_var(--ease-exhale)_.6s_both]">
            Whiskey, pizza and late hymns in an 1880 church on the corner of East Market &amp; Hancock.
          </p>
          <div className="flex flex-col gap-3 xs:flex-row lg:col-span-7 lg:justify-end animate-[rise_1.2s_var(--ease-exhale)_.75s_both]">
            <ReserveButton label="Reserve your table" />
            <Button href="#invocation" variant="outline">
              Explore the Refuge
            </Button>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-parchment/15 pt-5 text-parchment/75 sm:flex-row sm:items-center sm:justify-between animate-[fade_1.6s_ease_1s_both]">
          <OpenStatus />
          <p className="t-label">NuLu · Louisville, Kentucky · 21+</p>
        </div>
      </div>
    </section>
  );
}
