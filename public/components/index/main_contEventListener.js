import elementFactory from "../elements/MoviesElements.js";
import authFetch from "../fetchs/AuthFetch.js";
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
        },
    };
}
const createCover = (movie, $movieContainer) => {
    const movieCover = elementFactory.createMovieCoverNode($movieContainer);
    const pickButton = elementFactory.createPickButtonNode(movie.movieId, movie.isPick, movieCover);
    const coverImageNode = elementFactory.createCoverImageNode(movieCover);
    elementFactory.createInCoverImageNode(movie.image, coverImageNode);
    elementFactory.createMovieInfoNode(movie.title, movie.genre, movieCover);
    const buttonState = getButtonState(movie.isPick, pickButton);
    pickButton.addEventListener("click", (e) => buttonState.turnState());
};

export const addCover = async (pageIndex, pageMaxIndex, coverIncrease, coverLimit, parentNode) => {
    const startRange = (pageIndex - 1) * coverIncrease;
    const endRange = pageIndex === pageMaxIndex ? coverLimit : pageIndex * coverIncrease;

    try {
        const params = {
            limit: endRange - startRange,
            offset: startRange
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
            createCover(movie, parentNode);
        });
    } catch (error) {
    }
};