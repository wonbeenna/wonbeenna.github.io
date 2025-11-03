import type { ImageLoaderProps } from 'next/image';
import { IMAGE_SIZES } from '@/constants/imageSize';

const myImageLoader = ({ src, width, quality }: ImageLoaderProps): string => {
  const nearest = IMAGE_SIZES.reduce((p, c) => (Math.abs(c - width) < Math.abs(p - width) ? c : p), IMAGE_SIZES[0]);
  const url = src.endsWith('.webp') ? src.replace(/\.webp$/i, `-${nearest}.webp`) : src;
  return quality ? `${url}?q=${quality}` : url;
};

export default myImageLoader;
