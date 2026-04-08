exports.formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

exports.truncate = (str, length) => {
  if (str.length <= length) return str;
  return str.substring(0, length) + '...';
};