import SectionMap from "@/src/containers/singlepage/components/SectionMap";
import { getDataMap } from "@/src/lib/getDataMap";
import { loadProvincesGeoJson } from "@/src/lib/loadProvincesGeoJson";
import { loadECTGeoJson } from "@/src/lib/loadECTGeoJson";
import {
  processMapItems,
  getECTCountByProvince,
  updateCoveredECT,
} from "@/src/lib/processMapItems";

export default async function MapPage() {
  const [dataMap, provincesData, ectData] = await Promise.all([
    getDataMap(),
    loadProvincesGeoJson(),
    loadECTGeoJson(),
  ]);

  // Filter only published items
  const publishedMapItems = dataMap.filter(
    (item) => item.published === "Published"
  );

  // Process map items with province info and name_id (resolves short URLs)
  const mapWithProvince = await processMapItems(
    publishedMapItems,
    provincesData,
    ectData
  );

  // Get ECT count by province and update with covered count
  const ectCountByProvince = getECTCountByProvince(ectData);
  const ectCountWithCovered = updateCoveredECT(
    ectCountByProvince,
    mapWithProvince
  );

  return <SectionMap map={mapWithProvince} ectCount={ectCountWithCovered} />;
}
