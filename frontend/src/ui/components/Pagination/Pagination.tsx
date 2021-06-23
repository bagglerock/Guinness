import { ceil } from 'lodash';
import React from 'react';
import './Pagination.scss';

export const Pagination: React.FC<PaginationProps> = ({ totalResults, currentPage, pageLimit, onPageChange }) => {
  const prevPage = () => onPageChange(currentPage - 1);
  const nextPage = () => onPageChange(currentPage + 1);
  const goToPage = (event: React.MouseEvent<HTMLButtonElement>) => onPageChange(+(event.target as HTMLButtonElement).value);
  const numberOfPages = ceil(totalResults / pageLimit);
  const canPrevPage = currentPage > 1;
  const canNextPage = currentPage < numberOfPages;

  return (
    <div className="d-flex">
      <button className="pagination-button" onClick={prevPage} disabled={!canPrevPage}>
        {'<'}
      </button>

      <div>
        {Array.from({ length: numberOfPages }).map((_, pageIndex) => {
          return (
            <button className="pagination-button" key={pageIndex} value={pageIndex + 1} onClick={goToPage}>
              {pageIndex + 1}
            </button>
          );
        })}
      </div>

      <button className="pagination-button" onClick={nextPage} disabled={!canNextPage}>
        {'>'}
      </button>
    </div>
  );
};

interface PaginationProps {
  totalResults: number;
  currentPage: number;
  pageLimit: number;
  onPageChange(page: number): void;
}
