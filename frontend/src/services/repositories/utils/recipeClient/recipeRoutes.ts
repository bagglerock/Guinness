export const recipeRoutes = {
  getByKeyword: (keyword: string): string => `/api/recipe?query=${keyword}`,
  getById: (id: string): string => `/api/recipe/${id}`,
};
