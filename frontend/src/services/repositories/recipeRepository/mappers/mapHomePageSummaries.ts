import { map } from 'lodash';
import { sanitize } from 'dompurify';
import ReactHtmlParser from 'react-html-parser';

export const mapHomePageSummaries = (data: any): HomePageSummary[] => {
  return map(data.recipes, recipe => {
    const cleanedSummary = sanitize(recipe.summary, { USE_PROFILES: { html: true } });
    const summaryJsx = ReactHtmlParser(cleanedSummary);

    return {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      summary: summaryJsx,
    };
  });
};

export type HomePageSummary = {
  id: number;
  title: string;
  image: string;
  summary: React.ReactElement<any, string | React.JSXElementConstructor<any>>[];
};
