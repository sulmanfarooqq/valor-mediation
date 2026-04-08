const mongoose = require('mongoose');
const config = require('./env');

const connectDB = async () => {
  try {
    if (!config.mongodb.uri) {
      console.warn('⚠️  MONGODB_URI is not set. Database operations will fail.');
      return;
    }

    const conn = await mongoose.connect(config.mongodb.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.warn('⚠️  App will run in database-free mode. Admin functionality will be disabled.');
  }
};

module.exports = { connectDB, mongoose };