const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const results = [
        { name: 'Item 1', price: '$10' },
        { name: 'Item 2', price: '$20' },
        { name: 'Item 3', price: '$30' }
    ];
    res.render('searchresults', { title: 'Search Results', results });
});

module.exports = router;
