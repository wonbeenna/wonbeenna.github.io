import { useEffect } from 'react';

interface UseBodyOverflowHiddenProps {
  isOpen?: boolean;
}

const useBodyOverflowHidden = ({ isOpen }: UseBodyOverflowHiddenProps) => {
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);
};

export default useBodyOverflowHidden;
