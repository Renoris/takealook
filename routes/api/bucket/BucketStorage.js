const {bucket, bucket_item, movie} = require('../../../models/index');
const {Op} = require('sequelize');

const MemberStorage = {
    getBuckets : async function (memberId, transaction) {
        return await bucket.findAll({
                attributes : [['id', 'bucketId'],['bucket_name', 'bucketName']],
                include: [
                    {
                        model: bucket_item,
                        attributes:[['bucket_id','connectbid'], ['movie_id','connectmid']],
                        include: [
                            {
                                attributes:[['id', 'movieId'],'title','genre','country','image','pubDate','thumb'],
                                model: movie
                            }]}
             ],where : {ownerId : {[Op.eq] : memberId}}, transaction});
    }
}

module.exports = MemberStorage;