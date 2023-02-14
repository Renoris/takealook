const {auth_info} = require('../../../models/index');
const {Op} = require('sequelize');

const AuthStorage = {
    getAuthByHashAndNow : async function (hash) {
        return await auth_info.findOne({where : {
            hash : {[Op.eq] : hash}},
            expire : {[Op.lt] : new Date()}
        });
    },

    insertAuth : async function (email, hash) {
        const expire = new Date();
        expire.setMinutes(expire.getMinutes() +5);
        await auth_info.create({email, hash, expire})
    }
}

module.exports = AuthStorage;