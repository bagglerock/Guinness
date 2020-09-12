import { Request, Response } from 'express';
import { spoonacularClient } from '../services/spoonacularClient';

class RecipeController {
  getByKeyword = async (_: Request, res: Response) => {
    spoonacularClient.getRecipes();

    res.send('getByKeyword has been hit');
  };
}

export const recipeController = new RecipeController();
