var express = require('express');
var router = express.Router();

var api_controller = require('../controllers/api');
var galaxy_controller = require('../controllers/galaxies');

// Root route for API documentation or overview
router.get('/', api_controller.api);

// Create a new galaxy
router.post('/galaxies', galaxy_controller.galaxy_create_post);

// Delete a galaxy by ID
router.delete('/galaxies/:id', galaxy_controller.galaxy_delete);

// Update a galaxy by ID
router.put('/galaxies/:id', galaxy_controller.galaxy_update_put);

// Get details of a specific galaxy by ID
router.get('/galaxies/:id', galaxy_controller.galaxy_detail);

// Get a list of all galaxies
router.get('/galaxies', galaxy_controller.galaxy_list);

module.exports = router;
