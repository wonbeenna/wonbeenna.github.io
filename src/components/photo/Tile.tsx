import { motion } from 'framer-motion';
import * as React from 'react';
import { PhotoItem } from '@/types/photo';
import Image from 'next/image';

interface TileProps {
  photo: PhotoItem;
  onClick: () => void;
}

const Tile = ({ photo, onClick }: TileProps) => {
  const aspect =
    photo?.meta?.resizeWidth && photo?.meta?.resizeHeight
      ? `${photo.meta.resizeWidth} / ${photo.meta.resizeHeight}`
      : '3 / 2';

  const src = photo.formats.webp || photo.formats.original;

  return (
    <motion.button
      layout
      onClick={onClick}
      className="group mb-4 block w-full break-inside-avoid rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/20"
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      aria-label={photo.title || photo.id}
    >
      <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: aspect }}>
        <Image
          fill
          src={src}
          alt={photo.title || photo.id}
          className="object-cover"
          sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, (max-width:1536px) 33vw, 25vw"
          quality={80}
          loading="lazy"
          placeholder={photo.formats.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={photo.formats.blurDataURL}
          decoding="async"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <div className="text-left text-white drop-shadow">
            <div className="text-sm font-medium">{photo.title}</div>
            <div className="text-sm font-medium">{`${photo?.cameraSettings?.cameraMake} ${photo?.cameraSettings?.cameraModel}`}</div>
            <div className="text-sm font-medium">{photo?.date}</div>
            <div className="text-sm font-medium">{photo?.cameraSettings?.lensModel}</div>
            <div className="text-sm font-medium">{photo?.cameraSettings?.aperture}</div>
            <div className="text-sm font-medium">{photo?.cameraSettings?.shutterSpeed}</div>
            <div className="text-sm font-medium">{photo?.cameraSettings?.iso}</div>
          </div>
        </div>
      </div>
    </motion.button>
  );
};

export default Tile;
