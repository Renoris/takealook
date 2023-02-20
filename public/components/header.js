// 로그인 화면 띄우기
const loginBox = document.querySelector(".login_box");
const sideBtn = document.querySelector("#menu_bar");
const accountBox = document.querySelector(".account_box");
const logoutBtn = document.getElementById("logout_btn");

async function authFetch(url, method = "GET", contentType = 'application/json') {
  try {
    const response = await fetch(url, {
      method,
      headers : {
        'Content-Type' : contentType,
        authorization :  localStorage.getItem('takealook-access')
      }
    });
    return response.json();
  } catch (error) {
    try {
      if (error.message === 'TokenExpiredError') {
        const response = await fetch(url, {method : "POST", headers : {'Content-Type' : 'application/json', authorization :  localStorage.getItem('takealook-access')}});
        if (response.status !== 200) throw Error ("토큰 갱신에 실패했습니다.");
        const {accessToken} = await response.json();
        localStorage.setItem('takealook-access', accessToken);
        const response2 = await fetch(url, {
          method,
          headers : {
            'Content-Type' : contentType,
            authorization :  localStorage.getItem('takealook-access')
          }
        });
        return response2.json();
      } else {
        throw Error("비정상적인 토큰입니다.")
      }
    } catch (error2) {
      localStorage.removeItem('takealook-refresh');
      localStorage.removeItem('takealook-access');
    }
  }
}


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
})()

function signBtnEvent() {
  fetch('/api/test', {
    method:'POST',
    headers : {'Content-Type' : 'application/json'},
    body:
        {
          email : "",
          firstName : "",
          lastName : "",
          gender : "",
          nickName : ""
        }
  }).then((response) => {
    if (response.status === 200) {
      console.log("success");
    } else {
      console.log("fail");
    }
  })
}


function logoutClick() {
  localStorage.removeItem('takealook-refresh');
  localStorage.removeItem('takealook-access');
  location.reload();
}

logoutBtn.addEventListener('click', logoutClick);




/**
 * 로그인 이메일 값 검사
 * @param email : string 이메일
 */
function validateEmail(email) {
  return new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}').test(email);
}

async function requestLoginEvent(e) {
  const email = document.getElementById("email").value;
  const clear = document.querySelector(".clear");
  const fail = document.querySelector(".fail");
  const noAccount = document.querySelector(".no_account");

  if (validateEmail(email)) {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth', {method : 'POST',
          headers : {'Content-Type' : 'application/json'} ,body : JSON.stringify({email})});

      if (response.status === 401) {
        fail.classList.remove("confirm_log_show");
        noAccount.classList.add("confirm_log_show");
        clear.classList.remove("confirm_log_show");
        return
      }

      if (response.status !== 200) {
        throw Error('로그인에 실패했습니다.')
      }

      const {message} = await response.json();
      if (message !== 'success') throw Error();
      fail.classList.remove("confirm_log_show");
      noAccount.classList.remove("confirm_log_show");
      clear.classList.add("confirm_log_show");
    } catch (error) {
      fail.classList.add("confirm_log_show");
      clear.classList.remove("confirm_log_show");
      noAccount.classList.remove("confirm_log_show");
    }
  }
}

async function sideBtnOnclickEvent() {
  const access = localStorage.getItem('takealook-access');
  const refresh = localStorage.getItem('takealook-refresh');
  if (!(access && refresh)) {loginBox.classList.toggle("show")}
  else {accountBox.classList.toggle("show")}
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
