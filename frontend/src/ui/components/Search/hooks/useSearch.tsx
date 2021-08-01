import { mapValues } from 'lodash';
import { stringify } from 'query-string';
import { useHistory } from 'react-router';
import { Filters } from 'ui/types/Filters';

export const useSearch = (searchTerm: string, filters: Filters) => {
  const history = useHistory();

  const handleSearch = async () => {
    if (searchTerm === '') {
      return;
    }

    const params = makeSearchParams(searchTerm, filters);

    history.push(`/search?${params}`);
  };

  return {
    handleSearch,
  };
};

const makeSearchParams = (searchTerm: string, searchFilters: Filters) => {
  const filters = mapValues(searchFilters, filter => filter);

  const params = {
    query: searchTerm,
    pageNumber: 1,
    ...filters,
  };

  return stringify(params, { arrayFormat: 'comma', skipNull: true });
};
