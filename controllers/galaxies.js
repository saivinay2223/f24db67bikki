const Galaxy = require('../models/galaxies');

// List all galaxies
exports.galaxy_list = async function(req, res) {
  try {
    const galaxies = await Galaxy.find();
    res.render('galaxies', { results: galaxies, isSingle: false });  // Pass isSingle as false for a list
  } catch (err) {
    console.error("Error fetching galaxies: ", err);
    res.status(500).send(`Error: Unable to retrieve galaxies. Please try again later.`);
  }
};

// View details of a specific galaxy
exports.galaxy_detail = async function(req, res) {
  console.log("Detail for Galaxy ID: " + req.params.id);
  try {
    const galaxy = await Galaxy.findById(req.params.id);
    if (galaxy) {
      // Render 'galaxies.pug' but pass the single galaxy and isSingle flag as true
      res.render('galaxies', { galaxy: galaxy, isSingle: true });
    } else {
      res.status(404).send('Galaxy not found');
    }
  } catch (err) {
    console.error("Error fetching galaxy details: ", err);
    res.status(500).send(`Error: Unable to retrieve galaxy details. Please try again later.`);
  }
};

// Create a new galaxy
exports.galaxy_create_post = async function(req, res) {
  const document = new Galaxy({
    name: req.body.name,
    year: req.body.year,
    inventor: req.body.inventor,
    distance: req.body.distance,
    type: req.body.type,
  });

  try {
    const result = await document.save();
    res.status(201).send(result);
  } catch (err) {
    console.error("Error creating galaxy: ", err);
    res.status(500).send(`Error: Unable to create galaxy. Please try again later.`);
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
    console.error("Error deleting galaxy: ", err);
    res.status(500).send(`Error: Unable to delete galaxy. Please try again later.`);
  }
};

// Update a galaxy
exports.galaxy_update_put = async function(req, res) {
  try {
    // Retrieve the galaxy by ID to update
    const galaxyToUpdate = await Galaxy.findById(req.params.id);
    
    // If galaxy exists, update only the fields that are passed in the body
    if (galaxyToUpdate) {
      if (req.body.name) galaxyToUpdate.name = req.body.name;
      if (req.body.year) galaxyToUpdate.year = req.body.year;
      if (req.body.inventor) galaxyToUpdate.inventor = req.body.inventor;
      if (req.body.distance) galaxyToUpdate.distance = req.body.distance;
      if (req.body.type) galaxyToUpdate.type = req.body.type;

      const updatedGalaxy = await galaxyToUpdate.save();
      res.status(200).send(updatedGalaxy);
    } else {
      res.status(404).send('Galaxy not found');
    }
  } catch (err) {
    console.error("Error updating galaxy: ", err);
    res.status(500).send(`Error: Unable to update galaxy. Please try again later.`);
  }
};
