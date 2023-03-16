import {convertImageScaleMedium, convertImageScaleSmall, reFreshMovieListImage} from "../util/convertImage.js";
import {toggleModal} from "../index/main_contEventListener.js";
import authFetch from "../fetchs/AuthFetch.js";
const elementFactory = {
    /**
     * 무비 리스트 엘리멘트 생성
     * @param bucketId
     * @param bucketName
     * @param publish
     * @param thumbArray
     * @param parentNode
     * @param movieListClickEventListener : function
     */
    reCreateMovieList: function (bucketId, bucketName, publish ,thumbArray, parentNode, movieListClickEventListener) {
        console.log (`${bucketName} : ${publish}`)
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


        const sharing = document.createElement('span');
        sharing.id = `shareing_${bucketId}`;
        sharing.classList.add('sharing');
        sharing.innerText = "공유중";

        const shareValid = document.createElement('img');
        shareValid.classList.add('share_valid');
        shareValid.id = `share_${bucketId}`
        shareValid.src = `${window.location.protocol}//${window.location.host}/images/share_valid.png`;
        shareValid.addEventListener('click', async (e) => {
            const response = await authFetch(`/api/bucket/my/publish/${bucketId}`, 'PATCH', {publish : false});
            if (!response.message) {
                alert("서버와 통신하지 못하였습니다.");
                return;
            }
            shareValid['data-active'] = 0;
            shareValid.classList.remove('share_on');
            shareInvalid['data-active'] = 1;
            shareInvalid.classList.add('share_on');
            sharing.classList.remove('share_on');
        })

        const shareInvalid = document.createElement('img');
        shareInvalid.classList.add('share_invalid');
        shareInvalid.src = `${window.location.protocol}//${window.location.host}/images/share_invalid.png`;
        shareInvalid.addEventListener('click', async (e) => {
            const response = await authFetch(`/api/bucket/my/publish/${bucketId}`, 'PATCH', {publish : true});
            if (!response.message) {
                alert("서버와 통신하지 못하였습니다.");
                return;
            }
            shareValid['data-active'] = 1;
            shareValid.classList.add('share_on');
            shareInvalid['data-active'] = 0;
            shareInvalid.classList.remove('share_on');
            sharing.classList.add('share_on');
        })

        if(publish) {
            shareValid['data-active'] = 1;
            shareInvalid['data-active'] = 0;
        } else {
            shareValid['data-active'] = 0;
            shareInvalid['data-active'] = 1;
        }

        const deleteFolder = document.createElement('img');
        deleteFolder.classList.add('delete_folder');
        deleteFolder.src = `${window.location.protocol}//${window.location.host}/images/delete_folder.png`;

        //이부분은 새로 생성 햇을때 추가할건지 말건지
        const deleteBtn = document.querySelector(".delete_btn");
        if (deleteBtn.classList.contains('edit_list')) {
            deleteFolder.classList.add('delete_on');
        }

        deleteFolder.addEventListener('click', async (e) => {
            const response = await authFetch(`/api/bucket/my/${bucketId}`, 'DELETE');
            if (!response.message) {
                alert("서버와 통신하지 못하였습니다.");
                return;
            }
            folderBox.remove();
            alert("삭제되었습니다.");
        })


        const folderName = document.createElement("h4");
        folderName.id = `folder_${bucketId}`;
        folderName.classList.add("folder_name");
        folderName.innerText = bucketName;

        //계층 구조 형성
        folderBox.append(folderImages);
        folderBox.append(shareValid);
        folderBox.append(shareInvalid);
        folderBox.append(deleteFolder);
        folderBox.append(folderName);
        folderBox.append(sharing);
        parentNode.append(folderBox);

        //이벤트 할당
        thumb1.addEventListener("click", (e) => movieListClickEventListener(e, bucketId, folderBox, refreshThumbArg));
    },
    /**
     * 모달 내 영화 리스트 아이템 생성
     * @param movieInfo
     * @param bucketId
     * @param checked
     * @param selectedMovies
     * @param unSelectedMovies
     * @param movieCheckBoxClickEventListener : function
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


    createEmptyMovieFolder: function (movieListClickEventListener, parentNode) {
        let array = [
            {thumb:`${window.location.protocol}//${window.location.host}/images/no_image.png`},
            {thumb:`${window.location.protocol}//${window.location.host}/images/no_image_black.png`},
            {thumb:`${window.location.protocol}//${window.location.host}/images/no_image_color.png`},
        ];
        const folderBox = document.createElement("div");
        folderBox.classList.add("folder_box");

        const folderImages = document.createElement("div");
        folderImages.classList.add("folder_imgs");

        const folderImageDiv = document.createElement("div");
        folderImageDiv.classList.add("folder_img1");

        const addImage = document.createElement("img");
        addImage.src = `${window.location.protocol}//${window.location.host}/images/add_folder.png`;
        folderImageDiv.append(addImage);

        const folderImageDiv2 = document.createElement("div");
        folderImageDiv2.classList.add("folder_img2");

        const addImage2 = document.createElement("img");
        addImage2.src = `${window.location.protocol}//${window.location.host}/images/add_folder.png`;
        folderImageDiv2.append(addImage2);

        const folderImageDiv3 = document.createElement("div");
        folderImageDiv3.classList.add("folder_img3");

        const addImage3 = document.createElement("img");
        addImage3.src = `${window.location.protocol}//${window.location.host}/images/add_folder.png`;
        folderImageDiv3.append(addImage3);

        folderImages.append(folderImageDiv);
        folderImages.append(folderImageDiv2);
        folderImages.append(folderImageDiv3);

        const folderName = document.createElement("h4");
        folderName.classList.add("folder_name");
        folderName.innerText = "리스트 생성";

        //계층 구조 형성
        folderBox.append(folderImages);
        folderBox.append(folderName);
        parentNode.append(folderBox);

        //이벤트 할당
        folderBox.addEventListener("click", async (e) => {
            const { bucketId } = await authFetch("/api/bucket/my", "POST", { bucketName: "새로운 폴더" });
            folderBox.remove();
            elementFactory.reCreateMovieList(bucketId,"새로운 폴더",false ,array , parentNode, movieListClickEventListener);
            parentNode.append(folderBox);
        });
    }
};

export default elementFactory;
