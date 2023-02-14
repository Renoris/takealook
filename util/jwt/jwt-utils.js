// jwt-util.js
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const {Op} = require('sequelize');
const {member} = require('../../models/index');

module.exports = {
    sign: (user) => { // access token 발급
        const payload = { // access token에 들어갈 payload
            id: user.id,
            role: user.role,
        };

        return jwt.sign(payload, secret, { // secret으로 sign하여 발급하고 return
            algorithm: 'HS256', // 암호화 알고리즘
            expiresIn: '2h', 	  // 유효기간
        });
    },
    verify: (token) => { // access token 검증
        let decoded = null;
        try {
            decoded = jwt.verify(token, secret);
            return {
                ok: true,
                id: decoded.id,
                role: decoded.role,
            };
        } catch (err) {
            return {
                ok: false,
                message: err.message,
            };
        }
    },
    refresh: () => { // refresh token 발급
        return jwt.sign({}, secret, { // refresh token은 payload 없이 발급
            algorithm: 'HS256',
            expiresIn: '7d',
        });
    },
    refreshVerify: async (token, userId) => { // refresh token 검증
        try {
            const data = await member.findOne({
                attributes: ['refresh_token'],
                where : {
                    id : {
                        [Op.eq] : userId
                    },
                    token_expire : {
                        [Op.lt] : new Date()
                    }
                }
            }) // refresh token 가져오기

            if (token === data.refresh_token) {
                try {
                    jwt.verify(token, secret);
                    return true;
                } catch (err) {
                    return false;
                }
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    },
};