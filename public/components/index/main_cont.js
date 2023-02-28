import authFetch from "../fetchs/AuthFetch.js";
import elementFactory from "../elements/MoviesElements.js";
const access = localStorage.getItem("takealook-access");
function getButtonState(state, node) {
  let _state = state;
  return {
    turnState: async function () {
      if (!access) {
        alert("로그인이 필요한 서비스 입니다.");
        return;
      }
      try {
        const movieId = Number(node.id.slice(6));
        if (_state) {
          await authfetch(
            "/api/pick",
            {
              movieId,
            },
            "DELETE"
          );
          node.src = "./images/fav_off.png";
          _state = 0;
        } else {
          await authfetch(
            "/api/pick",
            {
              movieId,
            },
            "POST"
          );
          node.src = "./images/fav_on.png";
          _state = 1;
        }
      } catch (error) {
        console.log("서버와의 접속에 실패했습니다.");
      }
    },
  };
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
recommendTag.addEventListener("click", async () => {
  // if (!access) {
  //   alert('로그인이 되어 있지 않습니다.');
  // }
  movieContainer.classList.add("hide");
  favContainer.classList.remove("hide");
  // const $pickList = document.querySelector('.pick_lists');
  // try {
  //   const response = await authFetch('/api/pick');
  //   $pickList.textContent = '';
  //   response.forEach((item) => {
  //     const $pickCover = document.createElement('div');
  //     $pickCover.classList.add('pick_cover');
  //     $pickCover.style.background = `url('${item.image}')`;
  //     $pickList.appendChild($pickCover)
  //   });
  //
  //
  // }catch (error) {
  //   alert('서버와의 통신에 실패 하였습니다.')
  // }
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

const createCover = (movie, $movieContainer) => {
  const movieCover = elementFactory.createMovieCoverNode($movieContainer);
  const pickButton = elementFactory.createPickButtonNode(movie.movieId, movie.isPick, movieCover);
  const coverImageNode = elementFactory.createCoverImageNode(movieCover);
  elementFactory.createInCoverImageNode(movie.image, coverImageNode);
  elementFactory.createMovieInfoNode(movie.title, movie.genre, movieCover);
  const buttonState = getButtonState(movie.isPick, pickButton);
  pickButton.addEventListener("click", (e) => buttonState.turnState());
};

//콘텐츠 생성 공식
const addCover = async (pageIndex) => {
  currentPage = pageIndex;

  const startRange = (pageIndex - 1) * coverIncrease;
  const endRange = currentPage == pageCount ? coverLimit : pageIndex * coverIncrease;

  try {
    const params = {
      limit: endRange - startRange,
      offset: 0,
      isRandom: true,
    };
    let headers = {
      "Content-Type": "application/json",
    };
    if (access !== null || access) {
      headers.authorization = access;
    }
    let url = "/api/movie";
    url = `${url}?${new URLSearchParams(params).toString()}`;

    const response = await fetch(url, {
      headers,
    });

    const result = await response.json();
    console.log(result);
    result.forEach((movie) => {
      createCover(movie, movieContainer);
    });
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
};
//무한 스크롤 공식
const infiniteScroll = async () => {
  await throttle(async () => {
    const endOfPage = window.innerHeight + window.scrollY >= document.body.offsetHeight;

    if (endOfPage) {
      await addCover(currentPage + 1);
    }
    if (currentPage === pageCount) {
      removeInfiniteScroll();
    }
  }, 1000);
};
//무한 스크롤 제어
const removeInfiniteScroll = () => {
  movieCover.remove();
  window.removeEventListener("scroll", infiniteScroll);
};
//첫 스크롤 생성
window.onload = async function () {
  await addCover(currentPage);
};

window.addEventListener("scroll", infiniteScroll);
