const {bucket, bucket_item, movie} = require('../../../models/index');
const {Op} = require('sequelize');

const MemberStorage = {
    getPublishBuckets : async function (limit, offset ,transaction) {
        const result =  await bucket.findAll({
            attributes : [['id', 'bucketId'],['bucket_name', 'bucketName']],
            include: [{model: bucket_item, attributes:[['bucket_id','connectbid'], ['movie_id','connectmid']], include: [{attributes:[['id', 'movieId'],'thumb'], model: movie,}]}],
            where : {publish : 1},
            order: [['id', 'ASC'], [bucket_item, 'id', 'DESC']],
            limit:Number(limit),
            offset:Number(offset),
            subQuery:false,
            transaction});

        return result.map((item) => {
            return {
                bucketId:item.dataValues.bucketId,
                bucketName:item.dataValues.bucketName,
                bucketThumbs:item.bucket_items.map((bItem) => {
                    return {thumb:bItem.movie.dataValues.thumb,
                        movieId: bItem.movie.dataValues.movieId};
                })
            }
        })
    },

    getPublishBucket : async function ( bucketId , transaction) {
        const result = await bucket.findOne({
            attributes : [['id', 'bucketId'],['bucket_name', 'bucketName']],
            include: [
                {
                    model: bucket_item,
                    attributes:[['bucket_id','connectbid'], ['movie_id','connectmid']],
                    include: [
                        {
                            attributes:[['id', 'movieId'], 'title' ,'thumb'],
                            model: movie,
                        }]
                }],
            where : {
                [Op.and]: [{publish : 1}, {id : bucketId}]},
            order: [['id', 'ASC'], [bucket_item, 'id', 'DESC']],
            transaction
        });

        return {
            bucketId:result.bucketId,
            bucketName:result.bucketName,
            bucketItemMovies:result.bucket_items.map((bItem) => {
                return {
                    movieId : bItem.movie.dataValues.movieId,
                    thumb : bItem.movie.dataValues.thumb,
                    title : bItem.movie.dataValues.title
                }
            })
        }
    },

    getMyBuckets : async function (memberId, transaction) {
        const result =  await bucket.findAll({
            attributes : [['id', 'bucketId'],['bucket_name', 'bucketName'], 'publish'],
            include: [
                {
                    model: bucket_item,
                    attributes:[['bucket_id','connectbid'], ['movie_id','connectmid']],
                    include: [
                        {
                            attributes:[['id', 'movieId'], 'thumb'],
                            model: movie,
                        }]}],
            where : {ownerId : {[Op.eq] : memberId}},
            order:
                [['id', 'ASC'],
                [bucket_item, 'id', 'DESC']//이부분 as 가 아닌 id를 사용해야된다.. 왜?
            ], transaction});

        return result.map((item) => {
            return {
                bucketId:item.dataValues.bucketId,
                publish : item.dataValues['publish'],
                bucketName:item.dataValues.bucketName,
                bucketThumbs:item.bucket_items.map((bItem) => {
                    return {thumb:bItem.movie.dataValues.thumb,
                            movieId: bItem.movie.dataValues.movieId};
                })
            }
        })
    },

    getMyBucket : async function (memberId, bucketId , transaction) {
        const result = await bucket.findOne({
            attributes : [['id', 'bucketId'],['bucket_name', 'bucketName']],
            include: [
                {
                    model: bucket_item,
                    attributes:[['bucket_id','connectbid'], ['movie_id','connectmid']],
                    include: [
                        {
                            attributes:[['id', 'movieId'], 'title' ,'thumb'],
                            model: movie,
                        }]
                }],
            where : {
                [Op.and]: [{ownerId : memberId}, {id : bucketId}]},
            order: [['id', 'ASC'], [bucket_item, 'id', 'DESC']],
            transaction
        });

        return {
            bucketId:result.bucketId,
            bucketName:result.bucketName,
            bucketItemMovies:result.bucket_items.map((bItem) => {
                return {
                    movieId : bItem.movie.dataValues.movieId,
                    thumb : bItem.movie.dataValues.thumb,
                    title : bItem.movie.dataValues.title
                }
            })
        }
    },

    createBucket: async function (authId, bucketName, publish, transaction) {
        return await bucket.create({
            ownerId:authId,
            bucketName,
            publish
        }, {transaction});
    },

    updateBucketTitle: async function (authId, bucketId , bucketName, transaction) {
        const myBucket = await bucket.findOne({where : {[Op.and] : [{ownerId : {[Op.eq]:authId}}, {id: {[Op.eq]: bucketId}}]}, transaction})
        if (!myBucket) throw Error("해당 영화 리스트가 없습니다.");
        myBucket.bucketName = bucketName;
        await myBucket.save({transaction});
    },


    updateBucketPublish: async function (authId, bucketId , publish, transaction) {
        const myBucket = await bucket.findOne({where : {[Op.and] : [{ownerId : {[Op.eq]:authId}}, {id: {[Op.eq]: bucketId}}]}, transaction})
        if (!myBucket) throw Error("해당 영화 리스트가 없습니다.");
        myBucket.publish = publish;
        await myBucket.save({transaction});
    },

    deleteBucket: async function (authId, bucketId, transaction) {
        const myBucket = await bucket.findOne({where : {[Op.and] : [ {ownerId : {[Op.eq]:authId}}, {id: {[Op.eq]: bucketId}}]}})
        if (!myBucket) throw Error("해당 영화 리스트가 없습니다.");
        await myBucket.destroy({transaction});
    }

}

module.exports = MemberStorage;