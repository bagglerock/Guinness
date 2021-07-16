import { map } from 'lodash';
import { Recipe } from 'services/repositories/recipeRepository/models/Recipe';

export const mapRecipe = (data: any): Recipe => {
  const ingredients = map(data.extendedIngredients, ingredient => ingredient.name);
  const analyzedInstructions = map(data.analyzedInstructions, stage => {
    const steps = map(stage.steps, step => {
      return {
        stepNumber: step.number,
        stepInstruction: step.step,
      };
    });

    return {
      name: stage.name,
      steps,
    };
  });

  return new Recipe({
    id: data.id || 0,
    title: data.title || '',
    ingredients: ingredients || [],
    minutes: data.readyInMinutes || 0,
    servings: data.servings || 0,
    summary: data.summary || '',
    instructions: data.instructions || '',
    analyzedInstructions: analyzedInstructions || {},
    image: data.image || '',
    sourceUrl: data.sourceUrl || '',
    weightWatcherSmartPoints: data.weightWatcherSmartPoints || 0,
  });
};
