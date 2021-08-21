import { parse } from 'query-string';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { SearchParameters } from 'ui/types/SearchParameters/SearchParameters';
import { makeSearchQuery } from 'ui/types/SearchParameters/utils/makeSearchQuery';

export const useSearch = () => {
  const [parameters, setParameters] = useState(new SearchParameters({}));
  const history = useHistory();
  const location = useLocation();
  const { query: currentQuery } = parse(location.search);

  useEffect(() => {
    if (currentQuery == null) {
      setParameters(new SearchParameters({}));

      return;
    }

    setParameters({ ...parameters, query: currentQuery?.toString() || '' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuery]);

  const handleSearch = async () => {
    if (parameters.query === '') {
      return;
    }

    let filters = parameters.filters;
    if (currentQuery !== parameters.query) {
      setParameters({ ...parameters, filters: {} });
    }

    const params = makeSearchQuery({ ...parameters, pageNumber: 1, filters });

    history.push(`/search?${params}`);
  };

  return {
    parameters,
    setParameters,
    handleSearch,
  };
};
