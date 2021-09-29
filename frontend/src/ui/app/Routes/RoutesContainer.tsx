import React from 'react';
import { Route, Router, Switch, useHistory } from 'react-router';
import { Homepage } from 'ui/pages/Homepage/Homepage';
import { Recipe } from 'ui/pages/Recipe/Recipe';
import { SearchResults } from 'ui/pages/SearchResults/SearchResults';
import { Test } from 'ui/pages/Test/Test';

export const RoutesContainer: React.FC = () => {
  const history = useHistory();

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/search/" component={SearchResults} />
        <Route exact path="/recipe/:id" component={Recipe} />
        <Route exact path="/test" component={Test} />
      </Switch>
    </Router>
  );
};
