var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
  res.render('galaxies', { title: 'Search Results for Galaxies' });
});
module.exports = router;
