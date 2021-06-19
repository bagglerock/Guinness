import { SearchParameters } from 'ui/pages/SearchResults/SearchParameters';

export const recipeRoutes = {
  getByKeyword: (parameters: SearchParameters): string => `/api/recipe?query=${parameters.query}`,
  getById: (id: string): string => `/api/recipe/${id}`,
};
