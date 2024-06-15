import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { env } from './utils/env.js';
import router from './routers/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';

app.use(router);

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
  app.use(
    express.json({
      limit: '1mb',
      type: ['application/json', 'application/vnd.api+json'],
    }),
  );

  app.use(contactsRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
  });

  return app;
};

app.use(cookieParser());