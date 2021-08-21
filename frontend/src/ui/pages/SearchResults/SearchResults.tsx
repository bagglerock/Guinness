import React from 'react';
import { useHistory, useLocation } from 'react-router';
import { recipeRepository } from 'services/repositories/recipeRepository/recipeRepository';
import { ErrorView } from 'ui/components/ErrorView/ErrorView';
import { LoadingView } from 'ui/components/LoadingView/LoadingView';
import { NoResultsView } from 'ui/components/NoResultsView/NoResultsView';
import { Pagination } from 'ui/components/Pagination/Pagination';
import { useFetch } from 'ui/components/useFetch/useFetch';
import { RecipeSummariesList } from 'ui/pages/SearchResults/RecipeSummariesList/RecipeSummariesList';
import { makeSearchParameters } from 'ui/types/SearchParameters/utils/makeSearchParameters';
import { makeSearchQuery } from 'ui/types/SearchParameters/utils/makeSearchQuery';

const PAGE_LIMIT = 20;

export const SearchResults: React.FC = () => {
  const location = useLocation();
  const parameters = makeSearchParameters(location.search);
  const { result, error, isLoading } = useFetch(() => recipeRepository.getAllRecipes(parameters), [location]);

  const history = useHistory();
  const setPage = (pageNumber: number) => {
    const params = makeSearchQuery({ ...parameters, pageNumber });

    history.push(`/search?${params}`);
  };

  if (parameters?.query == null) {
    return <p>The query is blank.</p>;
  }

  if (isLoading) {
    return <LoadingView />;
  }

  if (error != null) {
    return <ErrorView />;
  }

  if (result?.totalResults === 0) {
    return <NoResultsView />;
  }

  return (
    <div className="mt-3 mr-3 ml-3">
      <div className="mb-3">
        <h2 className="page-heading">Search Results: </h2>
      </div>

      <div className="mb-3">
        <Pagination
          totalResults={result?.totalResults || 0}
          currentPage={parameters.pageNumber}
          pageLimit={PAGE_LIMIT}
          gotoPage={setPage}
        />
      </div>

      <RecipeSummariesList recipes={result?.recipes || []} />

      <Pagination totalResults={result?.totalResults || 0} currentPage={parameters.pageNumber} pageLimit={PAGE_LIMIT} gotoPage={setPage} />
    </div>
  );
};
