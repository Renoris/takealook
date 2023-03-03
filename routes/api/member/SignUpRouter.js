const express = require('express');
const router = express.Router();
const responseHandler = require("../../../util/response/ResponseHandler");
const memberService = require('./MemberService');

/**
 * 닉네임확인
 */
router.get('/valid/nickname', async (req, res) => {
    try {
        const {query} = req.query;
        if (!query) throw Error('닉네임이 제공되지 않았습니다.');
        const member = await memberService.getMemberByNickName(query);
        responseHandler.setIsOkToJson(res);
        res.send({isExist : Boolean(member)});
    } catch (error) {
        responseHandler.badRequest(res, error.message);
    }
})

/**
 * 회원가입 요청
 */
router.post('/', async (req, res) => {
    try {
        const {email, firstName, lastName, gender, nickName} = req.body;
        await memberService.signUp({email, firstName, lastName, gender, nickName});
        responseHandler.setIsOkToJson(res);
        res.send({message:"success"});
    } catch (error) {
        responseHandler.badRequest(res, error.message);
    }
})


module.exports = router;