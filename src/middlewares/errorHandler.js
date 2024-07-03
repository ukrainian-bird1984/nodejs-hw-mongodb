import { isHttpError } from 'http-errors';
export const errorHandler = (error, req, res, next) => {
  if (isHttpError(error)) {
    return res.status(error.status).json({
      status: error.status,
      message: error.name,
      data: {
        message: error.message,
      },
      errors: error.errors ? error.errors.map((err) => err.message) : [],
    });
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    error: error.message,
  });
};