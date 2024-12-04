var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account'); // Ensure the Account model is correctly referenced

// GET home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user: req.user });
});

// GET login page
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

// POST login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

// GET register page
router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Register' });
});

// POST register with duplicate check
router.post('/register', async function(req, res, next) {
  try {
    // Check if the username already exists
    const existingUser = await Account.findOne({ username: req.body.username });
    if (existingUser) {
      return res.render('register', {
        title: 'Register',
        message: 'Error: Username already exists',
      });
    }

    // Create a new user if no duplicates are found
    const newAccount = new Account({ username: req.body.username });
    await Account.register(newAccount, req.body.password);
    
    // Authenticate and redirect
    passport.authenticate('local')(req, res, function() {
      res.redirect('/');
    });
  } catch (err) {
    console.error("Registration error:", err.message);
    return res.render('register', {
      title: 'Register',
      message: 'Registration error: ' + err.message,
    });
  }
});

// GET logout
router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

// GET ping endpoint to check server health
router.get('/ping', function(req, res) {
  res.status(200).send('pong!');
});

module.exports = router;
