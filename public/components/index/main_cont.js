// 리스트 추가 버튼
const favBtn = document.querySelectorAll(".fav_btn");
let favorite = 0;
for (let i = 0; i < favBtn.length; i++) {
  favBtn[i].addEventListener("click", () => {
    if (favorite == 0) {
      favBtn[i].src = "./images/fav_on.png";
      favorite += 1;
    } else if (favorite == 1) {
      favBtn[i].src = "./images/fav_off.png";
      favorite -= 1;
    }
  });
}

//장르별 정렬 리스트
const genreList = document.getElementById("genre");
let genreArray = [
  "장르별",
  "전체",
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
recommendTag.addEventListener("click", () => {
  movieContainer.classList.add("hide");
  favContainer.classList.remove("hide");
});

// 무한스크롤 적용
const movieCover = document.getElementsByClassName("movie_cover");
//제한 횟수, 생성 횟수, 페이지 카운트
const coverLimit = 99;
const coverIncrease = 7;
const pageCount = Math.ceil(coverLimit / coverIncrease);
let currentPage = 1;
//스크롤 이벤트를 throttle로 제어
let throttleTimer;
const throttle = (callback, time) => {
  if (throttleTimer) return;

  throttleTimer = true;

  setTimeout(() => {
    callback();
    throttleTimer = false;
  }, time);
};
//생성시 배치할 요소. 이곳에서 영화리스트 커버와 제목 장르를 생성
const createCover = (index) => {
  const cover = document.createElement("div");
  cover.className = "movie_cover";
  cover.innerHTML = index;
  cover.style.backgroundColor = "gray";
  movieContainer.appendChild(cover);
};
//콘텐츠 생성 공식
const addCover = (pageIndex) => {
  currentPage = pageIndex;

  const startRange = (pageIndex - 1) * coverIncrease;
  const endRange = currentPage == pageCount ? coverLimit : pageIndex * coverIncrease;

  for (let i = startRange + 1; i <= endRange; i++) {
    createCover(i);
  }
};
//무한 스크롤 공식
const infiniteScroll = () => {
  throttle(() => {
    const endOfPage = window.innerHeight + window.scrollY >= document.body.offsetHeight;

    if (endOfPage) {
      addCover(currentPage + 1);
    }
    if (currentPage === pageCount) {
      removeInfiniteScroll();
    }
  }, 100);
};
//무한 스크롤 제어
const removeInfiniteScroll = () => {
  movieCover.remove();
  window.removeEventListener("scroll", infiniteScroll);
};
//첫 스크롤 생성
window.onload = function () {
  addCover(currentPage);
};

window.addEventListener("scroll", infiniteScroll);
