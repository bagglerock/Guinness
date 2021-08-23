export const recipeRoutes = {
  getByKeyword: (queryString: string): string => `/api/recipes?${queryString}`,
  getById: (id: string): string => `/api/recipes/${id}/recipe`,
  getRandomRecipes: (): string => '/api/recipes/random',
};
