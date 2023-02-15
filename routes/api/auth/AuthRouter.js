const express = require('express');
const router = express.Router();
const authService = require('./AuthService');
const responseHandler = require("../../../util/response/ResponseHandler");
const path = require("path");

/**
 * 로그인 메일 요청
 */
router.post('/', async (req, res) => {
    const { email } = req.body;
    try {
        if (!email) {
            responseHandler.badRequest(res)
            return;
        }
        await authService.doSendLoginEmail(email);
        res.redirect("/wait"); // 이 부분 회의 : 로그인 메일을 보낸 직후 어떻게 할건지?
    } catch (error) {
        responseHandler.badRequest(res);
    }
})

router.get('/:hash', (req, res) => {
    const filePath = path.join(__dirname,'..','..','..', 'public', 'auth.html');
    res.sendFile(filePath);
})

router.post('/:hash', async (req, res) => {
    const {hash} = req.params;
    try {
        if (!hash) {throw Error("hash 값이 없습니다.")}
        const tokens = await authService.registerTokenByHash(hash);
        res.send(tokens);
    } catch (error) {
        responseHandler.badRequest(res);
    }
})

module.exports = router;