export function modalInitialize() {
    const movieModalCloseBtn = document.getElementById("movie_modal_close_btn");
    const movieModal = document.querySelector(".modal_movie");
    movieModalCloseBtn.addEventListener("click", (e) => {
        movieModal.classList.remove("modal_on");
    });
    movieModal.addEventListener("click", (e) => {
        const evTarget = e.target;
        if (evTarget.classList.contains("modal_movie")) {
            movieModal.classList.remove("modal_on");
        }
    });
}
