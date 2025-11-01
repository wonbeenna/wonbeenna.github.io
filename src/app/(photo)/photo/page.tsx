'use client';

import { useCallback, useEffect, useState } from 'react';
import Tile from '@/components/photo/Tile';
import Section from '@/components/common/Section';
import WaveBanner from '@/components/common/WaveBanner';
import PHOTOS from '../../../../public/assets/photos/photos.json';
import { AnimatePresence } from 'framer-motion';
import Lightbox from '@/components/photo/Lightbox';

export default function PhotoGallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const open = useCallback((idx: number) => setActiveIndex(idx), []);
  const close = useCallback(() => setActiveIndex(null), []);
  const goPrev = useCallback(
    () => setActiveIndex((i) => (i == null ? i : (i - 1 + PHOTOS.total) % PHOTOS.total)),
    [PHOTOS.total]
  );
  const goNext = useCallback(() => setActiveIndex((i) => (i == null ? i : (i + 1) % PHOTOS.total)), [PHOTOS.total]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (activeIndex == null) {
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
        <div className="columns-1 gap-4 [column-fill:_balance] sm:columns-2 lg:columns-3 2xl:columns-4">
          {PHOTOS.photos.map((photo, i) => (
            <Tile key={photo.id} photo={photo} onClick={() => open(i)} />
          ))}
        </div>

        <AnimatePresence>
          {activeIndex !== null && (
            <Lightbox photo={PHOTOS.photos[activeIndex]} onClose={close} onPrev={goPrev} onNext={goNext} />
          )}
        </AnimatePresence>
      </Section>
    </>
  );
}
