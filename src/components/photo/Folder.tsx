'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { cn } from '@/utils/cn';

interface FolderProps {
  color?: string;
  size?: number;
  items?: React.ReactNode[];
  className?: string;
}

const darkenColor = (hex: string, percent: number): string => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3)
    color = color
      .split('')
      .map((c) => c + c)
      .join('');
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

const Folder: React.FC<FolderProps> = ({ color = '#5227FF', size = 1, items = [], className = '' }) => {
  // N개 그대로 사용 (패딩용 null 안 넣음)
  const papers = items;

  const [open, setOpen] = useState(false);
  const [paperOffsets, setPaperOffsets] = useState<{ x: number; y: number }[]>(
    Array.from({ length: papers.length }, () => ({ x: 0, y: 0 }))
  );

  // items 길이가 바뀌면 offsets 길이 동기화
  useEffect(() => {
    setPaperOffsets(Array.from({ length: papers.length }, () => ({ x: 0, y: 0 })));
  }, [papers.length]);

  const folderBackColor = darkenColor(color, 0.08);
  const paper1 = darkenColor('#ffffff', 0.1);
  const paper2 = darkenColor('#ffffff', 0.05);
  const paper3 = '#ffffff';

  const handleClick = () => {
    setOpen((prev) => !prev);
    if (open) {
      setPaperOffsets(Array.from({ length: papers.length }, () => ({ x: 0, y: 0 })));
    }
  };

  const handlePaperMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    if (!open) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const offsetX = (e.clientX - centerX) * 0.15;
    const offsetY = (e.clientY - centerY) * 0.15;
    setPaperOffsets((prev) => {
      const next = [...prev];
      next[index] = { x: offsetX, y: offsetY };
      return next;
    });
  };

  const handlePaperMouseLeave = (_e: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    setPaperOffsets((prev) => {
      const next = [...prev];
      next[index] = { x: 0, y: 0 };
      return next;
    });
  };

  const folderStyle: React.CSSProperties = {
    '--folder-color': color,
    '--folder-back-color': folderBackColor,
    '--paper-1': paper1,
    '--paper-2': paper2,
    '--paper-3': paper3
  } as React.CSSProperties;

  const scaleStyle = { transform: `scale(${size})` };

  /**
   * ✅ 부채꼴 변환을 N개에 대해 자동 계산
   * - 위치는 "폴더 바로 위"에만 배치 (원래 구조 유지)
   * - translate는 % 기반으로, 기존 3장 배치감(좌:-120%, 중:-50%, 우:~+10% / 위로 -70%~-100%)을
   *   삼각함수로 자연스럽게 보간
   */
  const getOpenTransform = useMemo(() => {
    const total = papers.length;
    if (total === 0) {
      return (_i: number) => '';
    }
    // 펼침 각 (기본 80도 정도 느낌)
    const spreadDeg = Math.min(100, Math.max(40, 80));
    const start = -spreadDeg / 2;
    const step = total > 1 ? spreadDeg / (total - 1) : 0;

    // X/Y 진폭 (%). X는 좌우 ±70%, Y는 -85% 주변에서 위아래로 15% 정도
    const centerX = -50; // 가운데 카드 기준 X 정렬(-50%로 중앙)
    const ampX = 70; // 좌우 펼침 폭
    const centerY = -60; // 기본 위로 올림
    const ampY = 15; // 위아래 변화량

    return (i: number) => {
      const deg = start + step * i;
      const rad = (deg * Math.PI) / 180;
      const xPct = centerX + Math.sin(rad) * ampX; // -120% ~ +20% 근사
      const yPct = centerY - Math.cos(rad) * ampY; // -100% (중앙) ~ -70% (양끝) 근사
      const rot = deg * 0.4; // 살짝 회전
      return `translate(${xPct}%, ${yPct}%) rotate(${rot}deg)`;
    };
  }, [papers.length]);

  /**
   * ✅ 카드 크기: 기존 3장(70/80/90%) 느낌을 N개로 선형 보간
   * - 열렸을 때 약 70% ~ 90% 사이 분포
   * - 닫혔을 때는 기존처럼 고정(보여만 주기)
   */
  const getSizePercent = (i: number, total: number, opened: boolean) => {
    if (!opened) {
      // 닫힌 상태: 살짝 층만 보이게 (원래 느낌 유지)
      // 3장 기준: 70/80/90% → N개면 60~90%로 균등 분포
      if (total <= 1) return { w: 70, h: 70 };
      const t = i / (total - 1);
      const w = 60 + t * 30;
      const h = 60 + t * 20;
      return { w, h };
    }
    // 열린 상태: 70~90% 사이
    if (total <= 1) return { w: 80, h: 80 };
    const t = i / (total - 1);
    const w = 70 + t * 20;
    const h = 80; // 고정
    return { w, h };
  };

  return (
    <div style={scaleStyle} className={cn('inline-block', className)}>
      <div
        className={`group relative cursor-pointer transition-all duration-200 ease-in ${!open ? 'hover:-translate-y-2' : ''}`}
        style={{ ...folderStyle, transform: open ? 'translateY(-8px)' : undefined }}
        onClick={handleClick}
      >
        <div
          className="relative h-[80px] w-[100px] rounded-r-[10px] rounded-bl-[10px] rounded-tl-none"
          style={{ backgroundColor: folderBackColor }}
        >
          <span
            className="absolute bottom-[98%] left-0 z-0 h-[10px] w-[30px] rounded-b-none rounded-t-[5px]"
            style={{ backgroundColor: folderBackColor }}
          />

          {papers.map((item, i) => {
            const { w, h } = getSizePercent(i, papers.length, open);
            const transformStyle = open
              ? `${getOpenTransform(i)} translate(${paperOffsets[i]?.x ?? 0}px, ${paperOffsets[i]?.y ?? 0}px)`
              : undefined;

            return (
              <div
                key={i}
                onMouseMove={(e) => handlePaperMouseMove(e, i)}
                onMouseLeave={(e) => handlePaperMouseLeave(e, i)}
                // 🔹 열렸을 때만 group/paper 로 hover 타깃 생성
                className={`absolute bottom-[10%] left-1/2 z-20 transition-all duration-300 ease-in-out ${
                  open ? 'group/paper' : '-translate-x-1/2 translate-y-[10%] group-hover:translate-y-0'
                }`}
                style={{
                  ...(open ? { transform: transformStyle } : undefined),
                  width: `${w}%`,
                  height: `${h}%`,
                  borderRadius: '10px',
                  ...(open ? {} : { transform: 'translate(-50%, 0)' })
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {/* 🔹 리프트용 내부 래퍼: hover 시 위로 6px (1.5 * 4px) */}
                <div className="size-full overflow-hidden rounded-[10px] shadow-md transition-transform duration-200 group-hover/paper:-translate-y-1.5 group-hover/paper:shadow-2xl">
                  {item}
                </div>
              </div>
            );
          })}

          {/* 앞판 (원본 클래스/위치 그대로) */}
          <div
            className={`absolute z-30 size-full origin-bottom transition-all duration-300 ease-in-out ${
              !open ? 'group-hover:[transform:skew(15deg)_scaleY(0.6)]' : ''
            }`}
            style={{
              backgroundColor: color,
              borderRadius: '5px 10px 10px 10px',
              ...(open && { transform: 'skew(15deg) scaleY(0.6)' })
            }}
          />
          <div
            className={`absolute z-30 size-full origin-bottom transition-all duration-300 ease-in-out ${
              !open ? 'group-hover:[transform:skew(-15deg)_scaleY(0.6)]' : ''
            }`}
            style={{
              backgroundColor: color,
              borderRadius: '5px 10px 10px 10px',
              ...(open && { transform: 'skew(-15deg) scaleY(0.6)' })
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Folder;
