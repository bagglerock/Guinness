import { Router } from 'express';
import { recipeController } from '../controllers/RecipeController';

export const router = Router();

router.get('/api/recipe/', recipeController.getRecipesByKeyword);
router.get('/api/recipe/:id', recipeController.getRecipeById);
