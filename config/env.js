const dotenv = require('dotenv');
dotenv.config();

// Only require PORT, SESSION_SECRET - database is optional for now
const requiredEnv = ['PORT', 'SESSION_SECRET'];

requiredEnv.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
});

// Database variables are optional (for post-deployment setup on Hostinger)
const hasDatabase = process.env.DB_HOST && process.env.DB_USER && process.env.DB_PASSWORD && process.env.DB_NAME;

module.exports = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV || 'development',
  hasDatabase,
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
  sessionSecret: process.env.SESSION_SECRET,
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
    from: process.env.EMAIL_FROM,
  },
  appName: process.env.APP_NAME || 'Valor Mediation, LLC',
  appUrl: process.env.APP_URL || 'http://localhost:3000',
};