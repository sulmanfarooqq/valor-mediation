const { Sequelize } = require('sequelize');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Create session store with memory-based fallback if DB not available
let sessionStore;
let sequelize;

const initializeDatabase = () => {
  // Check if database credentials are available
  const hasDBConfig = process.env.DB_NAME && process.env.DB_USER && process.env.DB_PASSWORD && process.env.DB_HOST;

  if (!hasDBConfig) {
    console.warn('⚠️  Database credentials not configured. Running in database-free mode.');
    console.warn('📌 Chatbot and API will work fine. Admin panel will have limited functionality.');
    return null;
  }

  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT || 3306,
      dialect: 'mysql',
      logging: false,
      define: {
        timestamps: true,
        underscored: true,
      },
    }
  );

  sessionStore = new SequelizeStore({
    db: sequelize,
    tableName: 'Sessions',
  });

  return sequelize;
};

const connectDB = async () => {
  if (!sequelize) {
    console.log('ℹ️  Database not configured. Skipping connection.');
    return;
  }

  try {
    await sequelize.authenticate();
    console.log('✅ MySQL connected');
    await sequelize.sync({ alter: false });
    console.log('✅ Models synchronized');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.warn('⚠️  App will run without database. Chatbot and static pages will work.');
    console.warn('💡 Configure database on Hostinger and update .env to enable full features.');
  }
};

// Initialize database on load
initializeDatabase();

// Fallback session store if DB not available
if (!sessionStore) {
  sessionStore = new session.MemoryStore();
}

module.exports = { sequelize, connectDB, sessionStore };