const {member} = require('../../../models/index');
const {Op} = require('sequelize');

const MemberStorage = {
    getMemberByNickName : async function (nickName, transaction) {
        return await member.findOne({where : {nickName : {[Op.eq] : nickName}}, transaction});
    },

    getMemberByEmail : async function (email, transaction) {
        return await member.findOne({where : {email : {[Op.eq] : email.trim()}}, transaction});
    },

    getMemberByEmailWithNickName : async function (email, nickName, transaction) {
        return await member.findOne({where : {[Op.or] : [{email}, {nickName}]}, transaction});
    },

    getMemberById : async function (id, transaction) {
        return await member.findByPk(id, {transaction});
    },

    insert: async function (userInfo, transaction) {
        userInfo.created_at = new Date();
        userInfo.disable = false;
        userInfo.role = 'member';
        await member.create(userInfo, {transaction});
    },

    update: async function (authId, nickName, favorite, profileImage ,transaction) {
        const user = await member.findOne({where : {id :authId}, transaction});
        if (!user) { throw Error("로그인 되지 않은 사용자 입니다")}
        user.nickName = nickName;
        user.favorite = favorite;
        user.save({transaction});
    }
}

module.exports = MemberStorage;