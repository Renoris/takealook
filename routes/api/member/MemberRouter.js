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

module.exports = router;