import authFetch from "../fetchs/AuthFetch.js";

const access = localStorage.getItem('takealook-access');
const refresh = localStorage.getItem('takealook-refresh');
function convertImageScaleMedium(image) {
    return image.replace('type=m886_590_2', 'type=m203_290_2');
}

function createMyListPoster(movie, parentNode) {
    const myListPoster = document.createElement('div');
    myListPoster.classList.add('mylist_poster');
    myListPoster.id = `movie_${movie.movieId}`;
    const poster_collection = document.createElement('img');
    poster_collection.classList.add('poster_collection');
    poster_collection.src = convertImageScaleMedium(movie.thumb);
    const favBtn = document.createElement('img');
    favBtn.classList.add('poster_click');
    favBtn.src = "images/fav_on.png";

    myListPoster.appendChild(poster_collection);
    myListPoster.appendChild(favBtn);

    parentNode.appendChild(myListPoster);

    favBtn.addEventListener('click', async (e) => {
        await authFetch("/api/pick", {movieId: movie.movieId}, "DELETE");
        parentNode.removeChild(myListPoster);
    });
}


if (!access || !refresh) {
    alert("로그인이 되지 않은 사용자 입니다");
    location.href = "/";
}

async function spreadMyPick() {
    const listPoster = document.querySelector('.list_poster');
    const result = await authFetch('/api/pick');
    result.forEach((item) => {
        createMyListPoster(item, listPoster);
    })
}

spreadMyPick();