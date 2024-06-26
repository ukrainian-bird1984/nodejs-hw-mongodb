import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import env from './utils/env.js';
import { ENV_VARS } from './constants/envVars.js';
import rootRouter from './routers/index.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import { UPLOADS_DIR } from './constants/index.js';
import removeFileIfExists from './middlewares/removeFileIfExists.js';

export default function setupServer() {
  const PORT = Number(env(ENV_VARS.PORT, 3000));
  const app = express();

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.use(cookieParser());

  app.use(cors());

  app.use(express.json());

  app.use('/uploads', express.static(UPLOADS_DIR));

  app.use(rootRouter);

  app.use('*', notFoundHandler);

  app.use(removeFileIfExists);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}