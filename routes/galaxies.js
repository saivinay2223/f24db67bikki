var express = require('express');
var router = express.Router();
var galaxy_controller = require('../controllers/galaxies');  // Import the correct controller

// Routes for galaxies
router.get('/', galaxy_controller.galaxy_list);             // List all galaxies
router.get('/:id', galaxy_controller.galaxy_detail);        // Show details of a galaxy
router.post('/create', galaxy_controller.galaxy_create_post);  // Create a new galaxy
router.delete('/:id', galaxy_controller.galaxy_delete);     // Delete a galaxy
router.put('/:id', galaxy_controller.galaxy_update_put);    // Update a galaxy

module.exports = router;
