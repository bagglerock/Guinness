import { ContentStatuses } from 'services/share/const/contentStatuses';
import { cloneDeep } from 'lodash';

export class ApiContent<T> {
  content?: T;
  status: ContentStatuses = ContentStatuses.LOADING;

  constructor(data: Partial<ApiContent<T>> = {}) {
    Object.assign(this, { ...cloneDeep(data) });
  }
}
