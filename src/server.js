import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import contactsRouter from './routers/contacts.js';
import createHttpError from 'http-errors';

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

  app.use((err, req, res, next) => {
    res.status(500).json({
      status: 500,
      message: 'Something went wrong',
      data: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
  });

  return app;
};
