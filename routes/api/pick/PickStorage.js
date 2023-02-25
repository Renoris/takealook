const {sequelize, pick, member} = require('../../../models/index');
const {Op} = require('sequelize');


function getFindAllPickMovieQuery(memberId) {
    const replacements = [];
    let query = `select m.id movieId, 
        m.title title, year(m.pub_date) pub_date, 
        m.genre genre, m.image image
        from movie m 
        inner join pick p on p.movieId = m.movieId and p.memberId = ?`;
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
            transaction
        });
    },

    findPick: async function (memberId, movieId, transaction) {
        return await pick.findOne({where : {[Op.eq]: {memberId, movieId}}, transaction});
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