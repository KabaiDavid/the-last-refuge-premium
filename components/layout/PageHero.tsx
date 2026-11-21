import type { ReactNode } from "react";
import { HymnNumber } from "@/components/ui/Liturgy";
import { Photo } from "@/components/ui/Photo";
import type { Photo as PhotoT } from "@/content/images";

/** Inner-page opening: a photograph, a hymn number, a title. Shorter than the homepage prelude. */
export function PageHero({
  n,
  label,
  title,
  lede,
  photo,
  position,
  children,
  tall = false,
}: {
  n: number;
  label: string;
  title: ReactNode;
  lede?: ReactNode;
  photo: PhotoT;
  position?: string;
  children?: ReactNode;
  tall?: boolean;
}) {
  return (
    <section className={`relative isolate flex flex-col overflow-hidden bg-crypt grain ${tall ? "min-h-[92svh]" : "min-h-[72svh] lg:min-h-[78svh]"}`}>
      <div className="absolute inset-0 -z-10 animate-[hero-settle_2.4s_var(--ease-exhale)_both]">
        <Photo photo={photo} sizes="100vw" position={position} priority alt="" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-crypt via-crypt/60 to-crypt/25" />
      <div className="shell mt-auto pb-14 pt-36 lg:pb-20">
        <p className="flex items-center gap-4 animate-[rise_1s_var(--ease-exhale)_.2s_both]">
          <HymnNumber n={n} className="text-[0.95rem]" />
          <span aria-hidden className="h-px w-8 bg-brass/50" />
          <span className="t-label text-brass">{label}</span>
        </p>
        <h1 className="t-display mt-8 max-w-[16ch] animate-[rise_1.2s_var(--ease-exhale)_.3s_both]">{title}</h1>
        {lede && <div className="t-lede mt-6 max-w-[46ch] text-parchment/85 animate-[rise_1.2s_var(--ease-exhale)_.45s_both]">{lede}</div>}
        {children && <div className="mt-10 flex flex-wrap gap-4 animate-[rise_1.2s_var(--ease-exhale)_.6s_both]">{children}</div>}
      </div>
    </section>
  );
}
