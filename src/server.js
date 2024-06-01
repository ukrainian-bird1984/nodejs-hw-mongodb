import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';
import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js';

const PORT = Number(env('PORT', '3000'));
export const setupServer = () => {
  const app = express();
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(contactsRouter);

  app.use(notFoundMiddleware);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
  });

  return app;
};
