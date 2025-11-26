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
