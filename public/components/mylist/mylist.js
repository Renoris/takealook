import { spreadMyList, spreadMyPick } from "./myListEvents.js";
import {modalInitialize} from "../modal/modalUtil.js";

// 더 보기 기능, 펼치기 & 접기 토글
const moreBtn = document.getElementById("more_btn");
const moreIcon = document.querySelector(".more");
const favListCont = document.querySelector(".favlist_cont");
const folder_lists = document.querySelector(".folder_lists");
const listPoster = document.querySelector(".list_poster");

moreBtn.addEventListener("click", () => {
  favListCont.classList.toggle("favlist_hide");
  moreIcon.classList.toggle("open");
});
// 내 취향 영화 리스트 편집 버튼
const shareBtn = document.querySelector(".share_btn");
const deleteBtn = document.querySelector(".delete_btn");
const removeBtn = document.querySelector(".remove_btn");

//영화 리스트 부분
shareBtn.addEventListener("click", () => {
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
});
deleteBtn.addEventListener("click", () => {
  const deleteFolders = document.querySelectorAll(".delete_folder"); //폴더 삭제 버튼 누를시 등장 이미지
  deleteBtn.classList.toggle("edit_list");
  for (const item of deleteFolders) {
    item.classList.toggle("delete_on");
  }
});

//내 픽 부분
removeBtn.addEventListener("click", () => {
  removeBtn.classList.toggle("edit_list");
  const favBtns = document.querySelectorAll(".poster_click");
  for (const favBtn of favBtns) {
    favBtn.classList.toggle("click_show");
  }
});

(function initialize() {
  spreadMyList(folder_lists);
  spreadMyPick(listPoster);
})();

const selectOverlay = document.querySelector(".selection_overlay");
selectOverlay.addEventListener("click", (e) => {
  const evTarget = e.target;
  if (evTarget.classList.contains("selection_overlay")) {
    const fixedFolderTitle = document.getElementById("fixed_folder_title");
    const titleEdit = document.querySelector(".title_edit");
    fixedFolderTitle.classList.remove('title_hide');
    titleEdit.classList.add('title_hide');
    selectOverlay.classList.remove("select_on");
  }
});

modalInitialize();