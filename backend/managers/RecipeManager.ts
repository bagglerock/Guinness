import { stringify } from 'query-string';
import { spoonacularClient } from '../services/spoonacularClient';
import { SearchParameters } from './SearchParameters';

class RecipeManager {
  searchRecipes = (parameters: SearchParameters) => {
    const queryParams = {
      query: parameters.query,
      offset: ((parameters.pageNumber - 1) * parameters.numExpected).toString(),
      number: parameters.numExpected.toString(),
      cuisine: parameters.cuisines,
      diet: parameters.diets,
      type: parameters.mealTypes,
      intolerances: parameters.intolerances,
      instructionsRequired: true,
    };

    const queryString = stringify(queryParams, { skipNull: true });

    return spoonacularClient.getRecipes(queryString);
  };
}

export const recipeManager = new RecipeManager();
