const memberStorage = require('../member/MemberStorage');
const {sequelize} = require("../../../models");

const MemberService = {
    getMember : async function (memberId) {
        return sequelize.transaction(async (transaction) => {
            //이메일 검증
            const {email, firstName, lastName, gender, nickName} = await memberStorage.getMemberById(memberId, transaction);
            return {email, firstName, lastName, gender, nickName};
        })
    }
}

module.exports = MemberService;