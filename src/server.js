import express from 'express';
import cors from 'cors';
<<<<<<< HEAD

import router from './routers/index.js';
app.use(router);
import { errorHandler } from './middlewares/errorHandler.js';
=======
import pino from 'pino-http';
>>>>>>> fae16317c877f2e20c63ba15b1c30f5979a3e170
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { env } from './utils/env.js';
import { contactsRouter } from './routers/contacts.js';
import { errorHandler } from './middlewares/errorHandler.js';

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