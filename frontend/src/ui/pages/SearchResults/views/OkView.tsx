import React from 'react';
import { RecipeSummaries } from 'services/repositories/recipeRepository/models/RecipeSummaries';
import { RecipeSummariesList } from 'ui/pages/SearchResults/views/RecipeSummariesList';

export const OkView: React.FC<RecipeSummaries> = props => {
  return (
    <>
      <div className="mb-3">
        <h2 className="page-heading">Search Results: </h2>
      </div>

      <RecipeSummariesList recipes={props.recipes} />
    </>
  );
};
