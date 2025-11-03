import React, { useMemo } from 'react';
import NextImage from 'next/image';
import type { PhotoItem } from '@/types/photo';
import useMedia from '@/hooks/useMedia';
import useMeasure from '@/hooks/useMeasure';

interface GridItem extends PhotoItem {
  x: number;
  y: number;
  w: number;
  h: number;
  index: number;
}

interface MasonryProps {
  photos: PhotoItem[];
  onTileClick?: (index: number) => void;
  gap?: number;
}

const Masonry = ({ photos, onTileClick, gap = 16 }: MasonryProps) => {
  const columns = useMedia(['(min-width:1200px)', '(min-width:900px)', '(min-width:600px)'], [4, 3, 2], 1);

  const [containerRef, { width: containerWidth }] = useMeasure<HTMLDivElement>();

  const { grid, containerHeight } = useMemo(() => {
    if (!containerWidth) {
      return { grid: [], containerHeight: 0 };
    }

    const colHeights = new Array(columns).fill(0);
    const totalGaps = (columns - 1) * gap;
    const columnWidth = (containerWidth - totalGaps) / columns;

    const computed: GridItem[] = photos.map((photo, index) => {
      const rw = photo.meta.resizeWidth ?? photo.meta.width ?? 1;
      const rh = photo.meta.resizeHeight ?? photo.meta.height ?? 1;
      const aspect = rw > 0 ? rh / rw : 1;
      const h = columnWidth * aspect;

      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (columnWidth + gap);
      const y = colHeights[col];

      colHeights[col] += h + gap;

      return { ...photo, x, y, w: columnWidth, h, index };
    });

    const height = Math.max(0, ...colHeights) - gap;

    return { grid: computed, containerHeight: height };
  }, [columns, photos, containerWidth, gap]);

  return (
    <div ref={containerRef} className="relative w-full" style={{ height: containerHeight, minHeight: 1 }}>
      {grid.map((item) => {
        const src = item.formats.webp || item.formats.original;
        const alt = item.title || item.id;
        const hasBlur = Boolean(item.formats.blurDataURL);

        return (
          <button
            key={item.id}
            data-key={item.id}
            type="button"
            className="group absolute box-content rounded-2xl transition-transform duration-200 will-change-transform hover:-translate-y-1 focus:outline-none focus-visible:-translate-y-1 focus-visible:ring-2 focus-visible:ring-black/20 focus-visible:ring-offset-2"
            style={{ left: item.x, top: item.y, width: item.w, height: item.h }}
            onClick={() => onTileClick?.(item.index)}
            aria-label={alt}
          >
            <div className="relative size-full overflow-hidden rounded-2xl duration-200">
              <div className="absolute inset-0 transform-gpu transition-transform duration-300 will-change-transform group-hover:scale-[1.03]">
                <NextImage
                  src={src}
                  alt={alt}
                  fill
                  className="object-cover"
                  loading="lazy"
                  placeholder={hasBlur ? 'blur' : 'empty'}
                  blurDataURL={item.formats.blurDataURL}
                  sizes="(min-width:1200px) 25vw, (min-width:900px) 33vw, (min-width:600px) 50vw, 100vw"
                  decoding="async"
                />
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default Masonry;
