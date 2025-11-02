import { useLayoutEffect, useRef, useState } from 'react';

const useMeasure = <T extends HTMLElement>() => {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    if (rect.width || rect.height) {
      setSize({ width: rect.width, height: rect.height });
    }

    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);

    const raf = requestAnimationFrame(() => {
      const r = ref.current?.getBoundingClientRect();
      if (r && (r.width !== rect.width || r.height !== rect.height)) {
        setSize({ width: r.width, height: r.height });
      }
    });

    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, []);

  return [ref, size] as const;
};

export default useMeasure;
