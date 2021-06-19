import { mapRecipeSummaries } from 'services/repositories/recipeRepository/mappers/mapRecipeSummaries';
import { RecipeSummaries } from 'services/repositories/recipeRepository/models/RecipeSummaries';
import { recipeClient } from 'services/utils/recipeClient/recipeClient';
import { recipeRoutes } from 'services/utils/recipeClient/recipeRoutes';
import { SearchParameters } from 'ui/pages/SearchResults/SearchParameters';

class RecipeRepository {
  async getAllRecipes(parameters: SearchParameters): Promise<RecipeSummaries> {
    const route = recipeRoutes.getByKeyword(parameters);

    const response = await recipeClient.getAllRecipes(route);

    return mapRecipeSummaries(response.data);
  }

  async getById(id: string): Promise<any> {
    const route = recipeRoutes.getById(id);

    const response = await recipeClient.getById(route);

    return response.data;
  }
}

export const recipeRepository = new RecipeRepository();
