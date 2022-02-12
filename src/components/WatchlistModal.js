import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectShowModal, closeModal } from "../features/modalSlice";
import {
  selectClickedItem,
  removeClickedItem,
} from "../features/clickedItemSlice";
import "../styles/WatchlistModal.css";
import { useEffect, useState } from "react";
import { FaHeart, FaBookmark, FaVideo } from "react-icons/fa";
import {
  addToFavourites,
  addToWatchLater,
  removeFromFavourites,
  removeFromWatchLater,
} from "../controllers/DBController";

const WatchlistModal = () => {
  const showModal = useSelector(selectShowModal);
  const clickedItem = useSelector(selectClickedItem);
  const dispatch = useDispatch();

  const {
    poster_path,
    overview,
    title,
    date,
    start_date,
    end_date,
    vote_average,
    genre_names,
    casts,
    directors,
    video_key,
    isFavourite,
    toWatchLater,
    number_of_episodes,
    number_of_seasons,
    status,
  } = clickedItem;

  const year = date?.split("-")[0];
  const start_year = start_date?.split("-")[0];
  const end_year = end_date?.split("-")[0];

  const [favouriteState, setFavouriteState] = useState(isFavourite);
  const [watchLaterState, setWatchLaterState] = useState(toWatchLater);
  const [seeMore, setSeeMore] = useState(false);

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
      addToFavourites(clickedItem);
    } else {
      removeFromFavourites(clickedItem);
    }
    setFavouriteState(!favouriteState);
  };

  const changeWatchLaterState = () => {
    if (!watchLaterState) {
      addToWatchLater(clickedItem);
    } else {
      removeFromWatchLater(clickedItem);
    }
    setWatchLaterState(!watchLaterState);
  };

  useEffect(() => {
    document.getElementsByClassName(
      "modal-content"
    )[0].style.backgroundImage = `url("${process.env.REACT_APP_POSTER_PATH}/${poster_path}")`;
  }, [poster_path]);

  return (
    <Modal
      show={showModal}
      onHide={() => {
        dispatch(closeModal());
        dispatch(removeClickedItem());
      }}
      centered
      size="lg"
    >
      <Modal.Header closeButton className="h-0" />
      <Modal.Body>
        <div className="modal-info">
          <h1>
            {year && `${title} (${year})`}
            {start_year && `${title} (${start_year}`}
            {end_year && status === "Ended" && `-${end_year})`}
            {end_year && status === "Returning Series" && "-Present)"}
          </h1>
          <div className="modal-subheader">
            <h6 style={{ backgroundColor: selectRatingColor(vote_average) }}>
              {vote_average}
            </h6>
            {genre_names?.map((genre, index) => (
              <h6 key={index}>{genre}</h6>
            ))}
            <div className="modal-icons">
              <div className="modal-icon">
                <FaHeart
                  style={{ color: selectFavouriteColor(favouriteState) }}
                  onClick={changeFavouriteState}
                />
              </div>
              <div className="modal-icon">
                <FaBookmark
                  style={{ color: selectWatchLaterColor(watchLaterState) }}
                  onClick={changeWatchLaterState}
                />
              </div>
              {video_key && (
                  <div className="modal-icon">
                    <a
                      href={`${process.env.REACT_APP_VIDEO_PATH}?key=${video_key}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaVideo />
                    </a>
                  </div>
                )}
            </div>
          </div>
          {number_of_seasons && number_of_episodes && (
            <div className="modal-status">
              <p>{number_of_seasons > 1 ? `${number_of_seasons} seasons` : `${number_of_seasons} season`}</p>
              <p>{number_of_episodes > 1 ? `${number_of_episodes} episodes` : `${number_of_episodes} episode`}</p>
            </div>
          )}
          <h3>Overview</h3>
          <p>{overview || "-"}</p>
          <div className="modal-people">
            <div className="modal-directors">
              {directors.length > 0 ? (
                <div>
                  <h5>Director(s):</h5>
                  {directors.map((director, index) => {
                    return directors.length - 1 === index ? (
                      <span key={index}>{`${director} `}</span>
                    ) : (
                      <span key={index}>{`${director}, `}</span>
                    );
                  })}
                </div>
              ) : (
                <h5>Director(s): -</h5>
              )}
            </div>
            <div className="modal-casts">
              {casts.length > 0 ? (
                <div>
                  <h5>Main Casts:</h5>
                  {seeMore
                    ? casts.map((cast, index) => {
                        return casts.length - 1 === index ? (
                          <span key={index}>{`${cast} `}</span>
                        ) : (
                          <span key={index}>{`${cast}, `}</span>
                        );
                      })
                    : casts.slice(0, 10).map((cast, index) => {
                        return casts.length - 1 === index ? (
                          <span key={index}>{`${cast} `}</span>
                        ) : (
                          <span key={index}>{`${cast}, `}</span>
                        );
                      })}
                  {casts.length > 10 && (
                    <button onClick={() => setSeeMore(!seeMore)}>
                      {seeMore ? "See Less" : "See More"}
                    </button>
                  )}
                </div>
              ) : (
                <h5>Main Casts: -</h5>
              )}
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default WatchlistModal;
