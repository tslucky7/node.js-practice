import * as productsService from '../services/productsService';
import { Request, Response, NextFunction } from 'express';

/**
 * 商品一覧を取得する
 * @param req リクエスト
 * @param res レスポンス
 * @param next 次のミドルウェア
 * @returns 商品一覧
 */
export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const products = await productsService.getAllProducts();
    res.status(200).json({
      data: { products },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 商品を取得する
 * @param req リクエスト
 * @param res レスポンス
 * @param next 次のミドルウェア
 * @returns 商品
 */
export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await productsService.getProductById(Number(id));
    res.status(200).json({
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 商品を作成する
 * @param req リクエスト
 * @param res レスポンス
 * @param next 次のミドルウェア
 * @returns 商品
 */
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name, price } = req.body;

    if (!name || price == null) {
      res.status(400).json({
        message: 'name と price は必須です',
      });
      return;
    }

    const newProduct = await productsService.createProduct({ name, price });

    res.status(201).json({
      data: newProduct,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 商品を更新する
 * @param req リクエスト
 * @param res レスポンス
 * @param next 次のミドルウェア
 * @returns 商品
 */
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    const product = await productsService.updateProduct(Number(id), {
      name,
      price,
    });
    res.status(200).json({
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 商品を削除する
 * @param req リクエスト
 * @param res レスポンス
 * @param next 次のミドルウェア
 * @returns 商品
 */
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const product = await productsService.deleteProduct(Number(id));
    res.status(200).json({
      data: product,
      message: '商品を削除しました',
    });
  } catch (error) {
    next(error);
  }
};
