import authFetch from "../fetchs/AuthFetch.js";
import elementFactory from "../elements/MyListElements.js";
import {reFreshMovieListImage} from "../util/convertImage.js";

function createEmptyMovieFolder(parentNode) {
    let array =
        [`${window.location.protocol}//${window.location.host}/images/no_image.png`,
            `${window.location.protocol}//${window.location.host}/images/no_image_black.png`,
            `${window.location.protocol}//${window.location.host}/images/no_image_color.png`
        ];
    const folderBox = document.createElement("div");
    folderBox.classList.add("folder_box");

    const folderImages = document.createElement("div");
    folderImages.classList.add("folder_imgs");

    const folderImageDiv = document.createElement('div');
    folderImageDiv.classList.add('folder_img1');
    const addImage = document.createElement('img');
    addImage.src = `${window.location.protocol}//${window.location.host}/images/add_folder.png`;
    folderImageDiv.append(addImage);

    folderImages.append(folderImageDiv);

    const folderName = document.createElement("h4");
    folderName.classList.add("folder_name");
    folderName.innerText = '리스트 생성';

    //계층 구조 형성
    folderBox.append(folderImages);
    folderBox.append(folderName);
    parentNode.append(folderBox);

    //이벤트 할당
    folderBox.addEventListener("click", async (e) => {
        const {bucketId} = await authFetch('/api/bucket/my', 'POST', {bucketName : "새로운 폴더"});
        folderBox.remove();
        elementFactory.reCreateMovieList(bucketId, "새로운 폴더", array , parentNode, refreshModalData);
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
    let array =
        [
            {
                thumb:`${window.location.protocol}//${window.location.host}/images/no_image.png`
            },
            {
                thumb:`${window.location.protocol}//${window.location.host}/images/no_image_black.png`
            },
            {
                thumb:`${window.location.protocol}//${window.location.host}/images/no_image.png`
            },
        ];
    for (const item of thumbs) {
        if (item.thumb) {
            array[index] = item;
            index++;
        }
    }
    return array;
}

async function movieCheckBoxClickEventListener(
    e, eventParameter,
) {
    const {movieId, bucketId, movieRow, selectedMovies, unSelectedMovies,thumb ,refreshThumbArg} = eventParameter;
    const {thumbArray} = refreshThumbArg;

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
        for (const item of thumbArray){
            if (item.movieId === movieId) {
                thumbArray.remove(item);
                break;
            }
        }
        reFreshMovieListImage(refreshThumbArg);
    }
}

/**
 * 모달 내 체크 박스 이벤트
 * @param e
 * @param bucketId
 * @param folder_box
 * @returns {Promise<void>}
 */
async function refreshModalData(e, bucketId, folder_box, refreshThumbArg) {
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
        elementFactory.createBucketItem(select, bucketId, true, selectedMovies, unselectedMovies, movieCheckBoxClickEventListener, refreshThumbArg);
    }

    for (const unSelect of unSelectList) {
        elementFactory.createBucketItem(unSelect, bucketId, false, selectedMovies, unselectedMovies, movieCheckBoxClickEventListener, refreshThumbArg);
    }
}

async function movieListClickEventListener (e, bucketId, folder_box, refreshThumbArg) {
    const modal = document.querySelector(".modal_selection");
    await refreshModalData(e, bucketId, folder_box, refreshThumbArg);
    modal.classList.add("select_on");
}

async function favBtnClickEventListener (e, movieId, parentNode, myListPoster) {
    await authFetch("/api/pick", "DELETE", { movieId});
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
        elementFactory.reCreateMovieList(bucketId, bucketName, thumbArray, folderLists, movieListClickEventListener);
    }
    createEmptyMovieFolder(folderLists);
}
