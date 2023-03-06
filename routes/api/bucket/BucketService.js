const bucketStorage = require('./BucketStorage');
const {sequelize, bucket} = require("../../../models/index");

const BucketService = {
    getMyBuckets : async function (memberId) {
        return sequelize.transaction(async (transaction) => {
            return await bucketStorage.getBuckets(memberId, transaction);
        })
    }
}

module.exports = BucketService;