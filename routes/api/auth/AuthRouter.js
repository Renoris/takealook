const express = require('express');
const router = express.Router();
const authService = require('./AuthService');
const responseHandler = require("../../../util/response/ResponseHandler");
const path = require("path");

/**
 * 로그인 메일 요청
 */
router.post('/', async (req, res) => {
    try {
        const { email } = req.body;
        //로그인 이메일 보내기
        await authService.doSendLoginEmail(email);

        //이메일 보내기 성공시 응답
        responseHandler.setIsOkToJson(res);
        res.send({message:"success"});
    } catch (error) {
        responseHandler.badRequest(res, error.message);
    }
})

router.get('/:hash', async (req, res) => {
    const {hash} = req.params;
    try {
        const tokens = await authService.registerTokenByHash(hash);
        res.send(tokens);
    } catch (error) {
        responseHandler.badRequest(res, error.message);
    }
})

module.exports = router;