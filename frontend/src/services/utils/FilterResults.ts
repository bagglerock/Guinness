export class FilterResults<T> {
  currentPage: T[] = [];
  total: number = 0;

  constructor(data: Partial<FilterResults<T>> = {}) {
    Object.assign(this, data);
  }
}
