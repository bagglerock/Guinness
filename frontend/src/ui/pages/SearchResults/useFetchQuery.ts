import { parse, stringify } from 'query-string';
import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router';
import { RecipeSummaries } from 'services/repositories/recipeRepository/models/RecipeSummaries';
import { recipeRepository } from 'services/repositories/recipeRepository/recipeRepository';
import { SearchParameters } from 'ui/pages/SearchResults/SearchParameters';

export const useFetchQuery = () => {
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

  const setPage = (pageNumber: number) => {
    history.push(`/search?${stringify({ ...parameters, pageNumber })}`);
  };

  return {
    parameters,
    isLoading,
    error,
    result,
    setPage,
  };
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
