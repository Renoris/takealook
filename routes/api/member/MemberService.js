const domain = (process.env.NODE_ENV === 'development') ? process.env.DEVELOPMENT_HOST : '';
const memberStorage = require('../member/MemberStorage');
const jwtUtil = require("../../../util/jwt/JwtUtils");
const {sequelize} = require("../../../models");
const authStorage = require("../auth/AuthStorage");
const smtp = require("../../../util/smtp/KaKaoSmtp");
const smtpMessage = require("../../../util/message/EmailVerifyMessage");

const MemberService = {
    getMember : async function (memberId) {
        await sequelize.transaction(async (transaction) => {
            //이메일 검증
            const member = await memberStorage.getMemberById(memberId, transaction);


        })
    }
}

module.exports = MemberService;