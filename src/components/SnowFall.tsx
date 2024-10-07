'use client';
import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

type ElementType = {
  x: number;
  y: number;
  size: number;
  speed: number;
};

const SnowFall = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      const width = (canvas.width = window.innerWidth);
      const height = (canvas.height = window.innerHeight);
      const num = 100;
      const size = 5;
      const elements: ElementType[] = [];

      for (let i = 0; i < num; i++) {
        elements.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * size,
          speed: Math.random() * 3
        });
      }

      const draw = () => {
        if (!ctx) return;

        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < num; i++) {
          const element = elements[i];
          ctx.beginPath();
          ctx.fillStyle = '#fff';
          ctx.arc(element.x, element.y, element.size, 0, Math.PI * 2);
          ctx.fill();
        }
      };

      const update = () => {
        for (let i = 0; i < num; i++) {
          const element = elements[i];
          element.y += element.speed;
          if (element.y > height) {
            element.y = -size;
          }
        }
      };

      const tick = () => {
        draw();
        update();
        requestAnimationFrame(tick);
      };

      tick();
    }
  }, [currentTheme]);

  return (
    <>
      {currentTheme === 'dark' && (
        <canvas ref={canvasRef} className="pointer-events-none fixed left-0 top-0 z-50 size-full" />
      )}
    </>
  );
};

export default SnowFall;
