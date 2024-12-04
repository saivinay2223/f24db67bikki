var express = require('express');
var router = express.Router();
var galaxy_controller = require('../controllers/galaxies');
const passport = require('passport');

// Middleware to ensure routes are secured for authenticated users
const secured = (req, res, next) => {
    if (req.user) {
        return next();
    }
    res.redirect("/login");
};

// List all galaxies
router.get('/', galaxy_controller.galaxy_list);

// Create a new galaxy (POST submission)
router.post('/', galaxy_controller.galaxy_create_post);

// Update a galaxy (PUT request)
router.put('/galaxies/:id', galaxy_controller.galaxy_update_put);

// Delete a galaxy (DELETE request)
router.delete('/galaxies/:id', galaxy_controller.galaxy_delete);

// View details of a specific galaxy by ID
router.get('/galaxies/:id', galaxy_controller.galaxy_detail);

// Single view of a galaxy (by ID passed as a query parameter)
router.get('/detail', secured, galaxy_controller.galaxy_view_one_Page);

// Create a new galaxy (form page)
router.get('/create', galaxy_controller.galaxy_create_Page);

// Update a galaxy (form page)
router.get('/update', secured, galaxy_controller.galaxy_update_Page);

// Delete a galaxy (form page)
router.get('/delete', secured, galaxy_controller.galaxy_delete_Page);

// Login route using Passport for authentication
router.post('/login', passport.authenticate('local'), function (req, res) {
    res.redirect('/');
});

module.exports = router;
