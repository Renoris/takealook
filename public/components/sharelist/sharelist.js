import {replaceSpecialCode} from "../util/convertText.js";

function createSharedDom(bucketItem, parentNode) {
    const {title,thumb, pubDate, genre, story } = bucketItem;

    const article = document.createElement('article');
    article.classList.add('shared_article');

    const sharedMovieCont = document.createElement('div');
    sharedMovieCont.classList.add('shared_movie_cont');

    const sharedMovieImgBox = document.createElement('div');
    sharedMovieImgBox.classList.add('shared_movie_img_box');
    const thumbImg = document.createElement('img');
    thumbImg.src = thumb;
    sharedMovieImgBox.append(thumbImg);
    sharedMovieCont.append(sharedMovieImgBox);

    const sharedMovieInfoBox = document.createElement('div');
    sharedMovieInfoBox.classList.add('shared_movie_info_box');

    const titleDom = document.createElement('h3');
    titleDom.innerText = replaceSpecialCode(title);

    const sharedMovieInfo = document.createElement('div');
    sharedMovieInfo.classList.add('shared_movie_info');

    const fixedInfo = document.createElement('h4');
    fixedInfo.innerText = "영화 정보";

    const pubDateDom = document.createElement('span');
    pubDateDom.id = "info_year";
    pubDateDom.innerText = pubDate;

    const genres = document.createElement('span');
    genres.id = "info_genre";
    genres.innerText = genre;

    sharedMovieInfo.append(fixedInfo);
    sharedMovieInfo.append(pubDateDom);
    sharedMovieInfo.append(genres);

    const sharedMovieDescription = document.createElement('div');
    sharedMovieDescription.classList.add("shared_movie_description");

    const fixedStoryDom = document.createElement('h4');
    fixedStoryDom .innerText = "줄거리";

    const storyDom = document.createElement('p');
    storyDom.innerText = story;

    sharedMovieDescription.append(fixedStoryDom);
    sharedMovieDescription.append(storyDom);

    sharedMovieInfoBox.append(titleDom);
    sharedMovieInfoBox.append(sharedMovieInfo);
    sharedMovieInfoBox.append(sharedMovieDescription);

    sharedMovieCont.append(sharedMovieImgBox);
    sharedMovieCont.append(sharedMovieInfoBox);
    article.append(sharedMovieCont);
    parentNode.append(article);
}

async function initialize() {
    const path = window.location.pathname.split("/");
    if (!path[2]) {
        location.href = "/error";
    }
    const result = await (await fetch(`/api/bucket/publish/${path[2]}`)).json();
    const {bucketName, nickName, bucketItemMovies} = result;

    const bucketNameDom = document.getElementById('bucket_name');
    bucketNameDom.innerText = bucketName;

    const ownerNickName = document.getElementById('owner_nick_name');
    ownerNickName.innerText = nickName

    const sharedSection = document.getElementById('shared_section');
    for (const movie of bucketItemMovies) {
        createSharedDom(movie, sharedSection);
    }
}


initialize();