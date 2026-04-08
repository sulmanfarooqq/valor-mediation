const logger = require('../utils/logger');

const errorHandler = (err, req, res, next) => {
  logger.error(err.stack);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(val => val.message);
    return res.status(400).json({ error: messages });
  }

  // MongoDB duplicate key error
  if (err.code === 11000) {
    return res.status(400).json({ error: 'Duplicate field value entered' });
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