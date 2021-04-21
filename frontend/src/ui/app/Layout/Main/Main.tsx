import { createBrowserHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';
import { Footer } from 'ui/app/Layout/Footer/Footer';
import { MainContent } from 'ui/app/Layout/Main/MainContent';
import { RecipeSearch } from 'ui/app/Layout/Main/RecipeSearch';

export const Main: React.FC = () => {
  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <RecipeSearch />

      <MainContent />
    </Router>
  );
};
