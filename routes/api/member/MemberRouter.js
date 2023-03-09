const express = require('express');
const router = express.Router();
const responseHandler = require("../../../util/response/ResponseHandler");
const memberService = require('./MemberService');

router.get('/my', async (req, res) => {
    try {
        const {authId} = req.body;
        const myInfo = await memberService.getMember(authId);
        responseHandler.setIsOkToJson(res);
        res.send(myInfo);
    } catch (error) {
        responseHandler.unAuthorized(res);
    }
})

router.put('/my', async (req, res) => {
    try {
        const {authId, nickName, favorite, profileImage} = req.body;
        await memberService.updateMyInfo(authId, nickName, favorite, profileImage);
        responseHandler.setIsOkToJson(res);
        res.send({message:"success"});
    } catch (error) {
        responseHandler.badRequest(res);
    }
})

router.delete('/my', async (req, res) => {
    try {
        const {authId} = req.body;
        await memberService.disable(authId);
        responseHandler.setIsOkToJson(res);
        res.send({message:"success"} );
    } catch (error) {
        responseHandler.badRequest(res);
    }
})

module.exports = router;