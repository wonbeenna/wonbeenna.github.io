'use client';

import { useCallback, useEffect, useState } from 'react';
import Tile from '@/components/photo/Tile';
import Section from '@/components/common/Section';
import WaveBanner from '@/components/common/WaveBanner';
import PHOTOS from '../../../../public/assets/photos/photos.json';
import { AnimatePresence } from 'framer-motion';
import Lightbox from '@/components/photo/Lightbox';

const unique = <T,>(arr: T[]) => [...new Set(arr)];

export default function PhotoGallery() {
  const [category, setCategory] = useState<string | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [camera, setCamera] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // const allCategories = useMemo(
  //   () =>
  //     unique(
  //       PHOTOS.flatMap((p) => (p.tags || []).filter((t) => t.type === 'category').map((t: any) => t.value))
  //     ).sort(),
  //   []
  // );
  // const allYears = useMemo(
  //   () =>
  //     unique(PHOTOS.flatMap((p) => (p.tags || []).filter((t) => t.type === 'year').map((t: any) => t.value))).sort(
  //       (a, b) => b - a
  //     ),
  //   []
  // );
  // const allCameras = useMemo(
  //   () =>
  //     unique(PHOTOS.flatMap((p) => (p.tags || []).filter((t) => t.type === 'camera').map((t: any) => t.value))).sort(),
  //   []
  // );
  //
  // const PHOTOS.total(() => {
  //   let arr = [...PHOTOS];
  //
  //   if (category) {
  //     arr = arr.filter((p) => p.tags?.some((t) => t.type === 'category' && t.value === category));
  //   }
  //   if (year) {
  //     arr = arr.filter((p) => p.tags?.some((t) => t.type === 'year' && t.value === year));
  //   }
  //   if (camera) {
  //     arr = arr.filter((p) => p.tags?.some((t) => t.type === 'camera' && t.value === camera));
  //   }
  //
  //   return arr;
  // }, [category, year, camera]);

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
        {/*<div className="mb-5 flex flex-wrap gap-2">*/}
        {/*  <FilterGroup label="Category" items={allCategories} value={category} onChange={(v) => setCategory(v)} />*/}
        {/*  <FilterGroup label="Year" items={allYears} value={year} onChange={(v) => setYear(v)} />*/}
        {/*  <FilterGroup label="Camera" items={allCameras} value={camera} onChange={(v) => setCamera(v)} />*/}
        {/*</div>*/}

        <section className="columns-1 gap-4 [column-fill:_balance] sm:columns-2 lg:columns-3 2xl:columns-4">
          {PHOTOS.photos.map((p, i) => (
            <Tile key={p.id} photo={p} onClick={() => open(i)} />
          ))}
        </section>

        <AnimatePresence>
          {activeIndex !== null && (
            <Lightbox photo={PHOTOS.photos[activeIndex]} onClose={close} onPrev={goPrev} onNext={goNext} />
          )}
        </AnimatePresence>
      </Section>
    </>
  );
}
