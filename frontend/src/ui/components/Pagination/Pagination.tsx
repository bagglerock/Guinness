import { faFastBackward, faFastForward, faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ceil, map } from 'lodash';
import React from 'react';
import { getPagesToDisplay } from 'ui/components/Pagination/utils/getPagesToDisplay';
import './Pagination.scss';

const NUMBER_OF_ADJACENT_PAGES = 2;

export const Pagination: React.FC<PaginationProps> = ({ totalResults, currentPage, pageLimit, gotoPage }) => {
  const prevPage = () => gotoPage(currentPage - 1);
  const nextPage = () => gotoPage(currentPage + 1);
  const handlePageChange = (event: React.MouseEvent<HTMLButtonElement>) => gotoPage(+(event.target as HTMLButtonElement).value);
  const numberOfPages = ceil(totalResults / pageLimit);
  const canPrevPage = currentPage > 1;
  const canNextPage = currentPage < numberOfPages;

  const currentIndex = currentPage - 1;
  const pagesToDisplay = getPagesToDisplay(numberOfPages, currentIndex, NUMBER_OF_ADJACENT_PAGES);

  return (
    <div className="d-flex justify-content-center">
      <button className="pagination-button" onClick={() => gotoPage(1)} disabled={currentPage === 1}>
        <FontAwesomeIcon icon={faFastBackward} />
      </button>

      <button className="pagination-button" onClick={prevPage} disabled={!canPrevPage}>
        <FontAwesomeIcon icon={faStepBackward} />
      </button>

      {map(pagesToDisplay, pageIndex => (
        <button
          className={`pagination-button ${pageIndex === currentIndex ? 'active' : ''}`}
          key={pageIndex}
          value={pageIndex + 1}
          onClick={handlePageChange}
        >
          {pageIndex + 1}
        </button>
      ))}

      <button className="pagination-button" onClick={nextPage} disabled={!canNextPage}>
        <FontAwesomeIcon icon={faStepForward} />
      </button>

      <button className="pagination-button" onClick={() => gotoPage(numberOfPages)} disabled={currentPage === numberOfPages}>
        <FontAwesomeIcon icon={faFastForward} />
      </button>
    </div>
  );
};

interface PaginationProps {
  totalResults: number;
  currentPage: number;
  pageLimit: number;
  gotoPage(page: number): void;
}
