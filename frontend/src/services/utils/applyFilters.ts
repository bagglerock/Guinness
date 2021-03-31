import { chunk } from 'lodash';
import { FetchCollectionFilters } from 'services/share/types/FetchCollectionFilters';
import { FilterResults } from 'services/utils/FilterResults';

export function applyFilters<T>(collection: T[], filters: FetchCollectionFilters<T>): FilterResults<T> {
  const filteredCollection = [...collection];

  const currentPage = getCurrentPage(filteredCollection, filters);

  return new FilterResults({
    currentPage,
    total: filteredCollection.length,
  });
}

export function getCurrentPage<T>(collection: T[], filters: FetchCollectionFilters<T>): T[] {
  return chunk(collection, filters.itemsPerPage)[filters.page - 1] || [];
}
