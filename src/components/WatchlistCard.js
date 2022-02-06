import { useDispatch } from "react-redux";
import { openModal } from "../features/modalSlice";
import { setClickedItem } from "../features/clickedItemSlice";
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

const WatchlistCard = (props) => {
  const {
    id,
    poster_path,
    vote_average,
    isFavourite,
    toWatchLater,
    title,
    date,
  } = props;

  const [favouriteState, setFavouriteState] = useState(false);
  const [watchLaterState, setWatchLaterState] = useState(false);
  const year = date?.split("-")[0];
  const dispatch = useDispatch();

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

  const changeFavouriteState = () => {
    if (!favouriteState) {
      addToFavourites(props);
    } else {
      removeFromFavourites(props);
    }
    setFavouriteState(!favouriteState);
  };

  const changeWatchLaterState = () => {
    if (!watchLaterState) {
      addToWatchLater(props);
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
          onClick={changeFavouriteState}
        />
        <FaBookmark
          style={{ color: selectWatchLaterColor(watchLaterState) }}
          onClick={changeWatchLaterState}
        />
      </div>
      <div
        onClick={() => {
          const { isFavourite, toWatchLater, ...favouriteItem } = props;
          dispatch(openModal());
          dispatch(
            setClickedItem({
              isFavourite: favouriteState,
              toWatchLater: watchLaterState,
              ...favouriteItem,
            })
          );
        }}
      >
        <Card.Img
          variant="top"
          src={
            poster_path
              ? `${process.env.REACT_APP_POSTER_PATH}/${poster_path}`
              : `/images/no-poster-placeholder.png`
          }
        />
        <Card.Body>
          <Card.Title>
            {`${title}`} {year && `(${year})`}
          </Card.Title>
          <Card.Title
            style={{ backgroundColor: selectRatingColor(vote_average) }}
          >
            {vote_average}
          </Card.Title>
        </Card.Body>
      </div>
    </Card>
  );
};

export default WatchlistCard;
