const {bucket_item} = require('../../../models/index');
const {Op} = require('sequelize');

const MemberStorage = {
    findBucketItem : async function (bucketId, movieId, transaction) {
        return  await bucket_item.findOne({where : {
                bucketId, movieId}, transaction});
    },

    createBucketItem: async function (bucketId, movieId, transaction) {
        await bucket_item.create({
            bucketId,
            movieId
        }, {transaction});
    },

}

module.exports = MemberStorage;