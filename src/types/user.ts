export type User = {
  id: number;
  name: string;
  email: string;
  age: number | null;
};

export type CreateUserInput = {
  name: string;
  email: string;
  age?: number;
};

export type UpdateUserInput = {
  name?: string;
  email?: string;
  age?: number | null;
};
