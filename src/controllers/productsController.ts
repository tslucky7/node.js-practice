import * as productsService from '../services/productsService';
import { Request, Response, NextFunction } from 'express';

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const products = await productsService.getAllProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void>  => {
  try {
    const { name, price } = req.body;

    if (!name || price == null) {
      res.status(400).json({
        message: 'name と price は必須です',
      });
      return;
    }

    const newProduct = await productsService.createProduct({ name, price });

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};
