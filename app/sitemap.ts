export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["/", 1, "weekly"],
    ["/reservations", 0.9, "monthly"],
    ["/menus", 0.9, "weekly"],
    ["/whiskey", 0.8, "daily"],
    ["/private-events", 0.8, "monthly"],
    ["/events", 0.7, "daily"],
    ["/sanctuary", 0.6, "yearly"],
    ["/visit", 0.7, "monthly"],
  ];
  return routes.map(([path, priority, changeFrequency]) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }));
}
