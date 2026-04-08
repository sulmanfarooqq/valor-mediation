const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const slugify = require('slugify');

const Blog = sequelize.define('Blog', {
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
  excerpt: {
    type: DataTypes.TEXT,
  },
  featuredImage: {
    type: DataTypes.STRING,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  status: {
    type: DataTypes.ENUM('draft', 'published'),
    defaultValue: 'draft',
  },
  publishedAt: {
    type: DataTypes.DATE,
  },
  metaTitle: DataTypes.STRING,
  metaDescription: DataTypes.TEXT,
}, {
  timestamps: false,
  hooks: {
    beforeCreate: (blog) => {
      if (blog.title) {
        blog.slug = slugify(blog.title, { lower: true, strict: true });
      }
      if (blog.status === 'published' && !blog.publishedAt) {
        blog.publishedAt = new Date();
      }
    },
    beforeUpdate: (blog) => {
      if (blog.changed('title')) {
        blog.slug = slugify(blog.title, { lower: true, strict: true });
      }
      if (blog.status === 'published' && blog.changed('status') && !blog.publishedAt) {
        blog.publishedAt = new Date();
      }
    },
  },
});

module.exports = Blog;