import { ENV_VARS } from '../constants/envVars.js';
import env from './env.js';
import saveFileToCloudinary from './saveFileToCloudinary.js';
import saveFileToUploadDir from './saveFileToUploadDir.js';

export default async function saveFile(file) {
  if (!file) return;

  let photoUrl;

  if (file) {
    if (env(ENV_VARS.LOAD_TO_CLOUDINARY) === 'true') {
      photoUrl = await saveFileToCloudinary(file);
    } else {
      photoUrl = await saveFileToUploadDir(file);
    }
  }

  return photoUrl;
}