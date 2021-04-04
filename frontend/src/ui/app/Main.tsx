import React from 'react';
import { Route, Router, Switch, useHistory } from 'react-router';
import { SearchResults } from 'ui/pages/SearchResults';

export const RoutesContainer: React.FC = () => {
  const history = useHistory();

  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={() => null} />
        <Route exact path="/search/" component={SearchResults} />
      </Switch>
    </Router>
  );
};
