'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import FilterGroup from '@/components/photo/FilterGroup';
import Tile from '@/components/photo/Tile';
import Lightbox from '@/components/photo/Lightbox';
import Section from '@/components/common/Section';
import WaveBanner from '@/components/common/WaveBanner';
import { PhotoItem } from '@/types/photo';

const PHOTOS: PhotoItem[] = [
  {
    id: 'seaside-01',
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1600',
    width: 1600,
    height: 1067,
    title: 'Sea Breeze',
    location: 'Jeju',
    date: '2024-05-02',
    tags: [
      { type: 'category', value: 'seascape' },
      { type: 'year', value: 2024 },
      { type: 'camera', value: 'X100V' }
    ]
  },
  {
    id: 'street-02',
    src: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?q=80&w=1350',
    width: 1350,
    height: 1800,
    title: 'Neon Alley',
    location: 'Seoul',
    date: '2025-03-11',
    tags: [
      { type: 'category', value: 'street' },
      { type: 'year', value: 2025 },
      { type: 'camera', value: 'A7CII' }
    ]
  },
  {
    id: 'mountain-03',
    src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1600',
    width: 1600,
    height: 1000,
    title: 'Dawn Ridge',
    location: 'Gangwon',
    date: '2023-11-19',
    tags: [
      { type: 'category', value: 'landscape' },
      { type: 'year', value: 2023 },
      { type: 'camera', value: 'A7CII' }
    ]
  },
  {
    id: 'forest-04',
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600',
    width: 1600,
    height: 1066,
    title: 'Morning Fog',
    location: 'Jirisan',
    date: '2024-04-05',
    tags: [
      { type: 'category', value: 'nature' },
      { type: 'year', value: 2024 },
      { type: 'camera', value: 'X100V' }
    ]
  },
  {
    id: 'city-05',
    src: 'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1600',
    width: 1600,
    height: 1067,
    title: 'Glass Towers',
    location: 'Busan',
    date: '2022-09-15',
    tags: [
      { type: 'category', value: 'architecture' },
      { type: 'year', value: 2022 },
      { type: 'camera', value: 'ZV-E10' }
    ]
  },
  {
    id: 'night-06',
    src: 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?q=80&w=1600',
    width: 1600,
    height: 900,
    title: 'Midnight Crosswalk',
    location: 'Tokyo',
    date: '2023-12-28',
    tags: [
      { type: 'category', value: 'street' },
      { type: 'year', value: 2023 },
      { type: 'camera', value: 'A7CII' }
    ]
  },
  {
    id: 'bridge-07',
    src: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1600',
    width: 1600,
    height: 1067,
    title: 'Golden Path',
    location: 'San Francisco',
    date: '2022-07-19',
    tags: [
      { type: 'category', value: 'travel' },
      { type: 'year', value: 2022 },
      { type: 'camera', value: 'X100V' }
    ]
  },
  {
    id: 'desert-08',
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1600',
    width: 1600,
    height: 900,
    title: 'Desert Trail',
    location: 'Dubai',
    date: '2024-08-21',
    tags: [
      { type: 'category', value: 'landscape' },
      { type: 'year', value: 2024 },
      { type: 'camera', value: 'A7IV' }
    ]
  },
  {
    id: 'coffee-09',
    src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1600',
    width: 1600,
    height: 1067,
    title: 'Afternoon Light',
    location: 'Seoul',
    date: '2023-03-11',
    tags: [
      { type: 'category', value: 'lifestyle' },
      { type: 'year', value: 2023 },
      { type: 'camera', value: 'X100V' }
    ]
  },
  {
    id: 'flower-10',
    src: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1600',
    width: 1600,
    height: 1067,
    title: 'Spring Bloom',
    location: 'Gyeongju',
    date: '2025-04-09',
    tags: [
      { type: 'category', value: 'nature' },
      { type: 'year', value: 2025 },
      { type: 'camera', value: 'A7CII' }
    ]
  },
  {
    id: 'river-11',
    src: 'https://images.unsplash.com/photo-1493244040629-496f6d136cc3?q=80&w=1600',
    width: 1600,
    height: 1066,
    title: 'Flow',
    location: 'Yeosu',
    date: '2024-07-14',
    tags: [
      { type: 'category', value: 'seascape' },
      { type: 'year', value: 2024 },
      { type: 'camera', value: 'X100V' }
    ]
  },
  {
    id: 'snow-12',
    src: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?q=80&w=1600',
    width: 1600,
    height: 1067,
    title: 'Frozen Path',
    location: 'Pyeongchang',
    date: '2023-01-30',
    tags: [
      { type: 'category', value: 'landscape' },
      { type: 'year', value: 2023 },
      { type: 'camera', value: 'A7III' }
    ]
  },
  {
    id: 'market-13',
    src: 'https://images.unsplash.com/photo-1504274066651-8d31a536b11a?q=80&w=1600',
    width: 1600,
    height: 1067,
    title: 'Morning Market',
    location: 'Seoul',
    date: '2022-11-10',
    tags: [
      { type: 'category', value: 'street' },
      { type: 'year', value: 2022 },
      { type: 'camera', value: 'X100V' }
    ]
  },
  {
    id: 'island-14',
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600',
    width: 1600,
    height: 900,
    title: 'Island Air',
    location: 'Okinawa',
    date: '2025-06-12',
    tags: [
      { type: 'category', value: 'travel' },
      { type: 'year', value: 2025 },
      { type: 'camera', value: 'A7CII' }
    ]
  },
  {
    id: 'train-15',
    src: 'https://images.unsplash.com/photo-1518893063534-39d6a8a7e672?q=80&w=1600',
    width: 1600,
    height: 900,
    title: 'On the Way',
    location: 'Busan',
    date: '2024-02-03',
    tags: [
      { type: 'category', value: 'travel' },
      { type: 'year', value: 2024 },
      { type: 'camera', value: 'ZV-E10' }
    ]
  },
  {
    id: 'bridge-16',
    src: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=1600',
    width: 1600,
    height: 900,
    title: 'City Reflections',
    location: 'Seoul',
    date: '2023-06-21',
    tags: [
      { type: 'category', value: 'architecture' },
      { type: 'year', value: 2023 },
      { type: 'camera', value: 'A7IV' }
    ]
  },
  {
    id: 'cat-17',
    src: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=1600',
    width: 1600,
    height: 1067,
    title: 'Afternoon Nap',
    location: 'Home',
    date: '2024-09-11',
    tags: [
      { type: 'category', value: 'lifestyle' },
      { type: 'year', value: 2024 },
      { type: 'camera', value: 'X100V' }
    ]
  },
  {
    id: 'library-18',
    src: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1600',
    width: 1600,
    height: 1067,
    title: 'Quiet Hours',
    location: 'Seoul',
    date: '2023-02-12',
    tags: [
      { type: 'category', value: 'architecture' },
      { type: 'year', value: 2023 },
      { type: 'camera', value: 'A7III' }
    ]
  },
  {
    id: 'night-19',
    src: 'https://images.unsplash.com/photo-1495567720989-cebdbdd97913?q=80&w=1600',
    width: 1600,
    height: 1067,
    title: 'City Glow',
    location: 'Tokyo',
    date: '2025-01-22',
    tags: [
      { type: 'category', value: 'street' },
      { type: 'year', value: 2025 },
      { type: 'camera', value: 'A7CII' }
    ]
  },
  {
    id: 'sky-20',
    src: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1600',
    width: 1600,
    height: 900,
    title: 'Cloud Wave',
    location: 'Jeju',
    date: '2022-05-01',
    tags: [
      { type: 'category', value: 'nature' },
      { type: 'year', value: 2022 },
      { type: 'camera', value: 'X100V' }
    ]
  }
];

