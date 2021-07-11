import React from 'react';
import { Footer } from 'ui/app/Layout/Footer/Footer';
import { Header } from 'ui/app/Layout/Header/Header';
import { Search } from 'ui/app/Layout/Search/Search';
import { RoutesContainer } from 'ui/app/Routes/RoutesContainer';

export const Layout: React.FC = () => (
  <div className="d-flex flex-column h-100">
    <Header />

    <div className="main">
      <Search />

      <div className="mt-3 mr-3 ml-3">
        <RoutesContainer />
      </div>
    </div>

    <Footer />
  </div>
);
