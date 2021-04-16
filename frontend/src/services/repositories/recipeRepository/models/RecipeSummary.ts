export class RecipeSummary {
  id: number;
  title: string = '';
  image: string = '';
  imageType: string = '';

  constructor(data: Partial<RecipeSummary>) {
    Object.assign(this, data);
  }
}
