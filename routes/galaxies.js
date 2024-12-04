var express = require('express');
var router = express.Router();
var galaxy_controller = require('../controllers/galaxies');
const passport = require('passport');

// Middleware to ensure routes are secured for authenticated users
const secured = (req, res, next) => {
    if (req.isAuthenticated()) { // Using Passport's isAuthenticated() method
        return next();
    }
    res.redirect("/login");
};

// List all galaxies
router.get('/', galaxy_controller.galaxy_list);

// Create a new galaxy (POST submission)
router.post('/', secured, galaxy_controller.galaxy_create_post); // Secured route

// Update a galaxy (PUT request)
router.put('/galaxies/:id', secured, galaxy_controller.galaxy_update_put); // Secured route

// Delete a galaxy (DELETE request)
router.delete('/galaxies/:id', secured, galaxy_controller.galaxy_delete); // Secured route

// View details of a specific galaxy by ID
router.get('/galaxies/:id', galaxy_controller.galaxy_detail);

// Single view of a galaxy (by ID passed as a query parameter)
router.get('/detail', secured, galaxy_controller.galaxy_view_one_Page);

// Create a new galaxy (form page)
router.get('/create',  galaxy_controller.galaxy_create_Page); // Secured route

// Update a galaxy (form page)
router.get('/update', secured, galaxy_controller.galaxy_update_Page); // Secured route

// Delete a galaxy (form page)
router.get('/delete', secured, galaxy_controller.galaxy_delete_Page); // Secured route

// Login route using Passport for authentication
router.post('/login', passport.authenticate('local', {
    successRedirect: '/', // Redirect to the home page if login is successful
    failureRedirect: '/login', // Redirect to login page if login fails
    failureFlash: true // Enable flash messages for login failures
}));

// Logout route
router.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/login'); // Redirect to login page after logout
    });
});

module.exports = router;
