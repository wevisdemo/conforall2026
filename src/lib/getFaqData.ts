import { Spreadsheet, Column, Object, asString } from "sheethuahua";
import { FaqItem } from "../services/type";

const schemaFaq = Object({
  category: Column("Category", asString().optional()),
  question: Column("Question", asString().optional()),
  answer: Column("Answer", asString().optional()),
});

export async function getFaqData(): Promise<FaqItem[]> {
  const data = await Spreadsheet(
    "13OwS0IBx1RTOYcBaANpLsKwsvnl1frRxLRsl5R4L31g"
  ).get("faq", schemaFaq);
  return data;
}

