import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMP_UPLOAD_DIR, UPLOADS_DIR } from '../constants/index.js';
import env from '../utils/env.js';
import { ENV_VARS } from '../constants/envVars.js';

export default async function saveFileToUploadDir(file) {
  await fs.rename(
    path.join(TEMP_UPLOAD_DIR, file.filename),
    path.join(UPLOADS_DIR, file.filename),
  );

  return `${env(ENV_VARS.APP_DOMAIN)}/uploads/${file.filename}`;
}