import { Icon } from '@blueprintjs/core';
import { ARROW_LEFT, ARROW_RIGHT } from '@blueprintjs/icons/lib/esm/generated/iconNames';
import { chunk, range } from 'lodash';
import * as React from 'react';

export class Pagination extends React.Component<PaginationProps> {
  static defaultProps: Partial<PaginationProps> = {
    itemsPerPage: 10,
    siblingPageRange: 2,
  };

  handleClickPreviousArrow = (event: React.MouseEvent<HTMLElement>): void => {
    const { page } = this.props;

    if (page === 1) {
      return;
    }

    this.changePage(page - 1);
  };

  handleClickNextArrow = (event: React.MouseEvent<HTMLElement>): void => {
    const { page } = this.props;
    const lastPage = this.getChunkedItemCount().length;

    if (page === lastPage) {
      return;
    }

    this.changePage(page + 1);
  };

  handlePageClick = (pageNo: number): VoidFunction => (): void => {
    this.changePage(pageNo || 1);
  };

  changePage = (page: number): void => {
    const { onChange } = this.props;

    onChange(page);
  };

  render(): JSX.Element {
    return (
      <nav className="w-100 text-center">
        <p>{this.getPaginationText()}</p>
        <ul className="pagination-navigation">
          <li>
            {/* eslint-disable-next-line */}
            <a onClick={this.handleClickPreviousArrow}>
              <span>
                <Icon icon={ARROW_LEFT} iconSize={Icon.SIZE_LARGE} />
              </span>
            </a>
          </li>
          {this.getPagesToDisplay().map((pageNo: number, index: number) => (
            <li key={index}>
              {/* eslint-disable-next-line */}
              <a onClick={this.handlePageClick(pageNo)}>{pageNo}</a>
            </li>
          ))}
          <li>
            {/* eslint-disable-next-line */}
            <a onClick={this.handleClickNextArrow}>
              <span>
                <Icon icon={ARROW_RIGHT} iconSize={Icon.SIZE_LARGE} />
              </span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }

  private getPaginationText = (): string => {
    const { itemCount, page } = this.props;

    const pageItems = this.getChunkedItemCount()[page - 1];

    return itemCount ? `Showing ${pageItems[0]} - ${pageItems[pageItems.length - 1]} of ${this.props.itemCount}` : '';
  };

  private getChunkedItemCount = (): number[][] => {
    const { itemCount, itemsPerPage } = this.props;

    return chunk(range(1, itemCount + 1), itemsPerPage);
  };

  private getPagesToDisplay = (): number[] => {
    const { siblingPageRange, page } = this.props;

    let firstPageToDisplay: number;
    let lastPageToDisplay: number | undefined;

    const allPages = this.getChunkedItemCount();

    if (page <= siblingPageRange!) {
      firstPageToDisplay = 1;

      lastPageToDisplay = Math.min(siblingPageRange! * 2 + 1, allPages.length);
    } else if (page >= allPages.length - siblingPageRange!) {
      firstPageToDisplay = page - siblingPageRange!;
      lastPageToDisplay = allPages.length;
    } else {
      firstPageToDisplay = page - siblingPageRange!;
      lastPageToDisplay = page + siblingPageRange!;
    }

    return range(firstPageToDisplay, lastPageToDisplay + 1);
  };
}

interface PaginationProps {
  itemCount: number;
  itemsPerPage?: number;
  siblingPageRange?: number;
  page: number;
  onChange(page: number): void;
}
