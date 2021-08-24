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
    <div className="px-5 pt-3">
      <h2 className="mb-4">{result.title}</h2>

      <div className="d-flex mb-4">
        <div className="w-50">
          <div className="mb-3">
            <p className="mb-3">Preparation Time(Minutes): {result.minutes}</p>
            <p className="mb-3">Servings: {result.servings}</p>
            <p className="mb-3">Weight Watcher Smart Points: {result.weightWatcherSmartPoints}</p>
          </div>

          <div>
            <h3 className="mb-3" style={{ fontSize: '1.4em' }}>
              Ingredients:
            </h3>
            <ul>
              {map(result.ingredients, ingredient => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-50">
          <img src={result.image} alt={result.title} width="100%" />
        </div>
      </div>

      <div className="mb-4">
        <p>{result.summary}</p>
      </div>

      <div className="mb-4">
        <h3 className="mb-3" style={{ fontSize: '1.4em' }}>
          Instructions:
        </h3>

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
      </div>

      <div className="mb-4">
        <p>
          Source URL:{' '}
          <a href={result.sourceUrl} target="blank" rel="noopener noreferrer">
            {result.sourceUrl}
          </a>
        </p>
      </div>
    </div>
  );
};
