import { cloneDeep } from 'lodash';
import { ContentStatuses } from 'services/share/const/contentStatuses';
import ApiCollection from 'services/share/types/ApiCollection';
import { FetchCollectionFilters } from 'services/share/types/FetchCollectionFilters';
import FetchCollectionResults from 'services/share/types/FetchCollectionResults';

export class FetchCollectionState<T> implements ApiCollection<T> {
  filters: FetchCollectionFilters<T> = new FetchCollectionFilters();
  content: FetchCollectionResults<T> = new FetchCollectionResults();
  status: ContentStatuses = ContentStatuses.LOADING;

  constructor(data: Partial<FetchCollectionState<T>> = {}) {
    Object.assign(this, { ...cloneDeep(data) });
  }
}
