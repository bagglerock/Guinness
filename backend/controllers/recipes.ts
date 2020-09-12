import { AxiosError } from 'axios';
import { Request, Response } from 'express';
import { spoonacularClient } from '../services/spoonacularClient';

class RecipeController {
  getByKeyword = async (req: Request, res: Response) => {
    // not sure if the request should come in as an object or an already made string made of parameters
    // if its an object, the params are hidden to the user in the url and cannot be shared as a link
    // if its a string, then the params must be made in the front end and sent back here and have the key appended
    console.log(req);

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
