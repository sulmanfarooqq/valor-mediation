const dotenv = require('dotenv');
dotenv.config();

// Required environment variables for Production
const isProduction = process.env.NODE_ENV === 'production';
const requiredEnv = ['PORT', 'SESSION_SECRET'];
if (isProduction) {
  requiredEnv.push('MONGODB_URI', 'RESEND_API_KEY');
}

requiredEnv.forEach((envVar) => {
  if (!process.env[envVar]) {
    console.error(`❌ Missing required environment variable: ${envVar}`);
    if (isProduction) process.exit(1);
  }
});

// Development warnings for missing DB/Email
if (!isProduction) {
  if (!process.env.MONGODB_URI || process.env.MONGODB_URI.includes('your_')) {
    console.warn('⚠️  MONGODB_URI is missing or contains a placeholder. Database features will be limited.');
  }
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY.includes('your_')) {
    console.warn('⚠️  RESEND_API_KEY is missing or contains a placeholder. Email features will be limited.');
  }
}

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