import { promises as fs } from "fs";
import path from "path";
import type { FeatureCollection, MultiPolygon, Polygon } from "geojson";
import { ProvinceInfo } from "../services/type";

export async function loadProvincesGeoJson(): Promise<FeatureCollection<
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

