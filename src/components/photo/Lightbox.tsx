import { motion } from 'framer-motion';
import Image from 'next/image';
import IconButton from '@/components/photo/IconButton';
import { PhotoItem } from '@/types/photo';
import PhotoInfoList from '@/components/photo/PhotoInfoList';
import PhotoInfoCard from '@/components/photo/PhotoInfoCard';

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

          <div className="absolute inset-x-0 top-0 flex items-center justify-end p-2">
            <IconButton label="닫기" onClick={onClose} position="top-right" />
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-3 transition-opacity duration-200">
            <div className="text-left text-white drop-shadow">
              <div
                className="pointer-events-none absolute inset-x-0 bottom-0 w-fit rounded-2xl bg-gradient-to-t from-black/50 via-black/10 p-3 transition-opacity duration-200"
                aria-label="사진 정보"
              >
                <PhotoInfoList>
                  <PhotoInfoCard
                    title="카메라"
                    description={[photo?.cameraSettings?.cameraMake, photo?.cameraSettings?.cameraModel]
                      .filter(Boolean)
                      .join(' ')}
                  />
                  <PhotoInfoCard title="렌즈" description={photo?.cameraSettings?.lensModel} />
                  <PhotoInfoCard title="조리개" description={photo?.cameraSettings?.aperture} />
                  <PhotoInfoCard title="셔터" description={photo?.cameraSettings?.shutterSpeed} />
                  <PhotoInfoCard title="ISO" description={photo?.cameraSettings?.iso} />
                  <PhotoInfoCard title="촬영일" description={photo?.date} />
                </PhotoInfoList>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Lightbox;
