export class FetchCollectionHandlers<T> {
  constructor(data: Partial<FetchCollectionHandlers<T>> = {}) {
    Object.assign(this, { ...data });
  }

  handlePageChange(page: number): void {
    return undefined;
  }
}
