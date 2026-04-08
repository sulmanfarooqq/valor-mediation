const { connectDB, mongoose } = require('../config/database');
const User = require('./User');
const Blog = require('./Blog');
const Page = require('./Page');
const Setting = require('./Setting');
const Contact = require('./Contact');
const Review = require('./Review');

module.exports = {
  mongoose,
  connectDB,
  User,
  Blog,
  Page,
  Setting,
  Contact,
  Review,
};