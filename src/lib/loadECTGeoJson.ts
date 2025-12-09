import { promises as fs } from "fs";
import path from "path";
import type { FeatureCollection, MultiPolygon, Polygon } from "geojson";
import { ECTInfo } from "../services/type";

export async function loadECTGeoJson(): Promise<FeatureCollection<
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

