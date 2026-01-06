import Activities from "@/src/containers/activities";
import { getDataGreen } from "@/src/lib/getDataGreen";

export default async function ActivitiesPage() {
  const [dataGreenEvent] = await Promise.all([getDataGreen()]);

  // Filter only published items
  const greenEvent = dataGreenEvent.filter(
    (item) => item.activity_type === "1000 activities"
  );

  return <Activities greenEvent={greenEvent} />;
}
