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
