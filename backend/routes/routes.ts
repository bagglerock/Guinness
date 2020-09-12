import { Router } from 'express';
import { recipeController } from '../controllers/recipes';

export const router = Router();

router.get('/api/recipe/', recipeController.getByKeyword);
