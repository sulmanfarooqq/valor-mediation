const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const slugify = require('slugify');

const Page = sequelize.define('Page', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING,
    unique: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  metaTitle: DataTypes.STRING,
  metaDescription: DataTypes.TEXT,
  metaKeywords: DataTypes.STRING,
  status: {
    type: DataTypes.ENUM('draft', 'published'),
    defaultValue: 'draft',
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
  hooks: {
    beforeCreate: (page) => {
      if (page.title) {
        page.slug = slugify(page.title, { lower: true, strict: true });
      }
    },
    beforeUpdate: (page) => {
      if (page.changed('title')) {
        page.slug = slugify(page.title, { lower: true, strict: true });
      }
    },
  },
});

module.exports = Page;