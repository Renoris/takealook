
import {scrollControlValues, searchInfo} from "./main_cont.js";
import elementFactory from "../elements/favContElements.js";
import {getMovieListThumb} from "../util/convertImage.js";
import {movieTagClickEventListener, reloadPage} from "./main_contEventListener.js";


const pickList = document.querySelector(".pick_lists");
const pickCover = document.querySelectorAll(".pick_lists li");
let currentCover = 0;
let slideCount = pickCover.length;
const leftBtn = document.querySelector(".left_btn");
const rightBtn = document.querySelector(".right_btn");
let coverWidth = 300;

const genreTvMovie = document.getElementById("genre_tv_movie");
const genreComedy = document.getElementById("genre_comedy");
const genreSF = document.getElementById("genre_sf");
const genreAction = document.getElementById("genre_action");
const genreDrama = document.getElementById("genre_drama");
const movieTag = document.getElementById("movie");
const recommendTag = document.getElementById("recommend");
const genreList = document.getElementById("genre");

async function changeMovieTagWithGenre(e,movieTag,recommendTag,genreList , genre) {
  window.scrollTo({top:500});
  genreList.value = genre;
  searchInfo.genre = genre;
  await reloadPage(e, searchInfo, scrollControlValues);
  movieTagClickEventListener(e, scrollControlValues);
  movieTag.checked = true;
  recommendTag.checked = false;
}

genreTvMovie.addEventListener('click', async (e) =>
    changeMovieTagWithGenre(e, movieTag,recommendTag,genreList,'TV영화'));
genreSF.addEventListener('click', async (e) => changeMovieTagWithGenre(e,
    movieTag,recommendTag,genreList,'SF'));
genreAction.addEventListener('click', async (e) => changeMovieTagWithGenre(e,
    movieTag,recommendTag,genreList,'액션'));
genreComedy.addEventListener('click', async (e) => changeMovieTagWithGenre(e,
    movieTag,recommendTag,genreList,'코미디'));
genreDrama.addEventListener('click', async (e) => changeMovieTagWithGenre(e,
    movieTag,recommendTag,genreList,'드라마'));



function cloneElement() {
  let coverCloneFirst = pickCover[0].cloneNode(true);
  let coverCloneLast = pickList.lastElementChild.cloneNode(true);
  pickList.append(coverCloneFirst);
  pickList.prepend(coverCloneLast, pickList.firstElementChild);
}

//무한 스크롤
let throttleTimer;
const throttle = (callback, time) => {
  if (throttleTimer) return;

  throttleTimer = true;

  //이걸 죠져놔야됌
  setTimeout(() => {
    callback();
    throttleTimer = false;
  }, time);
};

const coverLimit = 200;
const coverIncrease = 14;
const pageMax = Math.ceil(coverLimit / coverIncrease);
let currentPage = 1;

export const addFav = async (currentPage, maxPage ,coverIncrease, coverLimit, parentNode) => {
  let count = 0;
  const startRange = (currentPage - 1) * coverIncrease;
  const endRange = currentPage === pageMax ? coverLimit : currentPage * coverIncrease;
  let url = '/api/bucket/publish';
  const param = {
    limit : endRange - startRange,
    offset : startRange
  }

  url = `${url}?${new URLSearchParams(param).toString()}`

  const buckets = await (await fetch(url, {method: "GET"})).json();
  count = buckets.length;
  for (const bucket of buckets) {
    const {bucketId, bucketName, bucketThumbs} = bucket;
    elementFactory.createMovieList(bucketId, bucketName, getMovieListThumb(bucketThumbs), parentNode);
  }
  return count;
};


const shareLine = document.querySelector('.share_line');

//무한 스크롤 공식
const infiniteFavScroll = async () => {
  await throttle(async () => {
    if (!scrollControlValues.activeFav) return;
    if (scrollControlValues.endFav) return;
    const endOfPage = window.innerHeight + window.scrollY + 1000 >= document.body.offsetHeight;


    if (endOfPage) {
      const count = await addFav(currentPage, pageMax, coverIncrease, coverLimit, shareLine);
      scrollControlValues.endFav = count === 0;
      currentPage++;
    }

    if (currentPage > pageMax) {
      scrollControlValues.endFav = true;
    }
  }, 100);
};


async function initfunction() {
  pickList.style.width = coverWidth * (slideCount + 2) + "px";
  pickList.style.left = -coverWidth + "px";
}

rightBtn.addEventListener("click", function () {
  if (currentCover <= slideCount - 1) {
    pickList.style.left = -(currentCover + 2) * coverWidth + "px";
    pickList.style.transition = `${0.5}s ease-out`;
  }
  if (currentCover === slideCount - 1) {
    setTimeout(function () {
      pickList.style.left = -coverWidth + "px";
      pickList.style.transition = `${0}s ease-out`;
    }, 500);
    currentCover = -1;
  }
  currentCover += 1;
});

leftBtn.addEventListener("click", function () {
  if (currentCover >= 0) {
    pickList.style.left = -currentCover * coverWidth + "px";
    pickList.style.transition = `${0.5}s ease-out`;
  }
  if (currentCover === 0) {
    setTimeout(function () {
      pickList.style.left = -slideCount * coverWidth + "px";
      pickList.style.transition = `${0}s ease-out`;
    }, 500);
    currentCover = slideCount;
  }
  currentCover -= 1;
});
window.addEventListener("scroll", infiniteFavScroll);
cloneElement();
initfunction();
