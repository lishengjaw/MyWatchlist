import "../styles/ItemPage.css";
import { useEffect, useState } from "react";
import { FaHeart, FaBookmark, FaVideo } from "react-icons/fa";
import {
  addToFavourites,
  addToWatchLater,
  checkInFavourites,
  checkInWatchLater,
  removeFromFavourites,
  removeFromWatchLater,
} from "../controllers/DBController";
import {
  getCastsAndDirectors,
  getItemById,
  getRecommendedMoviesAndTVShows,
  getVideo,
} from "../controllers/APIController";
import ItemCard from "./ItemCard";
import { useLocation } from "react-router-dom";
import { Badge } from "react-bootstrap";

const ItemPage = () => {
  const pathname = window.location.pathname.split("/");
  const isMovie = pathname[1] === "movies";
  const id = parseInt(pathname[2]);

  const [pageItem, setPageItem] = useState(null);
  const [seeMore, setSeeMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    `Loading ${isMovie ? "movie..." : "TV show..."}`
  );
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    setErrorMessage(`Loading ${isMovie ? "movie..." : "TV show..."}`);
    setPageItem(null);
    setSeeMore(false);
    const fetchItems = async () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      const data = await getItemById(id, isMovie);
      if (data && !data.id) {
        return;
      }
      const { casts, directors } = await getCastsAndDirectors(id, isMovie);
      const video_key = await getVideo(id, isMovie);
      const isFavourite = await checkInFavourites(id);
      const toWatchLater = await checkInWatchLater(id);
      const start_year =
        data.release_date?.split("-")[0] || data.first_air_date?.split("-")[0];
      const end_year = data.last_air_date?.split("-")[0];
      const recommended_list = await getRecommendedMoviesAndTVShows(
        id,
        isMovie
      );
      const newData = {
        ...data,
        casts,
        directors,
        video_key,
        start_year,
        end_year,
        isFavourite,
        toWatchLater,
        recommended_list,
        vote_average: parseFloat(data.vote_average).toFixed(1),
      };
      if (isMounted) {
        setPageItem(newData);
      }
    };
    fetchItems();
    return () => {
      isMounted = false;
    };
  }, [id, isMovie, location.key]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      setErrorMessage(`No ${isMovie ? "movie" : "TV show"} found`);
    }, 5000);
  }, [isMovie, id]);

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
    if (!pageItem.isFavourite) {
      addToFavourites(pageItem, isMovie);
    } else {
      removeFromFavourites(pageItem);
    }
    setPageItem({ ...pageItem, isFavourite: !pageItem.isFavourite });
  };

  const changeWatchLaterState = () => {
    if (!pageItem.toWatchLater) {
      addToWatchLater(pageItem, isMovie);
    } else {
      removeFromWatchLater(pageItem);
    }
    setPageItem({ ...pageItem, toWatchLater: !pageItem.toWatchLater });
  };

  return (
    <div className="item-wrapper">
      {pageItem && pageItem ? (
        <>
          <img
            className="item-background"
            src={`${process.env.REACT_APP_POSTER_PATH}${pageItem.backdrop_path}`}
            alt=""
          />
          <div className="item-page">
            <div className="item-poster">
              <img
                src={`${process.env.REACT_APP_POSTER_PATH}${pageItem.poster_path}`}
                alt=""
              />
            </div>

            <div className="item-info">
              <h1>
                {isMovie &&
                  pageItem.start_year &&
                  `${pageItem.title || pageItem.name} (${pageItem.start_year})`}
                {!isMovie &&
                  pageItem.start_year &&
                  `${pageItem.title || pageItem.name} (${pageItem.start_year}`}
                {pageItem.end_year &&
                  pageItem.status === "Ended" &&
                  `-${pageItem.end_year})`}
                {pageItem.end_year &&
                  pageItem.status === "Returning Series" &&
                  "-Present)"}
              </h1>
              <div className="item-subheader">
                <h6
                  style={{
                    backgroundColor: selectRatingColor(pageItem.vote_average),
                  }}
                >
                  {pageItem.vote_average}
                </h6>
                <div className="item-icons">
                  <div className="item-icon">
                    <FaHeart
                      style={{
                        color: selectFavouriteColor(pageItem.isFavourite),
                      }}
                      onClick={changeFavouriteState}
                    />
                  </div>
                  <div className="item-icon">
                    <FaBookmark
                      style={{
                        color: selectWatchLaterColor(pageItem.toWatchLater),
                      }}
                      onClick={changeWatchLaterState}
                    />
                  </div>
                  {pageItem.video_key && (
                    <div className="item-icon">
                      <a
                        href={`${process.env.REACT_APP_VIDEO_PATH}?key=${pageItem.video_key}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaVideo />
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <div className="item-tags">
                {pageItem.genres?.map((genre, index) => {
                  const { id, name } = genre;
                  return (
                    <Badge pill key={id}>
                      {name}
                    </Badge>
                  );
                })}
                {pageItem.number_of_seasons && pageItem.number_of_episodes && (
                  <>
                    <Badge pill>
                      {pageItem.number_of_seasons > 1
                        ? `${pageItem.number_of_seasons} seasons`
                        : `${pageItem.number_of_seasons} season`}
                    </Badge>
                    <Badge pill>
                      {pageItem.number_of_episodes > 1
                        ? `${pageItem.number_of_episodes} episodes`
                        : `${pageItem.number_of_episodes} episode`}
                    </Badge>
                  </>
                )}
              </div>
              {pageItem.networks &&
                pageItem.networks.map((network) => {
                  const { id, logo_path } = network;
                  return (
                    <img
                      key={id}
                      className="item-network"
                      src={`${process.env.REACT_APP_POSTER_PATH}${logo_path}`}
                      alt=""
                    />
                  );
                })}
              {pageItem.tagline.length > 0 && (
                <p className="item-tagline">{pageItem.tagline}</p>
              )}
              <h3>Overview</h3>
              <p>{pageItem.overview || "-"}</p>
              <div className="item-people">
                <div className="item-directors">
                  {pageItem.directors.length > 0 ? (
                    <div>
                      <h5>Director(s):</h5>
                      {pageItem.directors.map((director, index) => {
                        const { id, name } = director;
                        return pageItem.directors.length - 1 === index ? (
                          <span key={id}>{`${name} `}</span>
                        ) : (
                          <span key={id}>{`${name}, `}</span>
                        );
                      })}
                    </div>
                  ) : pageItem.created_by.length > 0 ? (
                    <div>
                      <h5>Director(s):</h5>
                      {pageItem.created_by.map((director, index) => {
                        const { id, name } = director;
                        return pageItem.created_by.length - 1 === index ? (
                          <span key={id}>{`${name} `}</span>
                        ) : (
                          <span key={id}>{`${name}, `}</span>
                        );
                      })}
                    </div>
                  ) : (
                    <h5>Director(s): -</h5>
                  )}
                </div>
                <div className="item-casts">
                  {pageItem.casts.length > 0 ? (
                    <div>
                      <h5>Main Casts:</h5>
                      {seeMore
                        ? pageItem.casts.map((cast, index) => {
                            const { id, name } = cast;
                            return pageItem.casts.length - 1 === index ? (
                              <span key={id}>{`${name} `}</span>
                            ) : (
                              <span key={id}>{`${name}, `}</span>
                            );
                          })
                        : pageItem.casts.slice(0, 10).map((cast, index) => {
                            const { id, name } = cast;
                            return pageItem.casts.length - 1 === index ? (
                              <span key={id}>{`${name} `}</span>
                            ) : (
                              <span key={id}>{`${name}, `}</span>
                            );
                          })}
                      {pageItem.casts.length > 10 && (
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
          </div>
          {pageItem.recommended_list && pageItem.recommended_list.length > 0 && (
            <div className="item-recommend">
              <h3>{`Recommended ${isMovie ? "movies" : "TV shows"}`}</h3>
              <div className="item-recommend-list">
                {pageItem.recommended_list.map((item) => {
                  const { id } = item;
                  return (
                    <div className="item-recommend-card" key={id}>
                      <ItemCard
                        {...item}
                        isFavourite={checkInFavourites(id)}
                        toWatchLater={checkInWatchLater(id)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      ) : (
        <h1 className="list-no-search-results">{errorMessage}</h1>
      )}
    </div>
  );
};

export default ItemPage;