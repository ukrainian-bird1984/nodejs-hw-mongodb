export const notFoundMiddleware = (req, res, next) => {
  res.status(404).send('Not found');
};