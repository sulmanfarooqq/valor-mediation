# Valor Mediation Platform - Setup Guide

## 📋 Table of Contents
- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Troubleshooting](#troubleshooting)

## Overview

Valor Mediation is a comprehensive web platform for managing mediation services. It includes:
- Public website with blogs and service information
- Admin dashboard for content management
- RESTful API for integration
- Chatbot for customer inquiries
- Contact form management
- Multi-location support

## Prerequisites

- **Node.js** >= 14.x
- **MySQL** >= 5.7 (or MariaDB 10.3+)
- **npm** >= 6.x or **yarn** >= 1.22.x

## Installation

### 1. Clone and Setup

\`\`\`bash
cd valor-mediation
npm install
\`\`\`

### 2. Environment Configuration

Copy the example env file and update with your settings:

\`\`\`bash
cp .env.example .env
\`\`\`

Edit `.env` with your configuration:

\`\`\`env
# Server Configuration
NODE_ENV=development
PORT=3000
APP_URL=http://localhost:3000

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=valor_mediation
DB_USER=root
DB_PASSWORD=

# Session Configuration
SESSION_SECRET=your_secure_random_key_here

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here

# Email Configuration (Gmail or your SMTP provider)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# File Upload Configuration
MAX_UPLOAD_SIZE=5242880
UPLOAD_DIR=public/uploads

# Admin Configuration
ADMIN_EMAIL=admin@valor-mediation.com
\`\`\`

## Database Setup

### Create Database

\`\`\`sql
CREATE DATABASE valor_mediation CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
\`\`\`

### Run Migrations

The database tables are automatically created on first run. The application uses Sequelize ORM which syncs models on startup.

For development (with alter):
\`\`\`bash
npm run dev
\`\`\`

For production:
\`\`\`bash
npm start
\`\`\`

### Seed Data (Optional)

\`\`\`bash
npm run seed
\`\`\`

## Running the Application

### Development Mode

\`\`\`bash
npm run dev
\`\`\`

This runs with nodemon for automatic restarts on file changes.

### Production Mode

\`\`\`bash
npm start
\`\`\`

### Testing

\`\`\`bash
npm test                 # Run all tests
npm run test:unit        # Unit tests only
npm run test:integration # Integration tests only
\`\`\`

## Project Structure

```
\`\`\`
valor-mediation/
├── config/               # Configuration files
│   ├── database.js      # Database connection
│   ├── passport.js      # Authentication strategy
│   ├── session.js       # Session configuration
│   └── env.js           # Environment variables
├── controllers/          # Request handlers
│   ├── admin/           # Admin panel controllers
│   └── web/             # Public site controllers
├── middleware/           # Express middleware
│   ├── auth.js          # Authentication middleware
│   ├── errorHandler.js  # Error handling
│   ├── rateLimiter.js   # Rate limiting
│   ├── upload.js        # File upload handling
│   └── validation.js    # Input validation
├── models/              # Sequelize models
│   ├── User.js
│   ├── Blog.js
│   ├── Contact.js
│   ├── Page.js
│   ├── Setting.js
│   └── index.js
├── routes/              # API routes
│   ├── web.js          # Public routes
│   ├── admin.js        # Admin routes
│   ├── api.js          # API endpoints
│   └── index.js
├── services/            # Business logic
│   ├── chatbot.js      # Chatbot service
│   ├── email.js        # Email service
│   └── reviews.js      # Review management
├── utils/               # Utility functions
│   ├── helpers.js      # Helper functions
│   ├── logger.js       # Logging utility
│   └── validators.js   # Validation functions
├── views/               # EJS templates
│   ├── admin/          # Admin templates
│   ├── blog/           # Blog templates
│   ├── locations/      # Location templates
│   ├── services/       # Service templates
│   └── partials/       # Reusable components
├── public/              # Static files
│   ├── css/
│   ├── js/
│   ├── images/
│   └── uploads/
├── server.js           # Main application file
├── package.json
└── .env.example        # Environment template
\`\`\`

## API Documentation

### Authentication Routes

**POST /api/auth/login**
- Login user
- Required: email, password

**POST /api/auth/logout**
- Logout user

### Blog API

**GET /api/blogs**
- Get all published blogs
- Query: page (default: 1), limit (default: 10)

**GET /api/blogs/:id**
- Get single blog by ID or slug

**POST /api/blogs** (Protected)
- Create new blog
- Required: title, slug, content

### Contact API

**POST /api/contact**
- Submit contact form
- Required: name, email, message

**GET /api/contact/status/:id**
- Check contact submission status

### Services API

**GET /api/services**
- Get all mediation services

**GET /api/services/:slug**
- Get specific service details

### Locations API

**GET /api/locations**
- Get all service locations

### Reviews API

**GET /api/reviews**
- Get all reviews
- Query: page, limit, rating

**POST /api/reviews**
- Submit new review
- Required: name, email, rating, message

**GET /api/reviews/rating/average**
- Get average rating

**POST /api/chatbot**
- Send message to chatbot
- Required: message
- Returns: AI-generated response based on intent matching

## Admin Panel

Access the admin panel at: `http://localhost:3000/admin`

Default login credentials are created on first setup. Change these immediately in production!

### Admin Features

- Dashboard with statistics
- Blog post management
- Page/service management
- Contact messages
- Site settings
- User management

## Troubleshooting

### Database Connection Error

\`\`\`
Error: connect ECONNREFUSED 127.0.0.1:3306
\`\`\`

**Solution:**
1. Ensure MySQL/MariaDB is running
2. Check database credentials in .env
3. Verify DB_HOST and DB_PORT

### Module Not Found Errors

\`\`\`bash
npm install
\`\`\`

### Email Not Sending

1. Check SMTP credentials in .env
2. For Gmail, use an App Password (not regular password)
3. Enable "Less secure app access" if needed
4. Check error logs in `/logs` directory

### Port Already in Use

\`\`\`bash
# Change PORT in .env
PORT=3001
\`\`\`

### Session Secret Warning

Generate a strong session secret:

\`\`\`bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
\`\`\`

Update in `.env`:
\`\`\`env
SESSION_SECRET=your_generated_secret_here
\`\`\`

## Security Best Practices

1. **Change default admin credentials** immediately after setup
2. **Use strong SESSION_SECRET and JWT_SECRET** - generate with crypto
3. **Enable HTTPS** in production (set NODE_ENV=production)
4. **Keep dependencies updated**: `npm audit && npm update`
5. **Use environment variables** for sensitive data
6. **Set up CORS** properly in production
7. **Implement rate limiting** (already configured)
8. **Regular database backups** scheduled

## Performance Optimization

1. **Enable caching** for static files
2. **Use CDN** for media files
3. **Implement database indexing** on frequently queried fields
4. **Monitor logs** in `/logs` directory
5. **Use connection pooling** (already configured in database.js)

## Support

For issues or questions, contact the development team or refer to documentation.

---

**Last Updated:** March 2026
**Version:** 1.0.0
