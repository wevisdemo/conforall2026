import { Spreadsheet, Column, Object, asString } from "sheethuahua";
import { DataStickerItem } from "../services/type";

const schemaMap = Object({
  timestamp: Column("Timestamp", asString().optional()),
  image_link: Column("ลิงก์รูปภาพ", asString().optional()),
});

export async function getDataSticker(): Promise<DataStickerItem[]> {
  const dataSticker = await Spreadsheet(
    "1_LQY-y2kVHhc12dilT9-vU0feWG4O9bmYl76kI55qmw"
  ).get("ส่งรูปถ่ายสติกเกอร์", schemaMap);
  return dataSticker;
}
