const responseHandler = require('../../util/response/ResponseHandler');
const jwtUtil = require('../../util/jwt/JwtUtils');

function verifyAuthorization(authorization) {
    const token = jwtUtil.resolveToken(authorization);
    if (!token) throw Error("적합하지 않은 사용자입니다.");
    return token;
}

function verifyToken(token) {
    const user = jwtUtil.verify(token);
    if (user.message === 'jwt expired') throw Error('TokenExpiredError');
    if (!user.ok) throw Error("적합하지 않은 사용자입니다.");
    return user.id;
}

module.exports = {

    /**
     *
     * @param req : Request
     * @param res : Response
     * @param next
     */

    accessFilter : (req, res, next) => {
        try {
            const {authorization} = req.headers;
            const token = verifyAuthorization(authorization);
            req.body.authId = verifyToken(token);
            next();
        }catch (error) {
            responseHandler.unAuthorized(res, error.message);
        }
}}

