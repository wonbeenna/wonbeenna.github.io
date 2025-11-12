'use client';

import Masonry from '@/components/photo/Masonry';
import { AnimatePresence } from 'framer-motion';
import Lightbox from '@/components/photo/Lightbox';
import Section from '@/components/common/Section';
import { useState } from 'react';
import useBodyOverflowHidden from '@/hooks/useBodyOverflowHidden';
import useKeyDown from '@/hooks/useKeyDown';
import { PhotoItem } from '@/types/photo';

interface PhotoContainerProps {
  photos: PhotoItem[];
  total: number;
}

const PhotoContainer = ({ photos, total }: PhotoContainerProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const open = (idx: number) => setActiveIndex(idx);
  const close = () => setActiveIndex(null);
  const goPrev = () => setActiveIndex((i) => (i === null ? i : (i - 1 + total) % total));
  const goNext = () => setActiveIndex((i) => (i === null ? i : (i + 1) % total));

  useBodyOverflowHidden({ isOpen: activeIndex !== null });
  useKeyDown({ onEscape: close, onArrowLeft: goPrev, onArrowRight: goNext });

  return (
    <Section>
      <Masonry photos={photos} onTileClick={open} />
      <AnimatePresence>
        {activeIndex !== null && (
          <Lightbox photo={photos[activeIndex]} onClose={close} onPrev={goPrev} onNext={goNext} />
        )}
      </AnimatePresence>
    </Section>
  );
};

export default PhotoContainer;
