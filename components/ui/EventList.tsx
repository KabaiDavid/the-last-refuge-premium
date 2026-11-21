import type { LiveEvent } from "@/lib/events";
import { formatTime } from "@/content/site";

function parts(date: string) {
  const d = new Date(`${date}T12:00:00`);
  return {
    day: d.toLocaleDateString("en-US", { day: "numeric", timeZone: "UTC" }),
    month: d.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" }),
    weekday: d.toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" }),
  };
}

/** Upcoming events, each dated on a hymn-board tile. */
export function EventList({ events, tone = "dark" }: { events: LiveEvent[]; tone?: "dark" | "light" }) {
  return (
    <ol className={`divide-y ${tone === "dark" ? "divide-oak border-y border-oak" : "divide-sepia/25 border-y border-sepia/25"}`}>
      {events.map((e) => {
        const p = parts(e.date);
        return (
          <li key={`${e.date}-${e.title}`} className="flex items-center gap-5 py-5 sm:gap-8">
            <time dateTime={e.date} className="flex w-16 shrink-0 flex-col items-center border border-brass/40 bg-crypt/60 py-2 text-parchment">
              <span className="font-display text-2xl leading-none tabular">{p.day}</span>
              <span className="mt-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-brass">{p.month}</span>
            </time>
            <div className="min-w-0">
              <p className={`font-display text-[1.45rem] leading-tight ${tone === "dark" ? "" : "text-ink"}`}>{e.title}</p>
              <p className={`mt-1 t-small ${tone === "dark" ? "text-vellum" : "text-sepia"}`}>
                {p.weekday}
                {e.time ? ` · ${formatTime(e.time)}` : ""}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
