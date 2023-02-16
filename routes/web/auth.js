const express = require('express');
const router = express.Router();
const path = require("path");

router.get('/:hash', (req, res) => {
    const filePath = path.join(__dirname,'..','..', 'public', 'auth.html');
    res.sendFile(filePath);
})

module.exports = router;