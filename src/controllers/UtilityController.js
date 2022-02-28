const selectRatingColor = (vote_average) => {
  if (vote_average >= 9.0) {
    return "green";
  } else if (vote_average >= 8.0) {
    return "greenyellow";
  } else if (vote_average >= 7.0) {
    return "yellow";
  } else if (vote_average >= 6.0) {
    return "orange";
  } else {
    return "red";
  }
};

const selectColor = (isFavourite, toWatchLater) => {
  if (isFavourite) {
    return isFavourite ? "yellow" : "lightgrey";
  } else {
    return toWatchLater ? "red" : "lightgrey";
  }
};

const getRandomColor = () => {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const applyActiveClass = () => {
  const first_genre_filter = document.getElementsByClassName("genre-filter")[0];
  first_genre_filter.className += " genre-filter-active";
};

const replaceActiveClass = (genre) => {
  const genre_filter_active = document.getElementsByClassName(
    "genre-filter-active"
  );
  for (let i = 0; i < genre_filter_active.length; i++) {
    const element = genre_filter_active[i];
    element.className = element.className.replace("genre-filter-active", "");
  }
  const new_genre_filter_active = document.querySelector(
    `[data-id="${genre}"]`
  );
  new_genre_filter_active.className += " genre-filter-active";
};

const setErrorTimeout = (setErrorMessage, message) => {
  const timeout = setTimeout(() => {
    clearTimeout(timeout);
    setErrorMessage(message);
  }, 2000);
};

export {
  selectRatingColor,
  selectColor,
  getRandomColor,
  applyActiveClass,
  replaceActiveClass,
  setErrorTimeout,
};
