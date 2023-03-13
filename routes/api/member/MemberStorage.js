const {member} = require('../../../models/index');
const {Op} = require('sequelize');

const MemberStorage = {
    getMemberByNickName : async function (nickName, transaction) {
        return await member.findOne({where : {nickName : nickName, disable : 0}, transaction});
    },

    getMemberByEmail : async function (email, transaction) {
        return await member.findOne({where : {email : email.trim(), disable : 0}, transaction});
    },

    getMemberById : async function (id, transaction) {
        return await member.findOne({where : {id, disable : 0}, transaction});
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
        console.log(favorite);
        user.favorite = favorite;
        user.profileImage = profileImage;
        user.save(transaction);
    },

    disable: async function (authId ,transaction) {
        const user = await member.findOne({where : {id :authId}, transaction});
        if (!user) { throw Error("로그인 되지 않은 사용자 입니다")}
        user.disable = true;
        user.save(transaction);
    },
}

module.exports = MemberStorage;