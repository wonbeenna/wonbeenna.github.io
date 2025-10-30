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
  src: string;
  width: number;
  height: number;
  title?: string;
  date?: Date | string;
  location?: string;
  lensModel?: string;
  formats: Formats;
};
