import { spreadMyList, spreadMyPick,  shareBtnClickEventListener, deleteBtnClickEventListener} from "./myListEvents.js";
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


shareBtn.addEventListener("click", (e) => {
  if (deleteBtn.classList.contains('edit_list')) {
    deleteBtnClickEventListener(e, deleteBtn);
  }
  shareBtnClickEventListener(e, shareBtn);

});
deleteBtn.addEventListener("click", (e) => {
  if (shareBtn.classList.contains('edit_list')) {
    shareBtnClickEventListener(e, shareBtn)
  }
  deleteBtnClickEventListener(e, deleteBtn);
})


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