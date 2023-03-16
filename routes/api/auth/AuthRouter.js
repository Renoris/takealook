const express = require('express');
const router = express.Router();
const authService = require('./AuthService');
const responseHandler = require("../../../util/response/ResponseHandler");
const jwtUtil = require('../../../util/jwt/JwtUtils');

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
        if (error.message === "해당 이메일은 저장되어 있지 않습니다.") {
            responseHandler.unAuthorized(res, error.message);
        } else {
            responseHandler.badRequest(res, error.message);
        }
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

router.post('/refresh', async (req, res) => {
    try {
        const {authorization} = req.headers;
        const token = jwtUtil.resolveToken(authorization);
        const {id, message, role} = jwtUtil.verify(token);
        if (message === 'TokenExpiredError') {
            const {refreshToken} = req.body;
            if (!refreshToken) throw Error("리프레시 토큰이 없습니다.");
            if (!await jwtUtil.refreshVerify(token, id)) throw Error("리프레시 토큰이 올바르지 않습니다.");
            const refreshedAccessToken = jwtUtil.sign({id, role});
            res.send({accessToken : refreshedAccessToken});
        } else {
            throw Error("토큰이 만료되지 않았습니다.")
        }
    }catch (error) {
        responseHandler.badRequest(res, error.message);
    }

})

module.exports = router;