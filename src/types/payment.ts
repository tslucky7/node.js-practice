export type PaymentStatus = "completed" | "failed";

export type Payment = {
  id: number;
  userId: number;
  productId: number;
  amount: number;
  status: PaymentStatus;
};

export type CreatePaymentInput = {
  userId: number;
  productId: number;
};
