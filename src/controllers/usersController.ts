import { Request, Response, NextFunction } from "express";
import * as usersService from "../services/usersService";

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await usersService.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
  } catch (error) {
    next(error);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, age } = req.body as {
      name?: string;
      email?: string;
      age?: number;
    };

    if (!name || !email) {
      res.status(400).json({ message: "name と email は必須です" });
      return;
    }

    const newUser = await usersService.createUser({ name, email, age });
    res.status(201).json(newUser);
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_ALREADY_EXISTS") {
      res.status(400).json({ message: "その email は既に使用されています" });
      return;
    }
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      res.status(400).json({ message: "id は数値で指定してください" });
      return;
    }

    const { name, email, age } = req.body as {
      name?: string;
      email?: string;
      age?: number | null;
    };

    const updatedUser = await usersService.updateUser(id, { name, email, age });

    if (!updatedUser) {
      res.status(404).json({ message: "ユーザーが見つかりません" });
      return;
    }

    res.json(updatedUser);
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_ALREADY_EXISTS") {
      res.status(400).json({ message: "その email は既に使用されています" });
      return;
    }
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
  } catch (error) {
    next(error);
  }
};
