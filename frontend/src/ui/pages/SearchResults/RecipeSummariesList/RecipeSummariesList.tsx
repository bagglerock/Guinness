import { Card } from '@blueprintjs/core';
import { map } from 'lodash';
import React from 'react';
import { useHistory } from 'react-router';
import { RecipeSummary } from 'services/repositories/recipeRepository/models/RecipeSummary';
import './RecipeSummariesList.scss';

export const RecipeSummariesList: React.FC<RecipeSummariesListProps> = ({ recipes }) => {
  const history = useHistory();

  const handleRecipeClick: React.MouseEventHandler<HTMLElement> = event => {
    const recipeId = (event.target as HTMLElement).id;

    history.push(`/recipe/${recipeId}`);
  };

  return (
    <ul className="recipe-summaries ml-n3 mr-n3">
      {map(recipes, recipe => (
        <li className="recipe-summary " key={recipe.id}>
          <Card>
            <img className="recipe-summary_image" src={recipe.image} alt={recipe.title} id={`${recipe.id}`} onClick={handleRecipeClick} />

            <div className="pt-3 mb-3">
              <h3 className="recipe-summary_heading" id={`${recipe.id}`} onClick={handleRecipeClick}>
                {recipe.title}
              </h3>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
};

interface RecipeSummariesListProps {
  recipes: RecipeSummary[];
}
