import type { ReactNode } from "react";

/**
 * The hymn board: slotted numerals, the site's numbering system.
 * Each digit sits in its own slot; motion slides it in (see MotionRoot).
 */
export function HymnNumber({ n, className = "", tone = "dark" }: { n: number | string; className?: string; tone?: "dark" | "light" }) {
  const digits = String(n).padStart(2, "0").split("");
  return (
    <span className={`inline-flex gap-[3px] ${className}`} aria-hidden data-hymn>
      {digits.map((d, i) => (
        <span
          key={i}
          className={`relative inline-flex h-[1.7em] w-[1.25em] items-center justify-center overflow-hidden border font-display tabular ${tone === "dark" ? "border-brass/40 bg-crypt/60 text-brass" : "border-sepia/40 bg-transparent text-sepia"}`}
        >
          <span data-hymn-digit className="block leading-none">
            {d}
          </span>
        </span>
      ))}
    </span>
  );
}

/** "No. 03 — The Sanctuary": the order-of-service marker above a section title. */
export function ServiceMark({ n, label, className = "", tone = "dark" }: { n: number; label: string; className?: string; tone?: "dark" | "light" }) {
  return (
    <p className={`flex items-center gap-4 ${className}`}>
      <span className="sr-only">Part {n}: </span>
      <HymnNumber n={n} tone={tone} className="text-[0.95rem]" />
      <span className={`h-px w-8 ${tone === "dark" ? "bg-brass/50" : "bg-sepia/50"}`} aria-hidden />
      <span className={`t-label ${tone === "dark" ? "text-brass" : "text-sepia"}`}>{label}</span>
    </p>
  );
}

/** A reading: a quotation set like scripture, always attributed. */
export function Reading({ children, cite, className = "" }: { children: ReactNode; cite: ReactNode; className?: string }) {
  return (
    <figure className={className}>
      <blockquote className="font-serif italic">{children}</blockquote>
      <figcaption className="mt-6 flex items-center gap-4 t-label text-brass">
        <span className="h-px w-10 bg-brass/60" aria-hidden />
        {cite}
      </figcaption>
    </figure>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`t-label text-brass ${className}`}>{children}</p>;
}
