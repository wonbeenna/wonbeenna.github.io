import { PhotoItem } from '@/types/photo';
import Image from 'next/image';

interface RecentPhotoCardProps {
  photo: PhotoItem;
}

const RecentPhotoCard = ({ photo }: RecentPhotoCardProps) => {
  return (
    <div className="group overflow-hidden rounded-2xl transition-transform duration-200 will-change-transform hover:-translate-y-1">
      <div className="transform-gpu transition-transform duration-300 will-change-transform group-hover:scale-[1.03]">
        <Image
          src={photo.formats.webp || photo.formats.original}
          alt={photo.title || photo.id}
          width={photo.meta.width}
          height={photo.meta.height}
          className="object-cover"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default RecentPhotoCard;
