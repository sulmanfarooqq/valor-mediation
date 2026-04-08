const dotenv = require('dotenv');
dotenv.config();

// Required environment variables
const requiredEnv = ['PORT', 'SESSION_SECRET', 'MONGODB_URI', 'RESEND_API_KEY'];

requiredEnv.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`Missing required environment variable: ${envVar}`);
    process.exit(1);
  }
});

module.exports = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongodb: {
    uri: process.env.MONGODB_URI,
  },
  sessionSecret: process.env.SESSION_SECRET,
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,
  resend: {
    apiKey: process.env.RESEND_API_KEY,
  },
  email: {
    from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
  },
  appName: process.env.APP_NAME || 'Valor Mediation, LLC',
  appUrl: process.env.APP_URL || 'http://localhost:3000',
};