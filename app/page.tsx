import { Altar } from "@/components/sections/Altar";
import { Benediction } from "@/components/sections/Benediction";
import { Communion } from "@/components/sections/Communion";
import { Directions } from "@/components/sections/Directions";
import { Fellowship } from "@/components/sections/Fellowship";
import { Hymns } from "@/components/sections/Hymns";
import { Invocation } from "@/components/sections/Invocation";
import { Prelude } from "@/components/sections/Prelude";
import { Sanctuary } from "@/components/sections/Sanctuary";
import { getUpcomingEvents } from "@/lib/events";
import { getWhiskeyList } from "@/lib/whiskey";

export const revalidate = 900;

/** The homepage is an order of service: nine parts, one evening. */
export default async function Home() {
  const [list, events] = await Promise.all([getWhiskeyList(), getUpcomingEvents(4)]);
  return (
    <>
      <Prelude />
      <Invocation />
      <Sanctuary />
      <Altar list={list} />
      <Communion />
      <Hymns events={events} />
      <Fellowship />
      <Directions />
      <Benediction />
    </>
  );
}
