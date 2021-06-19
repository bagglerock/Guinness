export class SearchParameters {
  query: string;
  filters: string;

  constructor(data: Partial<SearchParameters>) {
    Object.assign(this, data);
  }
}
