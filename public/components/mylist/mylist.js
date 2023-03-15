import authFetch from "../fetchs/AuthFetch.js";
import {spreadMyList, spreadMyPick} from "./myListEvents.js";

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
const editBtn = document.querySelector(".edit_btn");
const deleteBtn = document.querySelector(".delete_btn");
const removeBtn = document.querySelector(".remove_btn");

//영화 리스트 부분
shareBtn.addEventListener("click", () => {
  shareBtn.classList.toggle("edit_list");
});
editBtn.addEventListener("click", () => {
  editBtn.classList.toggle("edit_list");
});
deleteBtn.addEventListener("click", () => {
  deleteBtn.classList.toggle("edit_list");
});

//내 픽 부분
removeBtn.addEventListener("click", () => {
  removeBtn.classList.toggle("edit_list");
  const favBtns = document.querySelectorAll(".poster_click");
  for (const favBtn of favBtns) {
    favBtn.classList.toggle("click_show");
  }
});

(function initialize(){
  spreadMyList(folder_lists);
  spreadMyPick(listPoster);
})()