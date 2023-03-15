import {convertImageScaleMedium, convertImageScaleSmall} from "../util/covertImage.js";
const elementFactory = {
    /**
     * 무비 리스트 엘리멘트 생성
     * @param bucketId
     * @param bucketName
     * @param thumbArray
     * @param parentNode
     * @param movieListClickEventListener : function
     */
    reCreateMovieList: function (bucketId, bucketName, thumbArray, parentNode, movieListClickEventListener) {
        //엘리먼트 생성
        const folderBox = document.createElement("div");
        folderBox.classList.add("folder_box");
        folderBox.id = `bucket_${bucketId}`;

        const folderImages = document.createElement("div");
        folderImages.classList.add("folder_imgs");

        const folderImageDiv1 = document.createElement('div');
        folderImageDiv1.classList.add('folder_img1');
        const thumb1 = document.createElement('img');
        thumb1.src = thumbArray[0];
        folderImageDiv1.append(thumb1);

        const folderImageDiv2 = document.createElement('div');
        folderImageDiv2.classList.add('folder_img2');
        const thumb2 = document.createElement('img');
        thumb2.src = thumbArray[1];
        folderImageDiv2.append(thumb2);

        const folderImageDiv3 = document.createElement('div');
        folderImageDiv3.classList.add('folder_img3');
        const thumb3 = document.createElement('img');
        thumb3.src = thumbArray[2];
        folderImageDiv3.append(thumb3);

        folderImages.append(folderImageDiv1);
        folderImages.append(folderImageDiv2);
        folderImages.append(folderImageDiv3);

        const folderName = document.createElement("h4");
        folderName.classList.add("folder_name");
        folderName.innerText = bucketName;

        //계층 구조 형성
        folderBox.append(folderImages);
        folderBox.append(folderName);
        parentNode.append(folderBox);

        const thumbs = {
            thumb1,
            thumb2,
            thumb3
        }
        //이벤트 할당
        folderBox.addEventListener("click", (e) => movieListClickEventListener(e, bucketId, folderBox, thumbs));
    },
    /**
     * 모달 내 영화 리스트 아이템 생성
     * @param movieInfo
     * @param bucketId
     * @param checked
     * @param selectedMovies
     * @param unSelectedMovies
     * @param movieCheckBoxClickEventListener : function
     * @param thumbs : Object
     */
    createBucketItem : function (movieInfo, bucketId, checked, selectedMovies, unSelectedMovies, movieCheckBoxClickEventListener, thumbs) {
        const li = document.createElement("li");
        li.id = `movie_${movieInfo.movieId}`;
        const img = document.createElement("img");
        img.src = convertImageScaleSmall(movieInfo.thumb);

        const titleDom = document.createElement("h3");
        titleDom.innerHTML = movieInfo.title;

        const inputCheckBox = document.createElement("input");
        inputCheckBox.type = "checkbox";
        if (checked) {
            inputCheckBox.checked = true;
        }

        inputCheckBox.addEventListener("change", (e) =>
            movieCheckBoxClickEventListener(
                e,
                movieInfo.movieId,
                bucketId,
                li,
                selectedMovies,
                unSelectedMovies,
                movieInfo.thumb,
                thumbs
            )
        );

        li.append(img);
        li.append(titleDom);
        li.append(inputCheckBox);
        if (checked) {
            selectedMovies.append(li);
        } else {
            unSelectedMovies.append(li);
        }
    },
    /**
     * 내 픽 영화 엘리먼트 생성
     * @param movie
     * @param favBtnClickEventListener
     * @param parentNode
     */
    createMyPick: function(movie, favBtnClickEventListener, parentNode) {
        const myListPoster = document.createElement("div");
        myListPoster.classList.add("mylist_poster");
        myListPoster.id = `movie_${movie.movieId}`;
        const poster_collection = document.createElement("img");
        poster_collection.classList.add("poster_collection");
        poster_collection.src = convertImageScaleMedium(movie.thumb);
        const favBtn = document.createElement("img");
        favBtn.classList.add("poster_click");
        favBtn.src = "images/fav_on.png";
        myListPoster.appendChild(poster_collection);
        myListPoster.appendChild(favBtn);
        parentNode.appendChild(myListPoster);
        favBtn.addEventListener("click", async (e) => favBtnClickEventListener(e, movie.movieId, parentNode, myListPoster));
    }
};

export default elementFactory;
