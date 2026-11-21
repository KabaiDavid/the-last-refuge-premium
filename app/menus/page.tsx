import { PageHero } from "@/components/layout/PageHero";
import { MenuExplorer } from "@/components/menus/MenuExplorer";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { img } from "@/content/images";
import { menuGroups } from "@/content/menu";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Menus: Food, Cocktails, Wine & Beer",
  description:
    "The Last Refuge menu: tavern-style pizza, shareables like A Taste of Derby, Sin + Grits, Heaven’s Door cocktails, zero-proof drinks, wine and beer, with prices and allergens.",
  path: "/menus",
  image: "/images/stained-glass-cocktail.jpg",
});

function menuJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: "The Last Refuge Menu",
    url: `${site.url}/menus`,
    hasMenuSection: menuGroups.map((g) => ({
      "@type": "MenuSection",
      name: g.title,
      hasMenuSection: g.sections.map((s) => ({
        "@type": "MenuSection",
        name: s.title,
        hasMenuItem: s.items.map((i) => ({
          "@type": "MenuItem",
          name: i.name,
          ...(i.description ? { description: i.description } : {}),
          ...(i.prices[0] ? { offers: { "@type": "Offer", price: i.prices[0].amount, priceCurrency: "USD" } } : {}),
        })),
      })),
    })),
  };
}

export default function MenusPage() {
  return (
    <>
      <PageHero
        n={5}
        label="Communion"
        title={
          <>
            The <span className="italic text-amber">menus</span>
          </>
        }
        lede="Pizza, plates to share, cocktails and a cellar of pours. Names chosen by sinners, food cooked by saints."
        photo={img["the-pour"]}
        position="50% 40%"
      >
        <Button href="/reservations" data-cta="reserve">Reserve a Table</Button>
        <Button href="/whiskey" variant="outline" arrow>The whiskey list</Button>
      </PageHero>
      <div className="bg-nave">
        <div className="shell pb-[var(--section)] pt-0 lg:pt-20">
          <MenuExplorer groups={menuGroups} />
        </div>
      </div>
      <JsonLd data={menuJsonLd()} />
    </>
  );
}
