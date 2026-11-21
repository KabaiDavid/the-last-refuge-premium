import Link from "next/link";
import { concepts, nav, site } from "@/content/site";
import { HymnBoardHours } from "./HymnBoardHours";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-oak bg-crypt pb-24 lg:pb-0">
      <div className="shell grid gap-14 py-20 lg:grid-cols-12 lg:gap-10 lg:py-28">
        <div className="lg:col-span-4">
          <span className="mark-logo block h-28 w-24 text-brass" aria-hidden />
          <p className="mt-8 font-display text-3xl leading-tight">The Last Refuge</p>
          <p className="mt-2 font-serif italic text-vellum">A High Church of Bourbon</p>
          <address className="mt-8 space-y-1 not-italic text-parchment/90">
            <a href={site.links.map} target="_blank" rel="noopener" className="block hover:text-amber">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.region} {site.address.postalCode}
              <span className="sr-only"> (opens map in a new tab)</span>
            </a>
            <a href={site.phone.href} className="mt-3 block py-1.5 hover:text-amber">{site.phone.display}</a>
            <a href={`mailto:${site.email}`} className="block py-1.5 hover:text-amber">{site.email}</a>
          </address>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 lg:col-span-4">
          <div>
            <p className="t-label text-brass">Visit</p>
            <ul className="mt-4 space-y-1">
              {[{ href: "/reservations", label: "Reservations" }, ...nav].map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="inline-block py-1.5 hover:text-amber">{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="t-label text-brass">Elsewhere</p>
            <ul className="mt-4 space-y-1">
              <li>
                <a href={site.links.instagram} target="_blank" rel="noopener" className="inline-block py-1.5 hover:text-amber">
                  Instagram<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href={site.links.giftCards} target="_blank" rel="noopener" className="inline-block py-1.5 hover:text-amber">
                  Gift cards<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href={site.links.careers} target="_blank" rel="noopener" className="inline-block py-1.5 hover:text-amber">
                  Join our team<span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div className="lg:col-span-4">
          <HymnBoardHours />
          <p className="mt-6 flex gap-3 t-small text-vellum">
            <span aria-hidden className="mt-0.5 inline-flex h-6 shrink-0 items-center border border-brass/50 px-1.5 text-[0.7rem] font-semibold tracking-wider text-brass">
              21+
            </span>
            {site.ageNotice}
          </p>
        </div>
      </div>

      <div className="border-t border-oak/70">
        <div className="shell flex flex-col gap-6 py-8 t-small text-vellum lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {year}{" "}
            <a href={site.operator.url} target="_blank" rel="noopener" className="hover:text-amber">
              {site.operator.name}<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="t-label text-[0.65rem] text-brass">Our concepts</span>
            {concepts.map((c) => (
              <a key={c.name} href={c.url} target="_blank" rel="noopener" className="inline-block py-1.5 hover:text-parchment">
                {c.name}<span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
