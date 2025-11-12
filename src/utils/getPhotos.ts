import { PhotoItem } from '@/types/photo';

export const getPhotos = async (): Promise<{
  photos: PhotoItem[];
  total: number;
}> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/assets/photos/photos.json`);

  if (!response.ok) {
    throw new Error('Failed to load photos.json');
  }

  const data = await response.json();

  return data;
};
