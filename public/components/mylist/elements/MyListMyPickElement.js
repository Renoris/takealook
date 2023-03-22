import {convertImageScaleMedium} from "../../util/convertImage.js";
import {toggleModal} from "../../index/main_contEventListener.js";
import {favBtnClickEventListener} from "../myListMovieListEvent.js";

const elementFactory = {
    createMyPick: function(movie, parentNode) {
        const myListPoster = document.createElement("div");
        myListPoster.classList.add("mylist_poster");
        myListPoster.id = `movie_${movie.movieId}`;
        const poster_collection = document.createElement("img");
        poster_collection.classList.add("poster_collection");
        poster_collection.src = convertImageScaleMedium(movie.thumb);
        const favBtn = document.createElement("img");
        favBtn.classList.add("poster_click");
        favBtn.src = "images/fav_on.png";

        const posterInfo = document.createElement("div");
        posterInfo.classList.add("poster_info");

        const title = document.createElement("h3");
        title.innerText = movie.title;
        const genre = document.createElement("span");
        genre.innerText = movie.genre;

        posterInfo.append(title);
        posterInfo.append(genre);

        myListPoster.appendChild(poster_collection);
        myListPoster.appendChild(favBtn);
        myListPoster.appendChild(posterInfo);

        parentNode.appendChild(myListPoster);
        poster_collection.addEventListener('click', async (e) => {await toggleModal(movie.movieId)});
        favBtn.addEventListener("click", async (e) => favBtnClickEventListener(e, movie.movieId, parentNode, myListPoster));
    },

};

export default elementFactory;
