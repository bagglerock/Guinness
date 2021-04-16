import { mapRecipeSummaries } from 'services/repositories/recipeRepository/mappers/mapRecipeSummaries';
import { RecipeSummaries } from 'services/repositories/recipeRepository/models/RecipeSummaries';
import { recipeClient } from 'services/repositories/utils/recipeClient/recipeClient';
import { recipeRoutes } from 'services/repositories/utils/recipeClient/recipeRoutes';

class RecipeRepository {
  async getAllRecipes(keyword: string): Promise<RecipeSummaries> {
    const route = recipeRoutes.getByKeyword(keyword);

    const response = await recipeClient.getAllRecipes(route);

    return mapRecipeSummaries(response);
  }

  async getById(id: string): Promise<any> {
    const route = recipeRoutes.getById(id);

    const response = await recipeClient.getById(route);

    return response.data;
  }
}

export const recipeRepository = new RecipeRepository();
