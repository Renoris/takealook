const responseHandler = require('../util/response/ResponseHandler');
const jwtUtil = require('../util/jwt/JwtUtils');

module.exports = {

    /**
     *
     * @param req : Request
     * @param res : Response
     * @param next
     */

    accessFilter : (req, res, next) => {
        const {authorization} = req.headers;
        const token = jwtUtil.resolveToken(authorization);
        if (!token) {responseHandler.unAuthorized(res); return;}
        const user = jwtUtil.verify(token);
        if (!user.ok) {responseHandler.unAuthorized(res); return;}
        req.body.authId = user.id;
        next();
}}

