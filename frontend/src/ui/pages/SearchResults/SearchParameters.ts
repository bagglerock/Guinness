export class SearchParameters {
  query: string;
  pageNumber: number;
  pageLimit: number;
  filters: string;

  constructor(data: Partial<SearchParameters>) {
    Object.assign(this, data);
  }
}
