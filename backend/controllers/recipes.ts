import { AxiosError } from 'axios';
import buildUrl, { BuildUrlOptions } from 'build-url';
import { Request, Response } from 'express';
import { pick } from 'lodash';
import { spoonacularClient } from '../services/spoonacularClient';

class RecipeController {
  getRecipesByKeyword = async (req: Request, res: Response) => {
    const queryParams = req.query;
    const validatedQuery = pick(queryParams, validationDictionary);

    const queryString = buildUrl('', { queryParams: validatedQuery } as BuildUrlOptions);

    try {
      const response = await spoonacularClient.searchRecipes(queryString);

      res.status(200).send(response);
    } catch (e) {
      this.handleError(e, res);
    }
  };

  getRecipeById = async (req: Request, res: Response) => {
    let id = '';

    if (req.params && req.params.id && typeof req.params.id === 'string') {
      id = req.params.id;
    }

    try {
      const response = await spoonacularClient.getRecipeInformation(id);

      res.status(200).send(response);
    } catch (e) {
      this.handleError(e, res);
    }
  };

  handleError = (e: AxiosError, res: Response) => {
    res.status(400).send(e.message);
  };
}

export const recipeController = new RecipeController();

const validationDictionary: string[] = ['query', 'cuisine', 'intolerances', 'includeIngredients'];
