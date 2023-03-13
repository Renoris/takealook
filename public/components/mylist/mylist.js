import authFetch from "../fetchs/AuthFetch.js";

const access = localStorage.getItem('takealook-access');
const refresh = localStorage.getItem('takealook-refresh');
function convertImageScaleMedium(image) {
    return image.replace('type=m886_590_2', 'type=m203_290_2');
}

function createMyPick(movie, parentNode) {
    const myListPoster = document.createElement('div');
    myListPoster.classList.add('mylist_poster');
    myListPoster.id = `movie_${movie.movieId}`;
    const poster_collection = document.createElement('img');
    poster_collection.classList.add('poster_collection');
    poster_collection.src = convertImageScaleMedium(movie.thumb);
    const favBtn = document.createElement('img');
    favBtn.classList.add('poster_click');
    favBtn.src = "images/fav_on.png";
    myListPoster.appendChild(poster_collection);
    myListPoster.appendChild(favBtn);
    parentNode.appendChild(myListPoster);
    favBtn.addEventListener('click', async (e) => {
        await authFetch("/api/pick","DELETE" ,{movieId: movie.movieId});
        parentNode.removeChild(myListPoster);
    });
}

function createMovieList(bucketId, bucketName, thumbArray, parentNode) {
    const movieBucketContainer = document.createElement('div');
    // myListPoster.classList.add('');
    movieBucketContainer.id = `bucket_${bucketId}`;

    for (let i = 0; i < 3; i++) {
        const thumb = document.createElement('img');
        // thumb.classList.add('');
        thumb.src = convertImageScaleMedium(thumbArray[i]);
        // 삽입엘리먼트.appendChild(thumb);
    }

    //제목 삽입
    //장르 삽입
}

if (!access || !refresh) {
    alert("로그인이 되지 않은 사용자 입니다");
    location.href = "/";
}

async function spreadMyPick() {
    const listPoster = document.querySelector('.list_poster');
    try {
        const result = await authFetch('/api/pick');
        result.forEach((item) => {
            createMyPick(item, listPoster);
        })
    } catch (error) {
        alert("서버와의 통신에 실패했습니다.");
    }
}

// async function spreadMyList() {
//     const listPoster = document.querySelector('.list_poster');
//     const buckets = await authFetch('/api/bucket/my');
//
//     for (const bucket of buckets) {
//         const bucketId = bucket.bucketId;
//         const bucketName = bucket.bucketName;
//         let index = 0;
//         let array = ['images/no_image', 'images/no_image_black', 'images/no_image_color'];
//         for (const thumb of bucket.bucketThumbs) {
//             if (thumb) {
//                 array[index] = thumb;
//                 index++;
//             }
//             if (index >= 3) {
//                 break;
//             }
//         }
//
//         createMovieList(bucketId, bucketName, array);
//
//
//         //이후로 element 생성하고 값 할당
//     }
// }
//



spreadMyPick();
spreadMyList();



//
// (function initialize(){
//     spreadMyPick();
//     spreadMyList();
// })()
