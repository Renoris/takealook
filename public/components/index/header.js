import authFetch from '../fetchs/authfetch.js'
import {sideBtnClickEventListener, logoutBtnClickEventListener ,
  loginBtnClickEventListener , searchBtnClickEventListener, searchReturnClickEventListener} from "./headerBtnEvents.js";

// 로그인 화면 띄우기
const loginBox = document.querySelector(".login_box");
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


(async function initialize () {
  const access = localStorage.getItem('takealook-access');
  const refresh = localStorage.getItem('takealook-refresh');
  if (access && refresh) {
    try {
      const response = await authFetch('/api/member/my');
      const {email, nickName} = response;
      const dom_nick_name = document.getElementById("user_nick_name");
      const dom_user_email = document.getElementById('user_email');
      dom_nick_name.innerText = nickName;
      dom_user_email.innerText = email;
    }catch (error) {
      console.log(error);
    }
  }
})();

logoutBtn.addEventListener('click', (e) => logoutBtnClickEventListener(e));
sideBtn.addEventListener("click",(e) => sideBtnClickEventListener(e, accountBox, loginBox));
// 로그인 입력 반응
loginBtn.addEventListener("click", (e) => loginBtnClickEventListener(e,email,clear,fail,noAccount));
searchBtn.addEventListener("click",
    (e) => searchBtnClickEventListener(e, searchBar, searchBtn, searchReturn),
    { once: true });
searchReturn.addEventListener("click", (e) => searchReturnClickEventListener(e, searchBar, searchBtn, searchReturn));