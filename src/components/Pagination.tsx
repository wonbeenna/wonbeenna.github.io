import React from 'react';
import usePagination, { DOTS } from '@/hooks/usePagination';

interface PaginationProps {
  onPageChange: (selectedPage: number) => void;
  totalCount: number;
  currentPage: number;
  pageSize: number;
  siblingCount?: number;
}

const Pagination = ({ onPageChange, totalCount, siblingCount = 2, currentPage, pageSize }: PaginationProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || (paginationRange && paginationRange?.length < 2)) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange?.[paginationRange?.length - 1];

  return (
    <ul className="flex items-center justify-center gap-[10px]">
      <li
        onClick={onPrevious}
        className={`box-border flex size-[24px] cursor-pointer items-center justify-center text-[16px] ${
          currentPage === 1 ? 'pointer-events-none cursor-not-allowed opacity-50' : ''
        }`}
      >
        &#5176;
      </li>

      {paginationRange?.map((pageNumber, index) => (
        <React.Fragment key={index}>
          {pageNumber === DOTS ? (
            <li
              className="box-border flex size-[24px] cursor-pointer items-center justify-center text-[16px]"
              key={pageNumber}
            >
              &#8230;
            </li>
          ) : (
            <li
              key={pageNumber}
              className={`box-border flex size-[24px] cursor-pointer items-center justify-center text-[16px] ${
                pageNumber === currentPage ? 'rounded-full bg-primaryGradient03 px-[4px] py-[2px] text-white' : ''
              }`}
              onClick={() => onPageChange(pageNumber as number)}
            >
              {pageNumber}
            </li>
          )}
        </React.Fragment>
      ))}

      <li
        onClick={onNext}
        className={`box-border flex size-[24px] cursor-pointer items-center justify-center text-[16px] ${
          currentPage === lastPage ? 'pointer-events-none cursor-not-allowed opacity-50' : ''
        }`}
      >
        &#5171;
      </li>
    </ul>
  );
};

export default Pagination;
