export const notFound = (req, res) => res.status(404).json({ message: `Not found: ${req.originalUrl}` });

export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);
  const status = err.status || 500;
  const message = process.env.NODE_ENV === 'production' && status === 500 ? 'Internal server error' : err.message;
  return res.status(status).json({ message });
};
