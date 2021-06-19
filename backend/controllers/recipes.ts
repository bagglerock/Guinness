import { AxiosError } from 'axios';
import buildUrl, { BuildUrlOptions } from 'build-url';
import { Request, Response } from 'express';
import { pick } from 'lodash';
import { spoonacularClient } from '../services/spoonacularClient';

class RecipeController {
  getRecipesByKeyword = async (req: Request, res: Response) => {
    const queryParams = req.query;
    const validatedQuery = pick(queryParams, validationDictionary);

    const keyword = buildUrl('', { queryParams: validatedQuery } as BuildUrlOptions);

    try {
      const response = await spoonacularClient.getRecipes(keyword);

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

  handleError = (e: AxiosError, res: Response) => {
    if (e.response != null) {
      res.status(e.response.status).send(e.response.data);

      return;
    }

    res.status(400).send(e);
  };
}

export const recipeController = new RecipeController();

const validationDictionary: string[] = ['query', 'cuisine', 'intolerances', 'includeIngredients'];
