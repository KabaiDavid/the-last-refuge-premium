// Verified facts only. Source: thelastrefuge.com (Nov 2026) unless noted.
// See docs/01-research-audit.md before changing anything here.

export const site = {
  name: "The Last Refuge",
  url: "https://www.thelastrefuge.com",
  tagline: "A High Church of Bourbon",
  description:
    "A whiskey bar and restaurant inside an 1880 church in Louisville's NuLu district: hundreds of American whiskeys, tavern-style pizza, Heaven's Door cocktails, live music and private events.",
  founded: "1880",
  operator: { name: "Atomic Hospitality", url: "https://atomichg.com/" },
  address: {
    street: "600 East Market Street",
    city: "Louisville",
    region: "KY",
    postalCode: "40202",
    country: "US",
    neighborhood: "NuLu",
    corner: "East Market & Hancock",
  },
  geo: { lat: 38.25327, lng: -85.7419 }, // OpenStreetMap geocode of 600 E Market St,
  phone: { display: "(502) 208-4900", href: "tel:+15022084900", e164: "+15022084900" },
  email: "info@thelastrefuge.com",
  ageNotice:
    "The Last Refuge is a 21+ establishment. Persons under the age of 21 will not be admitted.",
  links: {
    reserve: "https://www.opentable.com/r/the-last-refuge-louisville",
    openTableRid: "1335805",
    instagram: "https://instagram.com/lastrefugeky",
    instagramHandle: "@lastrefugeky",
    giftCards: "https://swipeit.com/co-branded/merchant/the-last-refuge-11350",
    careers: "https://atomichg.com/careers/",
    roomBlocks: "https://bit.ly/AtomicRoomBlocks",
    eventsWidget: "https://surreal.live/widget/the-last-refuge",
    directions:
      "https://www.google.com/maps/dir/?api=1&destination=The+Last+Refuge+600+E+Market+St+Louisville+KY+40202",
    map: "https://www.google.com/maps/search/?api=1&query=The+Last+Refuge+600+E+Market+St+Louisville+KY+40202",
  },
  tripleseat: {
    formId: "5699",
    publicKey: "6223faa67f0b53ab7ba9cc4223207389eef53574",
  },
  analytics: { gtm: "GTM-NZFTH7PC" },
} as const;

export type Day = { day: string; short: string; open?: string; close?: string; schemaDay: string };

/** Hours as published on thelastrefuge.com. `close` past midnight is written as e.g. "01:00". */
export const hours: Day[] = [
  { day: "Monday", short: "Mon", schemaDay: "Monday" },
  { day: "Tuesday", short: "Tue", schemaDay: "Tuesday" },
  { day: "Wednesday", short: "Wed", open: "16:00", close: "23:00", schemaDay: "Wednesday" },
  { day: "Thursday", short: "Thu", open: "16:00", close: "23:00", schemaDay: "Thursday" },
  { day: "Friday", short: "Fri", open: "16:00", close: "01:00", schemaDay: "Friday" },
  { day: "Saturday", short: "Sat", open: "16:00", close: "01:00", schemaDay: "Saturday" },
  { day: "Sunday", short: "Sun", open: "16:00", close: "22:00", schemaDay: "Sunday" },
];

export function formatTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 && h < 24 ? "pm" : "am";
  const hr = h % 12 === 0 ? 12 : h % 12;
  return `${hr}${m ? ":" + String(m).padStart(2, "0") : ""}${suffix}`;
}

export const nav = [
  { href: "/menus", label: "Menus" },
  { href: "/whiskey", label: "The Back Bar" },
  { href: "/sanctuary", label: "The Sanctuary" },
  { href: "/private-events", label: "Private Events" },
  { href: "/events", label: "Live Music" },
  { href: "/visit", label: "Visit" },
] as const;

export const concepts = [
  { name: "City Hall", url: "https://thecityhall.com/" },
  { name: "Bar Tabu", url: "https://www.bartabu.com/" },
  { name: "Tetto", url: "https://tettochicago.com/" },
  { name: "Recess", url: "https://chicagoinrecess.com/" },
  { name: "Untitled Supper Club", url: "https://www.untitledsupperclub.com/" },
  { name: "Artifact Events", url: "https://artifacteventschicago.com/" },
  { name: "Morgan MFG", url: "https://morgan-mfg.com/" },
] as const;
