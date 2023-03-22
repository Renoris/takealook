import authFetch from "../fetchs/AuthFetch.js";
import {reFreshMovieListImage} from "../util/convertImage.js";

export async function movieCheckBoxClickEventListener(
    e, eventParameter,
) {
    const {movieId, bucketId, movieRow, selectedMovies, unSelectedMovies,thumb ,refreshThumbArg} = eventParameter;
    let {thumbArray} = refreshThumbArg;

    if (e.target.checked) {
        await authFetch("/api/bucket_item/my", "POST", { movieId, bucketId });
        movieRow.remove();
        selectedMovies.prepend(movieRow);
        thumbArray.unshift({movieId:movieId, thumb});
        reFreshMovieListImage(refreshThumbArg);
    } else {
        await authFetch("/api/bucket_item/my", "DELETE", { movieId, bucketId });
        movieRow.remove();
        unSelectedMovies.prepend(movieRow);
        for (let i = 0; i < thumbArray.length; i++){
            if (thumbArray[i].movieId === movieId) {
                thumbArray.splice(i,1);
                break;
            }
        }
        reFreshMovieListImage(refreshThumbArg);
    }
    reFreshMovieListImage(refreshThumbArg);
}
