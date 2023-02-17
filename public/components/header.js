// 로그인 화면 띄우기
const loginBox = document.querySelector(".login_box");
const sideBtn = document.querySelector("#menu_bar");
const accountBox = document.querySelector(".account_box");

sideBtn.addEventListener("click", function () {
  loginBox.classList.toggle("show");
});

// 로그인 입력 반응
const loginBtn = document.querySelector("#login_btn");
//
loginBtn.addEventListener("click", function (e) {
  const login = document.getElementById("email").value;
  const clear = document.querySelector(".clear");
  const fail = document.querySelector(".fail");

  if (login == "") {
    alert("이메일 입력하삼");
    e.preventDefault();
    clear.classList.remove("confirm_log_show");
    fail.classList.remove("confirm_log_show");
    return false;
  } else if (login.length <= 11) {
    fail.classList.add("confirm_log_show");
    clear.classList.remove("confirm_log_show");
    e.preventDefault();
    return false;
  } else if (login.length >= 12) {
    clear.classList.add("confirm_log_show");
    fail.classList.remove("confirm_log_show");
    e.preventDefault();
  }
});

// 검색바 나오게 하기
const searchReturn = document.querySelector(".back");
const searchBar = document.querySelector(".search_bar");
const searchBtn = document.querySelector(".search_btn");

searchBtn.addEventListener(
  "click",
  function (e) {
    e.preventDefault();
    searchBar.classList.add("search_bar_show");
    searchBtn.classList.add("search_btn_show");
    searchReturn.style.display = "block";
  },
  { once: true }
);
searchReturn.addEventListener("click", function () {
  searchBar.classList.remove("search_bar_show");
  searchBtn.classList.remove("search_btn_show");
  searchReturn.style.display = "none";
});

// 연도별 태그
const years = document.querySelector("#year");

isYearOptionExisted = false;
years.addEventListener("focus", function () {
  if (!isYearOptionExisted) {
    isYearOptionExisted = true;
    for (let i = 2023; i >= 1980; i--) {
      const yearOption = document.createElement("option");
      yearOption.setAttribute("value", i);
      yearOption.innerText = i;
      this.appendChild(yearOption);
    }
  }
});
