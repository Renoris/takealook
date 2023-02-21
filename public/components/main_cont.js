const favBtn = document.querySelectorAll(".fav_btn");
let favorite = 0;
for (let i = 0; i < favBtn.length; i++) {
  favBtn[i].addEventListener("click", () => {
    if (favorite == 0) {
      favBtn[i].src = "./images/fav_on.png";
      favorite += 1;
    } else if (favorite == 1) {
      favBtn[i].src = "./images/fav_off.png";
      favorite -= 1;
    }
  });
}

const years = document.querySelector("#year");

let isYearOptionExisted = false;
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
