import { Spreadsheet, Column, Object, asString } from "sheethuahua";
import { DataHastagItem } from "../services/type";

const schemaMap = Object({
  count: Column(
    "ilaw ใส่ตัวเลขที่ต้องการแสดงผลของแคมเปญ 10,000,000 Hashtag ในช่องนี้",
    asString().optional()
  ),
});

export async function getDataHastag(): Promise<DataHastagItem[]> {
  const dataHastag = await Spreadsheet(
    "1_LQY-y2kVHhc12dilT9-vU0feWG4O9bmYl76kI55qmw"
  ).get("Hashtag Counter", schemaMap);
  return dataHastag;
}
