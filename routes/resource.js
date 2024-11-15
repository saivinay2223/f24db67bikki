var express = require('express');
var router = express.Router();

var api_controller = require('../controllers/api');
var galaxy_controller = require('../controllers/galaxies');

router.get('/', api_controller.api);

router.post('/galaxies', galaxy_controller.galaxy_create_post);

router.delete('/galaxies/:id', galaxy_controller.galaxy_delete);

router.put('/galaxies/:id', galaxy_controller.galaxy_update_put);

router.get('/galaxies/:id', galaxy_controller.galaxy_detail);

router.get('/galaxies', galaxy_controller.galaxy_list);

module.exports = router;
