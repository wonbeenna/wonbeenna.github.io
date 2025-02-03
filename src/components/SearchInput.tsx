'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import debounce from 'lodash.debounce';

const SearchInput = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (!value) {
        params.delete(name);
        return params.toString();
      }

      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const debouncedSearch = useMemo(
    () =>
      debounce((query) => {
        router.replace(pathname + '?' + createQueryString('search', query));
      }, 500),
    [createQueryString]
  );

  return (
    <input
      autoFocus
      defaultValue={searchParams.get('search') || ''}
      onChange={onChange}
      className="w-full rounded-[8px] border border-gray400 px-3 py-1.5"
    />
  );
};

export default SearchInput;
