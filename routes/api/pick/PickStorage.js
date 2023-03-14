const {sequelize, pick, member} = require('../../../models/index');
const {Op, QueryTypes} = require('sequelize');


function getFindAllPickMovieQuery(memberId) {
    const replacements = [];
    let query = `select m.id movieId, 
        m.title title, year(m.pub_date) pub_date, 
        m.genre genre, m.thumb thumb
        from movies m 
        inner join picks p on p.movie_id = m.id AND p.member_id = ?`;
    replacements.push(memberId);
    return {
        query,
        replacements
    }
}

function getFindAllPickMovieSimpleQuery(memberId) {
    const replacements = [];
    let query = `select m.id movieId, m.thumb thumb, m.title title
        from movies m 
        inner join picks p on p.movie_id = m.id AND p.member_id = ?`;
    replacements.push(memberId);
    return {
        query,
        replacements
    }
}


const PickStorage = {
    findAllPickMovie: async function (memberId, transaction) {
        const {query , replacements} = getFindAllPickMovieQuery(memberId);
        return sequelize.query(query, {
            replacements,
            transaction,
            type: QueryTypes.SELECT
        });
    },

    findAllPickMovieSimple: async function (memberId, transaction) {
        const {query , replacements} = getFindAllPickMovieSimpleQuery(memberId);
        return sequelize.query(query, {
            replacements,
            transaction,
            type: QueryTypes.SELECT
        });
    },

    findPick: async function (memberId, movieId, transaction) {
        return await pick.findOne({
            where : {
            [Op.and]:[
                {memberId},
                {movieId}
            ]
        }, transaction});
    },

    insertPick: async function (memberId, movieId, transaction) {
        return await pick.create({
            memberId,
            movieId
        }, {transaction})
    },

    deletePick: async function (memberId, movieId, transaction) {
        return await pick.destroy({where :{memberId, movieId}, transaction});
    },

};

module.exports = PickStorage