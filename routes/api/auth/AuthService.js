const crypto = require("crypto");
const smtpEmailContent = require("../../../util/message/EmailContent");
const {sendMailHtml, sendMailText} = require("../../../util/smtp/KaKaoSmtp");
const domain = (process.env.NODE_ENV === 'development') ? process.env.DEVELOPMENT_HOST : '';
const {sequelize} = require('../../../models/index');
const authStorage = require('./AuthStorage');
const memberStorage = require('../member/MemberStorage');
const jwtUtil = require("../../../util/jwt/JwtUtils");

function getHashByEmail(email) {
    const salt = crypto.randomBytes(128).toString('base64'); //랜덤상수 생성
    return crypto.createHash('sha512').update(email + salt).digest('hex'); //랜덤 sha 이메일 생성
}

function getLoginUrl(email, hash) {
    return `${domain}/auth/${hash}`;
}

const AuthService = {
    doSendLoginEmail: async function (email) {
        await sequelize.transaction(async (transaction) => {
            //이메일 검증
            if (!email) throw Error('이메일이 없습니다');
            const member = await memberStorage.getMemberByEmail(email, transaction);
            if (!member) throw Error("해당 이메일은 저장되어 있지 않습니다.");

            //이메일 기반 해시 생성
            const hash = getHashByEmail(email);

            //이메일+해시로 로그인 url 제작
            const url = getLoginUrl(email, hash);

            //이메일과 해시 저장
            const expire = new Date();
            expire.setMinutes(expire.getMinutes() + 5);

            await authStorage.insertAuth(email, hash, expire ,transaction);
            const userName = `${member.lastName} ${member.firstName}`;
            //메일보내기
            await sendMailHtml(email, smtpEmailContent.getSubject(), smtpEmailContent.getHtml(url, userName) , smtpEmailContent.getAttachment());
        })
    },

    registerTokenByHash: async function (hash) {
        return sequelize.transaction(async (transaction) => {
            // 해시값 검증
            if (!hash) throw Error("hash 값이 없습니다");

            // 해시값으로 멤버 추출
            const member = await authStorage.getMemberByHash(hash, transaction);
            if (!member) throw Error("해당 유저가 존재하지 않습니다.");

            //리프레시 토큰 생성
            const refreshToken = await jwtUtil.refresh(member, transaction);

            //리프레시 토큰 업데이트
            member.refreshToken = refreshToken;
            member.save({transaction});

            //어세스토큰 생성
            const accessToken = jwtUtil.sign(member);

            //사용된 해시값 제거
            await authStorage.deleteAuth(hash, transaction);

            return {accessToken, refreshToken};
        })
    },
}

module.exports = AuthService;