import { motion } from 'framer-motion';
import Image from 'next/image';
import IconButton from '@/components/photo/IconButton';
import { PhotoItem } from '@/types/photo';

interface LightboxProps {
  photo: PhotoItem;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const Lightbox = ({ photo, onClose, onPrev, onNext }: LightboxProps) => {
  const onBackdrop = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={onBackdrop}
      role="dialog"
      aria-modal="true"
    >
      <motion.div
        className="relative w-full max-w-6xl"
        initial={{ scale: 0.98, y: 8, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.98, y: 8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 24 }}
      >
        <div className="relative overflow-hidden rounded-2xl bg-black">
          <Image
            src={photo.formats.webp || photo.formats.original}
            alt={photo.title || photo.id}
            width={photo.meta.width}
            height={photo.meta.height}
            sizes="100vw"
            className="block h-auto max-h-[85vh] w-full object-contain"
            priority
          />

          <div className="absolute inset-0 flex items-center justify-between p-2">
            <IconButton label="이전" onClick={onPrev} position="left" />
            <IconButton label="다음" onClick={onNext} position="right" />
          </div>

          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-2">
            <span className="rounded bg-white/10 px-2 py-1 text-xs text-white backdrop-blur">
              {photo.title || photo.id}
            </span>
            <IconButton label="닫기" onClick={onClose} position="top-right" />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Lightbox;
