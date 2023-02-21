const memberStorage = require('../member/MemberStorage');
const {sequelize, member} = require("../../../models/index");

const MemberService = {
    getMember : async function (memberId) {
        return sequelize.transaction(async (transaction) => {
            //이메일 검증
            const {email, firstName, lastName, gender, nickName} = await memberStorage.getMemberById(memberId, transaction);
            return {email, firstName, lastName, gender, nickName};
        })
    },



    signUp: async function(userInfo) {
        return sequelize.transaction(async (transaction) => {
            const {firstName, lastName, nickName, email, gender} = userInfo;
            console.log(userInfo);
            if (!userInfo.email) throw Error ("이메일이 없습니다.")
            if (await memberStorage.getMemberByEmail(email)) throw Error ("해당 이메일이 이미 존재합니다.");
            if (!firstName) throw Error ("이름이 없습니다.")
            if (!lastName) throw Error ("이름_성이 없습니다.")
            if (!gender) throw Error ("성별이 없습니다.")
            if (!nickName) throw Error ("닉네임이 없습니다.")

            return memberStorage.insert(userInfo, transaction);
        })
    }
}

module.exports = MemberService;