import { Request, Response } from "express";
import * as paymentsService from "../services/paymentsService";
import { CreatePaymentInput } from "../types/payment";
import { ERROR_CODES } from "../constants/errorCodes";

/**
 * 支払いを作成する
 * @param req - リクエスト
 * @param res - レスポンス
 * @param next - 次のミドルウェア
 * @returns 支払いを作成する
 */
export class PaymentController {
  static async createCheckoutSession(req: Request, res: Response) {
    try {
      const { userId, productId } = req.body as CreatePaymentInput;

      const payment = await paymentsService.PaymentService.createCheckoutSession({
        userId,
        productId,
      });

      res.status(201).json({
        data: payment,
      });
    } catch (error) {
      if (error instanceof Error && error.message === "USER_NOT_FOUND") {
        res.status(404).json({
          error:  ERROR_CODES.USER_NOT_FOUND,
        });
        return;
      }

      if (error instanceof Error && error.message === "PRODUCT_NOT_FOUND") {
        res.status(404).json({
          error: ERROR_CODES.PRODUCT_NOT_FOUND,
        });
        return;
      }

      throw error;
    }
  }
}
