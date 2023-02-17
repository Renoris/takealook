// 로그인 화면 띄우기
const loginBox = document.querySelector(".login_box");
const sideBtn = document.querySelector("#menu_bar");
const accountBox = document.querySelector(".account_box");




/**
 * 로그인 이메일 값 검사
 * @param email : string 이메일
 * @param clear : Element clear class Element
 * @param fail : Element fail class Element
 * @param event event
 */
function validateEmail(email, clear, fail, event) {
  // if (email === "") {
  //   alert("이메일을 입력하세요.");
  //   clear.classList.remove("confirm_log_show");
  //   fail.classList.remove("confirm_log_show");
  //   return false;
  // }
  // if (email.length <= 11) {
  //   fail.classList.add("confirm_log_show");
  //   clear.classList.remove("confirm_log_show");
  //   return false;
  // }
  // if (email.length >= 12) {
  //   clear.classList.add("confirm_log_show");
  //   fail.classList.remove("confirm_log_show");
  //   return false;
  // }
  return true;
}

async function requestLoginEvent(e) {
  const email = document.getElementById("email").value;
  const clear = document.querySelector(".clear");
  const fail = document.querySelector(".fail");

  if (validateEmail(email, clear, fail, e)) {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth', {method : 'POST',
          headers : {'Content-Type' : 'application/json'} ,body : JSON.stringify({email: email})});
      if (!(response.status === 200)) throw Error();
      const {success} = await response.json();
      if (!success) throw Error();
      fail.classList.add("confirm_log_show");
      clear.classList.remove("confirm_log_show");
    } catch (error) {
      fail.classList.remove("confirm_log_show");
      clear.classList.add("confirm_log_show");
    }
  }
}

async function sideBtnOnclickEvent() {
  const access = localStorage.getItem('takealook-access');
  const refresh = localStorage.getItem('takealook-refresh');
  if (!access || !refresh) {  loginBox.classList.toggle("show"); return}
  fetch('/api/member')
}


sideBtn.addEventListener("click", sideBtnOnclickEvent);


// 로그인 입력 반응
const loginBtn = document.querySelector("#login_btn");
//


loginBtn.addEventListener("click", requestLoginEvent);

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
