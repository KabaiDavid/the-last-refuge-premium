import { Button, ReserveButton } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { img } from "@/content/images";

export default function NotFound() {
  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-crypt">
      <div className="absolute inset-0 -z-10">
        <Photo photo={img["lounge-window"]} sizes="100vw" alt="" position="50% 40%" />
        <div aria-hidden className="absolute inset-0 bg-crypt/75" />
      </div>
      <div className="shell py-40">
        <p className="t-label text-brass">Error 404</p>
        <h1 className="t-display mt-6 max-w-[14ch]">
          Lost your way? <span className="italic text-amber">Happens to the best of us.</span>
        </h1>
        <p className="t-lede mt-6 max-w-[40ch] text-parchment/80">That page isn’t here. The bar, happily, still is.</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/">Back to the beginning</Button>
          <ReserveButton variant="outline" />
        </div>
      </div>
    </section>
  );
}
