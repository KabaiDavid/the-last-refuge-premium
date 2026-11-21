// Transcribed verbatim from thelastrefuge.com/menus (Nov 2026).
// Names, ingredients, prices and allergens are the venue's own. Do not embellish.

export type Allergen =
  | "Dairy"
  | "Gluten"
  | "Tree Nuts"
  | "Eggs"
  | "Fin Fish"
  | "Sesame"
  | "Shellfish";

export type Price = { label?: string; amount: number };

export type MenuItem = {
  name: string;
  description?: string;
  prices: Price[];
  allergens?: Allergen[];
  note?: string;
  /** Only where the venue's menu says "available gluten free". */
  glutenFreeAvailable?: boolean;
};

export type MenuSection = {
  id: string;
  title: string;
  note?: string;
  items: MenuItem[];
  extras?: { title: string; items: string }[];
};

export type MenuGroup = {
  id: string;
  title: string;
  kicker: string;
  sections: MenuSection[];
};

const p = (amount: number, label?: string): Price => ({ amount, label });
const pizza = (s: number, l: number, gf?: number): Price[] =>
  [p(s, '12″'), p(l, '16″'), ...(gf ? [p(gf, 'GF 20″')] : [])];

export const food: MenuGroup = {
  id: "food",
  title: "Food",
  kicker: "Breaking bread",
  sections: [
    {
      id: "shareables",
      title: "Shareables",
      items: [
        {
          name: "A Taste of Derby",
          description:
            "Brûléed burrata · Broadbent country ham · maple-lacquered pecans · fig jam vinaigrette · arugula · crostini · pickled Fresno chile · smoked Maldon salt",
          prices: [p(20)],
          allergens: ["Dairy", "Gluten", "Tree Nuts"],
        },
        {
          name: "Holy Grail Hummus",
          description: "Hummus · chermoula · crudité · warm pita",
          prices: [p(15)],
          allergens: ["Gluten"],
        },
        {
          name: "Friar’s Bacon",
          description: "Thick-cut bacon · masala spice · bourbon · maple",
          prices: [p(22)],
        },
        {
          name: "Holy Fire Dip",
          description: "Buffalo chicken dip · crostini · crudité · gochugaru chile flakes · Frank’s",
          prices: [p(15)],
          allergens: ["Dairy", "Gluten"],
          glutenFreeAvailable: true,
        },
        {
          name: "The Devil’s Eggs",
          description: "Alder wood smoked salmon · dill · pickled mustard seed · everything seasoning",
          prices: [p(17)],
          allergens: ["Eggs", "Fin Fish", "Sesame"],
        },
        {
          name: "Parishioner’s Popcorn",
          description: "Brown butter · ranch seasoning",
          prices: [p(8)],
          allergens: ["Dairy"],
        },
      ],
    },
    {
      id: "salads",
      title: "Salads",
      note: "Add warm herb-roasted chicken for 5",
      items: [
        {
          name: "Sinner’s Kale Salad",
          description:
            "Baby kale · bourbon raisins · toasted pepitas · roasted pear · Marcona almonds · maple-Dijon vinaigrette",
          prices: [p(16)],
          allergens: ["Tree Nuts"],
        },
        {
          name: "The Wicked Wedge",
          description:
            "Bacon · roasted tomato · red onion · croutons · Last Refuge blue cheese or ranch dressing",
          prices: [p(16)],
          allergens: ["Dairy", "Gluten"],
        },
      ],
    },
    {
      id: "pizza",
      title: "Tavern-Style Pizza",
      note: "Gluten-free pizzas are available in 20″ Detroit-style crusts.",
      items: [
        {
          name: "The Holy Trinity",
          description: "Grande mozzarella · aged provolone · pecorino · Refuge pizza sauce",
          prices: pizza(18, 23, 28),
          allergens: ["Dairy", "Gluten"],
        },
        {
          name: "The Burnt Offerings",
          description:
            "Charred cup pepperoni · Grande mozzarella · aged provolone · serrano honey · Refuge pizza sauce",
          prices: pizza(22, 26, 31),
          allergens: ["Dairy", "Gluten"],
        },
        {
          name: "Purgatory 2.0",
          description:
            "N’duja · Grande mozzarella · aged provolone · Fresno chiles · hot honey · Refuge pizza sauce",
          prices: pizza(26, 31, 36),
          allergens: ["Dairy", "Gluten"],
        },
        {
          name: "Madonna’s Crazy Cousin",
          description:
            "Burrata · onion · roasted wild mushrooms · bacon · Parmigiano · kale · ranch · balsamic glaze",
          prices: pizza(27, 32, 37),
          allergens: ["Dairy", "Gluten"],
        },
        {
          name: "Meat Jesus",
          description:
            "Finocchiona · mini cup pepperoni · bacon · Italian sausage · Grande mozzarella · aged provolone · Refuge pizza sauce",
          prices: pizza(26, 31, 36),
          allergens: ["Dairy", "Gluten"],
        },
        {
          name: "Divine Pesto",
          description: "Arugula pesto · torn burrata · red onion · tomato · Parmigiano",
          prices: pizza(21, 26, 31),
          allergens: ["Dairy", "Gluten"],
        },
        {
          name: "Build Your Own Pizza",
          description: "Marinara · mozzarella · provolone blend",
          prices: pizza(15, 20),
        },
      ],
      extras: [
        { title: "Additional toppings", items: "+2 each for small, +3 for large" },
        {
          title: "Meat",
          items: "Cup pepperoni · Italian sausage · bacon · herb-roasted chicken · fennel salami",
        },
        {
          title: "Veggies",
          items:
            "Wild mushrooms · red onion · oven-roasted tomatoes · baby kale · pepperoncini peppers · Fresno peppers",
        },
        {
          title: "Extras",
          items: "Arugula pesto · hot honey · EVOO · pecorino · Parmesan · chili flakes",
        },
      ],
    },
    {
      id: "large-plates",
      title: "Large Plates",
      items: [
        {
          name: "Sin + Grits",
          description:
            "Blackened Gulf shrimp · mascarpone · Weisenberger grits · New Orleans grillades sauce",
          prices: [p(29)],
          allergens: ["Dairy", "Shellfish"],
        },
      ],
    },
    {
      id: "sandwiches",
      title: "Sandwiches",
      note: "Served with salted kettle chips or potato salad.",
      items: [
        {
          name: "Sanctuary Sliders",
          description:
            "Three beef sliders · American cheese · red onion jam · Dijonnaise · house pickles",
          prices: [p(20)],
          allergens: ["Dairy", "Eggs", "Gluten"],
        },
        {
          name: "The Mary",
          description:
            "Arugula pesto chicken salad · bacon · baby kale · roasted tomato · hot honey · Cubano roll",
          prices: [p(18)],
          allergens: ["Eggs", "Gluten"],
        },
      ],
    },
    {
      id: "desserts",
      title: "Desserts",
      items: [
        {
          name: "Judas Loved Chocolate",
          description: "Tootsie Roll crème brûlée · toasted hazelnuts · berry coulis",
          prices: [p(10)],
          allergens: ["Dairy", "Eggs", "Tree Nuts"],
        },
        {
          name: "Sweet Jesus",
          description: "Heaven’s Door bourbon balls · lacquered pecans · raspberry coulis",
          prices: [p(10)],
          allergens: ["Dairy", "Tree Nuts"],
        },
        {
          name: "Louisville Creamery Ice Cream",
          description: "Evolving and rotating flavors, served with a wafer cookie",
          prices: [p(10)],
          allergens: ["Dairy", "Gluten"],
          glutenFreeAvailable: true,
        },
      ],
    },
  ],
};

