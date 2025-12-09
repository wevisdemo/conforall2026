import HomePage from "../containers/singlepage";
import { getFaqData } from "../lib/getFaqData";
import { getDataMap } from "../lib/getDataMap";
import { loadProvincesGeoJson } from "../lib/loadProvincesGeoJson";
import { loadECTGeoJson } from "../lib/loadECTGeoJson";
import { processMapItems } from "../lib/processMapItems";

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

  // Process map items with province info and name_id
  const mapWithProvince = processMapItems(
    publishedMapItems,
    provincesData,
    ectData
  );

  return <HomePage faq={faqData} map={mapWithProvince} />;
}
