import { parse } from 'query-string';
import { stringify } from 'querystring';
import React from 'react';
import { useHistory, useLocation } from 'react-router';
import { recipeRepository } from 'services/repositories/recipeRepository/recipeRepository';
import { GenericErrorView } from 'ui/components/genericViews/GenericErrorView';
import { GenericLoadingView } from 'ui/components/genericViews/GenericLoadingView';
import { Pagination } from 'ui/components/Pagination/Pagination';
import { useFetch } from 'ui/components/useFetch/useFetch';
import { RecipeSummariesList } from 'ui/pages/SearchResults/RecipeSummariesList/RecipeSummariesList';
import { SearchParameters } from 'ui/pages/SearchResults/SearchParameters';

export const SearchResults: React.FC = () => {
  const location = useLocation();
  const parsedUrl = parse(location.search);
  const query = parsedUrl.query ? parsedUrl.query.toString() : '';
  const pageNumber = parsedUrl.pageNumber ? +parsedUrl.pageNumber : 1;
  const filters = parsedUrl.filters ? parsedUrl.filters.toString() : '';
  const pageLimit = parsedUrl.pageLimit ? +parsedUrl.pageLimit : 20;

  const parameters = new SearchParameters({
    query,
    pageNumber,
    pageLimit,
    filters,
  });

  const { result, error, isLoading } = useFetch(() => recipeRepository.getAllRecipes(parameters), [location]);

  const history = useHistory();

  const setPage = (pageNumber: number) => {
    history.push(`/search?${stringify({ ...parameters, pageNumber })}`);
  };

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

  return (
    <>
      <div className="mb-3">
        <h2 className="page-heading">Search Results: </h2>
      </div>

      <div className="mb-3">
        <Pagination
          totalResults={result?.totalResults || 0}
          currentPage={parameters.pageNumber}
          pageLimit={parameters.pageLimit}
          gotoPage={setPage}
        />
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
