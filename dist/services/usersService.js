"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const users = [
    { id: 1, name: 'Taro', email: 'taro@example.com', age: 20 },
    { id: 2, name: 'Hanako', email: 'hanako@example.com', age: 25 },
];
const getAllUsers = async () => {
    return users;
};
exports.getAllUsers = getAllUsers;
const getUserById = async (id) => {
    return users.find((user) => user.id === id) ?? null;
};
exports.getUserById = getUserById;
const createUser = async (input) => {
    const existingUser = users.find((user) => user.email === input.email);
    if (existingUser) {
        throw new Error('EMAIL_ALREADY_EXISTS');
    }
    const newUser = {
        id: users.length ? users[users.length - 1].id + 1 : 1,
        name: input.name,
        email: input.email,
        age: input.age ?? null,
    };
    users.push(newUser);
    return newUser;
};
exports.createUser = createUser;
const updateUser = async (id, input) => {
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
    if (input.name !== undefined)
        targetUser.name = input.name;
    if (input.email !== undefined)
        targetUser.email = input.email;
    if (input.age !== undefined)
        targetUser.age = input.age;
    return targetUser;
};
exports.updateUser = updateUser;
const deleteUser = async (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
        return null;
    }
    const deletedUsers = users.splice(index, 1);
    return deletedUsers[0] ?? null;
};
exports.deleteUser = deleteUser;
