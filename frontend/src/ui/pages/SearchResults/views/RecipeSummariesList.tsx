import { Card } from '@blueprintjs/core';
import { map } from 'lodash';
import React from 'react';
import { RecipeSummary } from 'services/repositories/recipeRepository/models/RecipeSummary';
import './RecipeSummariesList.scss';

export const RecipeSummariesList: React.FC<RecipeSummariesListProps> = ({ recipes }) => (
  <ul className="recipe-summaries ml-n3 mr-n3">
    {map(recipes, recipe => {
      return (
        <li className="recipe-summary " key={recipe.id}>
          <Card>
            <img className="recipe-summary_image" src={recipe.image} alt={recipe.title} />

            <div className="pt-3 mb-3">
              <h3 className="recipe-summary_heading">{recipe.title}</h3>
            </div>
          </Card>
        </li>
      );
    })}
  </ul>
);

interface RecipeSummariesListProps {
  recipes: RecipeSummary[];
}
