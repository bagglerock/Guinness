import { parse, stringify } from 'query-string';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { RecipeSummaries } from 'services/repositories/recipeRepository/models/RecipeSummaries';
import { recipeRepository } from 'services/repositories/recipeRepository/recipeRepository';
import { GenericErrorView } from 'ui/components/genericViews/GenericErrorView';
import { GenericLoadingView } from 'ui/components/genericViews/GenericLoadingView';
import { Pagination } from 'ui/components/Pagination/Pagination';
import { RecipeSummariesList } from 'ui/pages/SearchResults/RecipeSummariesList/RecipeSummariesList';
import { SearchParameters } from 'ui/pages/SearchResults/SearchParameters';

export const SearchResults: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<RecipeSummaries>();
  const [error, setError] = useState();

  const location = useLocation();
  const { query, pageNumber, pageLimit, filters } = extractParametersFromUrl(location.search);

  const history = useHistory();

  const parameters = new SearchParameters({
    query,
    pageNumber,
    pageLimit,
    filters,
  });

  useEffect(() => {
    if (parameters != null) {
      recipeRepository
        .getAllRecipes(parameters)
        .then(data => setResult(data))
        .catch(err => setError(err))
        .finally(() => setIsLoading(false));
    }
  }, [location]);

  if (parameters?.query == null) {
    return <p>The query is blank.</p>;
  }

  if (isLoading) {
    return <GenericLoadingView />;
  }

  if (error != null) {
    return <GenericErrorView />;
  }

  if (result?.totalResults === 0) {
    return <p>Sorry, no results.</p>;
  }

  const setPage = (pageNumber: number) => {
    history.push(`/search?${stringify({ ...parameters, pageNumber })}`);
  };

  return (
    <>
      <div className="mb-3">
        <h2 className="page-heading">Search Results: </h2>
      </div>

      <RecipeSummariesList recipes={result?.recipes || []} />

      <Pagination
        totalResults={result?.totalResults || 0}
        currentPage={parameters.pageNumber}
        pageLimit={parameters.pageLimit}
        gotoPage={setPage}
      />
    </>
  );
};

const extractParametersFromUrl = (location: string): SearchParameters => {
  const parsedUrl = parse(location);

  const query = parsedUrl.query ? parsedUrl.query.toString() : '';
  const pageNumber = parsedUrl.pageNumber ? +parsedUrl.pageNumber : 1;
  const filters = parsedUrl.filters ? parsedUrl.filters.toString() : '';

  return {
    query,
    pageNumber,
    pageLimit: 50,
    filters,
  };
};
