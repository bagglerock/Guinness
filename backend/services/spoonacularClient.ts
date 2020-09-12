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

    const response = await this.httpClient.get(`/recipes/complexSearch?query=pasta&apiKey=${SPOONACULAR_API_KEY}`);

    // map the response to something useful.... there is data: {results: []}, there is also status: int, statusText: OK
    return response;
  };
}

export const spoonacularClient = new SpoonacularClient();
