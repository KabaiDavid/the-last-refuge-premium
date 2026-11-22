import "server-only";
import snapshot from "@/content/whiskey-snapshot.json";
import { parseShelf, sheetCsvUrl, shelves, type Whiskey, type WhiskeyList } from "./whiskey-core";

export { shelves } from "./whiskey-core";
export type { ShelfId, Whiskey, WhiskeyList } from "./whiskey-core";

function fromSnapshot(): Whiskey[] {
  const snap = snapshot as Record<string, string>;
  return shelves.flatMap((s) => parseShelf(s.id, s.layout, snap[s.id] ?? ""));
}

/** Build-time read of the sheet; falls back to the bundled snapshot if unreachable. */
export async function getWhiskeyList(): Promise<WhiskeyList> {
  try {
    const tabs = await Promise.all(
      shelves.map(async (s) => {
        const res = await fetch(sheetCsvUrl(s.gid), { signal: AbortSignal.timeout(8000) });
        if (!res.ok) throw new Error(`${s.id}: ${res.status}`);
        const text = await res.text();
        // Google returns an HTML sign-in page when a sheet is made private.
        if (text.trimStart().startsWith("<")) throw new Error(`${s.id}: not CSV`);
        return parseShelf(s.id, s.layout, text);
      }),
    );
    const items = tabs.flat();
    if (items.length < 50) throw new Error("sheet unexpectedly small");
    return { items, source: "live" };
  } catch (err) {
    console.warn("[whiskey] falling back to snapshot:", (err as Error).message);
    return { items: fromSnapshot(), source: "snapshot" };
  }
}
