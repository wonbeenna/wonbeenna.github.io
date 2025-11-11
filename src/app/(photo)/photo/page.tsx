'use client';

import { useEffect, useState } from 'react';
import Section from '@/components/common/Section';
import WaveBanner from '@/components/common/WaveBanner';
import PHOTOS from '../../../../public/assets/photos/photos.json';
import { AnimatePresence } from 'framer-motion';
import Lightbox from '@/components/photo/Lightbox';
import Masonry from '@/components/photo/Masonry';

export default function PhotoGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const open = (idx: number) => setActiveIndex(idx);
  const close = () => setActiveIndex(null);
  const goPrev = () => setActiveIndex((i) => (i === null ? i : (i - 1 + PHOTOS.total) % PHOTOS.total));
  const goNext = () => setActiveIndex((i) => (i === null ? i : (i + 1) % PHOTOS.total));

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (activeIndex === null) {
        return;
      }
      if (e.key === 'Escape') {
        close();
      }
      if (e.key === 'ArrowLeft') {
        goPrev();
      }
      if (e.key === 'ArrowRight') {
        goNext();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex, close, goPrev, goNext]);

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
