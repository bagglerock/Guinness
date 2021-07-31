export class Filters {
  filters: {
    [key: string]: string[];
  } = {};

  constructor(data: Partial<Filters>) {
    Object.assign(this, data);
  }
}
