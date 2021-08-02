import { mapValues } from 'lodash';
import { parse, stringify } from 'query-string';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { SearchParameters } from 'ui/types/SearchParameters';

export const useSearch = () => {
  const [parameters, setParameters] = useState(new SearchParameters({}));

  const location = useLocation();
  const { query: currentQuery } = parse(location.search);

  useEffect(() => {
    setParameters({ ...parameters, query: currentQuery?.toString() || '' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuery]);

  const history = useHistory();

  const handleSearch = async () => {
    if (parameters.query === '') {
      return;
    }

    const params = makeSearchQuery(parameters);

    history.push(`/search?${params}`);
  };

  return {
    parameters,
    setParameters,
    handleSearch,
  };
};

const makeSearchQuery = (parameters: SearchParameters) => {
  const filters = mapValues(parameters.filters, filter => filter);

  const params = {
    query: parameters.query,
    pageNumber: 1,
    ...filters,
  };

  return stringify(params, { arrayFormat: 'comma', skipNull: true });
};
