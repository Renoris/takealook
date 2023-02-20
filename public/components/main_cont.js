const favBtn = document.querySelectorAll(".fav_btn");
let favorite = 0;
for (let i = 0; i <= favBtn.length; i++) {
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
