import authFetch from "../fetchs/AuthFetch.js";
import {validateTitle} from "../util/validationText.js";

export async function titleConvertEvent(e, refreshBucketName ,bucket, fixedFolderTitle, titleEdit) {
    e.preventDefault();
    bucket.bucketName = refreshBucketName;
    const {bucketName, bucketId} = bucket;

    if (!validateTitle(bucketName)) {
        alert("제목이 적절하지 않습니다.");
        return;
    }

    const originTitle = document.getElementById(`folder_${bucketId}`);
    originTitle.innerText = bucketName;

    const result = await authFetch(`/api/bucket/my/title/${bucketId}`,`PATCH`, {bucketName});
    if (result.message !== 'success') {alert("서버와의 연결에 실패했습니다.");}
    fixedFolderTitle.innerText = bucketName;
    fixedFolderTitle.classList.remove('title_hide');
    titleEdit.classList.add('title_hide');
}

/**
 * 모달내 픽 구분
 * @param simplePicks
 * @param bucketItemMovies
 * @returns {{selectList, unSelectList: *[]}}
 */
export function distributePick(simplePicks, bucketItemMovies) {
    const unSelectList = [];
    for (const pick of simplePicks){
        let flag = false;
        for (const movies of bucketItemMovies) {
            if (pick.movieId === movies.movieId) {
                flag = true;
                break;
            }
        }

        if (!flag) {
            unSelectList.push(pick);
        }
    }

    return {
        selectList:bucketItemMovies,
        unSelectList,
    };
}
