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
      <div className="relative mx-auto w-[min(92vw,1100px)]">
        <div className="overflow-auto rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 dark:bg-darkBg01 dark:ring-white/10">
          <div className="relative">
            <Image
              src={photo.formats.webp || photo.formats.original}
              alt={photo.title || photo.id}
              width={photo.meta.width}
              height={photo.meta.height}
              sizes="100vw"
              className="block max-h-[75vh] w-full object-contain"
              priority
            />

            <div className="absolute inset-0 flex items-center justify-between p-2">
              <IconButton onClick={onPrev} position="left" />
              <IconButton onClick={onNext} position="right" />
            </div>

            <div className="absolute inset-x-0 top-0 flex items-center justify-end p-2">
              <IconButton onClick={onClose} position="top-right" />
            </div>
          </div>

          <div aria-label="사진 정보" className="p-4">
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
    </motion.div>
  );
};

export default Lightbox;
