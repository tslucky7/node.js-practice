import express, { Request, Response, NextFunction } from 'express';

import usersRouter from './routes/users';
import productsRouter from './routes/products';
import paymentsRouter from './routes/payments';
import webhooksRouter from './routes/webhooksRoutes';

const app = express();

app.use((req, res, next) => {
  if (req.originalUrl === '/webhooks') {
    next(); // webhookだけスキップ
  } else {
    express.json()(req, res, next);
  }
});

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello World' });
});
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/payments', paymentsRouter);
app.use('/webhooks', webhooksRouter);
app.use(
  (err: unknown, req: Request, res: Response, next: NextFunction): void => {
    console.error(err);

    res.status(500).json({
      message: 'サーバーエラーが発生しました',
    });
  },
);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
