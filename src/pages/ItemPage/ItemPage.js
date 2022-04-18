import "./ItemPage.css";
import { useEffect, useState } from "react";
import { FaHeart, FaBookmark, FaVideo } from "react-icons/fa";
import {
  addToFavourites,
  addToWatchLater,
  checkInFavourites,
  checkInWatchLater,
  removeFromFavourites,
  removeFromWatchLater,
} from "../../db/DBController";
import {
  getCastsAndDirectors,
  getItemById,
  getRecommendedMoviesAndTVShows,
  getVideo,
} from "../../api/APIController";
import ItemCard from "../../components/ItemCard/ItemCard";
import { useLocation } from "react-router-dom";
import { Badge, Spinner, Button, Image } from "react-bootstrap";
import {
  selectColor,
  selectRatingColor,
} from "../../helpers/UtilityController";
import { debounce } from "lodash";

const ItemPage = () => {
  const pathname = window.location.pathname.split("/");
  const isMovie = pathname[1] === "movies";
  const id = parseInt(pathname[2]);

  const [pageItem, setPageItem] = useState(null);
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [castsOpen, setCastsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    setPageItem(null);
    const fetchItems = async () => {
      const data = await getItemById(id, isMovie);
      window.scrollTo({ top: 0, behavior: "smooth" });
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
      setLoading(false);
    };
    setLoading(true);
    fetchItems();
    return () => {
      isMounted = false;
    };
  }, [id, isMovie, location.key]);

  const changeFavouriteState = debounce(() => {
    if (!pageItem.isFavourite) {
      addToFavourites(pageItem, isMovie);
    } else {
      removeFromFavourites(pageItem);
    }
    setPageItem({
      ...pageItem,
      isFavourite: !pageItem.isFavourite,
    });
  }, 500);

  const changeWatchLaterState = debounce(() => {
    if (!pageItem.toWatchLater) {
      addToWatchLater(pageItem, isMovie);
    } else {
      removeFromWatchLater(pageItem);
    }
    setPageItem({
      ...pageItem,
      toWatchLater: !pageItem.toWatchLater,
    });
  }, 500);
  return (
    <div className="background position-relative p-0">
      {loading ? (
        <Spinner animation="border" variant="dark" />
      ) : (
        <>
          {pageItem ? (
            <>
              {pageItem.backdrop_path && (
                <Image
                  className="item-background position-absolute w-100 h-100 opacity-25"
                  src={`${process.env.REACT_APP_POSTER_PATH}${pageItem.backdrop_path}`}
                />
              )}
              <div className="item-info d-flex p-4 w-100 position-absolute">
                <div className="item-left d-flex flex-column align-items-center">
                  <Image
                    className="item-poster mx-5"
                    src={
                      pageItem.poster_path
                        ? `${process.env.REACT_APP_POSTER_PATH}${pageItem.poster_path}`
                        : `/images/no-poster-placeholder.png`
                    }
                  />
                  <div className="item-icons d-flex mt-3">
                    <h6
                      className="item-icon item-ratings"
                      style={{
                        backgroundColor: selectRatingColor(
                          pageItem.vote_average
                        ),
                      }}
                    >
                      {pageItem.vote_average}
                    </h6>
                    <h6 className="item-icon rounded-circle d-flex justify-content-center align-items-center p-2">
                      <FaHeart
                        style={{
                          color: selectColor(pageItem.isFavourite, null),
                        }}
                        onClick={changeFavouriteState}
                      />
                    </h6>
                    <h6 className="item-icon rounded-circle d-flex justify-content-center align-items-center p-2">
                      <FaBookmark
                        style={{
                          color: selectColor(null, pageItem.toWatchLater),
                        }}
                        onClick={changeWatchLaterState}
                      />
                    </h6>
                    {pageItem.video_key && (
                      <a
                        className="item-icon rounded-circle d-flex justify-content-center align-items-center p-2 text-light"
                        href={`${process.env.REACT_APP_VIDEO_PATH}?key=${pageItem.video_key}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaVideo />
                      </a>
                    )}
                  </div>
                </div>
                <div className="item-right">
                  <div className="item-title mb-2">
                    <h1 className="text-light">
                      {pageItem.name || pageItem.title}
                      {isMovie || (!isMovie && !pageItem.end_year)
                        ? ` (${pageItem.start_year})`
                        : ` (${pageItem.start_year}-${pageItem.end_year})`}
                    </h1>
                  </div>
                  <div className="item-tagline mb-3 text-light">
                    {pageItem.tagline}
                  </div>
                  <div className="item-tags mb-2">
                    {pageItem.genres?.map(({ id, name }) => {
                      return (
                        <Badge pill key={id}>
                          {name}
                        </Badge>
                      );
                    })}
                    <Badge pill>
                      {pageItem.number_of_seasons &&
                        `${pageItem.number_of_seasons} season(s)`}
                    </Badge>
                    <Badge pill>
                      {pageItem.number_of_episodes &&
                        `${pageItem.number_of_episodes} episode(s)`}
                    </Badge>
                  </div>
                  <div className="item-networks mb-2">
                    {pageItem.networks?.map(({ id, logo_path }) => {
                      return (
                        <img
                          key={id}
                          className="item-network d-inline-block"
                          src={`${process.env.REACT_APP_POSTER_PATH}${logo_path}`}
                          alt=""
                        />
                      );
                    })}
                  </div>
                  <div className="item-overview text-light mb-2">
                    <h3>Overview</h3>
                    <p>
                      {pageItem.overview.slice(0, 200) || "-"}
                      {overviewOpen && pageItem.overview.slice(200)}
                      {pageItem.overview.length > 200 && (
                        <Button
                          className="read-more-btn border-0 shadow-none text-dark"
                          onClick={() => setOverviewOpen(!overviewOpen)}
                        >
                          {overviewOpen ? "Read Less" : "Read More"}
                        </Button>
                      )}
                    </p>
                  </div>
                  <div className="item-people d-flex text-light">
                    <div className="item-director">
                      <h5>Director(s):</h5>
                      {pageItem.directors?.length > 0 ||
                      pageItem.created_by?.length > 0 ? (
                        <>
                          {pageItem.directors?.map(({ id, name }, index) => {
                            return pageItem.directors.length - 1 === index ? (
                              <span key={id}>{`${name}`}</span>
                            ) : (
                              <span key={id}>{`${name}, `}</span>
                            );
                          })}
                          {pageItem.created_by?.map(({ id, name }, index) => {
                            return pageItem.created_by.length - 1 === index ? (
                              <span key={id}>{`${name}`}</span>
                            ) : (
                              <span key={id}>{`${name}, `}</span>
                            );
                          })}
                        </>
                      ) : (
                        <>-</>
                      )}
                    </div>
                    <div className="item-casts">
                      <h5>Casts:</h5>
                      {pageItem.casts?.length > 0 ? (
                        <p>
                          {pageItem.casts
                            .slice(0, 10)
                            .map(({ id, name }, index) => {
                              const maxLength = Math.min(
                                pageItem.casts.length,
                                10
                              );
                              return maxLength - 1 === index ? (
                                <span key={id}>{`${name}`}</span>
                              ) : (
                                <span key={id}>{`${name}, `}</span>
                              );
                            })}
                          {castsOpen && pageItem.casts.length > 10 && (
                            <span>, </span>
                          )}
                          {castsOpen &&
                            pageItem.casts
                              .slice(10)
                              .map(({ id, name }, index) => {
                                return pageItem.casts.length - 11 === index ? (
                                  <span key={id}>{`${name}`}</span>
                                ) : (
                                  <span key={id}>{`${name}, `}</span>
                                );
                              })}
                          {pageItem.casts.length > 10 && (
                            <Button
                              className="read-more-btn border-0 shadow-none text-dark"
                              onClick={() => setCastsOpen(!castsOpen)}
                            >
                              {castsOpen ? "Read Less" : "Read More"}
                            </Button>
                          )}
                        </p>
                      ) : (
                        <>-</>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="item-recommendations w-100 p-3">
                {pageItem.recommended_list?.length > 0 && (
                  <>
                    <h2 className="text-light">{`Recommended ${
                      isMovie ? "movies" : "TV shows"
                    }`}</h2>
                    <div className="item-recommendations-list d-flex overflow-auto">
                      {pageItem.recommended_list.map((item) => {
                        const { id } = item;
                        return (
                          <div className="item-recommendation-card" key={id}>
                            <ItemCard
                              {...item}
                              isFavourite={checkInFavourites(id)}
                              toWatchLater={checkInWatchLater(id)}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <h1 className="error">Invalid ID</h1>
          )}
        </>
      )}
    </div>
  );
};

export default ItemPage;
