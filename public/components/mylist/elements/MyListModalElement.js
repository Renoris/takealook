import authFetch from "../../fetchs/AuthFetch.js";
import {distributePick, titleConvertEvent} from "../myListModalEvents.js";
import MyListModalItemElement from "./MyListModalItemElement.js";
const elementFactory = {
    /**
     * 모달 데이터 리프레시
     * @param e
     * @param bucket
     * @param folder_box
     * @param refreshThumbArg
     * @returns {Promise<void>}
     */
    refreshModalData : async function (e, bucket, folder_box, refreshThumbArg) {
        //dom 셋팅
        const {bucketName, bucketId} = bucket;
        const folderTitle = document.querySelector(".folder_title");
        const selectedMovies = document.querySelector(".selected_movies");
        const unselectedMovies = document.querySelector(".unselected_movies");
        const folderTitleHead = document.querySelector('.folder_title_head');

        const fixedFolderTitle = document.createElement('h2');
        fixedFolderTitle.classList.add('folder_title');
        fixedFolderTitle.id = "fixed_folder_title";
        fixedFolderTitle.innerText = bucketName;

        const titleEdit = document.createElement('div');
        titleEdit.classList.add('title_edit');
        titleEdit.classList.add('title_hide');

        const inputFolderTitle = document.createElement('input');
        inputFolderTitle.type = "text";
        inputFolderTitle.id = "input_folder_title";

        const applyTitle = document.createElement('button');
        applyTitle.type = "button";
        applyTitle.id = "apply_title";
        applyTitle.innerText =  "적용";

        titleEdit.append(inputFolderTitle);
        titleEdit.append(applyTitle);

        folderTitleHead.textContent = '';
        folderTitleHead.append(fixedFolderTitle);
        folderTitleHead.append(titleEdit);

        fixedFolderTitle.addEventListener('click', () => {
            fixedFolderTitle.classList.add('title_hide');
            inputFolderTitle.value = fixedFolderTitle.innerText;
            titleEdit.classList.remove('title_hide');
        })

        applyTitle.addEventListener('click', async (e) => {await titleConvertEvent(e,inputFolderTitle.value ,bucket, fixedFolderTitle, titleEdit)})
        inputFolderTitle.addEventListener('keydown', async (e) => {if (e.key === 'Enter') {await titleConvertEvent(e,inputFolderTitle.value ,bucket, fixedFolderTitle, titleEdit);}})

        //초기화
        selectedMovies.textContent = "";
        unselectedMovies.textContent = "";
        folderTitle.innerHTML = "";

        //데이터 셋팅
        const simplePicks = await authFetch("/api/pick/simple"); // 여기
        const bucketInfo = await authFetch(`/api/bucket/my/${bucketId}`); //여기 건들이자
        const bucketItemMovies = bucketInfo.bucketItemMovies; //
        const { selectList, unSelectList } = distributePick(simplePicks, bucketItemMovies); //여기도

        folderTitle.innerHTML = bucketInfo.bucketName;

        for (const select of selectList) {
            MyListModalItemElement.createBucketItem(
                select,
                bucketId,
                true,
                selectedMovies,
                unselectedMovies,
                refreshThumbArg
            );
        }
        for (const unSelect of unSelectList) {
            MyListModalItemElement.createBucketItem(
                unSelect,
                bucketId,
                false,
                selectedMovies,
                unselectedMovies,
                refreshThumbArg
            );
        }
    }
};

export default elementFactory;
