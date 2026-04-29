// controllers/webhookController.ts
import { Request, Response } from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export class WebhookController {
  static handle(req: Request, res: Response) {
    const sig = req.headers['stripe-signature'] as string;

    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!,
      );

      // ★ここからが本体
      switch (event.type) {
        case 'checkout.session.completed':
          console.log('決済成功！');
          break;

        default:
          console.log('Unhandled event:', event.type);
      }

      res.json({ received: true });
    } catch (err) {
      return res.status(400).send('Webhook Error');
    }
  }
}
