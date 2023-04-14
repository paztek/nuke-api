const express = require('express');
const router = express.Router();
const masterCode = require('../data/master-code');

router.get('', function (req, res) {
    return res.json({ masterCode });
});

module.exports = router;
