import React from 'react';
import { Footer } from 'ui/app/Layout/Footer';
import { Header } from 'ui/app/Layout/Header/Header';
import { RecipeHeaderSearch } from 'ui/app/Layout/RecipeHeaderSearch';
import { RoutesContainer } from 'ui/app/Main';

export const Layout: React.FC = () => (
  <div className="d-flex flex-column">
    <Header />

    <RecipeHeaderSearch />

    <RoutesContainer />

    <Footer />
  </div>
);
