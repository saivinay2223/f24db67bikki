var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();

const mongoose = require('mongoose');
const connectionString = process.env.MONGO_CON;

// Establish MongoDB connection
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

// Mongoose connection events
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.connection.once("open", function() {
    console.log("Connected to DB successfully");
});

const resourceRouter = require('./routes/resource'); // API route for general resources
const galaxiesRouter = require('./routes/galaxies'); // Galaxy-specific routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

var app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middleware setup
app.use(logger('dev')); // Logs HTTP requests
app.use(express.json()); // Parses incoming JSON requests
app.use(express.urlencoded({ extended: false })); // Parses incoming URL-encoded data
app.use(cookieParser()); // Parses cookies attached to the incoming request
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' directory

// Routes
app.use('/', indexRouter); // Main route for index
app.use('/users', usersRouter); // User routes
app.use('/resource', resourceRouter);  // General resource routes (e.g., API endpoints)
app.use('/galaxies', galaxiesRouter); // Galaxy-specific routes (e.g., list or detail of galaxies)

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404)); // Trigger the 404 error handler
});

// Error handler
app.use(function(err, req, res, next) {
    // Set locals, providing error information in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    
    // Render the error page with status code
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
