import { Router } from 'express';
import { recipeController } from '../controllers/RecipeController';

export const router = Router();

router.get('/api/recipes/', recipeController.getRecipesByKeyword);
router.get('/api/recipes/:id/recipe', recipeController.getRecipeById);
router.get('/api/recipes/random', recipeController.getRandomRecipes);
