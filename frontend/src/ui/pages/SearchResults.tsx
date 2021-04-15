import q from 'query-string';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import { recipeRepository } from 'services/repositories/recipeRepository/recipeRepository';

export const SearchResults: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.search == '') {
      return;
    }

    const parsedUrl = q.parse(location.search);

    if (parsedUrl.query == null) {
      return;
    }

    const query = parsedUrl.query.toString() || '';

    recipeRepository
      .getByKeyword(query)
      .then(response => {
        console.log(response);
      })
      .catch(e => console.log(e));
  }, [location.search]);

  return <div>Search Results</div>;
};
