const pickList = document.querySelector(".pick_lists");
const pickCover = document.querySelectorAll(".pick_lists li");
let currentCover = 0;
let slideCount = pickCover.length;
const leftBtn = document.querySelector(".left_btn");
const rightBtn = document.querySelector(".right_btn");
let coverWidth = 300;

function cloneElement() {
  let coverCloneFirst = pickCover[0].cloneNode(true);
  let coverCloneLast = pickList.lastElementChild.cloneNode(true);
  pickList.append(coverCloneFirst);
  pickList.prepend(coverCloneLast, pickList.firstElementChild);
}
function initfunction() {
  pickList.style.width = coverWidth * (slideCount + 2) + "px";
  pickList.style.left = -coverWidth + "px";
}

rightBtn.addEventListener("click", function () {
  if (currentCover <= slideCount - 1) {
    pickList.style.left = -(currentCover + 2) * coverWidth + "px";
    pickList.style.transition = `${0.5}s ease-out`;
  }
  if (currentCover === slideCount - 1) {
    setTimeout(function () {
      pickList.style.left = -coverWidth + "px";
      pickList.style.transition = `${0}s ease-out`;
    }, 500);
    currentCover = -1;
  }
  currentCover += 1;
});

leftBtn.addEventListener("click", function () {
  if (currentCover >= 0) {
    pickList.style.left = -currentCover * coverWidth + "px";
    pickList.style.transition = `${0.5}s ease-out`;
  }
  if (currentCover === 0) {
    setTimeout(function () {
      pickList.style.left = -slideCount * coverWidth + "px";
      pickList.style.transition = `${0}s ease-out`;
    }, 500);
    currentCover = slideCount;
  }
  currentCover -= 1;
});

cloneElement();
initfunction();
