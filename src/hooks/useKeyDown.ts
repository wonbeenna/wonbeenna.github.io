import { useEffect } from 'react';

interface UseKeyDownProps {
  onEscape?: () => void;
  onArrowLeft?: () => void;
  onArrowRight?: () => void;
}

const useKeyDown = ({ onEscape, onArrowLeft, onArrowRight }: UseKeyDownProps) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onEscape?.();
      }
      if (e.key === 'ArrowLeft') {
        onArrowLeft?.();
      }
      if (e.key === 'ArrowRight') {
        onArrowRight?.();
      }
    };

    window.addEventListener('keydown', onKey);

    return () => window.removeEventListener('keydown', onKey);
  }, [onEscape, onArrowLeft, onArrowRight]);
};

export default useKeyDown;
