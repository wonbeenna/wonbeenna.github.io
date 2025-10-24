export type PhotoTag =
  | { type: 'category'; value: string }
  | { type: 'year'; value: number }
  | { type: 'camera'; value: string };

export type PhotoItem = {
  id: string;
  src: string;
  width: number;
  height: number;
  alt?: string;
  title?: string;
  location?: string;
  date?: string;
  tags?: PhotoTag[];
};
