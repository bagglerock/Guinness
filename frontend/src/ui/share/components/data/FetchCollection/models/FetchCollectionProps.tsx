import ApiCollection from 'services/share/types/ApiCollection';
import { FetchCollectionFilters } from 'services/share/types/FetchCollectionFilters';
import { FetchCollectionRenderProps } from 'ui/share/components/data/FetchCollection/models/FetchCollectionRenderProps';
import { FetchCollectionState } from 'ui/share/components/data/FetchCollection/models/FetchCollectionState';

export interface FetchCollectionProps<T> {
  initialState?: FetchCollectionState<T>;
  header?: React.ComponentType<FetchCollectionRenderProps<T>>;
  fetch(fetchFilters: FetchCollectionFilters<T>): Promise<ApiCollection<T>>;
  errorView(state: FetchCollectionRenderProps<T>): JSX.Element;
  noResultsView(state: FetchCollectionRenderProps<T>): JSX.Element;
  loadingView(state: FetchCollectionRenderProps<T>): JSX.Element;
  okView(renderProps: FetchCollectionRenderProps<T>): JSX.Element;
}
