import { validate_nick_btnClickEventListener } from "../account/accountBtnEvents.js";
import {
  submitBtnClickEventListener,
  deleteBtnClickEventListener,
} from "./myInformationBtnEvents.js";
import authFetch from "../fetchs/AuthFetch.js";

const validate_nick_btn = document.getElementById("validate_nick_btn");
const usableNickName = document.getElementById("usable_nick_name");
const duplicateNickName = document.getElementById("duplicate_nick_name");
const nick_name = document.getElementById("nick_name");
const favorite1 = document.getElementById("favorite_1");
const favorite2 = document.getElementById("favorite_2");
const favorite3 = document.getElementById("favorite_3");
const submitBtn = document.getElementById("submitBtn");
const deleteBtn = document.getElementById("deleteBtn");
const loadingModal = document.querySelector(".modal_loading");
const emailBox = document.getElementById("email_box");
const firstName = document.getElementById("first_name");
const lastName = document.getElementById("last_name");
const male = document.getElementById("male");
const female = document.getElementById("female");

validate_nick_btn.addEventListener("click", (e) =>
  validate_nick_btnClickEventListener(e, nick_name, usableNickName, duplicateNickName, "name_on")
);

submitBtn.addEventListener("click", async (e) => {
  await submitBtnClickEventListener(e, nick_name, favorite1, favorite2, favorite3, loadingModal);
});

deleteBtn.addEventListener("click", async (e) => {
  await deleteBtnClickEventListener(e, loadingModal);
});

(async function initialize() {
  const myInfo = await authFetch("/api/member/my", "GET");
  emailBox.value = myInfo.email;
  nick_name.value = myInfo.nickName;
  lastName.value = myInfo.lastName;
  firstName.value = myInfo.firstName;
  if (myInfo.gender === "male") {
    male.checked = true;
  } else {
    female.checked = true;
  }

  const favorites = myInfo.favorite.split(",");
  if (favorites[0]) {
    favorite1.value = favorites[0];
  }

  if (favorites[1]) {
    favorite2.value = favorites[1];
  }

  if (favorites[2]) {
    favorite3.value = favorites[2];
  }
})();

// 장르별 배열
let genreArray = [
  "장르별",
  "TV영화",
  "액션",
  "드라마",
  "공포",
  "로맨스",
  "스릴러",
  "다큐멘터리",
  "코미디",
  "가족",
  "전쟁",
  "애니메이션",
  "SF",
  "무협",
];
let genreOption = "";

for (let i = 0; i < genreArray.length; i++) {
  genreOption += `<option>${genreArray[i]}</option>`;
}
favorite1.innerHTML = genreOption;
favorite2.innerHTML = genreOption;
favorite3.innerHTML = genreOption;
