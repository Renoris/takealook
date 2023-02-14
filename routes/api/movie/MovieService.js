const {sequelize, movie} = require('../../../models/index');
const {Op} = require('sequelize');

/**
 * 정보 조회 쿼리
 * @param id : number 조회하는 사람의 id
 * @param genre : string 장르 - , 로 중복 장르 구분
 * @param pubDate : string 개봉년도
 * @param limit : number 조회 갯수
 * @param offset : number 조회 페이지 번호
 * @return {object} 완성된 쿼리와 대체 배열
 */
function getMovieQuery (id, genre, pubDate, limit, offset) {
    let query = `select m.id movieId, 
        m.title title, m.sub_title sub_title, 
        m.genre genre, m.country country, 
        m.image image, p.id pick_id 
        from movies m 
        left join picks p on 
        p.movie_id = m.id`;

    const replacements = [];

    if (id) {
        query += ` and p.member_id = ?`
        replacements.push(id);
    }

    if (pubDate || genre) {
        let alreadyCondition = false;
        query = `${query} where`;

        if (genre) {
            const genres = genre.split(",");
            for (let i = 0; i < genres.length; i++) {
                if (alreadyCondition) {
                    query = `${query} and`;
                }
                query = `${query} genre like ?`
                replacements.push(`%${genres[i]}%`);
                if (!alreadyCondition) {
                    alreadyCondition = true;
                }
            }
        }
        if (pubDate) {
            if (alreadyCondition) {
                query = `${query} and`;
            }
            query = `${query} Year(pub_date) = ?`
            replacements.push(Number(pubDate));
        }
    }

    return {
        query : `${query} limit ${limit} offset ${offset}`,
        replacements,
    }
}


const MovieService = {

    /**
     * 정보 조회 : 영화들 - 나의 픽 인지 포함
     * @param memberId : number 조회하는 멤버 id
     * @param genre : string 장르 - , 로 중복 장르 구분
     * @param pubDate : string 개봉년도
     * @param limit : number 조회 갯수
     * @param offset : number 조회 페이지 번호
     */
    getMovies: async function (memberId, genre, pubDate, limit = 10, offset = 1) {
       const info = getMovieQuery(1,genre, pubDate, limit, offset);
       return await sequelize.query(info.query, {
           replacements:info.replacements
       });
    },

    getMovieDetail: async function (movieId) {
        const result = await movie.findOne( {where : {id : {[Op.eq] : movieId}}});
        console.log(result);
        return result;
    }
}

module.exports = MovieService;