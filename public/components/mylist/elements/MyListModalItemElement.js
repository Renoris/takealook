import {convertImageScaleSmall} from "../../util/convertImage.js";
import {movieCheckBoxClickEventListener} from "../myListModalItemEvents.js";

const elementFactory = {
    /**
     * 모달 내 영화 리스트 아이템 생성
     * @param movieInfo
     * @param bucketId
     * @param checked
     * @param selectedMovies
     * @param unSelectedMovies
     * @param refreshThumbArg
     */
    createBucketItem : function (movieInfo, bucketId, checked, selectedMovies, unSelectedMovies, refreshThumbArg) {
        const li = document.createElement("li");
        li.id = `movie_${movieInfo.movieId}`;
        const img = document.createElement("img");
        const convertedThumb = convertImageScaleSmall(movieInfo.thumb);

        img.src = convertedThumb;

        const titleDom = document.createElement("h3");
        titleDom.innerHTML = movieInfo.title;

        const inputCheckBox = document.createElement("input");
        inputCheckBox.type = "checkbox";
        if (checked) {
            inputCheckBox.checked = true;
        }

        const eventParameters = {
            movieId:movieInfo.movieId,
            bucketId,
            movieRow:li,
            selectedMovies,
            unSelectedMovies,
            refreshThumbArg,
            thumb:convertedThumb
        }

        inputCheckBox.addEventListener("change", (e) => movieCheckBoxClickEventListener(e, eventParameters));

        li.append(img);
        li.append(titleDom);
        li.append(inputCheckBox);
        if (checked) {
            selectedMovies.append(li);
        } else {
            unSelectedMovies.append(li);
        }
    },
};

export default elementFactory;
