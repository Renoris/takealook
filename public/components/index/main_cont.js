import {addCover} from "./main_contEventListener.js";

//장르별 정렬 리스트
const genreList = document.getElementById("genre");
let genreArray = ["장르별", "전체", "TV영화", "액션", "드라마", "공포", "로맨스", "스릴러", "다큐멘터리", "코미디", "가족", "전쟁", "애니메이션", "SF", "무협"];
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
    for (let i = 2023; i >= 1980; i--) {
      const yearOption = document.createElement("option");
      yearOption.setAttribute("value", i);
      yearOption.innerText = i;
      this.appendChild(yearOption);
    }
  }
});

//영화 & 취향 리스트 전환 태그
const movieContainer = document.querySelector(".movie_container");
const favContainer = document.querySelector(".fav_container");
const movieTag = document.getElementById("movie");
const recommendTag = document.getElementById("recommend");

movieTag.addEventListener("click", () => {
  movieContainer.classList.remove("hide");
  favContainer.classList.add("hide");
});
recommendTag.addEventListener("click", async () => {
  movieContainer.classList.add("hide");
  favContainer.classList.remove("hide");
});

//제한 횟수, 생성 횟수, 페이지 카운트
const coverLimit = 99;
const coverIncrease = 7;
const pageMax = Math.ceil(coverLimit / coverIncrease);
let currentPage = 1;
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
export const infiniteScroll = async () => {
  await throttle(async () => {
    const endOfPage = window.innerHeight + window.scrollY >= document.body.offsetHeight;

    if (endOfPage) {
      await addCover(currentPage, pageMax, coverIncrease, coverLimit, movieContainer);
      currentPage ++;
    }
    if (currentPage > pageMax) {
      removeInfiniteScroll();
    }
  }, 1000);
};

//무한 스크롤 제어
export const removeInfiniteScroll = () => {
  window.removeEventListener("scroll", infiniteScroll);
};

//첫 스크롤 생성
window.onload = async function () {
  await addCover(currentPage, pageMax, coverIncrease, coverLimit, movieContainer);
  currentPage++;
};
window.addEventListener("scroll", infiniteScroll);