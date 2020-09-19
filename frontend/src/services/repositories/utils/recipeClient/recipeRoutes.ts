export const recipeRoutes = {
  getByKeyword: (keyword: string): string => `/api/recipe?query=${keyword}`,
};
