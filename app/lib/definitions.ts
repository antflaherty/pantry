export type User = {
  _id: string;
  email: string;
  password: string;
  pantry: IngredientStock[];
};

export type IngredientStock = {
  name: string;
  quantity: number;
  units: string;
};
