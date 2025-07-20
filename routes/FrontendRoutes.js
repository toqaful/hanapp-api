const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { version: Date.now() });
});

router.get('/oauth-success', (req, res) => {
    res.render('oauth-success', { version: Date.now() });
});

module.exports = router;