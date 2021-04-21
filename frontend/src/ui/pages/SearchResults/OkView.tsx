import { Card } from '@blueprintjs/core';
import { map } from 'lodash';
import React from 'react';
import { RecipeSummaries } from 'services/repositories/recipeRepository/models/RecipeSummaries';

export const OkView: React.FC<RecipeSummaries> = props => {
  return (
    <div>
      <h2>Search Results: </h2>
      <ul>
        {map(props.recipes, recipe => {
          return (
            <li key={recipe.id}>
              <Card>
                <div>
                  <h3>{recipe.title}</h3>
                </div>

                <div>
                  <img src={recipe.image} alt={recipe.title} />
                </div>
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
