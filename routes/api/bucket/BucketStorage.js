const {bucket, bucket_item, movie} = require('../../../models/index');
const {Op} = require('sequelize');

const MemberStorage = {
    getBuckets : async function (memberId, transaction) {
        const result =  await bucket.findAll({
            attributes : [['id', 'bucketId'],['bucket_name', 'bucketName']],
            include: [
                {
                    model: bucket_item,
                    attributes:[['bucket_id','connectbid'], ['movie_id','connectmid']],
                    include: [
                        {
                            attributes:['thumb'],
                            model: movie
                        }]}]
            ,where : {ownerId : {[Op.eq] : memberId}}, transaction, order: [['bucketId', 'DESC']]}, transaction);


        return result.map((item) => {
            return {
                bucketId:item.dataValues.bucketId,
                bucketName:item.dataValues.bucketName,
                bucketThumbs:item.bucket_items.map((bItem) => {
                    return bItem.movie.dataValues.thumb;
                })
            }
        })

    },

    getBucket : async function (memberId,bucketId ,transaction) {
        const result = await bucket.findOne({
            attributes : [['id', 'bucketId'],['bucket_name', 'bucketName']],
            include: [
                {
                    model: bucket_item,
                    attributes:[['bucket_id','connectbid'], ['movie_id','movieId']]}
             ],where : {[Op.and]: [
                 {ownerId : {[Op.eq] : memberId}}, {id : {[Op.eq] : bucketId}}]} ,transaction});

        return {
            bucketId:result.bucketId,
            bucketName:result.bucketName,
            bucketItemMovieIds:result.bucket_items.map((bItem) => { return bItem.movieId})
        }
    },

    createBucket: async function (authId, bucketName, publish, transaction) {
        return await bucket.create({
            ownerId:authId,
            bucketName,
            publish
        }, {transaction});
    },

    updateBucket: async function (authId, bucketId ,bucketName, publish, transaction) {
        const myBucket = await bucket.findOne({where : {[Op.and] : [{ownerId : {[Op.eq]:authId}}, {id: {[Op.eq]: bucketId}}]}, transaction})
        if (!myBucket) throw Error("해당 영화 리스트가 없습니다.");

        if(bucketName) {
            myBucket.bucketName = bucketName;
        }
        if (publish) {
            myBucket.publish = publish;
        }
        await myBucket.save({transaction});
    },

    deleteBucket: async function (authId, bucketId, transaction) {
        const myBucket = await bucket.findOne({where : {[Op.and] : [ {ownerId : {[Op.eq]:authId}}, {id: {[Op.eq]: bucketId}}]}})
        if (!myBucket) throw Error("해당 영화 리스트가 없습니다.");
        await myBucket.destroy({transaction});
    }

}

module.exports = MemberStorage;