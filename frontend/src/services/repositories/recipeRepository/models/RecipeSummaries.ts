import { RecipeSummary } from 'services/repositories/recipeRepository/models/RecipeSummary';

export class RecipeSummaries {
  count: number;
  offset: number;
  recipes: RecipeSummary[] = [];

  constructor(data: Partial<RecipeSummaries>) {
    Object.assign(this, data);
  }
}
