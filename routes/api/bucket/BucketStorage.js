const {bucket, bucket_item, movie} = require('../../../models/index');
const {Op} = require('sequelize');

const MemberStorage = {
    getBuckets : async function (memberId, transaction) {
        const result = await bucket.findAll({
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
            ,where : {ownerId : {[Op.eq] : memberId}}, transaction});


        return result.map((item) => {
            return {
                bucketId:item.bucketId,
                bucketName:item.bucketName,
                bucketThumbs:item.bucket_items.map((bItem) => {
                    return bItem.movie.thumb;
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
                    attributes:[['bucket_id','connectbid'], ['movie_id','connectmid']],
                    include: [
                        {
                            attributes:[['id', 'movieId'],'title','genre','country','image','pub_date','thumb'],
                            model: movie
                        }]}
             ],where : {[Op.and]: [
                 {ownerId : {[Op.eq] : memberId}}, {id : {[Op.eq] : bucketId}}]} ,transaction});
        return {
            bucketId:result.bucketId,
            bucketName:result.bucketName,
            bucketItems:result.bucket_items.map((bItem) => { return {movieId:bItem.movie.movieId, title:bItem.movie.title, genre:bItem.movie.genre, country:bItem.movie.country, image:bItem.movie.image, pubDate:bItem.movie.pubDate, thumb:bItem.movie.thumb}})
        }
    },

    createBucket: async function (authId, bucketName, publish, transaction) {
        await bucket.create({
            ownerId:authId,
            bucketName,
            publish
        }, {transaction});
    },

    updateBucket: async function (authId, bucketId ,bucketName, publish, transaction) {
        const myBucket = await bucket.findOne({where : {[Op.and] : [ {ownerId : {[Op.eq]:authId}}, {id: {[Op.eq]: bucketId}}]}})
        if (!myBucket) throw Error("?????? ?????? ???????????? ????????????.");

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
        if (!myBucket) throw Error("?????? ?????? ???????????? ????????????.");
        await myBucket.destroy({transaction});
    }

}

module.exports = MemberStorage;