export type User = {
  _id: string;
  email: string;
  password: string;
  pantry: Ingredient[];
};

export type Ingredient = {
  name: string;
  quantity: number;
  units: string;
};
