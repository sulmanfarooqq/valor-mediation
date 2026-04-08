const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);

  // Database errors
  if (err.name === 'SequelizeValidationError') {
    const messages = err.errors.map(e => e.message);
    return res.status(400).json({ error: messages });
  }
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({ error: 'Duplicate entry' });
  }

  // Default error
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Server Error';

  // Render error page
  res.status(statusCode).render('error', {
    title: 'Error',
    status: statusCode,
    message,
    user: req.user,
  });
};

module.exports = errorHandler;