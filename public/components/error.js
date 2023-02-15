const images = ["error1.png", "error2.png"];
const errorPage = images[Math.floor(Math.random() * images.length)];
const bgImage = document.createElement("img");
bgImage.src = `images/${errorPage}`;
document.body.appendChild(bgImage);
