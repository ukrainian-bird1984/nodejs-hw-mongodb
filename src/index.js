import { TEMP_UPLOAD_DIR, UPLOADS_DIR } from './constants/index.js';
import initMongoConnection from './db/initMongoConnection.js';
import setupServer from './server.js';
import { createDirIfNotExists } from './utils/createDirIfNotExists.js';

async function bootstrap() {
  await initMongoConnection();
  await createDirIfNotExists(TEMP_UPLOAD_DIR);
  await createDirIfNotExists(UPLOADS_DIR);
  setupServer();
}

bootstrap();