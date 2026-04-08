const { sequelize } = require('../config/database');
const User = require('./User');
const Blog = require('./Blog');
const Page = require('./Page');
const Setting = require('./Setting');
const Contact = require('./Contact');
const Review = require('./Review');

// Define associations
User.hasMany(Blog, { foreignKey: 'userId', as: 'blogs' });
Blog.belongsTo(User, { foreignKey: 'userId', as: 'author' });

User.hasMany(Page, { foreignKey: 'userId', as: 'pages' });
Page.belongsTo(User, { foreignKey: 'userId', as: 'user' });

User.hasMany(Contact, { foreignKey: 'userId', as: 'contacts' });
Contact.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = {
  sequelize,
  User,
  Blog,
  Page,
  Setting,
  Contact,
  Review,
};