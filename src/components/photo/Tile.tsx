import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { PhotoItem } from '@/types/photo';

interface TileProps {
  photo: PhotoItem;
  onClick: () => void;
  priority?: boolean;
}

const TilePicture = ({ photo, onClick, priority = false }: TileProps) => {
  const { width, height, formats } = photo;

  const aspect = useMemo(() => {
    const w = Math.max(1, Number(width) || 1);
    const h = Math.max(1, Number(height) || 1);
    return `${w} / ${h}`;
  }, [width, height]);

  const alt = photo.alt || photo.title || photo.id;
  const avif = formats?.avif ?? [];
  const webp = formats?.webp ?? [];

  const fallback = webp[webp.length - 1] || photo.src;

  return (
    <motion.button
      layout
      onClick={onClick}
      className="group mb-4 w-full overflow-hidden rounded-2xl focus:outline-none focus:ring-2 focus:ring-black/20"
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      aria-label={alt}
    >
      <div className="relative w-full overflow-hidden rounded-2xl">
        <div style={{ aspectRatio: aspect }} />
        <picture className="absolute inset-0 block">
          {avif.length > 0 && <source type="image/avif" srcSet={avif.join(', ')} />}
          {webp.length > 0 && <source type="image/webp" srcSet={webp.join(', ')} />}
          <img
            src={fallback}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className="size-full object-cover"
            style={{ width: '100%', height: '100%' }}
          />
        </picture>

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

export default memo(TilePicture);
