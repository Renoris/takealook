const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', function(req, res, next) {
    const filePath = path.join(__dirname,'..', 'public', 'index.html');
    res.sendFile(filePath);
});