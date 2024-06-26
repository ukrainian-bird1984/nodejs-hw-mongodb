import { isHttpError } from 'http-errors';

export default function errorHandler(err, req, res, next) {
  if (isHttpError(err)) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
      errors: err.errors || [],
    });
    return;
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
}