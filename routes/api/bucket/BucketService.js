const bucketStorage = require('./BucketStorage');
const {sequelize, bucket} = require("../../../models/index");

const BucketService = {
    getPublishBuckets : async function () {
        return sequelize.transaction(async (transaction) => {
            return await bucketStorage.getPublishBuckets(transaction);
        })
    },
    getPublishBucket : async function (bucketId) {
        return sequelize.transaction(async (transaction) => {
            return await bucketStorage.getPublishBucket(bucketId, transaction);
        })
    },

    getMyBuckets : async function (memberId) {
        return sequelize.transaction(async (transaction) => {
            return await bucketStorage.getMyBuckets(memberId, transaction);
        })
    },
    getMyBucket : async function (memberId, bucketId) {
        return sequelize.transaction(async (transaction) => {
            return await bucketStorage.getMyBucket(memberId, bucketId, transaction);
        })
    },

    createBucket : async function (authId, bucketName, publish) {
        return sequelize.transaction(async (transaction) => {
            return await bucketStorage.createBucket(authId, bucketName, publish, transaction);
        })
    },

    updateBucketTitle : async function (authId, bucketId, bucketName) {
        return sequelize.transaction(async (transaction) => {
            if (!bucketName) throw Error("버켓 이름이 없습니다.");
            return await bucketStorage.updateBucketTitle(authId, bucketId ,bucketName, transaction);
        })
    },

    updateBucketPublish : async function (authId, bucketId, publish) {
        return sequelize.transaction(async (transaction) => {
            if (publish === undefined || publish === null || typeof publish !== 'boolean') throw Error("버켓 공유 여부를 지정하지 않았습니다.");
            return await bucketStorage.updateBucketPublish(authId, bucketId ,publish, transaction);
        })
    },

    deleteBucket : async function (authId, bucketId) {
        return sequelize.transaction(async (transaction) => {
            return await bucketStorage.deleteBucket(authId, bucketId, transaction);
        })
    },

}

module.exports = BucketService;