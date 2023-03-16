const express = require('express');
const router = express.Router();
const responseHandler = require("../../../util/response/ResponseHandler");
const bucketService = require('./BucketService');

router.get('/', async (req, res) => {
    try {
        const {limit, offset} = req.query;
        const result = await bucketService.getPublishBuckets(limit, offset);
        responseHandler.setIsOkToJson(res);
        res.send(result);
    } catch (error) {
        responseHandler.badRequest(res, error.message);
    }
})

router.get('/:bucketId', async (req, res) => {
    try {
        const {bucketId} = req.params;
        const result = await bucketService.getPublishBucket(bucketId);
        responseHandler.setIsOkToJson(res);
        res.send(result);
    } catch (error) {
        responseHandler.badRequest(res, error.message);
    }
})

module.exports = router;