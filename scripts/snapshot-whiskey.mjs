// Refreshes the offline fallback of the staff-maintained whiskey sheet.
import { writeFile } from "node:fs/promises";
const SHEET = "1ZqlhIHhsNze3Kj3ShHfvUW0hTxsWf1So";
const tabs = { bourbon: "993902250", rye: "1804468616", american: "579374237", international: "1915725866", flavored: "135148941", "heavens-door": "1638834378" };
const out = {};
for (const [k, gid] of Object.entries(tabs)) {
  const r = await fetch(`https://docs.google.com/spreadsheets/d/${SHEET}/export?format=csv&gid=${gid}`);
  if (!r.ok) throw new Error(k + " " + r.status);
  out[k] = await r.text();
}
out._capturedAt = new Date().toISOString();
await writeFile("content/whiskey-snapshot.json", JSON.stringify(out));
console.log("snapshot", Object.keys(out));
