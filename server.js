require('dotenv').config();
const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const flash = require('connect-flash');

const { connectDB, sessionStore } = require('./config/database');
const { sessionConfig } = require('./config/session');
const errorHandler = require('./middleware/errorHandler');

// Load all models to ensure they're registered with Sequelize
require('./models');

const app = express();
let cors = () => (_req, _res, next) => next();

try {
  cors = require('cors');
} catch (error) {
  console.warn("⚠️  Optional dependency 'cors' is not installed. Continuing without CORS middleware.");
}

// Database connection (optional - for Hostinger post-deployment)
connectDB();
if (sessionStore && sessionStore.sync) {
  sessionStore.sync().catch(err => {
    console.warn('⚠️  Could not sync sessions table:', err.message);
  });
}

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Session
app.use(session(sessionConfig));
app.use(flash());

// Passport
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

// Locals
app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use('/api/', limiter);

// Routes
app.use('/', require('./routes/web'));
app.use('/admin', require('./routes/admin'));
app.use('/api', require('./routes/api'));
// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`\n✅ Server running on: ${url}\n`);
  console.log(`🔗 Click here to open: \x1b]8;;${url}\x1b\\${url}\x1b]8;;\x1b\\\n`);
});
