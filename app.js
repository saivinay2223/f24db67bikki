const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const flash = require('connect-flash'); // Import connect-flash
require('dotenv').config();

const mongoose = require('mongoose');
const connectionString = process.env.MONGO_CON;

// Establish MongoDB connection with error handling
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit if unable to connect to the database
  });

// Import Passport and its local strategy
const LocalStrategy = require('passport-local').Strategy;

// Import routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const resourceRouter = require('./routes/resource');
const galaxiesRouter = require('./routes/galaxies');

// Import Account model for Passport authentication
const Account = require('./models/account');

// Create Express app
const app = express();

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set up session for Passport
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}));

// Add flash middleware (after session and before passport)
app.use(flash()); // This is where you enable flash messages

// Passport setup
passport.use(new LocalStrategy(Account.authenticate())); // Configure passport-local strategy
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// Configure session for Passport
app.use(passport.initialize());
app.use(passport.session());

// Add flash messages to locals to make them available in views
app.use(function (req, res, next) {
  res.locals.messages = req.flash(); // Pass flash messages to locals
  next();
});

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/resource', resourceRouter);
app.use('/galaxies', galaxiesRouter);

// Database seeding function
const galaxySchema = new mongoose.Schema({
  name: String,
  size: Number,
  distance: Number
});
const Galaxy = mongoose.models.Galaxy || mongoose.model('Galaxy', galaxySchema);

async function recreateDB() {
  await Galaxy.deleteMany();

  const galaxy1 = new Galaxy({ name: "Milky Way", size: 105700, distance: 0 });
  const galaxy2 = new Galaxy({ name: "Andromeda", size: 220000, distance: 2537000 });
  const galaxy3 = new Galaxy({ name: "Triangulum", size: 60000, distance: 3000000 });

  await galaxy1.save();
  await galaxy2.save();
  await galaxy3.save();
  console.log("Database has been seeded successfully.");
}

if (process.env.RESEED === "true") {
  recreateDB();
}

// Catch 404 errors
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

// Export the app module
module.exports = app;
