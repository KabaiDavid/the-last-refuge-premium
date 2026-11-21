import type { Metadata } from "next";
import { hours, site } from "@/content/site";

export function pageMetadata({
  title,
  description,
  path,
  image = "/og.jpg",
}: {
  title?: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const fullTitle = title ? `${title} · The Last Refuge, Louisville` : undefined;
  return {
    title: fullTitle ? { absolute: fullTitle } : undefined,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle ?? `${site.name}: ${site.tagline} in Louisville`,
      description,
      url: path,
      siteName: site.name,
      locale: "en_US",
      type: "website",
      images: [image === "/og.jpg" ? { url: image, width: 1200, height: 630, alt: site.name } : { url: image, alt: site.name }],
    },
    twitter: { card: "summary_large_image", title: fullTitle ?? site.name, description, images: [image] },
  };
}

/** LocalBusiness data built only from verified facts in content/site.ts. */
export function venueJsonLd() {
  const a = site.address;
  return {
    "@context": "https://schema.org",
    "@type": ["BarOrPub", "Restaurant"],
    "@id": `${site.url}/#venue`,
    name: site.name,
    slogan: site.tagline,
    description: site.description,
    url: site.url,
    telephone: site.phone.e164,
    email: site.email,
    image: [`${site.url}/images/facade-night.jpg`, `${site.url}/images/gym-hall.jpg`, `${site.url}/images/chapel-room.jpg`],
    logo: `${site.url}/images/logo.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: a.street,
      addressLocality: a.city,
      addressRegion: a.region,
      postalCode: a.postalCode,
      addressCountry: a.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.links.map,
    servesCuisine: ["American", "Pizza"],
    acceptsReservations: site.links.reserve,
    hasMenu: `${site.url}/menus`,
    sameAs: [site.links.instagram],
    parentOrganization: { "@type": "Organization", name: site.operator.name, url: site.operator.url },
    openingHoursSpecification: hours
      .filter((d) => d.open && d.close)
      .map((d) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: `https://schema.org/${d.schemaDay}`,
        opens: d.open,
        closes: d.close,
      })),
  };
}
