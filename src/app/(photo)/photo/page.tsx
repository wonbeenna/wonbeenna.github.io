import WaveBanner from '@/components/common/WaveBanner';
import { Metadata } from 'next';
import { buildMetadata } from '@/utils/metadata';
import PhotoContainer from '@/components/photo/PhotoContainer';
import { getPhotos } from '@/utils/getPhotos';

export const metadata: Metadata = buildMetadata({
  title: 'photo archive',
  description: 'photo archive',
  path: '/photo',
  imagesPath: '/favicon/photo-favicon.png',
  faviconPath: '/photo'
});

export default async function PhotoGallery() {
  const data = await getPhotos();

  return (
    <>
      <WaveBanner
        title="Photo"
        type="photo"
        description="A collection of my photography works and visual stories captured through my lens."
      />
      <PhotoContainer photos={data.photos} total={data.total} />
    </>
  );
}
