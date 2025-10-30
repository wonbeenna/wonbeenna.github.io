export type PhotoTag =
  | { type: 'category'; value: string }
  | { type: 'year'; value: number }
  | { type: 'camera'; value: string };

export type Formats = {
  avif: string[];
  webp: string[];
  original: string;
};

export type PhotoItem = {
  id: string;
  title?: string;
  src: string;
  width: number;
  height: number;
  alt?: string;
  formats: Formats;
  location?: string;
  date?: string;
  tags?: PhotoTag[];
};
