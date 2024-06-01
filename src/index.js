import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoDB.js';

const startServer = async () => {
  await initMongoConnection();
  setupServer();
};
startServer();