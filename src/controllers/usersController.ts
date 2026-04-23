import { Request, Response, NextFunction } from 'express';
import * as usersService from '../services/usersService';
import { CreateUserInput, UpdateUserInput } from '../types/user';

/**
 * ユーザー一覧を取得する
 * @param req リクエスト
 * @param res レスポンス
 * @param next 次のミドルウェア
 * @returns ユーザー一覧
 */
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const users = await usersService.getAllUsers();
    res.status(200).json({
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * ユーザーを取得する
 * @param req リクエスト
 * @param res レスポンス
 * @param next 次のミドルウェア
 * @returns ユーザー
 */
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      res.status(400).json({ message: 'id は数値で指定してください' });
      return;
    }

    const user = await usersService.getUserById(id);

    if (!user) {
      res.status(404).json({ message: 'ユーザーが見つかりません' });
      return;
    }

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * ユーザーを作成する
 * @param req リクエスト
 * @param res レスポンス
 * @param next 次のミドルウェア
 * @returns ユーザー
 */
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name, email, age } = req.body as CreateUserInput;

    if (!name || !email) {
      res.status(400).json({ message: 'name と email は必須です' });
      return;
    }

    const newUser = await usersService.createUser({ name, email, age });
    res.status(201).json({
      data: newUser,
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'EMAIL_ALREADY_EXISTS') {
      res.status(400).json({ message: 'その email は既に使用されています' });
      return;
    }
    next(error);
  }
};

/**
 * ユーザーを更新する
 * @param req リクエスト
 * @param res レスポンス
 * @param next 次のミドルウェア
 * @returns ユーザー
 */
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      res.status(400).json({ message: 'id は数値で指定してください' });
      return;
    }

    const { name, email, age } = req.body as UpdateUserInput;

    const updatedUser = await usersService.updateUser(id, { name, email, age });

    if (!updatedUser) {
      res.status(404).json({ message: 'ユーザーが見つかりません' });
      return;
    }

    res.status(200).json({
      data: updatedUser,
    });
  } catch (error) {
    if (error instanceof Error && error.message === 'EMAIL_ALREADY_EXISTS') {
      res.status(400).json({ message: 'その email は既に使用されています' });
      return;
    }
    next(error);
  }
};

/**
 * ユーザーを削除する
 * @param req リクエスト
 * @param res レスポンス
 * @param next 次のミドルウェア
 * @returns ユーザー
 */
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      res.status(400).json({ message: 'id は数値で指定してください' });
      return;
    }

    const deletedUser = await usersService.deleteUser(id);

    if (!deletedUser) {
      res.status(404).json({ message: 'ユーザーが見つかりません' });
      return;
    }

    res.status(200).json({
      data: deletedUser,
      message: 'ユーザーを削除しました',
    });
  } catch (error) {
    next(error);
  }
};
