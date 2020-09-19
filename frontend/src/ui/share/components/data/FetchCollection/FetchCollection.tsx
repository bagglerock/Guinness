import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { ContentStatuses } from 'services/share/const/contentStatuses';
import FetchCollectionResults from 'services/share/types/FetchCollectionResults';
import { FetchCollectionHandlers } from 'ui/share/components/data/FetchCollection/models/FetchCollectionHandlers';
import { FetchCollectionProps } from 'ui/share/components/data/FetchCollection/models/FetchCollectionProps';
import { FetchCollectionRenderProps } from 'ui/share/components/data/FetchCollection/models/FetchCollectionRenderProps';
import { FetchCollectionState } from 'ui/share/components/data/FetchCollection/models/FetchCollectionState';
import { Pagination } from 'ui/share/components/pagination/Pagination';
import { GenericResourceNotFoundView } from 'ui/share/components/transition/ViewStrategiesSwitch/GenericResourceNotFoundView';
import { ViewStrategy } from 'ui/share/components/transition/ViewStrategiesSwitch/models/ViewStrategy';
import { ViewStrategiesSwitch } from 'ui/share/components/transition/ViewStrategiesSwitch/ViewStrategiesSwitch';
import { scrollToTop } from 'ui/share/scrollToTop/scrollToTop';

export class FetchCollection<T> extends React.Component<ComponentProps<T>, FetchCollectionState<T>> {
  _isMounted = false;

  state: FetchCollectionState<T> = this.props.initialState || new FetchCollectionState();

  viewStrategies: ViewStrategy<FetchCollectionRenderProps<T>>[] = [
    {
      isMatch: ({ state }: FetchCollectionRenderProps<T>): boolean => state.status === ContentStatuses.LOADING,
      view: this.props.loadingView,
    },
    {
      isMatch: ({ state }: FetchCollectionRenderProps<T>): boolean => state.status === ContentStatuses.ERROR,
      view: this.props.errorView,
    },
    {
      isMatch: ({ state }: FetchCollectionRenderProps<T>): boolean => state.status === ContentStatuses.NOT_FOUND,
      view: GenericResourceNotFoundView,
    },
    {
      isMatch: ({ state }: FetchCollectionRenderProps<T>): boolean => state.content && state.content.total === 0,
      view: this.props.noResultsView,
    },
    {
      isMatch: (): boolean => true,
      view: this.props.okView,
    },
  ];

  componentDidMount(): void {
    this._isMounted = true;

    this.updateCollection();
  }

  componentWillUnmount(): void {
    this._isMounted = false;
  }

  handlePageChange = (page: number): void => {
    const newState = new FetchCollectionState(this.state);
    newState.filters.page = page;
    newState.status = ContentStatuses.LOADING;

    scrollToTop();

    this.setState(newState, this.updateCollection);
  };

  updateCollection = async (): Promise<void> => {
    this.setState({ status: ContentStatuses.LOADING });

    try {
      const { content = new FetchCollectionResults<T>(), status } = await this.props.fetch(this.state.filters);

      const newState = new FetchCollectionState(this.state);
      newState.content = content as FetchCollectionResults<T>;
      newState.status = status;

      if (this._isMounted) {
        this.setState(newState);
      }
    } catch (error) {
      this.setState(new FetchCollectionState({ status: ContentStatuses.ERROR }));
    }
  };

  render(): JSX.Element {
    const handlers = new FetchCollectionHandlers<T>({
      handlePageChange: this.handlePageChange,
    });

    const renderProps = new FetchCollectionRenderProps<T>({
      state: this.state,
      handlers,
      Pagination: (): JSX.Element => (
        <Pagination
          itemCount={this.state.content.total}
          itemsPerPage={this.state.filters.itemsPerPage}
          page={this.state.filters.page}
          onChange={this.handlePageChange}
        />
      ),
      updateCollection: this.updateCollection,
    });

    if (this.props.header) {
      const Header = this.props.header;

      return (
        <>
          <Header {...renderProps} />
          <ViewStrategiesSwitch viewStrategies={this.viewStrategies} renderProps={renderProps} />
        </>
      );
    }

    return <ViewStrategiesSwitch viewStrategies={this.viewStrategies} renderProps={renderProps} />;
  }
}

export type ComponentProps<T> = FetchCollectionProps<T> & RouteComponentProps;

export const fetchCollectionFactory = <T extends {}>() => withRouter(FetchCollection);
