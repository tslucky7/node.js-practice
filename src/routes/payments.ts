import { Router } from "express";
import { PaymentController } from "../controllers/paymentsController";

const router = Router();

router.post("/checkout-session", PaymentController.createCheckoutSession);

export default router;
