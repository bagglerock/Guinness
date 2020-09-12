import { AxiosError } from 'axios';
import { Request, Response } from 'express';
import { spoonacularClient } from '../services/spoonacularClient';

class RecipeController {
  getByKeyword = async (_: Request, res: Response) => {
    try {
      const response = await spoonacularClient.getRecipes();

      res.status(200).send(response);
    } catch (e) {
      this.handleError(e);
    }

    res.send('getByKeyword has been hit');
  };

  handleError = (e: AxiosError) => {
    return e;
  };
}

export const recipeController = new RecipeController();
