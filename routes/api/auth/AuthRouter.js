const express = require('express');
const router = express.Router();
const authService = require('./AuthService');
const responseBuilder = require("../../../util/response/ResponseBuilder");

/**
 * 로그인 메일 요청
 */
router.post('/', async (req, res) => {
    const { email } = req.body;
    try {
        if (!email) responseBuilder.badRequest(res);
        await authService.doSendLoginEmail(res, email);
    } catch (error) {
        await responseBuilder.internalError(res);
    }
})



module.exports = router;