import { createBrowserHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';
import { Layout } from 'ui/app/Layout/Layout';

export const App: React.FC = () => {
  const history = createBrowserHistory();

  return (
    <div className="h-100">
      <Router history={history}>
        <Layout />
      </Router>
    </div>
  );
};
