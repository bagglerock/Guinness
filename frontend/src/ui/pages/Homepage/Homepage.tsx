import { Card } from '@blueprintjs/core';
import { map } from 'lodash';
import React from 'react';
import { useHistory } from 'react-router';
import { recipeRepository } from 'services/repositories/recipeRepository/recipeRepository';
import { ErrorView } from 'ui/components/ErrorView/ErrorView';
import { LoadingView } from 'ui/components/LoadingView/LoadingView';
import { useFetch } from 'ui/components/useFetch/useFetch';
import './Homepage.scss';

export const Homepage: React.FC = () => {
  const history = useHistory();
  const { result, error, isLoading } = useFetch(() => recipeRepository.getRandomRecipes(), []);

  if (isLoading) {
    return <LoadingView />;
  }

  if (error != null) {
    return <ErrorView />;
  }

  const handleRecipeClick: React.MouseEventHandler<HTMLElement> = event => {
    const recipeId = (event.target as HTMLElement).id;

    history.push(`/recipe/${recipeId}`);
  };

  return (
    <div className="px-5 pt-3">
      <h3 className="mb-3">A few ideas you may want to look at...</h3>

      <ul className="home-page__summary-list">
        {map(result, summary => {
          return (
            <li className="home-page__summary-list-item" key={summary.id}>
              <Card>
                <img
                  className="home-page__summary-image"
                  src={summary.image}
                  alt={summary.title}
                  id={`${summary.id}`}
                  onClick={handleRecipeClick}
                />

                <div className="pt-3 mb-3">
                  <h3 className="home-page__summary-heading" id={`${summary.id}`} onClick={handleRecipeClick}>
                    {summary.title}
                  </h3>

                  <p>{summary.summary}</p>
                </div>
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
