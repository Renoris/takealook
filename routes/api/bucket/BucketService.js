const bucketStorage = require('./BucketStorage');
const {sequelize, bucket} = require("../../../models/index");

const BucketService = {
    getMyBuckets : async function (memberId) {
        return sequelize.transaction(async (transaction) => {
            return await bucketStorage.getBuckets(memberId, transaction);
        })
    },
    getMyBucket : async function (memberId, bucketId) {
        return sequelize.transaction(async (transaction) => {
            return await bucketStorage.getBucket(memberId, bucketId, transaction);
        })
    },

    createBucket : async function (authId, bucketName, publish) {
        return sequelize.transaction(async (transaction) => {
            return await bucketStorage.createBucket(authId, bucketName, publish, transaction);
        })
    },

    updateBucket : async function (authId, bucketId, bucketName, publish) {
        return sequelize.transaction(async (transaction) => {
            return await bucketStorage.updateBucket(authId, bucketId ,bucketName, publish, transaction);
        })
    },

    deleteBucket : async function (authId, bucketId) {
        return sequelize.transaction(async (transaction) => {
            return await bucketStorage.deleteBucket(authId, bucketId, transaction);
        })
    },

}

module.exports = BucketService;