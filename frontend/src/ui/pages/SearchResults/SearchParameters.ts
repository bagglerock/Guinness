export class SearchParameters {
  query: string;
  pageNumber: number;
  numExpected: number;
  filters: string;

  constructor(data: Partial<SearchParameters>) {
    Object.assign(this, data);
  }
}
