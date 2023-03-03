import { signUpBtnEventListener } from "./accountBtnEvents.js";

const account = document.querySelector(".user_form");
const hidden = document.querySelector(".hidden");
const first_name = document.getElementById("first_name");
const last_name = document.getElementById("last_name");
const nick_name = document.getElementById("user_nickname");
const email = document.getElementById("user_email");
const emailPlatform = document.getElementById("email_platform");
const genderList = document.getElementsByName("gender");
const signup = document.getElementById("signup_btn");
const fail = document.querySelector(".fail");
const emailPlatforms = document.getElementById("email_platforms");
const etc = emailPlatforms.firstElementChild;
const validate_nick_btn = document.getElementById('validate_nick_btn');
const usableNickName = document.getElementById('usable_nick_name');
const duplicateNickName = document.getElementById('duplicate_nick_name');
const usableEmail = document.getElementById('usable_email');
const duplicateEmail = document.getElementById('duplicate_email');

signup.addEventListener("click", (e) => {
  const signInfo = {email: email.value,
    emailDomain: emailPlatform.value,
    nickName: nick_name.value,
    firstName: first_name.value,
    lastName : last_name.value};

  const validateDom = {
    usableEmail,
    duplicateEmail,
    usableNickName,
    duplicateNickName,
    fail
  }

  signUpBtnEventListener(e, signInfo, genderList, validateDom);
}
);

async function validate_nick_btnClickEventListener(e, dom_nick_name, usableNickName, duplicateNickName) {
  e.preventDefault();
  const nickName = dom_nick_name.value;
  const url = `/api/signup/valid/nickname?${new URLSearchParams({query:nickName})}`;
  try{
    const response = await (await fetch(url)).json();
    if (!response.isExist) {
      usableNickName.classList.add('valid_show');
      duplicateNickName.classList.remove('valid_show');
    } else {
      duplicateNickName.classList.add('valid_show');
      usableNickName.classList.remove('valid_show');
    }
  } catch (error){
    alert(error.message);
  }
}

validate_nick_btn.addEventListener('click', e => validate_nick_btnClickEventListener(e, nick_name, usableNickName, duplicateNickName));


account.addEventListener("keydown", () => {
  hidden.style.display = "inline";
});
account.addEventListener("keyup", () => {
  hidden.style.display = "none";
});



emailPlatforms.addEventListener("change", (e) => {
  const platformChange = e.target.value;
  emailPlatform.value = platformChange;
  if (platformChange === etc.value) {
    emailPlatform.readOnly = false;
  } else {
    emailPlatform.readOnly = true;
  }
});
