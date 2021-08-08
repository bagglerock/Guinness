import { mapValues, split } from 'lodash';
import { parse } from 'query-string';
import { SearchParameters } from 'ui/types/SearchParameters/SearchParameters';

export const makeSearchParameters = (locationSearch: string) => {
  const { query, pageNumber, ...rest } = parse(locationSearch);

  const filters = mapValues(rest, filter => split(filter?.toString(), ','));

  return new SearchParameters({
    query: query?.toString() || '',
    pageNumber: +pageNumber! || 1,
    filters,
  });
};
