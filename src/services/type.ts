export interface MediaDetails {
  width: number;
  height: number;
  file: string;
  sizes: {
    [key: string]: {
      file: string;
      width: number;
      height: number;
      mime_type: string;
      source_url: string;
    };
  };
}

export interface FeaturedMedia {
  id: number;
  source_url: string;
  media_details?: MediaDetails;
  alt_text?: string;
}

export interface Post {
  id: number;
  title: {
    rendered: string;
  };
  link: string;
  date: string;
  _links?: {
    "wp:featuredmedia"?: Array<{
      embeddable: boolean;
      href: string;
    }>;
  };
  _embedded?: {
    "wp:featuredmedia"?: FeaturedMedia[];
  };
}

export interface FaqItem {
  category?: string;
  question?: string;
  answer?: string;
}

export interface MapItem {
  name?: string;
  tel?: string;
  detail?: string;
  name_location?: string;
  map_url?: string;
  map_detail?: string;
  date?: string;
  published?: string;
}

export interface ProvinceInfo {
  pro_code: string;
  pro_th: string;
  pro_en: string;
  reg_nesdb: string;
  reg_royin: string;
}

export interface ECTInfo {
  P_name: string;
  CONS_no: number;
  ID_name: string;
}

export interface MapItemWithProvince extends MapItem {
  lat?: number;
  lng?: number;
  province?: ProvinceInfo | null;
  name_id?: string | null;
}

// ECT count by province - key is province name (P_name)
export interface ECTCountByProvince {
  [provinceName: string]: {
    totalECT: number; // Total ECT districts in province
    coveredECT: number; // Number of ECT districts with map markers
    ectIds: string[]; // All ECT IDs (ID_name) in province
  };
}
