import dotenv from "dotenv";

dotenv.config();

export const env = {
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  clientUrl: process.env.CLIENT_URL ?? "http://localhost:3000",
};

if (!env.stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY is required");
}
