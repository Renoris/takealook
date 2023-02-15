const {member} = require('../../../models/index');
const {Op} = require('sequelize');

const MemberStorage = {
    getMemberByEmail : async function (email, transaction) {
        return await member.findOne({where : {email : {[Op.eq] : email.trim()}}}, {transaction});
    },

    getMemberById : async function (id, transaction) {
        return await member.findByPk(id, {transaction});
    },

    setRefreshTokenById : async function (id, refreshToken, transaction) {
        return await member.update({refreshToken},{where : {id : {[Op.eq] : id}}}, {transaction});
    }
}

module.exports = MemberStorage;