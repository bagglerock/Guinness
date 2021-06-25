import React, { useEffect, useState } from 'react';
import { RecipeSummaries } from 'services/repositories/recipeRepository/models/RecipeSummaries';
import { recipeRepository } from 'services/repositories/recipeRepository/recipeRepository';
import { GenericErrorView } from 'ui/components/genericViews/GenericErrorView';
import { GenericLoadingView } from 'ui/components/genericViews/GenericLoadingView';
import { Pagination } from 'ui/components/Pagination/Pagination';
import { RecipeSummariesList } from 'ui/pages/SearchResults/RecipeSummariesList/RecipeSummariesList';
import { SearchParameters } from 'ui/pages/SearchResults/SearchParameters';

const initialSearchParameters = {
  query: '',
  pageNumber: 1,
  numExpected: 10,
  filters: '',
};

export const SearchResults: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<RecipeSummaries>();
  const [error, setError] = useState();
  const [parameters, setParameters] = useState<SearchParameters>(new SearchParameters({ ...initialSearchParameters }));

  useEffect(() => {
    recipeRepository
      .getAllRecipes(parameters)
      .then(data => setResult(data))
      .catch(err => setError(err))
      .finally(() => setIsLoading(false));
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

  const setPage = (pageNumber: number) => {
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
        pageLimit={parameters.numExpected || 50}
        gotoPage={setPage}
      />
    </>
  );
};
