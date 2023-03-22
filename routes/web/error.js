const express = require('express');
const router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    const filePath = path.join(__dirname,'..','..', 'views', 'error.html');
    res.sendFile(filePath);
});

module.exports = router;