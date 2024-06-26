import createHttpError from 'http-errors';
import fs from 'node:fs/promises';

export default async function removeFileIfExists(err, req, res, next) {
  const file = req.file;

  if (file) {
    try {
      await fs.unlink(file.path);
    } catch (error) {
      next(
        createHttpError(
          202,
          'The file has been deleted from the temporary folder.',
        ),
      );
    }
  }

  next(err);
}