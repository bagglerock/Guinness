import { parse } from 'query-string';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { RecipeSummaries } from 'services/repositories/recipeRepository/models/RecipeSummaries';
import { recipeRepository } from 'services/repositories/recipeRepository/recipeRepository';
import { GenericErrorView } from 'ui/components/genericViews/GenericErrorView';
import { GenericLoadingView } from 'ui/components/genericViews/GenericLoadingView';
import { Pagination } from 'ui/components/Pagination/Pagination';
import { RecipeSummariesList } from 'ui/pages/SearchResults/RecipeSummariesList/RecipeSummariesList';
import { SearchParameters } from 'ui/pages/SearchResults/SearchParameters';

const PAGE_LIMIT = 50;

export const SearchResults: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<RecipeSummaries>();
  const [error, setError] = useState();
  const [parameters, setParameters] = useState<SearchParameters>();

  const location = useLocation();

  useEffect(() => {
    setParameters(extractParametersFromUrl(location.search));
  }, [location]);

  useEffect(() => {
    if (parameters != null) {
      recipeRepository
        .getAllRecipes(parameters)
        .then(data => setResult(data))
        .catch(err => setError(err))
        .finally(() => setIsLoading(false));
    }
  }, [parameters]);

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

  const handlePageChange = (pageNumber: number) => {
    setParameters({ ...parameters, pageNumber });
  };

  return (
    <>
      <div className="mb-3">
        <h2 className="page-heading">Search Results: </h2>
      </div>

      <RecipeSummariesList recipes={result?.recipes || []} />

      <Pagination
        totalResults={result?.totalResults || 0}
        currentPage={parameters.pageNumber || 0}
        pageLimit={PAGE_LIMIT}
        onPageChange={handlePageChange}
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
    numExpected: PAGE_LIMIT,
    filters,
  };
};
