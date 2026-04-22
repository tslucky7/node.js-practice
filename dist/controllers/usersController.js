"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const usersService = __importStar(require("../services/usersService"));
const getUsers = async (req, res, next) => {
    try {
        const users = await usersService.getAllUsers();
        res.json(users);
    }
    catch (error) {
        next(error);
    }
};
exports.getUsers = getUsers;
const getUserById = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) {
            res.status(400).json({ message: "id は数値で指定してください" });
            return;
        }
        const user = await usersService.getUserById(id);
        if (!user) {
            res.status(404).json({ message: "ユーザーが見つかりません" });
            return;
        }
        res.json(user);
    }
    catch (error) {
        next(error);
    }
};
exports.getUserById = getUserById;
const createUser = async (req, res, next) => {
    try {
        const { name, email, age } = req.body;
        if (!name || !email) {
            res.status(400).json({ message: "name と email は必須です" });
            return;
        }
        const newUser = await usersService.createUser({ name, email, age });
        res.status(201).json(newUser);
    }
    catch (error) {
        if (error instanceof Error && error.message === "EMAIL_ALREADY_EXISTS") {
            res.status(400).json({ message: "その email は既に使用されています" });
            return;
        }
        next(error);
    }
};
exports.createUser = createUser;
const updateUser = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) {
            res.status(400).json({ message: "id は数値で指定してください" });
            return;
        }
        const { name, email, age } = req.body;
        const updatedUser = await usersService.updateUser(id, { name, email, age });
        if (!updatedUser) {
            res.status(404).json({ message: "ユーザーが見つかりません" });
            return;
        }
        res.json(updatedUser);
    }
    catch (error) {
        if (error instanceof Error && error.message === "EMAIL_ALREADY_EXISTS") {
            res.status(400).json({ message: "その email は既に使用されています" });
            return;
        }
        next(error);
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (Number.isNaN(id)) {
            res.status(400).json({ message: "id は数値で指定してください" });
            return;
        }
        const deletedUser = await usersService.deleteUser(id);
        if (!deletedUser) {
            res.status(404).json({ message: "ユーザーが見つかりません" });
            return;
        }
        res.json({
            message: "ユーザーを削除しました",
            user: deletedUser
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUser = deleteUser;
