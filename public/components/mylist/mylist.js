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
const shareValid = document.querySelector(".share_valid"); //공유중인 상태 이미지
const shareInvalid = document.querySelector(".share_invalid"); //공유 안된 상태 이미지
const sharing = document.querySelector(".sharing"); //공유중 상태 문구
const deleteBtn = document.querySelector(".delete_btn");
const removeBtn = document.querySelector(".remove_btn");

//영화 리스트 부분
shareBtn.addEventListener("click", () => {
  shareBtn.classList.toggle("edit_list");
  // shareInvalid.classList.toggle("share_on");
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
    selectOverlay.classList.remove("select_on");
  }
});

modalInitialize();