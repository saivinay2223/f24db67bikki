var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account'); // Ensure the Account model is correctly referenced

// GET home page
router.get('/', function (req, res) {
  res.render('index', { title: 'Galaxies App', user: req.user });
});

// GET register page
router.get('/register', function (req, res) {
  res.render('register', { title: 'Galaxies App Registration' });
});

// POST register with duplicate check
router.post('/register', function (req, res) {
  Account.findOne({ username: req.body.username })
    .then(function (existingUser) {
      if (existingUser) {
        return res.render('register', {
          title: 'Registration',
          message: 'Error: Username already exists',
          account: req.body.username,
        });
      }

      const newAccount = new Account({ username: req.body.username });
      Account.register(newAccount, req.body.password, function (err, user) {
        if (err || !user) {
          console.error("Registration error:", err || "User creation failed");
          return res.render('register', {
            title: 'Registration',
            message: 'Error: Registration failed',
            account: req.body.username,
          });
        }
        console.log("Registration successful. Redirecting...");
        res.redirect('/');
      });
    })
    .catch(function (err) {
      console.error("Database error during registration:", err.message);
      return res.render('register', {
        title: 'Registration',
        message: 'Error: Registration failed',
      });
    });
});

// GET login page
router.get('/login', function (req, res) {
  res.render('login', { title: 'Galaxies App Login', user: req.user });
});

// POST login
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
}));

// GET logout
router.get('/logout', function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.error("Logout error:", err);
      return next(err);
    }
    res.redirect('/');
  });
});

// GET ping endpoint to check server health
router.get('/ping', function (req, res) {
  res.status(200).send('pong!');
});

module.exports = router;
