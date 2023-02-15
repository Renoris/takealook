const crypto = require("crypto");
const smtpMessage = require("../../../util/message/EmailVerifyMessage");
const smtp = require("../../../util/smtp/KaKaoSmtp");
const domain = (process.env.NODE_ENV === 'development') ? process.env.DEVELOPMENT_HOST : '';
const {sequelize} = require('../../../models/index');
const authStorage = require('./AuthStorage');
const memberStorage = require('../user/MemberStorage');
const jwtUtil = require("../../../util/jwt/JwtUtils");

function getHashByEmail(email) {
    const salt = crypto.randomBytes(128).toString('base64'); //랜덤상수 생성
    return crypto.createHash('sha512').update(email + salt).digest('hex'); //랜덤 sha 이메일 생성
}

function getLoginUrl (email, hash) {
    return `${domain}/api/auth/${hash}`;
}

const AuthService = {
    doSendLoginEmail : async function (email) {
        try {
            await sequelize.transaction( async (transaction) => {
                if (!await memberStorage.getMemberByEmail(email, transaction)) return false;
                const hash = getHashByEmail(email);
                const url = getLoginUrl(email, hash);
                await authStorage.insertAuth(email, hash, transaction);
                await smtp(email, smtpMessage.subject(), smtpMessage.message(url));
            })
        }catch (error) {
            throw(error);
        }
    },

    registerTokenByHash : async function (hash) {
        try {
            return sequelize.transaction(async (transaction) => {
                const member = await authStorage.getMemberByHash(hash, transaction);
                if (!member) {throw Error("해당 유저가 존재하지 않습니다.")}
                const refreshToken = await jwtUtil.refresh(member, transaction);
                await memberStorage.setRefreshTokenById(member.id, refreshToken, transaction);
                const accessToken = jwtUtil.sign(member);
                return {accessToken, refreshToken};
            })

        } catch (error) {
            throw (error);
        }
    },
}

module.exports = AuthService;