import { FetchCollectionHandlers } from 'ui/share/components/data/FetchCollection/models/FetchCollectionHandlers';
import { FetchCollectionState } from 'ui/share/components/data/FetchCollection/models/FetchCollectionState';

export class FetchCollectionRenderProps<T> {
  state: FetchCollectionState<T> = new FetchCollectionState();
  handlers: FetchCollectionHandlers<T> = new FetchCollectionHandlers();
  Pagination: React.FC;
  updateCollection: VoidFunction;

  constructor(data: Partial<FetchCollectionRenderProps<T>> = {}) {
    Object.assign(this, data);
  }
}
