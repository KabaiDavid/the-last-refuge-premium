import { formatTime, hours } from "@/content/site";

/**
 * Opening hours, set like a church hymn board: a dark wooden panel with
 * slotted tiles. Semantic table underneath for assistive tech.
 */
export function HymnBoardHours({ className = "", caption = "Hours" }: { className?: string; caption?: string }) {
  return (
    <div className={`relative border border-oak bg-gradient-to-b from-pew to-crypt p-5 sm:p-7 ${className}`}>
      <div aria-hidden className="pointer-events-none absolute inset-x-6 -top-px h-px bg-gradient-to-r from-transparent via-brass/60 to-transparent" />
      <table className="w-full border-separate border-spacing-y-1.5">
        <caption className="mb-4 text-left t-label text-brass">{caption}</caption>
        <tbody>
          {hours.map((d) => (
            <tr key={d.day}>
              <th scope="row" className="w-[34%] text-left font-normal">
                <span className="inline-block min-w-[3.75rem] border border-brass/30 bg-crypt/70 px-2 py-1 text-center t-label text-parchment/90">
                  <abbr title={d.day} className="no-underline">{d.short}</abbr>
                </span>
              </th>
              <td className="text-right font-display text-[1.15rem] tabular">
                {d.open && d.close ? (
                  <span className="text-parchment">
                    {formatTime(d.open)}
                    <span className="mx-2 text-brass" aria-label="to">–</span>
                    {formatTime(d.close)}
                  </span>
                ) : (
                  <span className="font-serif text-base italic text-vellum">Closed</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
