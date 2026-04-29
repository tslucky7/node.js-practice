// routes/webhookRoutes.ts
import express, { Router } from "express";
import { WebhookController } from "../controllers/webhooksController";

const router = Router();

router.post(
  "/",
  express.raw({ type: "application/json" }),
  WebhookController.handle
);

export default router;
