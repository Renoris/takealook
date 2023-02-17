const account = document.querySelector(".user_form");
const hidden = document.querySelector(".hidden");
account.addEventListener("keydown", () => {
  hidden.style.display = "inline";
});
account.addEventListener("keyup", () => {
  hidden.style.display = "none";
});
