import { sanitize } from 'dompurify';
import { map } from 'lodash';
import ReactHtmlParser from 'react-html-parser';
import { Recipe } from 'services/repositories/recipeRepository/models/Recipe';

export const mapRecipe = (data: any): Recipe => {
  const cleanedSummary = sanitize(data.summary, { USE_PROFILES: { html: true } });
  const summaryJsx = ReactHtmlParser(cleanedSummary);

  const ingredients = map(data.extendedIngredients, ingredient => ingredient.original);
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
    summary: summaryJsx,
    analyzedInstructions: analyzedInstructions || {},
    image: data.image || '',
    sourceUrl: data.sourceUrl || '',
    weightWatcherSmartPoints: data.weightWatcherSmartPoints || 0,
  });
};
