import Log from '../models/Log.js';

const activityLogger = (actionFactory) => async (req, res, next) => {
  res.on('finish', async () => {
    if (res.statusCode >= 400) return;
    try {
      await Log.create({
        user: req.user?._id,
        action: actionFactory(req),
        meta: { method: req.method, path: req.originalUrl },
        ip: req.ip,
      });
    } catch {
      // logging should not block request lifecycle
    }
  });
  next();
};

export default activityLogger;
