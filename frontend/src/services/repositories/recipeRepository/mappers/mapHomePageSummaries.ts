import { map } from 'lodash';

export const mapHomePageSummaries = (data: any): HomePageSummary[] => {
  return map(data.recipes, recipe => {
    return {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      summary: recipe.summary,
    };
  });
};

export type HomePageSummary = {
  id: number;
  title: string;
  image: string;
  summary: string;
};
