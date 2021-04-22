import React from 'react';
import { Footer } from 'ui/app/Layout/Footer/Footer';
import { Header } from 'ui/app/Layout/Header/Header';
import { Main } from 'ui/app/Layout/Main/Main';

export const Layout: React.FC = () => (
  <div className="d-flex flex-column h-100">
    <Header />

    <div className="main">
      <Main />
    </div>

    <Footer />
  </div>
);
