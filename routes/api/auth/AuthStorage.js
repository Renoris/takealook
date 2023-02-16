const {member, auth_info} = require('../../../models/index');
const {Op} = require('sequelize');

const AuthStorage = {
    insertAuth : async function (email, hash, transaction) {
        const expire = new Date();
        expire.setMinutes(expire.getMinutes() + 5);
        const auth_info_item = await auth_info.findOne({where : {email : {[Op.eq] : email}}});
        if (auth_info_item) {
            auth_info_item.expire = expire;
            auth_info_item.hash = hash;
            await auth_info_item.save();
        } else {
            await auth_info.create({email, hash, expire},{transaction});
        }
    },

    getMemberByHash : async function (hash, transaction) {
        const {email} = await auth_info.findOne({where : {hash : {[Op.eq] : hash}, expire : {[Op.gt] : new Date()}}}, {transaction});
        return await member.findOne({where : {email : {[Op.eq] : email}}}, {transaction})
    },

    deleteAuth: async function (hash, transaction) {
        await auth_info.destroy({where : {hash : {[Op.eq]: hash}}, transaction});
    }
}

module.exports = AuthStorage;