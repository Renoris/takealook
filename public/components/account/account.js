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

signup.addEventListener("click", (e) =>
  signUpBtnEventListener(
    e,
    email,
    emailPlatform,
    nick_name,
    first_name,
    last_name,
    genderList,
    fail
  )
);

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
