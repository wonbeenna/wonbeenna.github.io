export type Formats = {
  webp: string;
  original: string;
  blurDataURL: string;
};

export type Meta = {
  width: number;
  height: number;
  resizeWidth?: number;
  resizeHeight?: number;
};

export type CameraSettings = {
  cameraMake?: string;
  cameraModel?: string;
  lensModel?: string;
  aperture?: number;
  iso?: number;
  shutterSpeed?: number;
};

export type PhotoItem = {
  id: string;
  title?: string;
  date?: string;
  meta: Meta;
  formats: Formats;
  cameraSettings?: CameraSettings;
};
