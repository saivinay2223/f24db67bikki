const mongoose = require("mongoose");
const Galaxy = require("../models/galaxies");

// Helper function for validation
const validateGalaxy = (data) => {
    const errors = [];
    if (!data.name) errors.push("Name is required");
    if (!data.year || isNaN(data.year)) errors.push("Year must be a valid number");
    if (!data.inventor) errors.push("Inventor is required");
    if (!data.distance || isNaN(data.distance) || data.distance <= 0) errors.push("Distance must be a positive number");
    if (!data.type) errors.push("Type is required");
    return errors;
};

// List all galaxies (Read all)
exports.galaxy_list = async function (req, res) {
    try {
        const galaxies = await Galaxy.find();
        res.render("galaxies", { results: galaxies });
    } catch (err) {
        res.status(500).send(`Error retrieving galaxies: ${err}`);
    }
};

// Get details of a specific galaxy (Read one)
exports.galaxy_detail = async function (req, res) {
    console.log("Fetching Galaxy ID:", req.params.id);

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Invalid Galaxy ID format");
    }

    try {
        const galaxy = await Galaxy.findById(req.params.id);
        if (!galaxy) {
            return res.status(404).send("Galaxy not found");
        }
        res.send(galaxy);
    } catch (err) {
        res.status(500).send(`Error retrieving galaxy: ${err}`);
    }
};

// Create a new galaxy (Create)
exports.galaxy_create_post = async function (req, res) {
    const errors = validateGalaxy(req.body);
    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    const galaxy = new Galaxy({
        name: req.body.name,
        year: req.body.year,
        inventor: req.body.inventor,
        distance: req.body.distance,
        type: req.body.type,
    });

    try {
        const result = await galaxy.save();
        res.status(201).json({ message: "Galaxy created successfully", galaxy: result });
    } catch (err) {
        res.status(500).send(`Error creating galaxy: ${err}`);
    }
};

// Update an existing galaxy (Update)
exports.galaxy_update_put = async function (req, res) {
    console.log("Updating Galaxy ID:", req.params.id);

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Invalid Galaxy ID format");
    }

    try {
        let galaxy = await Galaxy.findById(req.params.id);
        if (!galaxy) {
            return res.status(404).send("Galaxy not found");
        }

        // Update fields
        if (req.body.name) galaxy.name = req.body.name;
        if (req.body.year) galaxy.year = req.body.year;
        if (req.body.inventor) galaxy.inventor = req.body.inventor;
        if (req.body.distance) galaxy.distance = req.body.distance;
        if (req.body.type) galaxy.type = req.body.type;

        const updatedGalaxy = await galaxy.save();
        res.json({ message: "Galaxy updated successfully", galaxy: updatedGalaxy });
    } catch (err) {
        res.status(500).send(`Error updating galaxy: ${err}`);
    }
};

// Delete a galaxy (Delete)
exports.galaxy_delete = async function (req, res) {
    console.log("Deleting Galaxy ID:", req.params.id);

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send("Invalid Galaxy ID format");
    }

    try {
        const galaxy = await Galaxy.findByIdAndDelete(req.params.id);
        if (!galaxy) {
            return res.status(404).send("Galaxy not found");
        }
        res.json({ message: "Galaxy deleted successfully", galaxy });
    } catch (err) {
        res.status(500).send(`Error deleting galaxy: ${err}`);
    }
};

// Render view for a single galaxy
exports.galaxy_view_one_Page = async function (req, res) {
    console.log("View for Galaxy ID:", req.query.id);

    if (!req.query.id || !mongoose.Types.ObjectId.isValid(req.query.id)) {
        return res.status(400).send("Invalid Galaxy ID");
    }

    try {
        const galaxy = await Galaxy.findById(req.query.id);
        if (!galaxy) {
            return res.status(404).send("Galaxy not found");
        }
        res.render("galaxydetail", { title: "Galaxy Detail", toShow: galaxy });
    } catch (err) {
        res.status(500).send(`Error rendering detail page: ${err}`);
    }
};

// Render page to create a new galaxy
exports.galaxy_create_Page = function (req, res) {
    console.log("Render Create Galaxy Page");

    try {
        res.render("galaxycreate", { title: "Create Galaxy" });
    } catch (err) {
        res.status(500).send(`Error rendering create page: ${err}`);
    }
};

// Render page to update a galaxy
exports.galaxy_update_Page = async function (req, res) {
    console.log("Render Update Galaxy Page for ID:", req.query.id);

    if (!req.query.id || !mongoose.Types.ObjectId.isValid(req.query.id)) {
        return res.status(400).send("Invalid Galaxy ID");
    }

    try {
        const galaxy = await Galaxy.findById(req.query.id);
        if (!galaxy) {
            return res.status(404).send("Galaxy not found");
        }
        res.render("galaxyupdate", { title: "Update Galaxy", toShow: galaxy });
    } catch (err) {
        res.status(500).send(`Error rendering update page: ${err}`);
    }
};

// Render page to delete a galaxy
exports.galaxy_delete_Page = async function (req, res) {
    console.log("Render Delete Galaxy Page for ID:", req.query.id);

    if (!req.query.id || !mongoose.Types.ObjectId.isValid(req.query.id)) {
        return res.status(400).send("Invalid Galaxy ID");
    }

    try {
        const galaxy = await Galaxy.findById(req.query.id);
        if (!galaxy) {
            return res.status(404).send("Galaxy not found");
        }
        res.render("galaxydelete", { title: "Delete Galaxy", toShow: galaxy });
    } catch (err) {
        res.status(500).send(`Error rendering delete page: ${err}`);
    }
};
