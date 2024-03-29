import axios from 'axios';

class RecipeClient {
  async getAllRecipes(url: string): Promise<any> {
    return axios.get(url);
  }

  async getById(url: string): Promise<any> {
    return axios.get(url);
  }

  async getRandomRecipes(url: string): Promise<any> {
    return axios.get(url);
  }
}

export const recipeClient = new RecipeClient();
