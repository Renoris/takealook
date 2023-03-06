const {sequelize, movie} = require('../../../models/index');
const {Op, QueryTypes} = require('sequelize');

/**
 * 정보 조회 쿼리
 * @param id : number 조회하는 사람의 id
 * @param genre : string 장르 - , 로 중복 장르 구분
 * @param pubDate : string 개봉년도
 * @param search : string 검색어
 * @param limit : number 조회 갯수
 * @param offset : number 조회 페이지 번호
 * @return {object} 완성된 쿼리와 대체 배열
 */
function getMovieQuery (id, genre, pubDate, search, limit, offset) {
    const replacements = [];
    let query = `select m.id movieId, 
        m.title title, year(m.pub_date) pub_date, 
        m.genre genre, m.thumb thumb`;
    if (id) {
        query += `, IF(p.id IS NULL, 0, 1) isPick
        from movies m 
        left join picks p on 
        p.movie_id = m.id and p.member_id = ?`;
        replacements.push(id);
    }else {
        query += ` from movies m`;
    }

    let flag = pubDate || genre || search;
    let alreadyCondition = false;

    //항상 고정값
    if (!search) {
        query = `${query} where pub_date >= 1990 and user_rating >= 2`;
        alreadyCondition = true;
    }else {
        query = `${query} where`
    }

    if (flag) {
        if (genre && genre !== 'All') {
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
            if (!alreadyCondition) {
                alreadyCondition = true;
            }
        }

        if (search) {
            if (alreadyCondition) {
                query = `${query} and`;
            }
            query = `${query} title like ?`
            replacements.push(`%${search}%`);
            if (!alreadyCondition) {
                alreadyCondition = true;
            }
        }
    }

    if (pubDate) {
        query = `${query} order by m.random desc`
    }else {
        query = `${query} order by pub_date desc, m.random desc`
    }


    if (limit) {
        query = `${query} limit ${limit}`
    }

    if (limit && offset) {
        query = `${query} offset ${offset}`
    }

    return {
        query,
        replacements
    }
}


const MovieStorage = {

    /**
     * 정보 조회 : 영화들 - 나의 픽 인지 포함
     * @param memberId : number 조회하는 멤버 id
     * @param genre : string 장르 - , 로 중복 장르 구분
     * @param pubDate : string 개봉년도
     * @param search : string 검색어
     * @param limit : number 조회 갯수
     * @param offset : number 조회 페이지 번호
     */
    getMovies: async function (memberId, genre, pubDate, search, limit , offset) {
        const {query, replacements} = getMovieQuery(memberId, genre, pubDate,search ,limit, offset);
        return sequelize.query(query, {
            type: QueryTypes.SELECT, // 이거 없으면 같은 결과 2번 중복되서 나옴 //1번 array는 mysql, 2번은 meta데이터인데 mysql은 두가지가 같아서 생기는 문제
            replacements
        });
    },

    getMovieDetail: async function (movieId) {
        return await movie.findOne( {where : {id : {[Op.eq] : movieId}}});
    }
}

module.exports = MovieStorage;