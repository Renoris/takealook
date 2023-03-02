
import {createCover} from "./main_contEventListener.js";
const access = localStorage.getItem('takealook-access');

/**
 * 로그인 이메일 값 검사
 * @param email : string 이메일
 */
function validateEmail(email) {
  return new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}").test(email);
}
/**
 * 로그아웃 버튼 클릭 이벤트
 * @param e : Event
 */
export function logoutBtnClickEventListener(e) {
  localStorage.removeItem("takealook-refresh");
  localStorage.removeItem("takealook-access");
  location.reload();
}

/**
 * 로그인 버튼 클릭 이벤트
 * @param e : Event
 * @param emailElement
 * @param clear : Element
 * @param fail : Element
 * @param noAccount : Element
 * @returns {Promise<void>}
 */
export async function loginBtnClickEventListener(
  e,
  emailElement,
  clear,
  fail,
  noAccount,
  validEmail
) {
  const email = emailElement.value;
  if (validateEmail(email)) {
    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.status === 401) {
        fail.classList.remove("confirm_log_show");
        noAccount.classList.add("confirm_log_show");
        clear.classList.remove("confirm_log_show");
        validEmail.classList.remove("confirm_log_show");
        return;
      }

      if (response.status !== 200) {
        throw Error("로그인에 실패했습니다.");
      }

      const body = await response.json();
      const message = body.message;

      if (message !== "success") throw Error();
      fail.classList.remove("confirm_log_show");
      noAccount.classList.remove("confirm_log_show");
      clear.classList.add("confirm_log_show");
      validEmail.classList.remove("confirm_log_show");
    } catch (error) {
      fail.classList.add("confirm_log_show");
      clear.classList.remove("confirm_log_show");
      noAccount.classList.remove("confirm_log_show");
      validEmail.classList.remove("confirm_log_show");
    }
  } else {
    fail.classList.remove("confirm_log_show");
    clear.classList.remove("confirm_log_show");
    noAccount.classList.remove("confirm_log_show");
    validEmail.classList.add("confirm_log_show");
  }
}

/**
 * 사이드 버튼 클릭 이벤트
 * @param e : Event
 * @param accountBox : Element
 * @param loginBox : Element
 * @returns {Promise<void>}
 */
export async function sideBtnClickEventListener(e, accountBox, loginBox) {
  const access = localStorage.getItem("takealook-access");
  const refresh = localStorage.getItem("takealook-refresh");
  if (!(access && refresh)) {
    loginBox.classList.toggle("show");
  } else {
    accountBox.classList.toggle("show");
  }
}

/**
 * 서치 버튼 클릭 이벤트
 * @param e : Event
 * @param searchBar : Element
 * @param searchBtn : Element
 * @param searchView : Element
 * @param searchReturn
 */
export function searchViewClickEventListener(e, searchBar, searchBtn, searchView, searchReturn) {
  e.preventDefault();
  searchView.style.display = "none";
  searchBar.style.display = "block";
  searchBtn.style.display = "block";
  searchReturn.style.display = "block";
}

// async function getMovies(search, parentNode) {
//
//   try {
//     const params = {
//       search
//     };
//     let headers = {
//       "Content-Type": "application/json",
//     };
//     if (access !== null || access) {
//       headers.authorization = access;
//     }
//     let url = "/api/movie";
//     url = `${url}?${new URLSearchParams(params).toString()}`;
//
//     const response = await fetch(url, {headers,});
//     const result = await response.json();
//     result.forEach((movie) => {
//       createCover(movie, parentNode);
//     });
//   } catch (error) {
//     alert("서버와의 통신에 실패했습니다.")
//   }
// }

// export async function searchBarEventListener(e, searchBar, inMovieNode) {
//   if (e.key === "Enter") {
//     e.preventDefault();
//     // Call your function here
//     window.removeEventListener('scroll',infiniteScroll);
//     const keyword = searchBar.value;
//     inMovieNode.textContent = '';
//     await getMovies(keyword, inMovieNode);
//   }
// }
//
// export async function searchBtnEventListener(e, searchBtn,searchBar, inMovieNode) {
//   e.preventDefault();
//   const keyword = searchBar.value;
//   window.removeEventListener('scroll',infiniteScroll);
//   inMovieNode.textContent = '';
//   await getMovies(keyword, inMovieNode);
// }


/**
 * 서치 리턴 버튼 클릭 이벤트
 * @param e : Event
 * @param searchBar : Element
 * @param searchBtn : Element
 * @param searchView : Element
 * @param searchReturn
 */
export function searchReturnClickEventListener(e, searchBar, searchBtn, searchView, searchReturn) {
  searchView.style.display = "flex";
  searchBar.style.display = "none";
  searchBtn.style.display = "none";
  searchReturn.style.display = "none";
}

/**
 * TOP 버튼 스크롤 이벤트
 * @param e : Event
 */
export function topScrollEventListener(e, top) {
  if (window.scrollY > 500) {
    top.style.display = "block";
  } else {
    top.style.display = "none";
  }
}
