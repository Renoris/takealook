const elementFactory = {
  createMovieCoverNode: function (parentNode) {
    const $element = document.createElement("div");
    $element.classList.add("movie_cover");
    if (parentNode) parentNode.append($element);
    return $element;
  },

  createPickButtonNode: function (id, isPick, parentNode) {
    const $element = document.createElement("img");
    if (id) $element.id = `movie_${id}`;
    $element.classList.add("fav_btn");
    if (isPick) {
      $element.src = "./images/fav_on.png";
    } else {
      $element.src = "./images/fav_off.png";
    }
    $element.alt = `id ${id} movies pickButton`;
    if (parentNode) parentNode.append($element);
    return $element;
  },

  createCoverImageNode: function (parentNode) {
    const $element = document.createElement("div");
    $element.classList.add("cover_img");
    if (parentNode) parentNode.append($element);
    return $element;
  },

  createInCoverImageNode: function (url, parentNode) {
    const $element = document.createElement("img");
    if (!url || url === "null") {
      $element.src = "./images/no_image_wtext.png";
    } else $element.src = url;
    if (parentNode) parentNode.append($element);
    return $element;
  },

  createMovieInfoNode: function (title, genre, parentNode) {
    const $element = document.createElement("div");
    $element.classList.add("movie_info");
    const $title = document.createElement("h3");
    if (title && title.length > 30) {
      $title.innerText = `${title.slice(0, 27)}...`;
    } else {
      $title.innerText = title;
    }
    const $genre = document.createElement("span");
    $genre.innerText = `${genre}`;
    $element.append($title, $genre);
    if (parentNode) parentNode.append($element);
    return $element;
  },
};

export default elementFactory;
