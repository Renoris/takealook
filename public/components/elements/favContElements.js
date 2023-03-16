import { reFreshMovieListImage } from "../util/convertImage.js";

const elementFactory = {
  createMovieList: function (bucketId, bucketName, thumbArray, parentNode) {
    //엘리먼트 생성
    const folderBox = document.createElement("div");
    folderBox.classList.add("folder_box");
    folderBox.id = `bucket_${bucketId}`;

    const folderImages = document.createElement("div");
    folderImages.classList.add("folder_imgs");

    const folderImageDiv1 = document.createElement("div");
    folderImageDiv1.classList.add("folder_img1");
    const thumb1 = document.createElement("img");
    folderImageDiv1.append(thumb1);

    const folderImageDiv2 = document.createElement("div");
    folderImageDiv2.classList.add("folder_img2");
    const thumb2 = document.createElement("img");
    folderImageDiv2.append(thumb2);

    const folderImageDiv3 = document.createElement("div");
    folderImageDiv3.classList.add("folder_img3");
    const thumb3 = document.createElement("img");
    folderImageDiv3.append(thumb3);

    const thumbNodes = [thumb1, thumb2, thumb3];

    const refreshThumbArg = {
      thumbNodes,
      thumbArray,
    };

    reFreshMovieListImage(refreshThumbArg);
    folderImages.append(folderImageDiv1);
    folderImages.append(folderImageDiv2);
    folderImages.append(folderImageDiv3);

    const sharing = document.createElement("span");
    sharing.id = `shareing_${bucketId}`;
    sharing.classList.add("sharing");
    sharing.innerText = "공유중";

    const folderName = document.createElement("h4");
    folderName.id = `folder_${bucketId}`;
    folderName.classList.add("folder_name");
    folderName.innerText = bucketName;

    //계층 구조 형성
    folderBox.append(folderImages);
    folderBox.append(folderName);
    folderBox.append(sharing);

    folderBox.addEventListener("click", () => {
      window.open("./shared_list");
    });

    parentNode.append(folderBox);
  },
};

export default elementFactory;
