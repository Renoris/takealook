import authFetch from "../fetchs/AuthFetch.js";
import elementFactory from "../elements/MyListElements.js";
import {reFreshMovieListImage} from "../util/convertImage.js";
import {validateNickname} from "../util/validationNickName.js";

function distributePick(simplePicks, bucketItemMovies) {
  const unSelectList = [];
  for (const pick of simplePicks){
      let flag = false;
      for (const movies of bucketItemMovies) {
          if (pick.movieId === movies.movieId) {
              flag = true;
              break;
          }
      }

      if (!flag) {
          unSelectList.push(pick);
      }
  }

  return {
    selectList:bucketItemMovies,
    unSelectList,
  };
}
function getMovieListThumb(thumbs) {
  let index = 0;
  let array = [
      {thumb:`${window.location.protocol}//${window.location.host}/images/no_image.png`},
      {thumb:`${window.location.protocol}//${window.location.host}/images/no_image_black.png`},
      {thumb:`${window.location.protocol}//${window.location.host}/images/no_image_color.png`},
  ];
  for (const item of thumbs) {
    if (item.thumb) {
      array[index] = item;
      index++;
    }
    if (index >= 3) {
      break;
    }
  }
  return array;
}


async function movieCheckBoxClickEventListener(
    e, eventParameter,
) {
    const {movieId, bucketId, movieRow, selectedMovies, unSelectedMovies,thumb ,refreshThumbArg} = eventParameter;
    let {thumbArray} = refreshThumbArg;

    if (e.target.checked) {
        await authFetch("/api/bucket_item/my", "POST", { movieId, bucketId });
        movieRow.remove();
        selectedMovies.prepend(movieRow);
        thumbArray.unshift({movieId:movieId, thumb});
        reFreshMovieListImage(refreshThumbArg);

    } else {
        await authFetch("/api/bucket_item/my", "DELETE", { movieId, bucketId });
        movieRow.remove();
        unSelectedMovies.prepend(movieRow);
        for (let i = 0; i < thumbArray.length; i++){
            if (thumbArray[i].movieId === movieId) {
                thumbArray.splice(i,1);
                break;
            }
        }
        reFreshMovieListImage(refreshThumbArg);
    }
    reFreshMovieListImage(refreshThumbArg);
}

async function titleConvertEvent(title, bucketId, fixedFolderTitle, titleEdit) {
    if (!validateNickname(title)) {
        alert("제목이 적절하지 않습니다.");
        return;
    }

    const originTitle = document.getElementById(`folder_${bucketId}`);
    originTitle.innerText = title;

    const result = await authFetch(`/api/bucket/my/title/${bucketId}`,`PATCH`, {bucketName:title});
    if (result.message !== 'success') {alert("서버와의 연결에 실패했습니다.");}
    fixedFolderTitle.innerText = title;
    fixedFolderTitle.classList.remove('title_hide');
    titleEdit.classList.add('title_hide');
}

/**
 * 모달 내 체크 박스 이벤트
 * @param e
 * @param bucketId
 * @param folder_box
 * @param refreshThumbArg
 * @returns {Promise<void>}
 */

async function refreshModalData(e, bucketId, folder_box, refreshThumbArg) {
    //dom 셋팅
    const folderTitle = document.querySelector(".folder_title");
    const selectedMovies = document.querySelector(".selected_movies");
    const unselectedMovies = document.querySelector(".unselected_movies");
    const inputFolderTitle = document.getElementById("input_folder_title");
    const fixedFolderTitle = document.getElementById("fixed_folder_title");
    const applyTitle = document.getElementById("apply_title");
    const titleEdit = document.querySelector(".title_edit");

    fixedFolderTitle.addEventListener('click', () => {
        fixedFolderTitle.classList.add('title_hide');
        inputFolderTitle.value = fixedFolderTitle.innerText;
        titleEdit.classList.remove('title_hide');
    })

    applyTitle.addEventListener('click', async (e) => await titleConvertEvent(inputFolderTitle.value, bucketId, fixedFolderTitle, titleEdit))
    inputFolderTitle.addEventListener('keydown', async (e) => {
        if (e.key === 'Enter') {
            await titleConvertEvent(inputFolderTitle.value, bucketId, fixedFolderTitle, titleEdit);
        }
    })

    //초기화

    selectedMovies.textContent = "";
    unselectedMovies.textContent = "";
    folderTitle.innerHTML = "";

    //데이터 셋팅

    const simplePicks = await authFetch("/api/pick/simple"); // 여기
    const bucketInfo = await authFetch(`/api/bucket/my/${bucketId}`); //여기 건들이자
    const bucketItemMovies = bucketInfo.bucketItemMovies; //
    const { selectList, unSelectList } = distributePick(simplePicks, bucketItemMovies); //여기도

    folderTitle.innerHTML = bucketInfo.bucketName;

    for (const select of selectList) {
        elementFactory.createBucketItem(
          select,
          bucketId,
          true,
          selectedMovies,
          unselectedMovies,
          movieCheckBoxClickEventListener,
          refreshThumbArg
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
            refreshThumbArg
        );
    }
}

async function movieListClickEventListener(e, bucketId, folder_box, refreshThumbArg) {
  const modal = document.querySelector(".selection_overlay");
  await refreshModalData(e, bucketId, folder_box, refreshThumbArg);
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
      const {publish, bucketId, bucketName, bucketThumbs} = bucket;
      const thumbArray = getMovieListThumb(bucketThumbs);
      elementFactory.reCreateMovieList(
          bucketId,
          bucketName,
          publish,
          thumbArray,
          folderLists,
          movieListClickEventListener
        );
  }
  elementFactory.createEmptyMovieFolder(movieListClickEventListener, folderLists);
}
