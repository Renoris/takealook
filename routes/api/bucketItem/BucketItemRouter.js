const express = require('express');
const router = express.Router();
const responseHandler = require("../../../util/response/ResponseHandler");
const bucketItemService = require("./BucketItemService");

/**
 * 버켓 아이템 생성
 */
router.post('/', async (req, res) => {
    try {
        const {authId, bucketId, movieId} = req.body;
        await bucketItemService.createBucketItem(authId, bucketId, movieId);
        responseHandler.setIsOkToJson(res);
        res.send({message : "success"});
    } catch (error) {
        responseHandler.badRequest(res, error.message);
    }
})

/**
 * 버켓 아이템 제거
 */
router.delete('/', async (req, res) => {
    try {
        const {authId, bucketId, movieId} = req.body;
        await bucketItemService.deleteBucketItem(authId, bucketId, movieId);
        responseHandler.setIsOkToJson(res);
        res.send({message : "success"});
    } catch (error) {
        responseHandler.badRequest(res, error.message);
    }
})
module.exports = router;