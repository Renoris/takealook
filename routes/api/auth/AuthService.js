const crypto = require("crypto");
const smtpMessage = require("../../../util/message/EmailVerifyMessage");
const smtp = require("../../../util/smtp/KaKaoSmtp");
const domain = (process.env.NODE_ENV === 'development') ? process.env.DEVELOPMENT_HOST : '';
const authStorage = require('./AuthStorage');
const userStorage = require('../user/UserStorage');
const responseBuilder = require('../../../util/response/ResponseBuilder')

function getHashByEmail(email) {
    const salt = crypto.randomBytes(128).toString('base64'); //랜덤상수 생성
    return crypto.createHash('sha512').update(email + salt).digest('hex'); //랜덤 sha 이메일 생성
}

function getLoginUrl (email, hash) {
    return `${domain}/api/auth/${hash}`;
}

const AuthService = {
    doSendLoginEmail : async function (email) {
        if (!await userStorage.getMemberByEmail(email)) return false;
        const hash = getHashByEmail(email);
        const url = getLoginUrl(email, hash);
        await authStorage.insertAuth(email, hash);
        await smtp(email, smtpMessage.subject(), smtpMessage.message(url));
    }
}

module.exports = AuthService;