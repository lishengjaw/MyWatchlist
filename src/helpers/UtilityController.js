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

export {
  selectRatingColor,
  selectColor,
  getRandomColor,
};
