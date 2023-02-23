import elementFactory from "../elements/MoviesElements.js";
import authfetch from "../fetchs/authfetch.js";

export async function pickMovie (movieId, access) {
    if (!access) {
        alert("로그인이 되어잇지 않습니다.");
        return;
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