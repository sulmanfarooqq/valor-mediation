const validator = require('validator');

exports.isValidEmail = (email) => {
  return validator.isEmail(email);
};

exports.isValidPhone = (phone) => {
  return validator.isMobilePhone(phone, 'any');
};