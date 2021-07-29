export class FiltersModel {
  filters: {
    [key: string]: string[];
  } = {};

  constructor(data: Partial<FiltersModel>) {
    Object.assign(this, data);
  }
}
