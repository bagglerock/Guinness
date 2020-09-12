import { Main } from 'app/Main';
import moment from 'moment';
import React from 'react';

export const Layout: React.FC = () => {
  const currentYear = moment().format('YYYY');

  return (
    <div className="app-layout d-flex flex-column">
      <div className="header">
        <a href="/">
          <div className="peachco-logo"></div>
        </a>
      </div>
      <div className="flex-grow-1 w-100 main">
        <Main />
      </div>
      <div className="footer">&copy;Chef's Den {currentYear}</div>
    </div>
  );
};
