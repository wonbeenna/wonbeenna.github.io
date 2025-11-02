import type { ImageLoaderProps } from 'next/image';

const SIZES = [640, 960, 1280, 1600, 1920, 2560];

const myImageLoader = ({ src, width, quality }: ImageLoaderProps): string => {
  const nearest = SIZES.reduce((p, c) => (Math.abs(c - width) < Math.abs(p - width) ? c : p), SIZES[0]);
  const url = src.endsWith('.webp') ? src.replace(/\.webp$/i, `-${nearest}.webp`) : src;
  return quality ? `${url}?q=${quality}` : url;
};

export default myImageLoader;
