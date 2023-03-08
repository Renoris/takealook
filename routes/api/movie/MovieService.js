const movieStorage = require('./MovieStorage');
const crawling = require('../../../util/crawling/crawling');

const MovieService = {
    getMovies : async function (memberId, genre, pubDate, search ,limit, offset) {
        return movieStorage.getMovies(memberId, genre, pubDate, search ,limit, offset);
    },

    buildMovies : async function (query) {
        await crawling.naverMovieApiCrawling(query);
    },


    getMovieDetail: async function (id) {
        if(!id) throw Error('id가 없습니다.');
        return movieStorage.getMovieDetail(id);
    }
}

module.exports = MovieService;