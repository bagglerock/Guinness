import React from 'react';
import { GenericErrorView } from 'ui/components/genericViews/GenericErrorView';
import { GenericLoadingView } from 'ui/components/genericViews/GenericLoadingView';
import { Pagination } from 'ui/components/Pagination/Pagination';
import { RecipeSummariesList } from 'ui/pages/SearchResults/RecipeSummariesList/RecipeSummariesList';
import { useFetchQuery } from 'ui/pages/SearchResults/useFetchQuery';

export const SearchResults: React.FC = () => {
  const { parameters, isLoading, error, result, setPage } = useFetchQuery();

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
