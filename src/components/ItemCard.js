import { Card } from "react-bootstrap";
import "../styles/ItemCard.css";
import { FaHeart, FaBookmark } from "react-icons/fa";
import { useState, useEffect } from "react";
import {
  addToFavourites,
  addToWatchLater,
  removeFromFavourites,
  removeFromWatchLater,
} from "../controllers/DBController";
import { useNavigate } from "react-router";
import {
  selectColor,
  selectRatingColor,
} from "../controllers/UtilityController";
import { debounce } from "lodash";

const WatchlistCard = (props) => {
  const { id, poster_path, vote_average, isFavourite, toWatchLater } = props;
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

  const changeFavouriteState = debounce((isMovie) => {
    if (!favouriteState) {
      addToFavourites(props, isMovie);
    } else {
      removeFromFavourites(props);
    }
    setFavouriteState(!favouriteState);
  }, 1000);

  const changeWatchLaterState = debounce((isMovie) => {
    if (!watchLaterState) {
      addToWatchLater(props, isMovie);
    } else {
      removeFromWatchLater(props);
    }
    setWatchLaterState(!watchLaterState);
  }, 1000);

  return (
    <Card key={id}>
      <div className="card-icon">
        <FaHeart
          style={{ color: selectColor(favouriteState, null) }}
          onClick={() => {
            changeFavouriteState(
              window.location.pathname.split("/")[1] === "movies"
            );
          }}
        />
        <FaBookmark
          style={{ color: selectColor(null, watchLaterState) }}
          onClick={() => {
            changeWatchLaterState(
              window.location.pathname.split("/")[1] === "movies"
            );
          }}
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
          {parseFloat(vote_average).toFixed(1)}
        </div>
      </div>
    </Card>
  );
};

export default WatchlistCard;
