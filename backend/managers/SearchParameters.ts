export class SearchParameters {
  query: string = '';
  pageNumber: number = 1;
  numExpected: number = 10;
  filters: string = '';

  constructor(data: Partial<SearchParameters>) {
    Object.assign(this, data);
  }
}
