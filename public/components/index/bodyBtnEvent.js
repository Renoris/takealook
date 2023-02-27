import elementFactory from "../elements/MoviesElements.js";
import authfetch from "../fetchs/authfetch.js";
const access = localStorage.getItem('takealook-access')

function getButtonState(state, node) {
    let _state = state;
    return {

        turnState : async function () {
            if (!access) {
                alert("로그인이 필요한 서비스 입니다.");
                return;
            }
            try {
                const movieId = Number(node.id.slice(6));
                if (_state) {
                    await authfetch('/api/pick', {
                        movieId
                    }, 'DELETE')
                    node.src = "./images/fav_off.png";
                    _state = 0;
                } else {
                    await authfetch('/api/pick', {
                        movieId
                    }, 'POST')
                    node.src = "./images/fav_on.png";
                    _state = 1;
                }
            }catch (error) {
                console.log('서버와의 접속에 실패했습니다.')
            }
        }
    }
}

export async function spreadMovieInfo(params, access) {
    try {
        let headers = {
            'Content-Type': 'application/json'
        };
        if (access !== null) {
            headers.authorization = access;
        }
        const response = await fetch('/api/movie', {
            headers,
            params
        });

        const result = await response.json();

        const $movieContainer = document.querySelector('.movie_container');
        result.forEach((movie) => {
            const movieCover = elementFactory.createMovieCoverNode($movieContainer);
            const pickButton = elementFactory.createPickButtonNode(movie.movieId, movie.isPick ,movieCover);
            const coverImageNode = elementFactory.createCoverImageNode(movieCover);
            elementFactory.createInCoverImageNode(movie.image, coverImageNode);
            elementFactory.createMovieInfoNode(movie.title, movie.genre, movieCover);
            const buttonState = getButtonState(movie.isPick, pickButton);
            pickButton.addEventListener('click', (e) => buttonState.turnState());
        });

        console.log(result);
    } catch (error) {
        console.log(error.message)
    }
}