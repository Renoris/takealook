const express = require('express');
const router = express.Router();
const responseHandler = require("../../../util/response/ResponseHandler");
const memberService = require('./MemberService');

/**
 * 회원가입 요청
 */
router.post('/', async (req, res) => {
    try {
        const {email, firstName, lastName, gender, nickName} = req.body;
        console.log(req.body);

        await memberService.signUp({email, firstName, lastName, gender, nickName});
        responseHandler.setIsOkToJson(res);
        res.send({message:"success"});
    } catch (error) {
        responseHandler.badRequest(res, error.message);
    }
})

module.exports = router;