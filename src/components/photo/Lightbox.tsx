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

          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 transition-opacity duration-200">
            <div className="text-left text-white drop-shadow">
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 w-fit rounded-2xl bg-gradient-to-t from-black/50 via-black/10 p-3 transition-opacity duration-200"
                aria-label="사진 정보"
              >
                <dl className="grid gap-1 text-sm text-white drop-shadow">
                  <div className="grid grid-cols-[4rem,1fr] items-baseline gap-2">
                    <dt className="opacity-80">카메라</dt>
                    <dd className="truncate font-medium">
                      {[photo?.cameraSettings?.cameraMake, photo?.cameraSettings?.cameraModel]
                        .filter(Boolean)
                        .join(' ') || '-'}
                    </dd>
                  </div>

                  <div className="grid grid-cols-[4rem,1fr] items-baseline gap-2">
                    <dt className="opacity-80">렌즈</dt>
                    <dd className="truncate font-medium">{photo?.cameraSettings?.lensModel || '-'}</dd>
                  </div>

                  <div className="grid grid-cols-[4rem,1fr] items-baseline gap-2">
                    <dt className="opacity-80">조리개</dt>
                    <dd className="font-medium">{photo?.cameraSettings?.aperture || '-'}</dd>
                  </div>

                  <div className="grid grid-cols-[4rem,1fr] items-baseline gap-2">
                    <dt className="opacity-80">셔터</dt>
                    <dd className="font-medium">{photo?.cameraSettings?.shutterSpeed || '-'}</dd>
                  </div>

                  <div className="grid grid-cols-[4rem,1fr] items-baseline gap-2">
                    <dt className="opacity-80">ISO</dt>
                    <dd className="font-medium">{photo?.cameraSettings?.iso ?? '-'}</dd>
                  </div>

                  <div className="grid grid-cols-[4rem,1fr] items-baseline gap-2">
                    <dt className="opacity-80">촬영일</dt>
                    <dd className="font-medium">{photo?.date || '-'}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Lightbox;
