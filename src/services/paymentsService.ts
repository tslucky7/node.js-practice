import * as usersService from './usersService';
import * as productsService from './productsService';
import * as stripeService from './stripeService';

type CreateCheckoutSessionInput = {
  userId: number;
  productId: number;
};

/**
 * 支払いサービス
 * - ユーザーと商品が存在することを確認
 * - ここで外部APIを直接扱わないようにする
 */
export class PaymentService {
  static async createCheckoutSession(
    input: CreateCheckoutSessionInput,
  ): Promise<{ sessionId: string; url: string | null }> {
    const user = await usersService.getUserById(input.userId);
    if (!user) {
      throw new Error('USER_NOT_FOUND');
    }

    const product = await productsService.getProductById(input.productId);
    if (!product) {
      throw new Error('PRODUCT_NOT_FOUND');
    }

    // 商品情報をStripe用データに変換
    const stripeInput = {
      productName: product.name,
      amount: product.price,
      quantity: 1,
    };

    // Checkout Sessionを作成
    return await stripeService.StripeService.createCheckoutSession(stripeInput);
  }
}
