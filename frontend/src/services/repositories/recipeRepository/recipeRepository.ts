import { recipeClient } from 'services/repositories/utils/recipeClient/recipeClient';
import { recipeRoutes } from 'services/repositories/utils/recipeClient/recipeRoutes';

class RecipeRepository {
  async getByKeyword(keyword: string): Promise<any> {
    const route = recipeRoutes.getByKeyword(keyword);

    const response = await recipeClient.getByKeyword(route);

    return response.data;
  }
}

export const recipeRepository = new RecipeRepository();
