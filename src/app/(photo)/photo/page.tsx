'use client';

import { useState } from 'react';
import Section from '@/components/common/Section';
import WaveBanner from '@/components/common/WaveBanner';
import PHOTOS from '../../../../public/assets/photos/photos.json';
import { AnimatePresence } from 'framer-motion';
import Lightbox from '@/components/photo/Lightbox';
import Masonry from '@/components/photo/Masonry';
import useBodyOverflowHidden from '@/hooks/useBodyOverflowHidden';
import useKeyDown from '@/hooks/useKeyDown';

export default function PhotoGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const open = (idx: number) => setActiveIndex(idx);
  const close = () => setActiveIndex(null);
  const goPrev = () => setActiveIndex((i) => (i === null ? i : (i - 1 + PHOTOS.total) % PHOTOS.total));
  const goNext = () => setActiveIndex((i) => (i === null ? i : (i + 1) % PHOTOS.total));

  useBodyOverflowHidden({ isOpen: activeIndex !== null });
  useKeyDown({ onEscape: close, onArrowLeft: goPrev, onArrowRight: goNext });

  return (
    <>
      <WaveBanner
        title="Photo"
        type="photo"
        description="A collection of my photography works and visual stories captured through my lens."
      />

      <Section>
        <Masonry photos={PHOTOS.photos} onTileClick={open} />
        <AnimatePresence>
          {activeIndex !== null && (
            <Lightbox photo={PHOTOS.photos[activeIndex]} onClose={close} onPrev={goPrev} onNext={goNext} />
          )}
        </AnimatePresence>
      </Section>
    </>
  );
}
