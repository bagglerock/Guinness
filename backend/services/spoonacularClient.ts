import { AxiosInstance, default as axios } from 'axios';
import dotenv from 'dotenv';

const env = dotenv.config();

const SPOONACULAR_URL = 'https://api.spoonacular.com/';
const SPOONACULAR_API_KEY = env.parsed?.SPOONACULAR_API_KEY || '';

class SpoonacularClient {
  httpClient: AxiosInstance;

  constructor() {
    this.httpClient = axios.create({
      baseURL: SPOONACULAR_URL,
    });
  }

  getRecipes = async (query: string) => {
    const response = await this.httpClient.get(`/recipes/complexSearch${query}&apiKey=${SPOONACULAR_API_KEY}`);

    return response.data;
  };

  getRecipeInformation = async (id: string) => {
    const response = await this.httpClient.get(`/recipes/${id}/information?apiKey=${SPOONACULAR_API_KEY}`);

    return response.data;
  };
}

export const spoonacularClient = new SpoonacularClient();
