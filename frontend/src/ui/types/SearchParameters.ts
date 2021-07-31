import { Filters } from 'ui/types/Filters';

export class SearchParameters {
  query: string;
  pageNumber: number;
  filters: Filters;

  constructor(data: Partial<SearchParameters>) {
    Object.assign(this, data);
  }
}
