import PHOTOS from '../../../public/assets/photos/photos.json';
import RecentPhotoCard from '@/components/home/RecentPhotoCard';

const RecentPhotoList = () => {
  const photos = PHOTOS.photos.slice(0, 9);

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {photos.map((photo) => (
        <RecentPhotoCard key={photo.id} photo={photo} />
      ))}
    </section>
  );
};

export default RecentPhotoList;
