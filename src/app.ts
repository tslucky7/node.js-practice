import express, { Request, Response, NextFunction } from "express";

import usersRouter from "./routes/users";
import productsRouter from "./routes/product";
import paymentsRouter from "./routes/payments";

const app = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello World" });
});
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/payments", paymentsRouter);

app.use(
  (err: unknown, req: Request, res: Response, next: NextFunction): void => {
    console.error(err);

    res.status(500).json({
      message: "サーバーエラーが発生しました"
    });
  }
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
