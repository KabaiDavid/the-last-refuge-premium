"use client";

import { useEffect, useState } from "react";
import { formatTime, hours } from "@/content/site";

const TZ = "America/Kentucky/Louisville";

function minutes(t: string) {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}

/** Computes "Open now · until 1am" in Louisville time from the published hours. */
function status(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "long", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(now);
  const weekday = parts.find((p) => p.type === "weekday")!.value;
  const mins = Number(parts.find((p) => p.type === "hour")!.value) * 60 + Number(parts.find((p) => p.type === "minute")!.value);
  const idx = hours.findIndex((d) => d.day === weekday);
  const today = hours[idx];
  const yesterday = hours[(idx + 6) % 7];

  // Still inside yesterday's late session (e.g. Saturday 12:30am after Friday).
  if (yesterday.open && yesterday.close && minutes(yesterday.close) < minutes(yesterday.open) && mins < minutes(yesterday.close)) {
    return { open: true, text: `Open now · until ${formatTime(yesterday.close)}` };
  }
  if (today.open && today.close) {
    const o = minutes(today.open);
    const c = minutes(today.close);
    const closesAfterMidnight = c < o;
    if (mins >= o && (closesAfterMidnight || mins < c)) return { open: true, text: `Open now · until ${formatTime(today.close)}` };
    if (mins < o) return { open: false, text: `Opens today at ${formatTime(today.open)}` };
  }
  for (let i = 1; i <= 7; i++) {
    const d = hours[(idx + i) % 7];
    if (d.open) return { open: false, text: `Closed now · opens ${i === 1 ? "tomorrow" : d.day} at ${formatTime(d.open)}` };
  }
  return { open: false, text: "" };
}

export function OpenStatus({ className = "" }: { className?: string }) {
  const [s, setS] = useState<{ open: boolean; text: string } | null>(null);
  useEffect(() => {
    const update = () => setS(status(new Date()));
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);
  return (
    <p className={`inline-flex min-h-6 items-center gap-2.5 t-label ${className}`} aria-live="polite">
      {s && (
        <>
          <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${s.open ? "bg-amber shadow-[0_0_10px_2px] shadow-amber/60" : "bg-vellum/60"}`} />
          {s.text}
        </>
      )}
    </p>
  );
}
