import { motion } from 'framer-motion';
import Image from 'next/image';
import { PhotoItem } from '@/types/photo';

interface TileProps {
  photo: PhotoItem;
  onClick: () => void;
}

const Tile = ({ photo, onClick }: TileProps) => {
  return (
    <motion.button
      layout
      onClick={onClick}
      className="group mb-4 w-full overflow-hidden rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/20"
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      aria-label={photo.title || photo.id}
    >
      <div className="relative">
        <Image
          src={photo.src}
          alt={photo.title || photo.id}
          width={photo.width}
          height={photo.height}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="block h-auto w-full"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <div className="text-left text-white drop-shadow">
            <div className="text-sm font-medium">{photo.title}</div>
            <div className="text-xs/relaxed opacity-90">{[photo.location, photo.date].filter(Boolean).join(' · ')}</div>
          </div>
        </div>
      </div>
    </motion.button>
  );
};

export default Tile;
