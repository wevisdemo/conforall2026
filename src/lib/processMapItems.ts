import { booleanPointInPolygon, point } from "@turf/turf";
import type { FeatureCollection, MultiPolygon, Polygon } from "geojson";
import {
  MapItem,
  MapItemWithProvince,
  ProvinceInfo,
  ECTInfo,
} from "../services/type";

// Extract lat/lng from Google Maps URL (supports multiple formats)
export const extractLatLngFromGoogleMapsUrl = (
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
export const findProvinceByLatLng = (
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

// Find ECT info (name_id) from lat/lng using turf booleanPointInPolygon
export const findECTByLatLng = (
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
export function processMapItems(
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

