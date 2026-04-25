import { Payment, CreatePaymentInput } from "../types/payment";
import * as usersService from "./usersService";
import * as productsService from "./productsService";

const payments: Payment[] = [];

/**
 * 支払いを作成する
 * @param input - 支払いの入力
 * @returns 支払い
 */
export const createPayment = async (
  input: CreatePaymentInput,
): Promise<Payment> => {
  const user = await usersService.getUserById(input.userId);

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  const product = await productsService.getProductById(input.productId);

  if (!product) {
    throw new Error("PRODUCT_NOT_FOUND");
  }

  const payment: Payment = {
    id: payments.length ? payments[payments.length - 1].id + 1 : 1,
    userId: input.userId,
    productId: input.productId,
    amount: product.price,
    status: "completed",
  };

  payments.push(payment);

  return payment;
};
