import { Router } from "express";
import { createPayment } from "../controllers/paymentsController";

const router = Router();

router.post("/", createPayment);

export default router;
