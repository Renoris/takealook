let selectableImages = [
  "avatar_cat.png",
  "elsa_cat.png",
  "harry_cat.png",
  "leon_cat.png",
  "matilda_cat.png",
  "concept_anger.jpg",
  "concept_dine.jpg",
  "concept_happy.jpg",
  "concept_idea.jpg",
  "concept_sad.jpg",
];

const editImage = document.querySelector(".image_lineup");

for (let i = 0; i < selectableImages.length; i++) {
  let selectImage = document.createElement("img");
  selectImage.src = `images/${selectableImages[i]}`;
  editImage.appendChild(selectImage);

  selectImage.addEventListener("click", () => {
    const replaceImg = document.querySelector(".image_box img");
    replaceImg.src = `./images/${selectableImages[i]}`;
    selectImageModal.classList.remove("image_on");
  });
}

const selectImageModal = document.querySelector(".select_overlay");
const editImageBtn = document.querySelector(".image_change");

editImageBtn.addEventListener("click", () => {
  selectImageModal.classList.add("image_on");
});

selectImageModal.addEventListener("click", (e) => {
  const evTarget = e.target;
  if (evTarget.classList.contains("select_overlay")) {
    selectImageModal.classList.remove("image_on");
  }
});
