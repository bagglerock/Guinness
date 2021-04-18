import React from 'react';
import { useFetch } from 'ui/share/useFetch';

export const ContentViewSwitch = <T extends {}>(props: ViewSwitchProps<T>) => {
  const { fetchFunc, OkView, ErrorView, LoadingView } = props;

  const { result, error, isLoading } = useFetch(fetchFunc);

  if (isLoading) {
    return <LoadingView />;
  }

  if (error != '') {
    return <ErrorView />;
  }

  return <OkView {...(result as T)} />;
};

interface ViewSwitchProps<T> {
  fetchFunc: () => Promise<T>;
  OkView: React.FC<T>;
  ErrorView: React.FC;
  LoadingView: React.FC;
}
