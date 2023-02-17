const express = require('express');
const router = express.Router();
const responseHandler = require("../../../util/response/ResponseHandler");
const path = require("path");

router.get('/my', (req, res) => {
    try {
        const {authId} = req.body;
    } catch (error) {
        responseHandler.badRequest(res);
    }
})

module.exports = router;