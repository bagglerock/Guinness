import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import q from 'query-string';

export const useQuery = () => {
  const [query, setQuery] = useState('');

  const location = useLocation();

  useEffect(() => {
    if (!location.search) {
      return;
    }

    const parsedUrl = q.parse(location.search);

    if (!parsedUrl.query) {
      return;
    }

    const term = parsedUrl.query.toString() || '';

    setQuery(term);
  }, [location.search]);

  return {
    query,
  };
};
