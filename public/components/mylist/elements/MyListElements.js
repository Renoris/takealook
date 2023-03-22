import {reFreshMovieListImage} from "../../util/convertImage.js";
import authFetch from "../../fetchs/AuthFetch.js";
import {movieListClickEventListener, shareValidClickEvent, shareInvalidClickEvent} from "../myListMovieListEvent.js";

async function deleteFolderEvent(e, bucketId , folderBox) {
    const response = await authFetch(`/api/bucket/my/${bucketId}`, 'DELETE');
    if (!response.message) {
        alert("서버와 통신하지 못하였습니다.");
        return;
    }
    folderBox.remove();
    alert("삭제되었습니다.");
}

const elementFactory = {
    /**
     * 무비 리스트 엘리멘트 생성
     * @param bucket
     * @param parentNode
     */
    reCreateMovieList: function (bucket, parentNode) {
        const {bucketId, bucketName, publish, thumbArray} = bucket;
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
        shareValid.addEventListener('click', async (e) => shareValidClickEvent(e, bucketId ,shareValid, shareInvalid, sharing));


        const shareInvalid = document.createElement('img');
        shareInvalid.classList.add('share_invalid');
        shareInvalid.src = `${window.location.protocol}//${window.location.host}/images/share_invalid.png`;
        shareInvalid.addEventListener('click', async (e) => shareInvalidClickEvent(e, bucketId ,shareValid, shareInvalid, sharing));

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

        deleteFolder.addEventListener('click', async (e) => deleteFolderEvent(e, bucketId ,folderBox));

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
        thumb1.addEventListener("click", (e) => movieListClickEventListener(e, bucket, folderBox, refreshThumbArg));
    },

    createEmptyMovieFolder: function (parentNode) {
        let thumbArray = [
            {thumb:`${window.location.protocol}//${window.location.host}/images/add_folder.png`},
            {thumb:`${window.location.protocol}//${window.location.host}/images/add_folder.png`},
            {thumb:`${window.location.protocol}//${window.location.host}/images/add_folder.png`},
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
            elementFactory.reCreateMovieList({bucketId, bucketName :"새로운 폴더" , publish:false , thumbArray} , parentNode);
            parentNode.append(folderBox);
        });
    },
};

export default elementFactory;
