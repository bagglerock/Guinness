import { cloneDeep } from 'lodash';
import * as React from 'react';
import { ContentStatuses } from 'services/share/const/contentStatuses';
import { ApiContent } from 'services/share/types/ApiContent';
import { GenericResourceNotFoundView } from 'ui/share/components/transition/ViewStrategiesSwitch/GenericResourceNotFoundView';
import { ViewStrategy } from 'ui/share/components/transition/ViewStrategiesSwitch/models/ViewStrategy';
import { ViewStrategiesSwitch } from 'ui/share/components/transition/ViewStrategiesSwitch/ViewStrategiesSwitch';

export class Fetch<T> extends React.Component<ComponentProps<T>, ApiContent<T>> {
  _isMounted = false;

  state: ApiContent<T> = cloneDeep(this.props.initialState);

  viewStrategies: ViewStrategy<ApiContent<T>>[] = [
    {
      isMatch: ({ status }: ApiContent<T>): boolean => status === ContentStatuses.LOADING,
      view: this.props.loadingView,
    },
    {
      isMatch: ({ status }: ApiContent<T>): boolean => status === ContentStatuses.ERROR,
      view: this.props.errorView,
    },
    {
      isMatch: this.props.resourceNotFoundCondition || defaultResourceNotFoundCondition,
      view: GenericResourceNotFoundView,
    },
    {
      isMatch: (): boolean => true,
      view: this.props.okView,
    },
  ];

  async componentDidMount(): Promise<void> {
    this._isMounted = true;

    try {
      const result = await this.props.fetch();

      if (this._isMounted) {
        this.setState(result);
      }
    } catch (error) {
      this.setState(new ApiContent({ status: ContentStatuses.ERROR }));
    }
  }

  componentWillUnmount(): void {
    this._isMounted = false;
  }

  render(): JSX.Element {
    return <ViewStrategiesSwitch viewStrategies={this.viewStrategies} renderProps={this.state} />;
  }
}

export interface ComponentProps<T> {
  initialState: ApiContent<T>;
  okView: React.ComponentType<ApiContent<T>>;
  fetch(): Promise<ApiContent<T>>;
  errorView(renderProps: ApiContent<T>): JSX.Element;
  loadingView(renderProps: ApiContent<T>): JSX.Element;
  resourceNotFoundCondition?(renderProps: ApiContent<T>): boolean;
}

const defaultResourceNotFoundCondition = ({ status }: ApiContent<any>): boolean => status === ContentStatuses.NOT_FOUND;