const unique = <T,>(arr: T[]) => [...new Set(arr)];

export default function PhotoGallery() {
  const [category, setCategory] = useState<string | null>(null);
  const [year, setYear] = useState<number | null>(null);
  const [camera, setCamera] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const allCategories = useMemo(
    () =>
      unique(
        PHOTOS.flatMap((p) => (p.tags || []).filter((t) => t.type === 'category').map((t: any) => t.value))
      ).sort(),
    []
  );
  const allYears = useMemo(
    () =>
      unique(PHOTOS.flatMap((p) => (p.tags || []).filter((t) => t.type === 'year').map((t: any) => t.value))).sort(
        (a, b) => b - a
      ),
    []
  );
  const allCameras = useMemo(
    () =>
      unique(PHOTOS.flatMap((p) => (p.tags || []).filter((t) => t.type === 'camera').map((t: any) => t.value))).sort(),
    []
  );

  const filtered = useMemo(() => {
    let arr = [...PHOTOS];

    if (category) arr = arr.filter((p) => p.tags?.some((t) => t.type === 'category' && t.value === category));
    if (year) arr = arr.filter((p) => p.tags?.some((t) => t.type === 'year' && t.value === year));
    if (camera) arr = arr.filter((p) => p.tags?.some((t) => t.type === 'camera' && t.value === camera));

    return arr;
  }, [category, year, camera]);

  const open = useCallback((idx: number) => setActiveIndex(idx), []);
  const close = useCallback(() => setActiveIndex(null), []);
  const goPrev = useCallback(
    () => setActiveIndex((i) => (i == null ? i : (i - 1 + filtered.length) % filtered.length)),
    [filtered.length]
  );
  const goNext = useCallback(
    () => setActiveIndex((i) => (i == null ? i : (i + 1) % filtered.length)),
    [filtered.length]
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (activeIndex == null) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
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
        <div className="mb-5 flex flex-wrap gap-2">
          <FilterGroup label="Category" items={allCategories} value={category} onChange={(v) => setCategory(v)} />
          <FilterGroup label="Year" items={allYears} value={year} onChange={(v) => setYear(v)} />
          <FilterGroup label="Camera" items={allCameras} value={camera} onChange={(v) => setCamera(v)} />
        </div>

        <section className="columns-1 gap-4 [column-fill:_balance] sm:columns-2 lg:columns-3 2xl:columns-4">
          {filtered.map((p, i) => (
            <Tile key={p.id} photo={p} onClick={() => open(i)} />
          ))}
        </section>

        <AnimatePresence>
          {activeIndex != null && (
            <Lightbox photo={filtered[activeIndex]} onClose={close} onPrev={goPrev} onNext={goNext} />
          )}
        </AnimatePresence>
      </Section>
    </>
  );
}
