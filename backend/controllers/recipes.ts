import { Request, Response } from 'express';

class RecipeController {
  getByKeyword = async (_: Request, res: Response) => {
    res.send('getByKeyword has been hit');
  };
}

export const recipeController = new RecipeController();
