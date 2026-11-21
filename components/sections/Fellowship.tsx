import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ServiceMark } from "@/components/ui/Liturgy";
import { Photo } from "@/components/ui/Photo";
import { spaces } from "@/content/spaces";

/** 07 · Fellowship. Private events: four real rooms, framed as the windows are. */
export function Fellowship() {
  return (
    <section aria-labelledby="fellowship-title" className="on-parchment bg-parchment text-ink">
      <div className="shell section-y">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <ServiceMark n={7} label="Fellowship" tone="light" />
            <h2 id="fellowship-title" className="t-display mt-8" data-reveal>
              Gather the <span className="italic text-communion">faithful</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-20" data-reveal data-reveal-delay="0.1">
            <p className="t-lede text-ink/80">
              Rehearsal dinners, receptions, company nights, birthdays, bourbon tastings. Four very different rooms, one team
              to plan it with you.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/private-events#enquire" variant="ink" arrow>
                Plan an event
              </Button>
            </div>
          </div>
        </div>

        <ul className="mt-20 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:mt-28 lg:grid-cols-4">
          {spaces.map((s, i) => (
            <li key={s.id} data-reveal data-reveal-delay={String(i * 0.08)} className={i % 2 === 1 ? "lg:mt-20" : ""}>
              <Link href={`/private-events#${s.id}`} className="group block">
                <div className="lancet relative aspect-[3/4.2] overflow-hidden bg-ink">
                  <Photo
                    photo={s.photo}
                    sizes="(min-width:1024px) 24vw, (min-width:640px) 48vw, 100vw"
                    position={s.position}
                    className="transition-transform duration-[1.4s] ease-exhale group-hover:scale-[1.05]"
                  />
                </div>
                <p className="mt-6 font-display text-[1.75rem] leading-tight group-hover:text-communion">{s.name}</p>
                <p className="mt-1 font-serif italic text-sepia">{s.line}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
