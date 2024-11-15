const Galaxy = require('../models/galaxies');

// List all galaxies
exports.galaxy_list = async function(req, res) {
  try {
    const galaxies = await Galaxy.find();
    res.render('galaxies', { results: galaxies });
  } catch (err) {
    res.status(500).send(`Error: ${err}`);
  }
};

// View details of a specific galaxy
exports.galaxy_detail = async function(req, res) {
  try {
    const galaxy = await Galaxy.findById(req.params.id);
    if (galaxy) {
      res.render('galaxy_detail', { galaxy: galaxy });
    } else {
      res.status(404).send('Galaxy not found');
    }
  } catch (err) {
    res.status(500).send(`Error: ${err}`);
  }
};

// Create a new galaxy
exports.galaxy_create_post = async function(req, res) {
  let document = new Galaxy();
  document.name = req.body.name;
  document.year = req.body.year;
  document.inventor = req.body.inventor;
  document.distance = req.body.distance;
  document.type = req.body.type;
  
  try {
    let result = await document.save();
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(`Error: ${err}`);
  }
};

// Delete a galaxy
exports.galaxy_delete = async function(req, res) {
  try {
    const result = await Galaxy.findByIdAndDelete(req.params.id);
    if (result) {
      res.status(200).send(`Galaxy ${req.params.id} deleted successfully`);
    } else {
      res.status(404).send('Galaxy not found');
    }
  } catch (err) {
    res.status(500).send(`Error: ${err}`);
  }
};

// Update a galaxy
exports.galaxy_update_put = async function(req, res) {
  try {
    const updatedGalaxy = await Galaxy.findByIdAndUpdate(
      req.params.id,
      { 
        name: req.body.name, 
        year: req.body.year, 
        inventor: req.body.inventor, 
        distance: req.body.distance,
        type: req.body.type
      },
      { new: true }
    );
    if (updatedGalaxy) {
      res.status(200).send(updatedGalaxy);
    } else {
      res.status(404).send('Galaxy not found');
    }
  } catch (err) {
    res.status(500).send(`Error: ${err}`);
  }
};
