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

// Get all galaxies (Read all)
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
    console.log("Fetching details for Galaxy ID:", req.params.id);
    try {
        const result = await Galaxy.findById(req.params.id);
        if (!result) {
            return res.status(404).send(`Galaxy with ID ${req.params.id} not found`);
        }
        res.send(result);
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

    const galaxy = new Galaxy(req.body);
    try {
        const result = await galaxy.save();
        res.send(result);
    } catch (err) {
        res.status(500).send(`Error creating galaxy: ${err}`);
    }
};

// Update an existing galaxy (Update)
exports.galaxy_update_put = async function (req, res) {
    console.log("Updating Galaxy ID:", req.params.id);
    try {
        let toUpdate = await Galaxy.findById(req.params.id);
        if (!toUpdate) {
            return res.status(404).send(`Galaxy with ID ${req.params.id} not found`);
        }

        // Update properties
        if (req.body.name) toUpdate.name = req.body.name;
        if (req.body.year) toUpdate.year = req.body.year;
        if (req.body.inventor) toUpdate.inventor = req.body.inventor;
        if (req.body.distance) toUpdate.distance = req.body.distance;
        if (req.body.type) toUpdate.type = req.body.type;

        const result = await toUpdate.save();
        res.send(result);
    } catch (err) {
        res.status(500).send(`Error updating galaxy: ${err}`);
    }
};

// Delete a galaxy (Delete)
exports.galaxy_delete = async function (req, res) {
    console.log("Deleting Galaxy ID:", req.params.id);
    try {
        const result = await Galaxy.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).send(`Galaxy with ID ${req.params.id} not found`);
        }
        res.send(result);
    } catch (err) {
        res.status(500).send(`Error deleting galaxy: ${err}`);
    }
};

// Render view for a single galaxy
exports.galaxy_view_one_Page = async function (req, res) {
    console.log("Rendering detail view for Galaxy ID:", req.query.id);
    try {
        const result = await Galaxy.findById(req.query.id);
        if (!result) {
            return res.status(404).send("Galaxy not found");
        }
        res.render("galaxydetail", { title: "Galaxy Detail", toShow: result });
    } catch (err) {
        res.status(500).send(`Error rendering detail page: ${err}`);
    }
};

// Render page to create a new galaxy
exports.galaxy_create_Page = function (req, res) {
    console.log("Rendering Create Galaxy Page");
    try {
        res.render("galaxycreate", { title: "Create Galaxy" });
    } catch (err) {
        res.status(500).send(`Error rendering create page: ${err}`);
    }
};

// Render page to update a galaxy
exports.galaxy_update_Page = async function (req, res) {
    console.log("Rendering Update Galaxy Page for ID:", req.query.id);
    try {
        const result = await Galaxy.findById(req.query.id);
        if (!result) {
            return res.status(404).send("Galaxy not found");
        }
        res.render("galaxyupdate", { title: "Update Galaxy", toShow: result });
    } catch (err) {
        res.status(500).send(`Error rendering update page: ${err}`);
    }
};

// Render page to delete a galaxy
exports.galaxy_delete_Page = async function (req, res) {
    console.log("Rendering Delete Galaxy Page for ID:", req.query.id);
    try {
        const result = await Galaxy.findById(req.query.id);
        if (!result) {
            return res.status(404).send("Galaxy not found");
        }
        res.render("galaxydelete", { title: "Delete Galaxy", toShow: result });
    } catch (err) {
        res.status(500).send(`Error rendering delete page: ${err}`);
    }
};
