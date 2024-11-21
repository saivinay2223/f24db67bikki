var express = require('express');
var router = express.Router();
var galaxy_controller = require('../controllers/galaxies');

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
router.get('/detail', galaxy_controller.galaxy_view_one_Page);

// Create a new galaxy (form page)
router.get('/create', galaxy_controller.galaxy_create_Page);

// Update a galaxy (form page)
router.get('/update', galaxy_controller.galaxy_update_Page);

// Delete a galaxy (form page)
router.get('/delete', galaxy_controller.galaxy_delete_Page);

module.exports = router;
