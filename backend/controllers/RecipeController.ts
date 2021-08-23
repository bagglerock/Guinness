import { AxiosError } from 'axios';
import { Request, Response } from 'express';
import { recipeManager } from '../managers/RecipeManager';
import { SearchParameters } from '../managers/SearchParameters';
import { spoonacularClient } from '../services/spoonacularClient';

class RecipeController {
  getRecipesByKeyword = async (req: Request, res: Response) => {
    const request = req.query;

    const parameters: SearchParameters = {
      query: request.query?.toString() || '',
      pageNumber: +request.pageNumber! || 1,
      numExpected: 20,
      cuisines: request.cuisines?.toString() || null,
      diets: request.diets?.toString() || null,
      mealTypes: request.mealTypes?.toString() || null,
      intolerances: request.intolerances?.toString() || null,
    };

    try {
      const response = await recipeManager.searchRecipes(parameters);

      res.status(200).send(response);
    } catch (e) {
      this.handleError(e, res);
    }
  };

  getRecipeById = async (req: Request, res: Response) => {
    let id = '';

    if (req.params && req.params.id && typeof req.params.id === 'string' && isNaN(+req.params.id) === false) {
      id = req.params.id;
    }

    if (id === '') {
      res.status(400).send('Invalid ID');

      return;
    }

    try {
      const response = await spoonacularClient.getRecipeInformation(id);

      res.status(200).send(response);
    } catch (e) {
      this.handleError(e, res);
    }
  };

  getRandomRecipes = async (_: Request, res: Response) => {
    try {
      const response = await spoonacularClient.getRandomRecipes();

      res.status(200).send(response);
    } catch (e) {
      this.handleError(e, res);
    }
  };

  handleError = (e: AxiosError, res: Response) => {
    if (e.response != null) {
      res.status(e.response.status).send(e.response.data);

      return;
    }

    res.status(400).send(e);
  };
}

export const recipeController = new RecipeController();
