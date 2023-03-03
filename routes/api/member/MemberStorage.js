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
    }
}

module.exports = MemberStorage;