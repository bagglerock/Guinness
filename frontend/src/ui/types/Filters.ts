export class Filters {
  [key: string]: string[];

  constructor(data: Partial<Filters>) {
    Object.assign(this, data);
  }
}
