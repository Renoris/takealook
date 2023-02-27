const movieStorage = require('./MovieStorage');


const MovieService = {
    getMovies : async function (memberId, genre, pubDate, limit, offset, user_rating, isRandom) {
        return movieStorage.getMovies(memberId, genre, pubDate, limit, offset, user_rating, isRandom)
    },

    getMovieDetail: async function (id) {
        if(!id) throw Error('id가 없습니다.');
        return movieStorage.getMovieDetail(id);
    }
}

module.exports = MovieService;