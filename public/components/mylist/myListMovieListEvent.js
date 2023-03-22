import authFetch from "../fetchs/AuthFetch.js";
import MyListModalElement from "./elements/MyListModalElement.js";
export async function movieListClickEventListener(e, bucketInfo, folder_box, refreshThumbArg) {
    const modal = document.querySelector(".selection_overlay");
    await MyListModalElement.refreshModalData(e, bucketInfo ,folder_box, refreshThumbArg);
    modal.classList.add("select_on");
}

export async function favBtnClickEventListener(e, movieId, parentNode, myListPoster) {
    await authFetch("/api/pick", "DELETE", { movieId });
    parentNode.removeChild(myListPoster);
}

export function deleteBtnClickEventListener(e, deleteBtn) {
    e.preventDefault();
    const deleteFolders = document.querySelectorAll(".delete_folder"); //폴더 삭제 버튼 누를시 등장 이미지
    deleteBtn.classList.toggle("edit_list");
    for (const item of deleteFolders) {
        item.classList.toggle("delete_on");
    }
}

//영화 리스트 부분
export function shareBtnClickEventListener(e, shareBtn) {
    e.preventDefault();
    const shareValids = document.querySelectorAll(".share_valid"); //공유중인 상태 이미지
    const shareInvalids = document.querySelectorAll(".share_invalid"); //공유 안된 상태 이미지
    if (shareBtn.classList.contains("edit_list")) {
        shareBtn.classList.remove("edit_list");
        const sharings = document.querySelectorAll('.sharing');

        for (const share of sharings) {
            share.classList.remove('share_on');
        }
        for (const valid of shareValids) {
            valid.classList.remove('share_on');
        }

        for (const invalid of shareInvalids) {
            invalid.classList.remove('share_on');
        }
    } else {
        shareBtn.classList.add("edit_list");
        for (const valid of shareValids) {
            if (valid['data-active'] === 1) {
                valid.classList.add('share_on');
                const sharing = document.getElementById(`shareing_${valid.id.slice(6)}`);
                sharing.classList.add('share_on');
            }
        }

        for (const invalid of shareInvalids) {
            if (invalid['data-active'] === 1) {
                invalid.classList.add('share_on');
            }
        }
    }
}

export async function shareValidClickEvent(e, bucketId ,shareValid, shareInvalid, sharing) {
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
}

export async function shareInvalidClickEvent(e, bucketId ,shareValid, shareInvalid, sharing) {
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
}


