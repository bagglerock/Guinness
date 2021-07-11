export class SearchParameters {
  query: string = '';
  pageNumber: number = 1;
  pageLimit: number = 20;
  filters: string = '';

  constructor(data: Partial<SearchParameters>) {
    Object.assign(this, data);
  }
}
