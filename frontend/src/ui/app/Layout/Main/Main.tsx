import React from 'react';
import { MainContent } from 'ui/app/Layout/Main/MainContent';
import { RecipeSearch } from 'ui/app/Layout/Main/RecipeSearch';

export const Main: React.FC = () => (
  <>
    <RecipeSearch />

    <MainContent />
  </>
);
