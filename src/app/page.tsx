import { Spreadsheet, Column, Object, asString } from "sheethuahua";
import HomePage from "../containers/singlepage";
import {
  FaqItem,
  MapItem,
  MapItemWithProvince,
  ProvinceInfo,
  ECTInfo,
} from "../services/type";
import { booleanPointInPolygon, point } from "@turf/turf";
import type { FeatureCollection, MultiPolygon, Polygon } from "geojson";
import { promises as fs } from "fs";
import path from "path";

// Define your schema based on your Google Sheets columns
const schema = Object({
  category: Column("Category", asString()),
  question: Column("Question", asString()),
  answer: Column("Answer", asString()),
});

const schemaMap = Object({
  name: Column("ชื่อ - นามสกุล", asString().optional()),
  tel: Column("เบอร์โทรศัพท์", asString()),
  detail: Column("รายละเอียดติดต่อ", asString().optional()),
  name_location: Column("จุดรณรงค์", asString().optional()),
  map_url: Column("ตำแหน่งจากแผนที่ (Google Maps)", asString().optional()),
  map_detail: Column("อธิบายการเดินทางคร่าวๆ", asString().optional()),
  date: Column("วัน-เวลา ที่เปิด", asString().optional()),
});

// Extract lat/lng from Google Maps URL (supports multiple formats)
const extractLatLngFromGoogleMapsUrl = (
  url: string
): { lat: number; lng: number } | null => {
  try {
    const urlObj = new URL(url);

    // Format 1: ?q=lat,lng (e.g., maps?q=6.790679,101.294234)
    const qParam = urlObj.searchParams.get("q");
    if (qParam) {
      const match = qParam.match(/^(-?\d+\.?\d*),(-?\d+\.?\d*)$/);
      if (match) {
        return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
      }
    }

    // Format 2: /@lat,lng,zoom (e.g., /place/Name/@13.7380746,100.5181444,17z)
    const atMatch = url.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/);
    if (atMatch) {
      return { lat: parseFloat(atMatch[1]), lng: parseFloat(atMatch[2]) };
    }

    // Format 3: !3dlat!4dlng in data parameter (e.g., !3d13.7380694!4d100.5207193)
    const dataMatch = url.match(/!3d(-?\d+\.?\d*)!4d(-?\d+\.?\d*)/);
    if (dataMatch) {
      return { lat: parseFloat(dataMatch[1]), lng: parseFloat(dataMatch[2]) };
    }

    // Format 4: ll=lat,lng parameter
    const llParam = urlObj.searchParams.get("ll");
    if (llParam) {
      const [lat, lng] = llParam.split(",").map(Number);
      if (!isNaN(lat) && !isNaN(lng)) {
        return { lat, lng };
      }
    }

    return null;
  } catch {
    return null;
  }
};

// Find province from lat/lng using turf booleanPointInPolygon
const findProvinceByLatLng = (
  lat: number,
  lng: number,
  geojson: FeatureCollection<MultiPolygon | Polygon, ProvinceInfo>
): ProvinceInfo | null => {
  const pt = point([lng, lat]); // GeoJSON uses [lng, lat] order

  for (const feature of geojson.features) {
    if (booleanPointInPolygon(pt, feature)) {
      return feature.properties;
    }
  }
  return null;
};

// Load provinces geojson
async function loadProvincesGeoJson(): Promise<FeatureCollection<
  MultiPolygon | Polygon,
  ProvinceInfo
> | null> {
  try {
    const filePath = path.join(process.cwd(), "public", "provinces.geojson");
    const fileContent = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Failed to load provinces geojson:", error);
    return null;
  }
}

// Load ECT geojson (2566_TH_ECT_attributes_geojson)
async function loadECTGeoJson(): Promise<FeatureCollection<
  MultiPolygon | Polygon,
  ECTInfo
> | null> {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "2566_TH_ECT_attributes_geojson.json"
    );
    const fileContent = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Failed to load ECT geojson:", error);
    return null;
  }
}

// Find ECT info (name_id) from lat/lng using turf booleanPointInPolygon
const findECTByLatLng = (
  lat: number,
  lng: number,
  geojson: FeatureCollection<MultiPolygon | Polygon, ECTInfo>
): ECTInfo | null => {
  const pt = point([lng, lat]); // GeoJSON uses [lng, lat] order

  for (const feature of geojson.features) {
    if (booleanPointInPolygon(pt, feature)) {
      return feature.properties;
    }
  }
  return null;
};

// Process map items and add province info and name_id
function processMapItems(
  mapItems: MapItem[],
  provincesData: FeatureCollection<MultiPolygon | Polygon, ProvinceInfo> | null,
  ectData: FeatureCollection<MultiPolygon | Polygon, ECTInfo> | null
): MapItemWithProvince[] {
  return mapItems.map((item) => {
    if (!item.map_url) {
      return {
        ...item,
        lat: undefined,
        lng: undefined,
        province: null,
        name_id: null,
      };
    }

    const coordinates = extractLatLngFromGoogleMapsUrl(item.map_url);

    if (!coordinates) {
      return {
        ...item,
        lat: undefined,
        lng: undefined,
        province: null,
        name_id: null,
      };
    }

    const province = provincesData
      ? findProvinceByLatLng(coordinates.lat, coordinates.lng, provincesData)
      : null;

    const ectInfo = ectData
      ? findECTByLatLng(coordinates.lat, coordinates.lng, ectData)
      : null;

    return {
      ...item,
      lat: coordinates.lat,
      lng: coordinates.lng,
      province,
      name_id: ectInfo?.ID_name ?? null,
    };
  });
}

async function getData(): Promise<FaqItem[]> {
  const data = await Spreadsheet(
    "13OwS0IBx1RTOYcBaANpLsKwsvnl1frRxLRsl5R4L31g"
  ).get("faq", schema);
  return data;
}

async function getDataMap(): Promise<MapItem[]> {
  const dataMap = await Spreadsheet(
    "13OwS0IBx1RTOYcBaANpLsKwsvnl1frRxLRsl5R4L31g"
  ).get("volunteers-mock", schemaMap);
  return dataMap;
}

export default async function Home() {
  const [data, dataMap, provincesData, ectData] = await Promise.all([
    getData(),
    getDataMap(),
    loadProvincesGeoJson(),
    loadECTGeoJson(),
  ]);

  // Process map items with province info and name_id
  const mapWithProvince = processMapItems(dataMap, provincesData, ectData);

  return <HomePage faq={data} map={mapWithProvince} />;
}
