import {
  sideBtnClickEventListener,
  logoutBtnClickEventListener,
  loginBtnClickEventListener,
  searchViewClickEventListener,
  searchReturnClickEventListener,
  topScrollEventListener,
  searchBtnEventListener,
  searchBarEventListener
} from "./headerEvents.js";

// 로그인 화면 띄우기
const movieContainer = document.querySelector('.movie_container');
const loginBox = document.querySelector(".login_box");
const outerLogin = document.querySelector(".outer_login");
const sideBtn = document.querySelector("#menu_bar");
const accountBox = document.querySelector(".account_box");
const logoutBtn = document.getElementById("logout_btn");
const loginBtn = document.querySelector("#login_btn");
const email = document.getElementById("email");
const clear = document.querySelector(".clear");
const fail = document.querySelector(".fail");
const noAccount = document.querySelector(".no_account");
const searchReturn = document.querySelector(".back");
const searchBar = document.querySelector(".search_bar");
const searchBtn = document.querySelector(".search_btn");
const searchView = document.querySelector(".search_view");
const vaildEmail = document.querySelector(".valid_email");
const top = document.querySelector(".up_to_top");


logoutBtn.addEventListener("click", (e) => logoutBtnClickEventListener(e));
sideBtn.addEventListener("click", (e) => sideBtnClickEventListener(e, accountBox, loginBox));
outerLogin.addEventListener("click", (e) => sideBtnClickEventListener(e, accountBox, loginBox));
// 로그인 입력 반응
loginBtn.addEventListener("click", (e) =>
  loginBtnClickEventListener(e, email, clear, fail, noAccount, vaildEmail)
);
searchView.addEventListener("click", (e) =>
  searchViewClickEventListener(e, searchBar, searchBtn, searchView, searchReturn)
);

// searchBar.addEventListener('keydown', async (e) => {
//   await searchBarEventListener(e, searchBar, movieContainer);
// })
//
// searchBtn.addEventListener('click', async (e) => {
//   await searchBtnEventListener(e, searchBtn, searchBar, movieContainer )
// })

searchReturn.addEventListener("click", (e) =>
  searchReturnClickEventListener(e, searchBar, searchBtn, searchView, searchReturn)
);
window.addEventListener("scroll", (e) => topScrollEventListener(e, top));
