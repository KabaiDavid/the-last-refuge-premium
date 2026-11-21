import "server-only";
import { site } from "@/content/site";

export type LiveEvent = { title: string; date: string; time?: string; image?: string };

const decode = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "’")
    .replace(/&quot;/g, "\"")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();

/**
 * Reads upcoming events from the venue's Surreal widget (the same source as
 * the embedded calendar on /events). Returns [] on any failure, so callers
 * show the embedded calendar instead of invented content.
 */
export async function getUpcomingEvents(limit = 6): Promise<LiveEvent[]> {
  try {
    const res = await fetch(site.links.eventsWidget, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return [];
    const html = await res.text();
    const events: LiveEvent[] = [];
    // Each event card: <time dateTime="YYYY-MM-DD"> … <span class="line-clamp-2">Title</span> … optional <time dateTime="HH:MM">
    const cards = html.split(/<time[^>]*dateTime="(\d{4}-\d{2}-\d{2})"/).slice(1);
    for (let i = 0; i < cards.length; i += 2) {
      const date = cards[i];
      const body = cards[i + 1] ?? "";
      const title = body.match(/line-clamp-2">([^<]+)</)?.[1];
      if (!title) continue;
      const time = body.match(/<time[^>]*dateTime="(\d{2}:\d{2})"/)?.[1];
      events.push({ date, title: decode(title), time });
    }
    const today = new Date().toISOString().slice(0, 10);
    return events.filter((e) => e.date >= today).slice(0, limit);
  } catch {
    return [];
  }
}
