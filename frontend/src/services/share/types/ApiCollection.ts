import { cloneDeep } from 'lodash';
import { ContentStatuses } from 'services/share/const/contentStatuses';
import FetchCollectionResults, { IFetchCollectionResults } from 'services/share/types/FetchCollectionResults';

export default class ApiCollection<T> {
  content: IFetchCollectionResults<T> = new FetchCollectionResults();
  status: ContentStatuses = ContentStatuses.LOADING;

  constructor(data: Partial<ApiCollection<T>> = {}) {
    Object.assign(this, { ...cloneDeep(data) });
  }
}
