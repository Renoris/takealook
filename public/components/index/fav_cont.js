import {movieTagClickEventListener, reloadPage} from "./main_contEventListener.js";
import {scrollControlValues, searchInfo} from "./main_cont.js";

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
function initfunction() {
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

cloneElement();
initfunction();
