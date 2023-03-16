const bucketItemStorage = require('./BucketItemStorage');
const bucketStorage = require('../bucket/BucketStorage');
const {sequelize} = require("../../../models/index");
const BucketItemService = {
    createBucketItem : async function (authId, bucketId, movieId) {
        return sequelize.transaction(async (transaction) => {
            if (!await bucketStorage.getMyBucket(authId, bucketId, transaction)) throw Error("해당 조건에 충족하는 영화 리스트가 없습니다.");
            if (await bucketItemStorage.findBucketItem(bucketId,movieId,transaction)) throw Error("해당 영화는 이미 리스트에 존재합니다.");
            return bucketItemStorage.createBucketItem(bucketId, movieId, transaction);
        })
    },

    deleteBucketItem : async function (authId, bucketId, movieId) {
        return sequelize.transaction(async (transaction) => {
            if (!await bucketStorage.getMyBucket(authId, bucketId, transaction)) throw Error("해당 조건에 충족하는 영화 리스트가 없습니다.");
            const item = await bucketItemStorage.findBucketItem(bucketId,movieId,transaction);
            if (!item) throw Error("해당 영화는 리스트에 존재하지 않습니다.");
            await item.destroy({transaction});
        })
    },

}

module.exports = BucketItemService;