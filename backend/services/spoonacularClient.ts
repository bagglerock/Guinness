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

  getRecipes = async () => {
    // map query model to params
    // const params = '';

    // const response = await this.httpClient.get(`/recipes/complexSearch?${params}`);
    console.log('sdfsd');

    try {
      const response = await this.httpClient.get(`/recipes/complexSearch?query=pasta&apiKey=${SPOONACULAR_API_KEY}`);

      console.log(response);

      return response;
    } catch (e) {
      console.log(e);

      return e;
    }
  };
}

export const spoonacularClient = new SpoonacularClient();