export const signatureCocktails: MenuItem[] = [
  {
    name: "The Old American Way",
    description: "Heaven’s Door Ascension KY Bourbon · rich fig syrup · cherry and chocolate bitters",
    prices: [p(16)],
  },
  {
    name: "Peach Tree",
    description:
      "Heaven’s Door Revival Straight Bourbon · lemon rosemary syrup · white peach · limoncello · soda water",
    prices: [p(14)],
  },
  {
    name: "So Long, Honey Babe",
    description:
      "Heaven’s Door Refuge Rye · Earl Grey vermouth · spiced plum · blueberry · honey · lemon · Hellfire bitters",
    prices: [p(14)],
  },
  {
    name: "Nightsong",
    description: "Larceny Bourbon · maraschino · Meletti · ginger syrup",
    prices: [p(15)],
  },
  {
    name: "Crossroads",
    description: "Four Roses Bourbon · aged vermouth · Strega · orange · tamarind",
    prices: [p(14)],
  },
  {
    name: "Fall Hymn",
    description: "Pear vodka · elderflower · vanilla pear syrup · lemon · Indigenous Prosecco",
    prices: [p(14)],
  },
  {
    name: "Stained Glass",
    description:
      "Berry-infused blanco tequila · passionfruit · lime · grapefruit. Make it spicy: add kumquat chili liqueur +2",
    prices: [p(14)],
  },
  {
    name: "Forbidden Fruit",
    description: "Woodford Reserve · salted strawberry jam · grapefruit · black pepper pamplemousse",
    prices: [p(15)],
  },
  {
    name: "Veso Solstice Spritz",
    description: "Bright strawberry and tart citrus with a subtle bitter finish",
    prices: [p(13)],
  },
];

