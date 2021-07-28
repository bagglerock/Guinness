export class SearchParameters {
  query: string;
  pageNumber: number;

  constructor(data: Partial<SearchParameters>) {
    Object.assign(this, data);
  }
}
