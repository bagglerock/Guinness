import React from 'react';
import { useLocation } from 'react-router';
import { recipeRepository } from 'services/repositories/recipeRepository/recipeRepository';
import { GenericErrorView } from 'ui/components/genericViews/GenericErrorView';
import { GenericLoadingView } from 'ui/components/genericViews/GenericLoadingView';
import { useFetch } from 'ui/components/useFetch/useFetch';

export const Recipe: React.FC = () => {
  const location = useLocation();
  const recipeId = location.pathname.split('/')[2];

  const { result, error, isLoading } = useFetch(() => recipeRepository.getById(recipeId), [recipeId]);

  if (isLoading) {
    return <GenericLoadingView />;
  }

  if (error != null) {
    return <GenericErrorView />;
  }

  return (
    <>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </>
  );
};