export const drinks: MenuGroup = {
  id: "drinks",
  title: "Cocktails",
  kicker: "The readings",
  sections: [
    { id: "signature-cocktails", title: "Signature Cocktails", items: signatureCocktails },
    {
      id: "zero-proof",
      title: "Zero Proof",
      items: [
        {
          name: "Dry County",
          description: "Ritual whiskey alternative · demerara · non-alcoholic barrel-aged vanilla bitters",
          prices: [p(13)],
        },
        { name: "Contrantino", description: "Non-alcoholic Italiano aperitivo", prices: [p(12)] },
      ],
    },
  ],
};

const gb = (g: number, b: number) => [p(g, "Glass"), p(b, "Bottle")];

export const wine: MenuGroup = {
  id: "wine",
  title: "Wine",
  kicker: "From the vine",
  sections: [
    {
      id: "reds",
      title: "Reds",
      items: [
        { name: "Levee and Loam", description: "Cabernet Sauvignon · California", prices: gb(12, 48) },
        { name: "The Pinot Project", description: "Pinot Noir · California", prices: gb(13, 52) },
        { name: "Ryan Patrick Redhead Red", description: "Red blend · Washington", prices: gb(12, 48) },
      ],
    },
    {
      id: "white-rose",
      title: "White & Rosé",
      items: [
        { name: "Mount Riley", description: "Sauvignon Blanc · New Zealand", prices: gb(11, 44) },
        { name: "Vigneti Del Sole", description: "Pinot Grigio · Italy", prices: gb(12, 48) },
        { name: "Comtesse Marion", description: "Chardonnay · France", prices: gb(12, 48) },
        { name: "La Morandina", description: "Moscato · Italy", prices: gb(12, 48) },
      ],
    },
    {
      id: "sparkling",
      title: "Sparkling",
      items: [{ name: "Indigenous", description: "Prosecco · Veneto, Italy", prices: gb(13, 53) }],
    },
  ],
};

export const beer: MenuGroup = {
  id: "beer",
  title: "Beer",
  kicker: "On draft & in hand",
  sections: [
    {
      id: "draft",
      title: "Draft Pours",
      note: "16oz",
      items: [
        { name: "New Belgium Fat Tire", description: "Amber · 5.2%", prices: [p(7)] },
        { name: "Sierra Nevada Hazy Little Thing", description: "Hazy IPA · 6.7%", prices: [p(8)] },
        { name: "Dogfish Head 60 Minute IPA", description: "IPA · 6.0%", prices: [p(8)] },
        { name: "Wise Bird Cider", description: "Cider · 6.9%", prices: [p(8)] },
        {
          name: "Lexington Brewing Bourbon Barrel Ale",
          description: "American strong ale · 8.2%",
          prices: [p(8)],
        },
        { name: "Blue Moon", description: "Witbier · 5.4%", prices: [p(7)] },
        {
          name: "Seasonal Rotating Draft",
          description: "Ask your server what’s on tap today",
          prices: [],
        },
      ],
    },
    {
      id: "packaged",
      title: "Packaged",
      items: [
        { name: "Michelob Ultra", description: "Domestic lager · 4.2% · 12oz", prices: [p(6)] },
        { name: "Coors Light", description: "Domestic lager · 4.2% · 12oz", prices: [p(6)] },
        { name: "Bud Light", description: "Domestic lager · 4.2% · 12oz", prices: [p(6)] },
        { name: "Modelo Especial", description: "Mexican lager · 4.5% · 12oz", prices: [p(6)] },
        { name: "Miller Lite", description: "Domestic lager · 4.2% · 12oz", prices: [p(6)] },
        { name: "Stiegl Radler", description: "Grapefruit radler · 3.2% · 16.9oz", prices: [p(10)] },
        { name: "High Noon", description: "Vodka seltzer, rotating flavors · 4.5% · 12oz", prices: [p(8)] },
      ],
    },
  ],
};

export const exclusive: MenuGroup = {
  id: "exclusive",
  title: "Exclusive Bottles",
  kicker: "From the reliquary",
  sections: [
    {
      id: "exclusive-bourbon",
      title: "Bourbon",
      items: [
        {
          name: "Woodford Reserve Baccarat Edition",
          description: "Bourbon · 90.4 proof",
          prices: [p(232, "1oz"), p(232, "1.5oz"), p(348, "2oz")],
        },
      ],
    },
  ],
};

export const menuGroups = [food, drinks, wine, beer, exclusive];

export const allAllergens: Allergen[] = [
  "Dairy",
  "Gluten",
  "Tree Nuts",
  "Eggs",
  "Fin Fish",
  "Shellfish",
  "Sesame",
];
