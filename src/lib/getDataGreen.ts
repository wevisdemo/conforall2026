import { Spreadsheet, Column, Object, asString } from "sheethuahua";
import { DataGreenItem } from "../services/type";

const schemaMap = Object({
  timestamp: Column("Timestamp", asString().optional()),
  activity_type: Column("กิจกรรมที่ต้องการร่วมจัด", asString().optional()),
  event_name: Column("ชื่องาน", asString().optional()),
  activity_link: Column("ลิงก์กิจกรรม (ถ้ามี)", asString().optional()),
  location: Column("สถานที่จัดงาน", asString().optional()),
  map_url: Column("ลิงก์ Google Map", asString().optional()),
  date: Column("วันที่จัดงาน", asString().optional()),
  time: Column("เวลาที่จัดงาน", asString().optional()),
  description: Column("อธิบายรูปแบบงาน", asString().optional()),
  coordinator: Column("ผู้ประสานงาน", asString().optional()),
  contact_number: Column("เบอร์ติดต่อ", asString().optional()),
  shipping_address: Column(
    "ชื่อ-ที่อยู่-เบอร์โทร สำหรับส่งอุปกรณ์ที่ใช้ในการรณรงค์",
    asString().optional()
  ),
  image_link_1: Column(
    "ลิงก์รูปภาพกิจกรรม (ถ้ามี) - รูปที่ 1",
    asString().optional()
  ),
  image_link_2: Column(
    "ลิงก์รูปภาพกิจกรรม (ถ้ามี) - รูปที่ 2",
    asString().optional()
  ),
  image_link_3: Column(
    "ลิงก์รูปภาพกิจกรรม (ถ้ามี) - รูปที่ 3",
    asString().optional()
  ),
  image_link_4: Column(
    "ลิงก์รูปภาพกิจกรรม (ถ้ามี) - รูปที่ 4",
    asString().optional()
  ),
  image_link_5: Column(
    "ลิงก์รูปภาพกิจกรรม (ถ้ามี) - รูปที่ 5",
    asString().optional()
  ),
  published: Column("เอาขึ้นเว็บไซต์", asString().optional()),
  province: Column("จังหวัดที่จัดงาน", asString().optional()),
});

export async function getDataGreen(): Promise<DataGreenItem[]> {
  const dataGreen = await Spreadsheet(
    "1_LQY-y2kVHhc12dilT9-vU0feWG4O9bmYl76kI55qmw"
  ).get("ร่วมจัดกิจกรรม", schemaMap);
  return dataGreen;
}
