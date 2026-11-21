import { img, type Photo } from "./images";

// Space names follow the venue's own photo labels. Capacities are not
// published by the venue, so none are stated: enquiries get exact numbers.

export type Space = {
  id: string;
  name: string;
  line: string;
  description: string;
  photo: Photo;
  position?: string;
};

export const spaces: Space[] = [
  {
    id: "chapel-room",
    name: "The Chapel Room",
    line: "Lancet windows and a painted sky",
    description:
      "The church’s sanctuary, restored: white walls, stained-glass lancets down both sides and a ceiling painted as an open, clouded sky.",
    photo: img["chapel-wide"],
    position: "50% 50%",
  },
  {
    id: "the-gym",
    name: "The Gym",
    line: "Twenty-five feet of ceiling, two storeys of bourbon",
    description:
      "The old gymnasium, where “refuge in Kentucky” was once painted on the floor. Now the bar and dining hall, with chandeliers, a steel mezzanine and the bourbon wall.",
    photo: img["gym-mezzanine"],
    position: "50% 45%",
  },
  {
    id: "the-lounges",
    name: "The Lounges",
    line: "Velvet, damask & stained glass",
    description:
      "The house’s quieter rooms: velvet sofas, gilt mirrors, damask walls and stained glass. Made for an evening that wants a little privacy.",
    photo: img["velvet-lounge"],
    position: "50% 60%",
  },
  {
    id: "the-courtyard",
    name: "The Courtyard",
    line: "Fire tables under the windows",
    description:
      "Between the church and the gym: fire tables and string lights at night, umbrellas and palms by day.",
    photo: img["courtyard-firepit"],
    position: "50% 55%",
  },
];
