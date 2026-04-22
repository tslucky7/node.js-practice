import { User, CreateUserInput, UpdateUserInput } from '../types/user';

const users: User[] = [
  { id: 1, name: 'Taro', email: 'taro@example.com', age: 20 },
  { id: 2, name: 'Hanako', email: 'hanako@example.com', age: 25 },
];

export const getAllUsers = async (): Promise<User[]> => {
  return users;
};

export const getUserById = async (id: number): Promise<User | null> => {
  return users.find((user) => user.id === id) ?? null;
};

export const createUser = async (input: CreateUserInput): Promise<User> => {
  const existingUser = users.find((user) => user.email === input.email);

  if (existingUser) {
    throw new Error('EMAIL_ALREADY_EXISTS');
  }

  const newUser: User = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    name: input.name,
    email: input.email,
    age: input.age ?? null,
  };

  users.push(newUser);
  return newUser;
};

export const updateUser = async (
  id: number,
  input: UpdateUserInput,
): Promise<User | null> => {
  const targetUser = users.find((user) => user.id === id);

  if (!targetUser) {
    return null;
  }

  if (input.email && input.email !== targetUser.email) {
    const existingUser = users.find((user) => user.email === input.email);
    if (existingUser) {
      throw new Error('EMAIL_ALREADY_EXISTS');
    }
  }

  if (input.name !== undefined) targetUser.name = input.name;
  if (input.email !== undefined) targetUser.email = input.email;
  if (input.age !== undefined) targetUser.age = input.age;

  return targetUser;
};

export const deleteUser = async (id: number): Promise<User | null> => {
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return null;
  }

  const deletedUsers = users.splice(index, 1);
  return deletedUsers[0] ?? null;
};
