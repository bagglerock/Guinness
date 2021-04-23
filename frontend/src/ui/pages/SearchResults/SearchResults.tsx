import React from 'react';
import { recipeRepository } from 'services/repositories/recipeRepository/recipeRepository';
import { OkView } from 'ui/pages/SearchResults/views/OkView';
import { useQuery } from 'ui/pages/SearchResults/useQuery';
import { ContentViewSwitch } from 'ui/share/ContentViewSwitch/ContentViewSwitch';
import { GenericErrorView } from 'ui/share/genericViews/GenericErrorView';
import { GenericLoadingView } from 'ui/share/genericViews/GenericLoadingView';

export const SearchResults: React.FC = () => {
  const { query } = useQuery();

  if (!query) {
    return <NoQuery />;
  }

  const fetch = () => recipeRepository.getAllRecipes(query);

  return (
    <ContentViewSwitch
      fetchFunc={fetch}
      OkView={OkView}
      LoadingView={GenericLoadingView}
      ErrorView={GenericErrorView}
      rerenderTriggers={[query]}
    />
  );
};

const NoQuery: React.FC = () => <p>The query is blank.</p>;
