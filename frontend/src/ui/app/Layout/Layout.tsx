import React from 'react';
import { RoutesContainer } from 'ui/app/Routes/RoutesContainer';
import { Footer } from 'ui/components/Footer/Footer';
import { Header } from 'ui/components/Header/Header';
import { Search } from 'ui/components/Search/Search';

export const Layout: React.FC = () => (
  <div className="d-flex flex-column h-100">
    <Header />

    <div className="main">
      <Search />

      <RoutesContainer />
    </div>

    <Footer />
  </div>
);
