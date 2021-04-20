import { createBrowserHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';
import 'ui/app/app.scss';
import { Layout } from 'ui/app/Layout';

export const App: React.FC = () => {
  const history = createBrowserHistory();

  return (
    <div className="app">
      <Router history={history}>
        <Layout />
      </Router>
    </div>
  );
};
