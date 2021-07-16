export class Recipe {
  id: number;
  title: string;
  ingredients: string[];
  minutes: number;
  servings: number;
  summary: string | Element;
  instructions: string | Element;
  analyzedInstructions: Stage[];
  image: string;
  sourceUrl: string;
  weightWatcherSmartPoints: number;

  constructor(data: Partial<Recipe>) {
    Object.assign(this, data);
  }
}

type Stage = {
  name: string;
  steps: Instruction[];
};

type Instruction = {
  stepNumber: number;
  stepInstruction: string;
};
