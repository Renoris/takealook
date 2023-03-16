const express = require('express');
const router = express.Router();
const responseHandler = require("../../../util/response/ResponseHandler");
const bucketService = require('./BucketService');

router.get('/', async (req, res) => {
    try {
        const {authId} = req.body;
        const result = await bucketService.getMyBuckets(authId);
        responseHandler.setIsOkToJson(res);
        res.send(result);
    } catch (error) {
        responseHandler.badRequest(res, error.message);
    }
})

router.get('/:bucketId', async (req, res) => {
    try {
        const {authId} = req.body;
        const {bucketId} = req.params;
        const result = await bucketService.getMyBucket(authId, bucketId);
        responseHandler.setIsOkToJson(res);
        res.send(result);
    } catch (error) {
        responseHandler.badRequest(res, error.message);
    }
})

router.post('/', async (req, res) => {
    try {
        const {authId, bucketName, publish} = req.body;
        const result = await bucketService.createBucket(authId, bucketName, publish);
        responseHandler.setIsOkToJson(res);
        res.send({message : "success", bucketId:result.id});
    } catch (error) {
        responseHandler.badRequest(res, error.message);
    }
})

router.patch('/title/:bucketId', async (req, res) => {
    try {
        const {bucketId} = req.params;
        const {authId, bucketName} = req.body;
        await bucketService.updateBucketTitle(authId,bucketId ,bucketName);
        responseHandler.setIsOkToJson(res);
        res.send({message : "success"});
    } catch (error) {
        responseHandler.badRequest(res, error.message);
    }
})

router.patch('/publish/:bucketId', async (req, res) => {
    try {
        const {bucketId} = req.params;
        const {authId, publish} = req.body;
        await bucketService.updateBucketPublish(authId, bucketId ,publish);
        responseHandler.setIsOkToJson(res);
        res.send({message : "success"});
    } catch (error) {
        responseHandler.badRequest(res, error.message);
    }
})

router.delete('/:bucketId', async (req, res) => {
    try {
        const {bucketId} = req.params;
        const {authId} = req.body;
        await bucketService.deleteBucket(authId, bucketId);
        responseHandler.setIsOkToJson(res);
        res.send({message : "success"});
    } catch (error) {
        responseHandler.badRequest(res, error.message);
    }
})

module.exports = router;