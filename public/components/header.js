// 로그인 화면 띄우기
const loginBox = document.querySelector(".login_box");
const sideBtn = document.querySelector("#menu_bar");

sideBtn.addEventListener("click", function () {
  loginBox.classList.toggle("show");
});

// 로그인 입력 반응
const loginBtn = document.querySelector("#login_btn");

loginBtn.addEventListener("click", function (e) {
  const login = document.getElementById("email").value;

  if (login == "") {
    alert("이메일 입력하삼");
    e.preventDefault();
    return false;
  } else if (login.length <= 11) {
    alert("이메일 쓴거 맞음?");
    e.preventDefault();
    return false;
  } else {
    alert("어서오시고~:)");
    return true;
  }
});

// 검색바 나오게 하기
const searchBar = document.querySelector("#search_bar");
const searchBtn = document.querySelector("#search_btn");

searchBtn.addEventListener("mouseover", function () {
  searchBar.style.display = "block";
  searchBar.addEventListener("mouseout", function () {
    searchBar.style.display = "none";
  });
});
