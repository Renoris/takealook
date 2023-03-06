import elementFactory from "../elements/MoviesElements.js";
import authFetch from "../fetchs/AuthFetch.js";
const access = localStorage.getItem("takealook-access");
const removeList = {
    '&nbsp;': ' ',
    '&lt;': '<',
    '&gt;': '>',
    '&amp;': '&',
    '&quot;': '"',
    '&#035;': '#',
    '&#039;': ''
};
async function toggleModal(movieId) {
    if (!movieId) alert("영화를 읽어오지 못했습니다.");
    try {
        const loadingModal = document.querySelector('.modal_loading');
        loadingModal.classList.add('modal_on');
        const movie  = await (await fetch(`/api/movie/${movieId}`)).json();
        if (!movie) throw Error ("영화정보를 불러오지 못했습니다.");
        const movieDetailImage = document.getElementById('movie_detail_image');
        const movieDetailTitle = document.getElementById('movie_detail_title');
        const movieDetailStory = document.getElementById('movie_detail_story');
        const movieDetailPubDate = document.getElementById('movie_detail_pub_date');
        const movieDetailRunningTime = document.getElementById('movie_detail_running_time');
        const movieDetailGenre = document.getElementById('movie_detail_genre');
        const movieDetailUserRating = document.getElementById('movie_detail_user_rating');
        const movieModal = document.querySelector('.modal_movie');

        movieDetailImage.src = movie.image;
        if (movie.title.length > 12) {
            movieDetailTitle.classList.add('modalfontdown');
        }else {
            movieDetailTitle.classList.remove('modalfontdown');
        }
        let replacedTitle = movie.title;
        for (const key in removeList) {
            replacedTitle = replacedTitle.replace(`${key}`, `${removeList[key]}`);
        }

        movieDetailTitle.innerText = replacedTitle;
        movieDetailStory.innerText =  movie.story.replace('\n', ' ');
        movieDetailPubDate.innerText = movie.pubDate.slice(0,4);
        movieDetailRunningTime.innerText = `${(movie.runningTime) ? movie.runningTime : '알수 없음'}`;
        movieDetailGenre.innerText = `${movie.genre}`;
        movieDetailUserRating.innerText = `평점: ${(movie.userRating)}`;

        loadingModal.classList.remove('modal_on');
        movieModal.classList.add('modal_on');
    } catch (error) {
        alert(error.message);
    }
}


function getButtonState(state, node) {
    let _state = state;
    return {
        turnState: async function () {
            const loadingModal = document.querySelector('.modal_loading');
            loadingModal.classList.add('modal_on');
            if (!access) {
                alert("로그인이 필요한 서비스 입니다.");
                return;
            }
            try {
                const movieId = Number(node.id.slice(6));
                if (_state) {
                    await authFetch(
                        "/api/pick",
                        {
                            movieId,
                        },
                        "DELETE"
                    );
                    node.src = "./images/fav_off.png";
                    _state = 0;
                } else {
                    await authFetch(
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
            loadingModal.classList.remove('modal_on');
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
    coverImageNode.addEventListener('click', (e) => toggleModal(movie.movieId));
};

export const addCover = async (pageIndex, pageMaxIndex, coverIncrease, coverLimit, search ,parentNode) => {
    const startRange = (pageIndex - 1) * coverIncrease;
    const endRange = pageIndex === pageMaxIndex ? coverLimit : pageIndex * coverIncrease;
    const {genre, pubDate} = search;
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
            createCover(movie, parentNode);
        });
    } catch (error) {
    }
};