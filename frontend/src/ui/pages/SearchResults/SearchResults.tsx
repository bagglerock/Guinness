import { parse } from 'query-string';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { RecipeSummaries } from 'services/repositories/recipeRepository/models/RecipeSummaries';
import { recipeRepository } from 'services/repositories/recipeRepository/recipeRepository';
import { RecipeSummariesList } from 'ui/pages/SearchResults/RecipeSummariesList/RecipeSummariesList';
import { SearchParameters } from 'ui/pages/SearchResults/SearchParameters';
import { GenericErrorView } from 'ui/pages/share/genericViews/GenericErrorView';
import { GenericLoadingView } from 'ui/pages/share/genericViews/GenericLoadingView';

export const SearchResults: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<RecipeSummaries>();
  const [error, setError] = useState();
  const [parameters, setParameters] = useState<SearchParameters>(new SearchParameters({}));

  const location = useLocation();

  useEffect(() => {
    setParameters(extractParametersFromUrl(location.search));
  }, [location]);

  useEffect(() => {
    recipeRepository
      .getAllRecipes(parameters)
      .then(data => setResult(data))
      .catch(err => setError(err))
      .finally(() => setIsLoading(false));
  }, [parameters]);

  if (parameters.query == null) {
    return <p>The query is blank.</p>;
  }

  if (isLoading) {
    return <GenericLoadingView />;
  }

  if (error != null) {
    return <GenericErrorView />;
  }

  return (
    <>
      <div className="mb-3">
        <h2 className="page-heading">Search Results: </h2>
      </div>

      <RecipeSummariesList recipes={result?.recipes || []} />
    </>
  );
};

const extractParametersFromUrl = (location: string) => {
  const parsedUrl = parse(location);

  const query = parsedUrl.query ? parsedUrl.query.toString() : '';
  const filters = parsedUrl.filters ? parsedUrl.filters.toString() : '';

  return {
    query,
    filters,
  };
};
