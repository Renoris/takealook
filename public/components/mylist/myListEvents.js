import authFetch from "../fetchs/AuthFetch.js";
import myListElement from "./elements/MyListElements.js";
import {getMovieListThumb} from "../util/convertImage.js";
import myListMyPickElement from "./elements/MyListMyPickElement.js";
import myListElements from "./elements/MyListElements.js";

export async function spreadMyPick(listPoster) {
  try {
    const result = await authFetch("/api/pick");
    result.forEach((item) => {
      myListMyPickElement.createMyPick(item, listPoster);
    });
  } catch (error) {
    alert("서버와의 통신에 실패했습니다.");
  }
}
export async function spreadMyList(folderLists) {
  const buckets = await authFetch("/api/bucket/my");

  for (const bucket of buckets) {
      const {publish, bucketId, bucketName, bucketThumbs} = bucket;
      const thumbArray = getMovieListThumb(bucketThumbs);
      myListElement.reCreateMovieList(
          { bucketId,
              bucketName,
              publish,
              thumbArray}, folderLists,
      );
  }
  myListElements.createEmptyMovieFolder(folderLists);
}

export function selectOverlayEvent (e, selectOverlay) {
    const evTarget = e.target;
    if (evTarget.classList.contains("selection_overlay")) {
        const fixedFolderTitle = document.getElementById("fixed_folder_title");
        const titleEdit = document.querySelector(".title_edit");
        fixedFolderTitle.classList.remove('title_hide');
        titleEdit.classList.add('title_hide');
        selectOverlay.classList.remove("select_on");
    }
}