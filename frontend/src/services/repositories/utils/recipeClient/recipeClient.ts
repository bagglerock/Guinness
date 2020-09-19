import axios from 'axios';

class RecipeClient {
  async getByKeyword(url: string): Promise<any> {
    return axios.get(url);
  }
}

export const recipeClient = new RecipeClient();
