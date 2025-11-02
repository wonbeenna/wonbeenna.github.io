import { useEffect, useState } from 'react';

const useMedia = (queries: string[], values: number[], defaultValue: number): number => {
  const get = () => values[queries.findIndex((q) => matchMedia(q).matches)] ?? defaultValue;
  const [value, setValue] = useState<number>(() => (typeof window === 'undefined' ? defaultValue : get()));

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const handler = () => setValue(get);
    queries.forEach((q) => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach((q) => matchMedia(q).removeEventListener('change', handler));
  }, [queries]);

  return value;
};

export default useMedia;
