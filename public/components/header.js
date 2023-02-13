const loginBox = document.querySelector(".login_box");
const sideBtn = document.querySelector("#menu_bar");

sideBtn.addEventListener("click", function () {
  loginBox.classList.toggle("show");
});

const searchBar = document.querySelector("#search_bar");
const searchBtn = document.querySelector("#search_btn");

searchBtn.addEventListener("mouseover", function () {
  searchBar.style.display = "block";
  searchBar.addEventListener("mouseout", function () {
    searchBar.style.display = "none";
  });
});
