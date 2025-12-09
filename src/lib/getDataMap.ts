import { Spreadsheet, Column, Object, asString } from "sheethuahua";
import { MapItem } from "../services/type";

const schemaMap = Object({
  name: Column("ชื่อ - นามสกุล", asString().optional()),
  tel: Column("เบอร์โทรศัพท์", asString().optional()),
  detail: Column("รายละเอียดติดต่อ", asString().optional()),
  name_location: Column("จุดรณรงค์", asString().optional()),
  map_url: Column("ตำแหน่งจากแผนที่ (Google Maps)", asString().optional()),
  map_detail: Column("อธิบายการเดินทางคร่าวๆ", asString().optional()),
  date: Column("วัน-เวลา ที่เปิด", asString().optional()),
  published: Column("published", asString().optional()),
});

export async function getDataMap(): Promise<MapItem[]> {
  const dataMap = await Spreadsheet(
    "13OwS0IBx1RTOYcBaANpLsKwsvnl1frRxLRsl5R4L31g"
  ).get("volunteers", schemaMap);
  return dataMap;
}

