import authFetch from "../fetchs/AuthFetch.js";
import elementFactory from "../elements/MyListElements.js";
import { convertImageScaleMedium } from "../util/covertImage.js";

function createEmptyMovieFolder(parentNode) {
  let array = [
    `${window.location.protocol}//${window.location.host}/images/no_image.png`,
    `${window.location.protocol}//${window.location.host}/images/no_image_black.png`,
    `${window.location.protocol}//${window.location.host}/images/no_image_color.png`,
  ];
  const folderBox = document.createElement("div");
  folderBox.classList.add("folder_box");

  const folderImages = document.createElement("div");
  folderImages.classList.add("folder_imgs");

  const folderImageDiv = document.createElement("div");
  folderImageDiv.classList.add("folder_img1");
  const addImage = document.createElement("img");
  addImage.src = `${window.location.protocol}//${window.location.host}/images/add_folder.png`;
  folderImageDiv.append(addImage);

  folderImages.append(folderImageDiv);

  const folderName = document.createElement("h4");
  folderName.classList.add("folder_name");
  folderName.innerText = "리스트 생성";

  //계층 구조 형성
  folderBox.append(folderImages);
  folderBox.append(folderName);
  parentNode.append(folderBox);

  //이벤트 할당
  folderBox.addEventListener("click", async (e) => {
    const { bucketId } = await authFetch("/api/bucket/my", "POST", { bucketName: "새로운 폴더" });
    folderBox.remove();
    elementFactory.reCreateMovieList(bucketId, "새로운 폴더", array, parentNode, refreshModalData);
    parentNode.append(folderBox);
  });
}

function distributePick(simplePicks, bucketItemMovieIds) {
  const selectList = [];
  const unSelectList = [];
  for (const simplePick of simplePicks) {
    let flag = false;
    for (const itemMovieId of bucketItemMovieIds) {
      if (itemMovieId === simplePick.movieId) {
        flag = true;
        break;
      }
    }

    if (flag) {
      selectList.push(simplePick);
    } else {
      unSelectList.push(simplePick);
    }
  }

  return {
    selectList,
    unSelectList,
  };
}
function getMovieListThumb(thumbs) {
  let index = 0;
  let array = [
    `${window.location.protocol}//${window.location.host}/images/add_folder.png`,
    `${window.location.protocol}//${window.location.host}/images/add_folder.png`,
    `${window.location.protocol}//${window.location.host}/images/add_folder.png`,
  ];
  for (const thumb of thumbs) {
    if (thumb) {
      array[index] = thumb;
      index++;
    }
    if (index >= 3) {
      break;
    }
  }
  return array;
}

async function movieCheckBoxClickEventListener(
  e,
  movieId,
  bucketId,
  movieRow,
  selectedMovies,
  unSelectedMovies,
  thumb,
  thumbsNode
) {
  if (e.target.checked) {
    await authFetch("/api/bucket_item/my", "POST", { movieId, bucketId });
    e.target.checked = true;
    movieRow.remove();
    selectedMovies.prepend(movieRow);
    thumbsNode.thumb3.src = thumbsNode.thumb2.src;
    thumbsNode.thumb2.src = thumbsNode.thumb1.src;
    thumbsNode.thumb1.src = thumb;
  } else {
    await authFetch("/api/bucket_item/my", "DELETE", { movieId, bucketId });
    e.target.checked = false;
    movieRow.remove();
    unSelectedMovies.prepend(movieRow);
  }
}

/**
 * 모달 내 체크 박스 이벤트
 * @param e
 * @param bucketId
 * @param folder_box
 * @returns {Promise<void>}
 */
async function refreshModalData(e, bucketId, folder_box) {
  //dom 셋팅
  const folderTitle = document.querySelector(".folder_title");
  const selectedMovies = document.querySelector(".selected_movies");
  const unselectedMovies = document.querySelector(".unselected_movies");

  //초기화
  selectedMovies.textContent = "";
  unselectedMovies.textContent = "";
  folderTitle.innerHTML = "";

  //데이터 셋팅
  const simplePicks = await authFetch("/api/pick/simple"); // 이부분 동시해서 마무리 할 방법 찾기
  const bucketItemMovie = await authFetch(`/api/bucket/my/${bucketId}`); //
  const bucketItemMovieIds = bucketItemMovie.bucketItemMovieIds; //
  const { selectList, unSelectList } = distributePick(simplePicks, bucketItemMovieIds);
  folderTitle.innerHTML = bucketItemMovie.bucketName;
  for (const select of selectList) {
    elementFactory.createBucketItem(
      select,
      bucketId,
      true,
      selectedMovies,
      unselectedMovies,
      movieCheckBoxClickEventListener,
      thumbs
    );
  }

  for (const unSelect of unSelectList) {
    elementFactory.createBucketItem(
      unSelect,
      bucketId,
      false,
      selectedMovies,
      unselectedMovies,
      movieCheckBoxClickEventListener,
      thumbs
    );
  }
}

async function movieListClickEventListener(e, bucketId, folder_box) {
  const modal = document.querySelector(".selection_overlay");
  await refreshModalData(e, bucketId, folder_box);
  modal.classList.add("select_on");
}

async function favBtnClickEventListener(e, movieId, parentNode, myListPoster) {
  await authFetch("/api/pick", "DELETE", { movieId });
  parentNode.removeChild(myListPoster);
}

export async function spreadMyPick(listPoster) {
  try {
    const result = await authFetch("/api/pick");
    result.forEach((item) => {
      elementFactory.createMyPick(item, favBtnClickEventListener, listPoster);
    });
  } catch (error) {
    alert("서버와의 통신에 실패했습니다.");
  }
}
export async function spreadMyList(folderLists) {
  const buckets = await authFetch("/api/bucket/my");

  for (const bucket of buckets) {
    const bucketId = bucket.bucketId;
    const bucketName = bucket.bucketName;
    const thumbArray = getMovieListThumb(bucket.bucketThumbs);
    elementFactory.reCreateMovieList(
      bucketId,
      bucketName,
      thumbArray,
      folderLists,
      movieListClickEventListener
    );
  }
  createEmptyMovieFolder(folderLists);
}
