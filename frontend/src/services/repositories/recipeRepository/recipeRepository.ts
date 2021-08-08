import { mapRecipe } from 'services/repositories/recipeRepository/mappers/mapRecipe';
import { mapRecipeSummaries } from 'services/repositories/recipeRepository/mappers/mapRecipeSummaries';
import { Recipe } from 'services/repositories/recipeRepository/models/Recipe';
import { RecipeSummaries } from 'services/repositories/recipeRepository/models/RecipeSummaries';
import { recipeClient } from 'services/utils/recipeClient/recipeClient';
import { recipeRoutes } from 'services/utils/recipeClient/recipeRoutes';
import { SearchParameters } from 'ui/types/SearchParameters/SearchParameters';
import { makeSearchQuery } from 'ui/types/SearchParameters/utils/makeSearchQuery';

class RecipeRepository {
  async getAllRecipes(parameters: SearchParameters): Promise<RecipeSummaries> {
    const queryString = makeSearchQuery(parameters);
    const route = recipeRoutes.getByKeyword(queryString);

    const response = await recipeClient.getAllRecipes(route);

    return mapRecipeSummaries(response.data);
  }

  async getById(id: string): Promise<Recipe> {
    const route = recipeRoutes.getById(id);

    const response = await recipeClient.getById(route);

    return mapRecipe(response.data);
  }
}

export const recipeRepository = new RecipeRepository();
