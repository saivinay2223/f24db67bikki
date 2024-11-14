const Galaxie = require('../models/galaxie'); // Adjust if model filename is different

// List of all Galaxies
exports.galaxie_list = async function(req, res) {
    try {
        const galaxies = await Galaxie.find();
        res.render('galaxies', { results: galaxies });
    } catch (err) {
        res.status(500).send(`Error: ${err}`);
    }
};

// Detail of a specific Galaxy
exports.galaxie_detail = async function(req, res) {
    try {
        const galaxie = await Galaxie.findById(req.params.id);
        res.send(galaxie);  // Changed to `res.send` for consistency
    } catch (err) {
        res.status(500).send(`Error fetching details: ${err}`);
    }
};

// Create Galaxy on POST
exports.galaxie_create_post = async function(req, res) {
    let document = new Galaxie();
    document.name = req.body.name;
    document.distance = req.body.distance;
    document.type = req.body.type;
    try {
        let result = await document.save();
        res.send(result);  // Changed to `res.send` for consistency
    } catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);  // Adjusted to match the second code's error handling
    }
};

// Delete Galaxy on DELETE
exports.galaxie_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: Galaxy delete DELETE ' + req.params.id);  // Placeholder response for consistency
};

// Update Galaxy on PUT
exports.galaxie_update_put = function(req, res) {
    res.send('NOT IMPLEMENTED: Galaxy update PUT ' + req.params.id);  // Placeholder response for consistency
};
