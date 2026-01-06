import { Suspense } from "react";
import Gallery from "@/src/containers/gallery";
import { getDataGreen } from "@/src/lib/getDataGreen";
import { getDataSticker } from "@/src/lib/getDataSticker";

export default async function ActivitiesPage() {
  const [dataGreenEvent, dataSticker] = await Promise.all([
    getDataGreen(),
    getDataSticker(),
  ]);
  return (
    <Suspense fallback={<div className="bg-base-100 min-h-screen" />}>
      <Gallery greenEvent={dataGreenEvent} dataSticker={dataSticker} />
    </Suspense>
  );
}
