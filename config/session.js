const { MongoStore } = require('connect-mongo');
const config = require('./env');

const sessionConfig = {
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: config.mongodb.uri,
    collectionName: 'sessions',
    ttl: 14 * 24 * 60 * 60, // 14 days
  }),
  cookie: {
    httpOnly: true,
    secure: config.nodeEnv === 'production',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  },
};

module.exports = { sessionConfig };