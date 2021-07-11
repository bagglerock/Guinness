export const recipeRoutes = {
  getByKeyword: (queryString: string): string => `/api/recipe?${queryString}`,
  getById: (id: string): string => `/api/recipe/${id}`,
};
