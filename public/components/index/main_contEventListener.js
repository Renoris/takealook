import elementFactory from "../elements/MoviesElements.js";
import authFetch from "../fetchs/AuthFetch.js";
import {replaceSpecialCode} from "../util/convertText.js";
const access = localStorage.getItem("takealook-access");

export function movieTagClickEventListener(e, scrollControlValues) {
    scrollControlValues.movieContainer.classList.remove("hide");
    scrollControlValues.favContainer.classList.add("hide");
    scrollControlValues.tags.classList.remove("tags_hide");
    scrollControlValues.activeFav = false;
}

export function recommendTagClickEventListener(e, scrollControlValues) {
    scrollControlValues.movieContainer.classList.add("hide");
    scrollControlValues.favContainer.classList.remove("hide");
    scrollControlValues.tags.classList.add("tags_hide");
    scrollControlValues.activeFav = true;
}


export async function toggleModal(movieId) {
  if (!movieId) alert("영화를 읽어오지 못했습니다.");
  try {
    const loadingModal = document.querySelector(".modal_loading");
    loadingModal.classList.add("modal_on");
    const movie = await (await fetch(`/api/movie/${movieId}`)).json();
    if (!movie) throw Error("영화정보를 불러오지 못했습니다.");
    const movieDetailImage = document.getElementById("movie_detail_image");
    const movieDetailTitle = document.querySelector(".movie_detail_title");
    const movieDetailStory = document.getElementById("movie_detail_story");
    const movieDetailPubDate = document.getElementById("movie_detail_pub_date");
    const movieDetailRunningTime = document.getElementById("movie_detail_running_time");
    const movieDetailGenre = document.getElementById("movie_detail_genre");
    const movieDetailUserRating = document.getElementById("movie_detail_user_rating");
    const movieModal = document.querySelector(".modal_movie");

    movieDetailImage.src = movie.thumb;
    if (movie.title.length > 12) {
      movieDetailTitle.classList.add("modalfontdown");
    } else {
      movieDetailTitle.classList.remove("modalfontdown");
    }
    let replacedTitle = movie.title;
    replacedTitle= replaceSpecialCode(replacedTitle);
    movieDetailTitle.innerText = replacedTitle;
    movieDetailStory.innerText = movie.story.replace("\n", " ");
    movieDetailPubDate.innerText = movie.pubDate.slice(0, 4);
    movieDetailRunningTime.innerText = `${movie.runningTime ? movie.runningTime : "알수 없음"}`;
    movieDetailGenre.innerText = `${movie.genre}`;
    movieDetailUserRating.innerText = `평점: ${movie.userRating}`;
    loadingModal.classList.remove("modal_on");
    movieModal.classList.add("modal_on");
  } catch (error) {
    alert(error.message);
  }
}

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
          await authFetch(
            "/api/pick",
              "DELETE",
            {
              movieId,
            },
          );
          node.src = "./images/fav_off.png";
          _state = 0;
        } else {
          await authFetch(

            "/api/pick",
              "POST",
            {
              movieId,
            },
          );
          node.src = "./images/fav_on.png";
          _state = 1;
        }
      } catch (error) {
        alert("서버와의 접속에 실패했습니다.");
      }
    },
  };
}
export const createCover = (movie, $movieContainer) => {
    const movieCover = elementFactory.createMovieCoverNode($movieContainer);
    const pickButton = elementFactory.createPickButtonNode(movie.movieId, movie.isPick, movieCover);
    const coverImageNode = elementFactory.createCoverImageNode(movieCover);
    elementFactory.createInCoverImageNode(movie.thumb, coverImageNode);
     let replacedTitle = movie.title;
     for (const key in removeList) {
         replacedTitle = replacedTitle.replace(`${key}`, `${removeList[key]}`);
     }
    elementFactory.createMovieInfoNode(replacedTitle, movie.genre, movieCover);
    const buttonState = getButtonState(movie.isPick, pickButton);
    pickButton.addEventListener("click", (e) => buttonState.turnState());
    coverImageNode.addEventListener("click", (e) => toggleModal(movie.movieId));
};


export const addCover = async (searchInfo ,parentNode) => {
    let count = 0;
    const {genre, pubDate, query, currentPage, pageMax, coverIncrease, coverLimit} = searchInfo;

    const startRange = (currentPage - 1) * coverIncrease;
    const endRange = currentPage === pageMax ? coverLimit : currentPage * coverIncrease;
    try {
        const params = {
            limit: endRange - startRange,
            offset: startRange
        };

        if (genre) {
            params.genre = genre;
        }

        if (pubDate) {
            params.pubDate = pubDate;
        }

        if (query){
            params.query = query;
        }

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
        result.forEach((movie) => {
          createCover(movie, parentNode);
        });
        count = result.length;
    } catch (error) {

    }

    return count;
};

/**
 * TOP 버튼 스크롤 이벤트
 * @param e : Event
 * @param top
 */
export function topScrollEventListener(e, top) {
    if (window.scrollY > 500) {
        top.style.display = "block";
    } else {
        top.style.display = "none";
    }
}

export async function reloadPage (e, searchInfo, scrollControlValues) {
    searchInfo.currentPage = 1;
    scrollControlValues.movieContainer.textContent = "";
    const length = await addCover(searchInfo, scrollControlValues.movieContainer);
    scrollControlValues.endMovie = length === 0;
    searchInfo.currentPage++;
}