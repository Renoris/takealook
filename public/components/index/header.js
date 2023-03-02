import {
  sideBtnClickEventListener,
  outerBtnClickEventListener,
  logoutBtnClickEventListener,
  loginBtnClickEventListener,
  searchBtnClickEventListener,
  searchReturnClickEventListener,
  topScrollEventListener,
} from "./headerBtnEvents.js";

// 로그인 화면 띄우기
const loginBox = document.querySelector(".login_box");
const outerLogin = document.querySelector(".outer_login");
const outerProfile = document.querySelector(".outer_profile");
const sideBtn = document.querySelector("#menu_bar");
const accountBox = document.querySelector(".account_box");
const outerAccount = document.querySelector(".outer_account");
const outerLogout = document.querySelector(".outer_logout");
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
outerLogout.addEventListener("click", (e) => logoutBtnClickEventListener(e));
sideBtn.addEventListener("click", (e) => sideBtnClickEventListener(e, accountBox, loginBox));
outerLogin.addEventListener("click", (e) =>
  outerBtnClickEventListener(
    e,
    accountBox,
    loginBox,
    outerLogin,
    outerProfile,
    outerAccount,
    outerLogout
  )
);
outerProfile.addEventListener("click", (e) =>
  outerBtnClickEventListener(
    e,
    accountBox,
    loginBox,
    outerLogin,
    outerProfile,
    outerAccount,
    outerLogout
  )
);
// 로그인 입력 반응
loginBtn.addEventListener("click", (e) =>
  loginBtnClickEventListener(e, email, clear, fail, noAccount, vaildEmail)
);
searchView.addEventListener("click", (e) =>
  searchBtnClickEventListener(e, searchBar, searchBtn, searchView, searchReturn)
);
searchReturn.addEventListener("click", (e) =>
  searchReturnClickEventListener(e, searchBar, searchBtn, searchView, searchReturn)
);
window.addEventListener("scroll", (e) => topScrollEventListener(e, top));

// 로그인 전, 후 UI 변경
function onloadpage() {
  const access = localStorage.getItem("takealook-access");
  const refresh = localStorage.getItem("takealook-refresh");

  if (!(access && refresh)) {
    outerLogin.classList.add("outer_show");
    outerAccount.classList.add("outer_show");
    outerProfile.classList.remove("outer_hide");
    outerLogout.classList.remove("outer_hide");
  } else {
    outerProfile.classList.add("outer_show");
    outerLogout.classList.add("outer_show");
    outerLogin.classList.remove("outer_hide");
    outerAccount.classList.remove("outer_hide");
  }
}
onloadpage();
