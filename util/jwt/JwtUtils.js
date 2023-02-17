// jwt-util.js
const jwt = require('jsonwebtoken');
const accessSecret = process.env.JWT_ACCESS;
const refreshSecret = process.env.JWT_REFRESH;
const {Op} = require('sequelize');
const {member} = require('../../models/index');

module.exports = {
    resolveToken: (authorization) => {
        if (!authorization) return null;
        if (!(typeof authorization === 'string')) return null
        if (!authorization.includes('bearer')) return null;
        return authorization.replace('bearer ','');
    },

    sign: (user) => { // access token 발급
        const payload = { // access token에 들어갈 payload
            id: user.id,
            role: user.role,
        };

        return jwt.sign(payload, accessSecret, { // secret으로 sign하여 발급하고 return
            algorithm: 'HS256', // 암호화 알고리즘
            expiresIn: '2h', 	  // 유효기간
        });
    },
    verify: (token) => { // access token 검증
        let decoded = null;
        try {
            decoded = jwt.verify(token, accessSecret);
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
    refresh: async (user) => { // refresh token 발급

        if (!user?.id) throw Error('유저데이터가 없습니다');
        return jwt.sign({id:user.id}, refreshSecret, {
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
                    jwt.verify(token, refreshSecret);
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
