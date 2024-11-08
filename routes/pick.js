// routes/pick.js
const express = require('express');
const router = express.Router();

// GET route to render the randomitem.pug template
router.get('/', (req, res) => {
    res.render('randomitem', { title: 'A Random Item' });
});

module.exports = router;
