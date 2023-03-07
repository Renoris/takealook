import {
  sideBtnClickEventListener,
  outerBtnClickEventListener,
  logoutBtnClickEventListener,
  loginBtnClickEventListener,
  searchViewClickEventListener,
  searchReturnClickEventListener,
  searchEventListener,
} from "./headerEvents.js";
import authFetch from "../fetchs/AuthFetch.js";

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
  searchViewClickEventListener(e, searchBar, searchBtn, searchView, searchReturn)
);

searchBtn.addEventListener("click", (e) => {
  const query = searchBar.value;
  searchEventListener(e, query);
});

searchBar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    const query = searchBar.value;
    searchEventListener(e, query);
  }
});

searchReturn.addEventListener("click", (e) =>
  searchReturnClickEventListener(e, searchBar, searchBtn, searchView, searchReturn)
);

// 로그인 전, 후 UI 변경
async function onloadpage() {
  const access = localStorage.getItem("takealook-access");
  const refresh = localStorage.getItem("takealook-refresh");

  if (access && refresh) {
    try {
      const response = await authFetch('/api/member/my');
      const {email, nickName} = response;
      const dom_nick_name = document.getElementById("user_nick_name");
      const dom_user_email = document.getElementById('user_email');
      const dom_outer_nickName = document.getElementById('outer_nick_name');
      dom_nick_name.innerText = `${nickName} 님`;
      dom_user_email.innerText = email;
      dom_outer_nickName.innerText = `${nickName} 님`;
    }catch (error) {
      console.log(error);
    }

    outerProfile.classList.add("outer_show");
    outerLogout.classList.add("outer_show");
    outerLogin.classList.remove("outer_hide");
    outerAccount.classList.remove("outer_hide");
  } else {
    outerLogin.classList.add("outer_show");
    outerAccount.classList.add("outer_show");
    outerProfile.classList.remove("outer_hide");
    outerLogout.classList.remove("outer_hide");
  }
}
onloadpage();
