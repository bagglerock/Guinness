import { map } from 'lodash';
import { RecipeSummaries } from 'services/repositories/recipeRepository/models/RecipeSummaries';
import { RecipeSummary } from 'services/repositories/recipeRepository/models/RecipeSummary';

export const mapRecipeSummaries = (data: any): RecipeSummaries => {
  const recipes = map(data.results, result => {
    return new RecipeSummary({
      id: result.id,
      title: result.title,
      image: result.image,
      imageType: result.imageType,
    });
  });

  return new RecipeSummaries({
    count: data.number,
    offset: data.offset,
    recipes,
  });
};
