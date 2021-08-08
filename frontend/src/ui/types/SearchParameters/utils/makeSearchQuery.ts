import { mapValues } from 'lodash';
import { stringify } from 'query-string';
import { SearchParameters } from 'ui/types/SearchParameters/SearchParameters';

export const makeSearchQuery = (parameters: SearchParameters) => {
  const filters = mapValues(parameters.filters, filter => filter);

  const params = {
    query: parameters.query,
    pageNumber: parameters.pageNumber,
    ...filters,
  };

  return stringify(params, { arrayFormat: 'comma', skipNull: true });
};
