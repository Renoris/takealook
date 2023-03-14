import authFetch from "../fetchs/AuthFetch.js";

const access = localStorage.getItem("takealook-access");
const refresh = localStorage.getItem("takealook-refresh");

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
  let array = ["images/no_image", "images/no_image_black", "images/no_image_color"];
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

function convertImageScaleMedium(image) {
  const index = image.indexOf("type=");
  return `${image.slice(0, index)}type=m203_290_2`;
}

function convertImageScaleSmall(image) {
  const index = image.indexOf("type=");
  return `${image.slice(0, index)}type=m77_110_2`;
}

async function movieCheckBoxClickEventListener(
  e,
  movieId,
  bucketId,
  movieRow,
  selectedMovies,
  unSelectedMovies
) {
  if (e.target.checked) {
    await authFetch("/api/bucket_item/my", "POST", { movieId, bucketId });
    e.target.checked = true;
    movieRow.remove();
    selectedMovies.prepend(movieRow);
  } else {
    await authFetch("/api/bucket_item/my", "DELETE", { movieId, bucketId });
    e.target.checked = false;
    movieRow.remove();
    unSelectedMovies.prepend(movieRow);
  }
}

/**
 * 모달 내 영화 리스트 아이템 생성
 * @param movieInfo
 * @param bucketId
 * @param checked
 * @param selectedMovies
 * @param unSelectedMovies
 */
function createBucketItem(movieInfo, bucketId, checked, selectedMovies, unSelectedMovies) {

    const li = document.createElement('li');
    li.id = `movie_${movieInfo.movieId}`;
    const img = document.createElement('img');
    img.src = convertImageScaleSmall(movieInfo.thumb);

    const titleDom = document.createElement('h3');
    titleDom.innerHTML = movieInfo.title;

    const inputCheckBox = document.createElement('input');
    inputCheckBox.type = "checkbox";
    if (checked) {
        inputCheckBox.checked = true;
    }

    inputCheckBox.addEventListener('change', e => movieCheckBoxClickEventListener(e, movieInfo.movieId, bucketId, li,selectedMovies, unSelectedMovies));

    li.append(img);
    li.append(titleDom);
    li.append(inputCheckBox);
    if (checked) {
        selectedMovies.append(li);
    }else {
        unSelectedMovies.append(li);
    }
}

/**
 * 내 픽 영화 엘리먼트 생성
 * @param movie
 * @param parentNode
 */
function createMyPick(movie, parentNode) {
  const myListPoster = document.createElement("div");
  myListPoster.classList.add("mylist_poster");
  myListPoster.id = `movie_${movie.movieId}`;
  const poster_collection = document.createElement("img");
  poster_collection.classList.add("poster_collection");
  poster_collection.src = convertImageScaleMedium(movie.thumb);
  const favBtn = document.createElement("img");
  favBtn.classList.add("poster_click");
  favBtn.src = "images/fav_on.png";
  myListPoster.appendChild(poster_collection);
  myListPoster.appendChild(favBtn);
  parentNode.appendChild(myListPoster);
  favBtn.addEventListener("click", async (e) => {
    await authFetch("/api/pick", "DELETE", { movieId: movie.movieId });
    parentNode.removeChild(myListPoster);
  });
}

/**
 * 모달 내 체크 박스 이벤트
 * @param e
 * @param bucketId
 * @returns {Promise<void>}
 */
async function refreshModalData(e, bucketId) {
  //dom 셋팅
  const modal = document.querySelector(".modal_selection");
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
    createBucketItem(select, bucketId, true, selectedMovies, unselectedMovies);
  }

  for (const unSelect of unSelectList) {
    createBucketItem(unSelect, bucketId, false, selectedMovies, unselectedMovies);
  }

  modal.classList.add("select_on");
}

/**
 * 무비 리스트 엘리멘트 생성
 * @param bucketId
 * @param bucketName
 * @param thumbArray
 * @param parentNode
 */
function createMovieList(bucketId, bucketName, thumbArray, parentNode) {
  //엘리먼트 생성
  const folderBox = document.createElement("div");
  folderBox.classList.add("folder_box");
  folderBox.id = `bucket_${bucketId}`;

  const folderImages = document.createElement("div");
  folderImages.classList.add("folder_img");
  // folderImages.style.backgroundImage = thumbArray[0];

  const folderName = document.createElement("h4");
  folderName.classList.add("folder_name");
  folderName.innerText = bucketName;
  folderName.innerText = bucketName;

  //계층 구조 형성
  folderBox.append(folderImages);
  folderBox.append(folderName);
  parentNode.append(folderBox);

  //이벤트 할당
  folderBox.addEventListener("click", (e) => refreshModalData(e, bucketId));
}

if (!access || !refresh) {
  alert("로그인이 되지 않은 사용자 입니다");
  location.href = "/";
}

async function spreadMyPick() {
  const listPoster = document.querySelector(".list_poster");
  try {
    const result = await authFetch("/api/pick");
    result.forEach((item) => {
      createMyPick(item, listPoster);
    });
  } catch (error) {
    alert("서버와의 통신에 실패했습니다.");
  }
}

async function spreadMyList() {
  const folder_lists = document.querySelector(".folder_lists");
  const buckets = await authFetch("/api/bucket/my");

  for (const bucket of buckets) {
    const bucketId = bucket.bucketId;
    const bucketName = bucket.bucketName;
    const thumbArray = getMovieListThumb(bucket.bucketThumbs);

    createMovieList(bucketId, bucketName, thumbArray, folder_lists);
  }
}

spreadMyPick();
spreadMyList();

//
// (function initialize(){
//     spreadMyPick();
//     spreadMyList();
// })()

// 더 보기 기능, 펼치기 & 접기 토글
const moreBtn = document.getElementById("more_btn");
const moreIcon = document.querySelector(".more");
const favListCont = document.querySelector(".favlist_cont");

moreBtn.addEventListener("click", () => {
  favListCont.classList.toggle("favlist_hide");
  moreIcon.classList.toggle("open");
});
// 내 취향 영화 리스트 편집 버튼
const shareBtn = document.querySelector(".share_btn");
const editBtn = document.querySelector(".edit_btn");
const deleteBtn = document.querySelector(".delete_btn");
const removeBtn = document.querySelector(".remove_btn");
shareBtn.addEventListener("click", () => {
  shareBtn.classList.toggle("edit_list");
});
editBtn.addEventListener("click", () => {
  editBtn.classList.toggle("edit_list");
});
deleteBtn.addEventListener("click", () => {
  deleteBtn.classList.toggle("edit_list");
});
removeBtn.addEventListener("click", () => {
  removeBtn.classList.toggle("edit_list");
});
