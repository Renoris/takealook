import authFetch from "../fetchs/authfetch.js";
import elementFactory from "../elements/movies/MoviesElements.js";


const access = localStorage.getItem('takealook-access');
const refresh = localStorage.getItem('takealook-refresh');
async function headerInitialize () {
    if (access && refresh) {
        try {
            const response = await authFetch('/api/member/my');
            const {email, nickName} = response;
            const dom_nick_name = document.getElementById("user_nick_name");
            const dom_user_email = document.getElementById('user_email');
            dom_nick_name.innerText = nickName;
            dom_user_email.innerText = email;
        }catch (error) {
            console.log(error);
        }
    }
}

async function bodyInitialize() {
    try {
        let headers = {
            'Content-Type': 'application/json'
        };
        if (access !== null) {
            headers.authorization = access;
        }
        const response = await fetch('/api/movie', {
            method: 'GET',
            headers,
            params: {
                limit:10,
                offset:0,
            }
        });

        const result = await response.json();

        const $movieContainer = document.querySelector('.movie_container');
        result.forEach((movie) => {
            const movieCover = elementFactory.createMovieCoverNode($movieContainer);
            elementFactory.createPickButtonNode(movie.id, movieCover);
            const coverImageNode = elementFactory.createCoverImageNode(movieCover);
            elementFactory.createInCoverImageNode(movie.image, coverImageNode);
            elementFactory.createMovieInfoNode(movie.title, movie.genre, movieCover);
        });

        console.log(result);
    } catch (error) {
        console.log(error.message)
    }
}

(async function initialize() {
    headerInitialize();
    bodyInitialize();
})();
