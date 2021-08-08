export class SearchParameters {
  query: string = '';
  pageNumber: number = 1;
  numExpected: number = 10;
  cuisines: string | null = '';
  diets: string | null = '';
  mealTypes: string | null = '';
  intolerances: string | null = '';

  constructor(data: Partial<SearchParameters>) {
    Object.assign(this, data);
  }
}
