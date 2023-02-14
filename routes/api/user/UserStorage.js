const {member} = require('../../../models/index');
const {Op} = require('sequelize');

const UserStorage = {
    getMemberByEmail : async function (email) {
        return await member.findOne({where : {email : {[Op.eq] : email.trim()}}});
    },

    getMemberById : async function (id) {
        return await member.findOne({where : {id : {[Op.eq] : id}}});
    }
}

module.exports = UserStorage;