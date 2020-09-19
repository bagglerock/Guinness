export default class FetchCollectionResults<T> implements FetchCollectionResults<T> {
  total = 0;
  collection: T[] = [];

  constructor(data: Partial<FetchCollectionResults<T>> = {}) {
    Object.assign(this, { ...data });
  }
}

export interface IFetchCollectionResults<T> {
  total: number;
  collection: T[];
}
