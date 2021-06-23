import buildUrl, { BuildUrlOptions } from 'build-url';
import { spoonacularClient } from '../services/spoonacularClient';
import { SearchParameters } from './SearchParameters';

class RecipeManager {
  searchRecipes = (parameters: SearchParameters) => {
    const queryParams = {
      query: parameters.query,
      offset: ((parameters.pageNumber - 1) * parameters.numExpected).toString(),
      number: parameters.numExpected.toString(),
    };

    const url = buildUrl('', { queryParams } as BuildUrlOptions);

    return spoonacularClient.getRecipes(url);
  };
}

export const recipeManager = new RecipeManager();
