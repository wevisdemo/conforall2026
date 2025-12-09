import HomePage from "../containers/singlepage";
import { getFaqData } from "../lib/getFaqData";
import { getDataMap } from "../lib/getDataMap";
import { loadProvincesGeoJson } from "../lib/loadProvincesGeoJson";
import { loadECTGeoJson } from "../lib/loadECTGeoJson";
import {
  processMapItems,
  getECTCountByProvince,
  updateCoveredECT,
} from "../lib/processMapItems";

export default async function Home() {
  const [faqData, dataMap, provincesData, ectData] = await Promise.all([
    getFaqData(),
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

  return (
    <HomePage
      faq={faqData}
      map={mapWithProvince}
      ectCount={ectCountWithCovered}
    />
  );
}
