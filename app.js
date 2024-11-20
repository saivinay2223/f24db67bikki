const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config();

const mongoose = require('mongoose');
const connectionString = process.env.MONGO_CON;

// Establish MongoDB connection with better error handling
mongoose.connect(connectionString, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true 
})
  .then(() => console.log("Connected to DB successfully"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit the application if the connection fails
  });

// Import routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const resourceRouter = require('./routes/resource');
const galaxiesRouter = require('./routes/galaxies'); // Ensure galaxies route is imported

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware setup
app.use(logger('dev')); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/resource', resourceRouter);
app.use('/galaxies', galaxiesRouter);  // Ensure galaxies route is used

// Catch 404 and forward to error handler
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

module.exports = app;
