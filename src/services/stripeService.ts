import Stripe from 'stripe';
import { env } from '../config/env';

const stripe = new Stripe(env.stripeSecretKey!);

type CreateCheckoutSessionInput = {
  productName: string;
  amount: number;
  quantity: number;
};

/**
 * Stripeサービス
 * - StripeのAPIを使用して支払いセッションを作成
 * - 外部APIとの連携を担当させ、ドメイン側と分離させている
 */
export class StripeService {
  static async createCheckoutSession(
    input: CreateCheckoutSessionInput,
  ): Promise<{ sessionId: string; url: string | null }> {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'jpy',
            product_data: {
              name: input.productName,
            },
            unit_amount: input.amount,
          },
          quantity: input.quantity,
        },
      ],
      success_url: `${env.clientUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.clientUrl}/payment/cancel`,
    });

    return {
      sessionId: session.id,
      url: session.url,
    };
  }
}
