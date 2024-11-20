const mongoose = require("mongoose");
const Galaxy = require('../models/galaxies');

// List all galaxies
exports.galaxy_list = async function(req, res) {
  try {
    const galaxies = await Galaxy.find();
    res.render('galaxies', { results: galaxies, isSingle: false });
  } catch (err) {
    console.error("Error fetching galaxies: ", err);
    res.status(500).send(`Error: Unable to retrieve galaxies. Please try again later.`);
  }
};

// View details of a specific galaxy
exports.galaxy_detail = async function(req, res) {
  const galaxyId = req.params.id;  // Ensure we're capturing the ID
  console.log("Request for Galaxy ID:", galaxyId); // Log the requested ID
  try {
    // Validate ObjectId format before querying
    if (!mongoose.Types.ObjectId.isValid(galaxyId)) {
      return res.status(400).send('Invalid galaxy ID');
    }

    const galaxy = await Galaxy.findById(galaxyId);
    if (galaxy) {
      // If galaxy is found, render with the galaxy object
      res.render('galaxies', { galaxy: galaxy, isSingle: true });
    } else {
      // If galaxy not found, return 404
      res.status(404).send('Galaxy not found');
    }
  } catch (err) {
    console.error("Error fetching galaxy details for ID:", galaxyId, err);
    res.status(500).send(`Error: Unable to retrieve galaxy details. Please try again later.`);
  }
};

// Create a new galaxy page (GET route)
exports.galaxy_create_page = function(req, res) {
  try {
    res.render('galaxycreate', { title: 'Create New Galaxy' });  // Render the 'galaxycreate' form
  } catch (err) {
    console.error("Error loading create page: ", err);
    res.status(500).send(`Error: Unable to load create page. Please try again later.`);
  }
};

// Handle creating a new galaxy (POST route)
exports.galaxy_create_post = async function(req, res) {
  // Validate the fields before creating a new galaxy
  if (!req.body.name || !req.body.year || !req.body.inventor || !req.body.distance || !req.body.type) {
    return res.render('galaxycreate', { 
      title: 'Create New Galaxy', 
      message: { text: 'All fields are required.', type: 'error' }
    });
  }

  const newGalaxy = new Galaxy({
    name: req.body.name,
    year: req.body.year,
    inventor: req.body.inventor,
    distance: req.body.distance,
    type: req.body.type,
  });

  try {
    const result = await newGalaxy.save();
    res.render('galaxycreate', { 
      title: 'Create New Galaxy',
      message: { text: 'Galaxy created successfully!', type: 'success' }
    });
  } catch (err) {
    console.error("Error creating galaxy: ", err);
    res.render('galaxycreate', { 
      title: 'Create New Galaxy',
      message: { text: 'Error creating galaxy. Please try again later.', type: 'error' }
    });
  }
};

// Delete a galaxy
exports.galaxy_delete = async function(req, res) {
  const galaxyId = req.params.id;  // Capture the ID from the request params
  try {
    // Validate ObjectId format before querying
    if (!mongoose.Types.ObjectId.isValid(galaxyId)) {
      return res.status(400).send('Invalid galaxy ID');
    }

    const result = await Galaxy.findByIdAndDelete(galaxyId);
    if (result) {
      res.status(200).send(`Galaxy ${galaxyId} deleted successfully`);
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
  const galaxyId = req.params.id;  // Capture the ID from the request params
  try {
    // Validate ObjectId format before querying
    if (!mongoose.Types.ObjectId.isValid(galaxyId)) {
      return res.status(400).send('Invalid galaxy ID');
    }

    const galaxyToUpdate = await Galaxy.findById(galaxyId);
    
    // If galaxy exists, update only the fields that are passed in the body
    if (galaxyToUpdate) {
      if (req.body.name) galaxyToUpdate.name = req.body.name;
      if (req.body.year) galaxyToUpdate.year = req.body.year;
      if (req.body.inventor) galaxyToUpdate.inventor = req.body.inventor;
      if (req.body.distance) galaxyToUpdate.distance = req.body.distance;
      if (req.body.type) galaxyToUpdate.type = req.body.type;

      const updatedGalaxy = await galaxyToUpdate.save();
      res.status(200).json(updatedGalaxy);  // Return the updated galaxy in JSON format
    } else {
      res.status(404).send('Galaxy not found');
    }
  } catch (err) {
    console.error("Error updating galaxy: ", err);
    res.status(500).send(`Error: Unable to update galaxy. Please try again later.`);
  }
};
