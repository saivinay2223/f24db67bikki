var express = require('express');
var router = express.Router();
var galaxy_controller = require('../controllers/galaxies');  


router.get('/', galaxy_controller.galaxy_list);              
router.get('/:id', galaxy_controller.galaxy_detail);         
router.get('/create', galaxy_controller.galaxy_create_page);  
router.post('/', galaxy_controller.galaxy_create_post);      
router.delete('/:id', galaxy_controller.galaxy_delete);     
router.put('/:id', galaxy_controller.galaxy_update_put);    

module.exports = router;
