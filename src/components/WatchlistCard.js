import { Card } from "react-bootstrap";
import "../styles/WatchlistCard.css";
import { FaHeart, FaBookmark } from "react-icons/fa";
import { useState, useEffect } from "react";
import {
  addToFavourites,
  addToWatchLater,
  removeFromFavourites,
  removeFromWatchLater,
} from "../controllers/DBController";
import { useNavigate } from "react-router";

const WatchlistCard = (props) => {
  const {
    id,
    poster_path,
    vote_average,
    isFavourite,
    toWatchLater,
  } = props;

  const [favouriteState, setFavouriteState] = useState(false);
  const [watchLaterState, setWatchLaterState] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let unmounted = false;
    const resolveFavouritePromise = () => {
      isFavourite.then((res) => !unmounted && setFavouriteState(res));
    };
    const resolveWatchLaterPromise = () => {
      toWatchLater.then((res) => !unmounted && setWatchLaterState(res));
    };
    resolveFavouritePromise();
    resolveWatchLaterPromise();
    return () => (unmounted = true);
  }, [isFavourite, toWatchLater]);

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

  const selectFavouriteColor = (isFavourite) => {
    return isFavourite ? "yellow" : "lightgrey";
  };

  const selectWatchLaterColor = (toWatchLater) => {
    return toWatchLater ? "red" : "lightgrey";
  };

  const changeFavouriteState = (isMovie) => {
    if (!favouriteState) {
      addToFavourites(props, isMovie);
    } else {
      removeFromFavourites(props);
    }
    setFavouriteState(!favouriteState);
  };

  const changeWatchLaterState = (isMovie) => {
    if (!watchLaterState) {
      addToWatchLater(props, isMovie);
    } else {
      removeFromWatchLater(props);
    }
    setWatchLaterState(!watchLaterState);
  };

  return (
    <Card key={id}>
      <div className="card-icon">
        <FaHeart
          style={{ color: selectFavouriteColor(favouriteState) }}
          onClick={() =>
            changeFavouriteState(
              window.location.pathname.split("/")[1] === "movies"
            )
          }
        />
        <FaBookmark
          style={{ color: selectWatchLaterColor(watchLaterState) }}
          onClick={() =>
            changeWatchLaterState(
              window.location.pathname.split("/")[1] === "movies"
            )
          }
        />
      </div>
      <div
        onClick={() => {
          const pathname = window.location.pathname.split("/")[1];
          pathname === "movies"
            ? navigate(`/movies/${id}`)
            : navigate(`/tv-shows/${id}`);
        }}
      >
        <Card.Img
          variant="top"
          src={
            poster_path
              ? `${process.env.REACT_APP_POSTER_PATH}${poster_path}`
              : `/images/no-poster-placeholder.png`
          }
        />
        <div
          className="card-rating"
          style={{ backgroundColor: selectRatingColor(vote_average) }}
        >
          {vote_average.toFixed(1)}
        </div>
      </div>
    </Card>
  );
};

export default WatchlistCard;
