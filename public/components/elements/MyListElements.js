import {convertImageScaleMedium, convertImageScaleSmall, reFreshMovieListImage} from "../util/convertImage.js";
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
        folderImageDiv1.append(thumb1);

        const folderImageDiv2 = document.createElement('div');
        folderImageDiv2.classList.add('folder_img2');
        const thumb2 = document.createElement('img');
        folderImageDiv2.append(thumb2);

        const folderImageDiv3 = document.createElement('div');
        folderImageDiv3.classList.add('folder_img3');
        const thumb3 = document.createElement('img');
        folderImageDiv3.append(thumb3);

        const thumbNodes = [
            thumb1,
            thumb2,
            thumb3
        ]

        const refreshThumbArg = {
            thumbNodes,
            thumbArray
        }

        reFreshMovieListImage(refreshThumbArg)
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

        //이벤트 할당
        folderBox.addEventListener("click", (e) => movieListClickEventListener(e, bucketId, folderBox, refreshThumbArg));
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
    createBucketItem : function (movieInfo, bucketId, checked, selectedMovies, unSelectedMovies, movieCheckBoxClickEventListener, refreshThumbArg) {
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