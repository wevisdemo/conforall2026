import GreenEvent from "@/src/containers/greenEvent";
import { getDataGreen } from "@/src/lib/getDataGreen";

export default async function GreenEventPage() {
  const [dataGreenEvent] = await Promise.all([getDataGreen()]);

  // Filter only published items
  const greenEvent = dataGreenEvent.filter(
    (item) => item.activity_type === "100 ขบวน"
  );

  return <GreenEvent greenEvent={greenEvent} />;
}
