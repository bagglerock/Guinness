export class FetchCollectionFilters<T> {
  static maxResults<T>(): FetchCollectionFilters<T> {
    return new FetchCollectionFilters({ itemsPerPage: 10000, page: 1 });
  }

  page = 1;
  itemsPerPage = 20;

  constructor(data: Partial<FetchCollectionFilters<T>> = {}) {
    Object.assign(this, data);
  }
}
