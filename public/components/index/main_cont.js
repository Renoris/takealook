import {
  addCover,
  topScrollEventListener,
  recommendTagClickEventListener,
  movieTagClickEventListener,
  reloadPage,
} from "./main_contEventListener.js";
import {modalInitialize} from "../modal/modalUtil.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const query = urlParams.get("query");
let activeFav = false;
let endMovie = false;

//제한 횟수, 생성 횟수, 페이지 카운트
const coverLimit = 99;
const coverIncrease = 7;
const pageMax = Math.ceil(coverLimit / coverIncrease);
let currentPage = 1;

//영화 & 취향 리스트 전환 태그
const movieContainer = document.querySelector(".movie_container");
const favContainer = document.querySelector(".fav_container");
const movieTag = document.getElementById("movie");
const recommendTag = document.getElementById("recommend");
const tags = document.querySelector(".tags");

//장르별 정렬 리스트
const genreList = document.getElementById("genre");
let genreArray = [
  "장르별",
  "TV영화",
  "액션",
  "드라마",
  "공포",
  "로맨스",
  "스릴러",
  "다큐멘터리",
  "코미디",
  "가족",
  "전쟁",
  "애니메이션",
  "SF",
  "무협",
];
let genreOption = "";

for (let i = 0; i < genreArray.length; i++) {
  genreOption += `<option>${genreArray[i]}</option>`;
}
genreList.innerHTML = genreOption;

// 연도별 정렬 리스트
const years = document.querySelector("#year");

let isYearOptionExisted = false;
years.addEventListener("focus", function () {
  if (!isYearOptionExisted) {
    isYearOptionExisted = true;
    for (let i = 2023; i >= 1990; i--) {
      const yearOption = document.createElement("option");
      yearOption.setAttribute("value", i);
      yearOption.innerText = i;
      this.appendChild(yearOption);
    }
  }
});

export const searchInfo = {
  genre: "",
  pubDate: "",
  query,
  currentPage,
  pageMax,
  coverIncrease,
  coverLimit,
};

genreList.addEventListener("change", async (e) => {
  searchInfo.genre = e.target.value;
  await reloadPage(e, searchInfo, scrollControlValues);
});

years.addEventListener("change", async (e) => {
  searchInfo.pubDate = e.target.value;
  await reloadPage(e, searchInfo, scrollControlValues);
});

export const scrollControlValues = {
  movieContainer,
  favContainer,
  tags,
  activeFav,
  endMovie,
};

movieTag.addEventListener("click", (e) => movieTagClickEventListener(e, scrollControlValues));
recommendTag.addEventListener("click", (e) =>
  recommendTagClickEventListener(e, scrollControlValues)
);

//스크롤 이벤트를 throttle로 제어
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

//무한 스크롤 공식
const infiniteScroll = async () => {
  await throttle(async () => {
    if (scrollControlValues.activeFav) return;
    if (scrollControlValues.endMovie) return;
    const endOfPage = window.innerHeight + window.scrollY >= document.body.offsetHeight;

    if (endOfPage) {
      const length = await addCover(searchInfo, scrollControlValues.movieContainer);
      scrollControlValues.endMovie = length === 0;
      searchInfo.currentPage++;
    }
    if (currentPage > pageMax) {
      scrollControlValues.endMovie = true;
    }
  }, 500);
};

// 첫 스크롤 생성
window.onload = async function () {
  if (query) {
    try {
      await fetch("/api/movie/build", {
        method: "POST",
        body: JSON.stringify({ query }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {}
  }

  const length = await addCover(searchInfo, scrollControlValues.movieContainer);
  scrollControlValues.endMovie = length === 0;
  searchInfo.currentPage++;
};

window.addEventListener("scroll", infiniteScroll);

modalInitialize();

const top = document.querySelector(".up_to_top");
window.addEventListener("scroll", (e) => topScrollEventListener(e, top));