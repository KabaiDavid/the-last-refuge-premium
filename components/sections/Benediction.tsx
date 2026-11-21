import { Button, ReserveButton } from "@/components/ui/Button";
import { HymnNumber } from "@/components/ui/Liturgy";
import { Photo } from "@/components/ui/Photo";
import { img } from "@/content/images";

/** 09 · Benediction. The sending-out: one last, unmissable invitation. */
export function Benediction() {
  return (
    <section aria-labelledby="benediction-title" className="relative isolate overflow-hidden bg-crypt grain">
      <div className="absolute inset-0 -z-10">
        <Photo photo={img.arrival} sizes="100vw" position="50% 30%" alt="" />
        <div aria-hidden className="absolute inset-0 bg-crypt/55" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-crypt via-transparent to-crypt/60" />
      </div>
      <div className="shell flex min-h-[90svh] flex-col items-center justify-center py-28 text-center">
        <HymnNumber n={9} className="text-[0.95rem]" />
        <p className="mt-5 t-label text-brass">Benediction</p>
        <h2 id="benediction-title" className="t-hero mt-10 max-w-[11ch]" data-reveal>
          Go in peace. <span className="italic text-amber">Come back thirsty.</span>
        </h2>
        <div className="mt-14 flex flex-col gap-4 xs:flex-row" data-reveal data-reveal-delay="0.15">
          <ReserveButton label="Reserve your table" />
          <Button href="/private-events#enquire" variant="outline">
            Plan a private event
          </Button>
        </div>
      </div>
    </section>
  );
}
