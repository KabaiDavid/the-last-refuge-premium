import "server-only";
import snapshot from "@/content/whiskey-snapshot.json";

/**
 * The whiskey list lives in a public Google Sheet that the bar team edits.
 * It is fetched on the server, cached for 15 minutes (ISR) and rendered as
 * indexable HTML. If the sheet is unreachable, the bundled snapshot is used.
 */
const SHEET_ID = "1ZqlhIHhsNze3Kj3ShHfvUW0hTxsWf1So";

export const shelves = [
  { id: "bourbon", label: "Bourbon", gid: "993902250", layout: "pour" },
  { id: "rye", label: "Rye", gid: "1804468616", layout: "pour" },
  { id: "american", label: "American", gid: "579374237", layout: "pour" },
  { id: "international", label: "International", gid: "1915725866", layout: "intl" },
  { id: "flavored", label: "Flavored", gid: "135148941", layout: "pour" },
  { id: "heavens-door", label: "Heaven’s Door", gid: "1638834378", layout: "bottle" },
] as const;

export type ShelfId = (typeof shelves)[number]["id"];

export type Whiskey = {
  id: string;
  shelf: ShelfId;
  name: string;
  origin?: string;
  proof?: string;
  /** First numeric proof value, for sorting and filtering ranges like "100-115". */
  proofValue?: number;
  oneOz?: number;
  twoOz?: number;
  bottle?: number;
};

export type WhiskeyList = {
  items: Whiskey[];
  source: "live" | "snapshot";
};

/** RFC-4180-ish CSV parser (handles quoted fields with commas and "" escapes). */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (c === '"') quoted = false;
      else field += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else field += c;
  }
  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function money(v?: string): number | undefined {
  if (!v) return undefined;
  const n = Number(v.replace(/[$,"\s]/g, ""));
  return Number.isFinite(n) && n > 0 ? n : undefined;
}

function proofOf(v?: string) {
  const proof = v?.trim() || undefined;
  const m = proof?.match(/\d+(\.\d+)?/);
  return { proof, proofValue: m ? Number(m[0]) : undefined };
}

const tidy = (s: string) => s.replace(/\s+/g, " ").trim();

function parseShelf(id: ShelfId, layout: string, csv: string): Whiskey[] {
  return parseCsv(csv)
    .slice(1)
    .filter((r) => r[0] && tidy(r[0]))
    .map((r, i) => {
      const name = tidy(r[0]);
      const base = { id: `${id}-${i}`, shelf: id, name };
      if (layout === "intl")
        return { ...base, origin: tidy(r[1] ?? "") || undefined, ...proofOf(r[2]), oneOz: money(r[3]), twoOz: money(r[4]) };
      if (layout === "bottle") return { ...base, ...proofOf(r[1]), bottle: money(r[2]) };
      return { ...base, ...proofOf(r[1]), oneOz: money(r[2]), twoOz: money(r[3]) };
    });
}

function fromSnapshot(): Whiskey[] {
  const snap = snapshot as Record<string, string>;
  return shelves.flatMap((s) => parseShelf(s.id, s.layout, snap[s.id] ?? ""));
}

export async function getWhiskeyList(): Promise<WhiskeyList> {
  try {
    const tabs = await Promise.all(
      shelves.map(async (s) => {
        const res = await fetch(
          `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${s.gid}`,
          { next: { revalidate: 900 }, signal: AbortSignal.timeout(6000) },
        );
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

/** Count of whiskeys currently poured (excludes the bottle-only Heaven's Door shelf). */
export function pourCount(list: WhiskeyList) {
  return list.items.filter((w) => w.shelf !== "heavens-door").length;
}
