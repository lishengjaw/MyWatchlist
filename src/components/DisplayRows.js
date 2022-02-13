import "../styles/DisplayRows.css";
import { FaHeart, FaBookmark } from "react-icons/fa";
import { useState } from "react";
import { Image } from "react-bootstrap";
import {
  addToFavourites,
  addToWatchLater,
  removeFromFavourites,
  removeFromWatchLater,
} from "../controllers/DBController";
import { useNavigate } from "react-router-dom";

const DisplayRows = (props) => {
  const { poster_path, title, vote_average, genre_list, name, isMovie, id } =
    props.data;
  const isFavourite = props.isFavourite;
  const toWatchLater = props.toWatchLater;
  const [iconState, setIconState] = useState(isFavourite || toWatchLater);
  const navigate = useNavigate();

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

  const selectColor = () => {
    if (isFavourite) {
      return isFavourite ? "yellow" : "lightgrey";
    } else {
      return toWatchLater ? "red" : "lightgrey";
    }
  };

  const changeState = () => {
    if (!iconState) {
      isFavourite ? addToFavourites(props.data) : addToWatchLater(props.data);
    } else {
      isFavourite
        ? removeFromFavourites(props.data)
        : removeFromWatchLater(props.data);
    }
    setIconState(!iconState);
  };

  return (
    <div className="display-row">
      <div
        className="display-row-left"
        onClick={() => {
          console.log(isMovie);
          isMovie ? navigate(`/movies/${id}`) : navigate(`/tv-shows/${id}`);
        }}
      >
        <Image
          src={
            poster_path
              ? `${process.env.REACT_APP_POSTER_PATH}${poster_path}`
              : `/images/no-poster-placeholder.png`
          }
        />
      </div>

      <div
        className="display-row-center"
        onClick={() => {
          console.log(isMovie);
          isMovie ? navigate(`/movies/${id}`) : navigate(`/tv-shows/${id}`);
        }}
      >
        <h4>{title || name}</h4>
        <div>
          {genre_list?.map((genre, index) => (
            <span key={index}>{genre}</span>
          ))}
        </div>
      </div>

      <div className="display-row-right">
        <h6 style={{ backgroundColor: selectRatingColor(vote_average) }}>
          {vote_average}
        </h6>
        {isFavourite ? (
          <FaHeart style={{ color: selectColor() }} onClick={changeState} />
        ) : (
          <FaBookmark style={{ color: selectColor() }} onClick={changeState} />
        )}
      </div>
    </div>
  );
};

export default DisplayRows;
