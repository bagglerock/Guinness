import React from 'react';
import { Route, Router, Switch, useHistory } from 'react-router';
import { Homepage } from 'ui/pages/Homepage/Homepage';
import { Recipe } from 'ui/pages/Recipe/Recipe';
import { SearchResults } from 'ui/pages/SearchResults/SearchResults';

export const RoutesContainer: React.FC = () => {
  const history = useHistory();

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/search/" component={SearchResults} />
        <Route exact path="/recipe/:id" component={Recipe} />
      </Switch>
    </Router>
  );
};
