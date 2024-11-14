var express = require('express');
var router = express.Router();

// Require controller modules
var api_controller = require('../controllers/api');
var galaxie_controller = require('../controllers/galaxies');

/// API ROUTE ///
// GET resources base
router.get('/', api_controller.api);  // Route for API base

/// GALAXY ROUTES ///
// POST request for creating a new Galaxy
router.post('/galaxies', galaxie_controller.galaxie_create_post);

// DELETE request to delete a Galaxy by ID
router.delete('/galaxies/:id', galaxie_controller.galaxie_delete);

// PUT request to update a Galaxy by ID
router.put('/galaxies/:id', galaxie_controller.galaxie_update_put);

// GET request for a single Galaxy by ID
router.get('/galaxies/:id', galaxie_controller.galaxie_detail);

// GET request for the list of all Galaxies
router.get('/galaxies', galaxie_controller.galaxie_list);

module.exports = router;
