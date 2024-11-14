var express = require('express');
var router = express.Router();

// Require controller modules
var api_controller = require('../controllers/api');
var galaxie_controller = require('../controllers/galaxies');

/// API ROUTE ///
// GET resources base
router.get('/', api_controller.api);

/// GALAXY ROUTES ///
// POST request for creating a Galaxy
router.post('/galaxies', galaxie_controller.galaxie_create_post);

// DELETE request to delete Galaxy
router.delete('/galaxies/:id', galaxie_controller.galaxie_delete);

// PUT request to update Galaxy
router.put('/galaxies/:id', galaxie_controller.galaxie_update_put);

// GET request for one Galaxy
router.get('/galaxies/:id', galaxie_controller.galaxie_detail);

// GET request for list of all Galaxy items
router.get('/galaxies', galaxie_controller.galaxie_list);

module.exports = router;
