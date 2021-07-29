import { map } from 'lodash';
import React from 'react';
import { useLocation } from 'react-router';
import { Recipe as RecipeModel } from 'services/repositories/recipeRepository/models/Recipe';
import { recipeRepository } from 'services/repositories/recipeRepository/recipeRepository';
import { ErrorView } from 'ui/components/ErrorView/ErrorView';
import { LoadingView } from 'ui/components/LoadingView/LoadingView';
import { useFetch } from 'ui/components/useFetch/useFetch';

export const Recipe: React.FC = () => {
  const location = useLocation();
  const recipeId = location.pathname.split('/')[2];

  const { result = new RecipeModel({}), error, isLoading } = useFetch(() => recipeRepository.getById(recipeId), [recipeId]);

  if (isLoading) {
    return <LoadingView />;
  }

  if (error != null) {
    return <ErrorView />;
  }

  return (
    <>
      <h2>{result.title}</h2>

      <img src={result.image} alt={result.title} />

      <p>Weight Watcher Smart Points: {result.weightWatcherSmartPoints}</p>
      <p>Preparation Time(Minutes): {result.minutes}</p>
      <p>Servings: {result.servings}</p>
      <p>{result.summary}</p>

      <h3>Ingredients: </h3>
      <ul>
        {map(result.ingredients, ingredient => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>

      <p>{result.instructions}</p>

      <ul>
        {map(result.analyzedInstructions, stage => (
          <li key={stage.name}>
            <p>{stage.name}</p>
            <ul>
              {map(stage.steps, step => (
                <li key={step.stepNumber}>
                  Step: {step.stepNumber} - {step.stepInstruction}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <p>
        Source URL:{' '}
        <a href={result.sourceUrl} target="blank" rel="noopener noreferrer">
          {result.sourceUrl}
        </a>
      </p>
    </>
  );
};
