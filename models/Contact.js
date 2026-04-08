const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  phone: DataTypes.STRING,
  message: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  subject: DataTypes.STRING,
  mediumType: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM('new', 'read', 'replied'),
    defaultValue: 'new',
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
}, {
  timestamps: false,
});

module.exports = Contact;