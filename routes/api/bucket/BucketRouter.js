const express = require('express');
const router = express.Router();
const responseHandler = require("../../../util/response/ResponseHandler");
const bucketService = require('./BucketService');

router.get('/', async (req, res) => {
    try {
        const {authId} = req.body;
        console.log(authId);
        const result = await bucketService.getMyBuckets(authId);
        console.log(result);
        responseHandler.setIsOkToJson(res);
        res.send(result);
    } catch (error) {
        responseHandler.unAuthorized(res);
    }
})

module.exports = router;