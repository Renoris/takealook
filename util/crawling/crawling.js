const {sequelize, movie} = require('../../models/index');
const {Op, QueryTypes} = require('sequelize');
const apis = [
    {'X-Naver-Client-Id': process.env.client_id_1, 'X-Naver-Client-Secret': process.env.client_secret_1},
    {'X-Naver-Client-Id': process.env.client_id_2, 'X-Naver-Client-Secret': process.env.client_secret_2},
    {'X-Naver-Client-Id': process.env.client_id_3, 'X-Naver-Client-Secret': process.env.client_secret_3},
]
const baseUrl = 'https://openapi.naver.com/v1/search/movie.json'
const genreies = ['TV영화','드라마','판타지','서부','공포','로맨스','모험','스릴러','느와르','컬트','다큐멘터리','코미디','가족','미스터리','전쟁','애니메이션','범죄','뮤지컬','SF','액션','무협','에로','서스펜스','서사','블랙코미디','실험','영화카툰','영화음악','영화패러디포스터'];
const cheerio = require('cheerio');
const axios = require('axios');

class MovieData {
    constructor(title, subTitle, pubDate, story, genre, country, running_time, link, image, director, actor, userRating, thumb) {
        this.title = title;
        this.subTitle = subTitle;
        this.pubDate = pubDate;
        this.story = story;
        this.genre = genre;
        this.country = country;
        this.runningTime = running_time;
        this.link = link;
        this.image = image;
        this.director = director;
        this.actor = actor;
        this.userRating = userRating;
        this.thumb = thumb;
    }
}

/**
 * @param str : string
 */
function removeQuery(str) {
    if (str) {
        const index = str.indexOf('?');
        return str.slice(0, index);
    } else {
        return "-";
    }
}

/**
 * @param src : string
 */
function removeBlink(src) {
    if (src) {
        src = src.replaceAll("\t", "");
        return src.replaceAll("\n", "");
    } else {
        return "-";
    }
}

/**
 * @param str : string
 */
function removeBold(str) {
    if (str) {
        str = str.replaceAll("<b>", "");
        return str.replaceAll("</b>", "");
    } else {
        return "-";
    }
}

/**
 * @param str : string
 */
function removeOr(str) {
    if (str) {
        str = str.replaceAll("|", ", ");
        return str.slice(0, str.lastIndexOf(","));
    } else {
        return "-";
    }
}

function resolveOriginImageSrc($) {
    let src = null;
    const tag = $('.poster > a > img').attr();
    if (tag) {
        src = removeQuery(tag.src);
    }
    return src;
}

function resolveThumbImageSrc($) {
    let src = null;
    const tag = $('.poster > a > img').attr();
    if (tag) {
        src = tag.src.replaceAll('type=m77_110_2', 'type=m886_590_2');
    }
    return src;
}

function resolveOutLine($) {
    const infos = []; // [나라, 장르, 러닝타임, 개봉일]
    $('.info_spec > dd > p > span').each((index, element) => {
        const item = removeBlink($(element).text());
        let flag = true;

        if (flag) {
            if (item.includes('분')) {
                infos[2] = item;
                flag = false;
            }
        }

        if (flag) {
            if (item.includes('개봉')) {
                infos[3] = item;
                flag = false;
            }
        }

        if (flag) {
            for (const genre of genreies) {
                if (item.includes(genre)) {
                    if (infos[1] === undefined) {
                        infos[1] = genre;
                    } else {
                        infos[1] = `${infos[1]}, ${genre}`
                    }
                    flag = false;
                }
            }
        }

        if (flag) {
            if (infos[0] === undefined) {infos[0] = `${item}`}
            else {infos[0] = `${infos[0]}, ${item}`}
        }


    })


    return infos;
}

function resolveStory($) {
    return $('.con_tx').text();
}


/**
 *
 * @param str : string
 */
function abbreviateHuman(str) {
    if (str.length > 10) {
        str = str.slice(0, str.indexOf(',', 10));
        return `${str} 등`
    }
    return str;
}

/**
 * @param url : string
 * ['장르', '국가', '러닝타임', '개봉일자(안씀)']
 */
async function crawlingMovieData(url) {
    const infoHtml = await axios.get(url);
    const $ = cheerio.load(infoHtml.data);
    const story = resolveStory($);
    const imageSrc = resolveOriginImageSrc($);
    const outLine = resolveOutLine($); // [나라, 장르, 러닝타임, 개봉일]
    let thumb = null;
    if (imageSrc) {
        thumb = `${imageSrc}?type=m886_590_2`;
    }

    return  {story, imageSrc, outLine, thumb};
}

async function isExistMovie(title, director, pubDate) {
    return await movie.findOne({
        where: {
            pub_date : sequelize.where(sequelize.fn('YEAR', sequelize.col('pub_date')), Number(pubDate)),
            director : director,
            title : title.trim()
        }
    });
}

/**
 * @param item naverApiMovieItem
 * @param title : string
 * @param director : string
 * @returns {Promise<MovieData>}
 */
async function createMovieData(item, title, director) {
    const infoLink = item.link;
    const infos = await crawlingMovieData(infoLink);
    return new MovieData(title,
        removeBold(item.subTitle),
        new Date(Number(item.pubDate), 0, 1),
        infos.story,
        infos.outLine[1], //장르
        infos.outLine[0], //나라
        infos.outLine[2], //러닝타임
        infoLink,
        infos.imageSrc,
        director,
        abbreviateHuman(removeOr(removeBold(item.actor))),
        removeOr(removeBold(item.userRating)),
        infos.thumb
    );
}

async function insertMovieData(data) {
    await movie.create(data);
}

async function buildData(items) {
    const promises = items.map(async (item) => {
        const title = removeBold(item.title);
        try {
            const director = abbreviateHuman(removeOr(removeBold(item.director)));
            if (!await isExistMovie(title, director, item.pubDate)) {
                const movieData = await createMovieData(item, title, director);
                await insertMovieData(movieData);
                console.log(`영화 데이터 추가저장 - title : ${item.title}`)
            }
        } catch (error) {
            console.log(error);
        }
    })
    await Promise.all(promises);
}




//
const crawling = {
    naverMovieApiCrawling: async function (query) {
        try {
            const random = Math.floor(Math.random()*9)%3;
            const url = `${baseUrl}?${new URLSearchParams({query, display: 100}).toString()}`;
            const header = apis[random];
            header.display = 100;
            const result = await (await fetch(url, {headers: header})).json();
            await buildData(result.items);
        }catch (error) {
            console.log(error);
            console.log(`네이버 api 영화 조회에 실패했습니다. query:${query}`);
        }
    }
}

module.exports = crawling;