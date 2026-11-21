import dims from "./image-dimensions.json";

// Every photograph is the venue's own (2025 shoot, from thelastrefuge.com).
// Alt text describes what is actually in frame.

type Key = keyof typeof dims;

const alts: Record<Key, string> = {
  "library-room":
    "A whiskey library room lined floor to ceiling with backlit bottle cubbies, beneath a stained-glass window",
  "gym-hall":
    "The former church gymnasium, now a long dining hall with chandeliers and a two-storey wall of bourbon",
  parlour:
    "A lounge with tufted gold armchairs, panelled walls and tall arched stained-glass windows",
  "aerial-night":
    "Aerial view at night of the red-brick church and its lit courtyard, with the Louisville skyline beyond",
  "bar-front":
    "The main bar: dark wood with Gothic arched panels, star-shaped pendant lights and a mirrored back bar",
  "entrance-sign":
    "The Last Refuge sign and crest beside the entrance steps, beside a large black-and-white photographic mural",
  "heavens-door-shelf": "Rows of Heaven’s Door whiskey bottles glowing on a backlit shelf",
  "courtyard-dusk":
    "The courtyard at dusk: lounge seating and string lights before the church’s lit stained-glass windows",
  crest: "The Last Refuge crest",
  "courtyard-firepit":
    "A fire table in the courtyard at night, the brick church washed in violet light behind it",
  "exterior-day":
    "The red-brick church with its spire and stained-glass windows rising over the courtyard",
  "chapel-ceiling":
    "The Chapel Room ceiling: a vast painted sky of figures among rose, amber and blue clouds, hung with ornate pendant lamps",
  "windows-closeup":
    "Two lancet stained-glass windows in the red-brick wall, above a blue velvet daybed on the patio",
  "patio-day": "The sunny patio with red umbrellas, palms and lounge seating against the brick church",
  "velvet-lounge":
    "A velvet lounge with a curved white sofa, blue ottomans, a gilt mirror and damask wallpaper",
  "the-pour": "A bartender pouring a pink cocktail from a shaker in front of the back bar",
  "lounge-window":
    "A lounge under a chandelier, with velvet seating and a stained-glass window in the corner",
  "gym-mezzanine":
    "The gym bar seen from above: a steel mezzanine, chandeliers and the bourbon wall rising two storeys",
  "bourbon-wall": "Shelves of bourbon bottles lit from behind, row upon row",
  "facade-night":
    "The church façade at night, its stained-glass windows lit warm against a deep blue sky",
  arrival: "Two guests climbing the steps through the Gothic arched doorway of the church",
  "stained-glass-cocktail": "A stemmed cocktail glowing in front of a lit stained-glass window",
  "chapel-room":
    "The Chapel Room: white walls, lancet windows and a painted ceiling of clouds above a polished floor",
  "spire-dusk": "The church spire lit magenta against the dusk sky over NuLu",
  "courtyard-aerial": "The courtyard from above, with red umbrellas between the church and the gym building",
  "chapel-wide":
    "The full length of the Chapel Room under its painted cloud ceiling, an arched doorway at the far end",
  logo: "The Last Refuge",
};

export type Photo = { src: string; alt: string; width: number; height: number };

export const img = Object.fromEntries(
  (Object.keys(dims) as Key[]).map((k) => [
    k,
    {
      src: `/images/${k}.${k === "crest" || k === "logo" ? "png" : "jpg"}`,
      alt: alts[k],
      width: dims[k].width,
      height: dims[k].height,
    },
  ]),
) as Record<Key, Photo>;
