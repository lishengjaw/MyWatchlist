import { useEffect, useState } from "react";
import "../styles/Watchlist.css";
import WatchlistCard from "./WatchlistCard";
import WatchlistPagination from "./WatchlistPagination";
import {
  checkInFavourites,
  checkInWatchLater,
} from "../controllers/DBController";
import { FaInfoCircle } from "react-icons/fa";

const DiscoverMoviesList = (props) => {
  const { temp } = props;
  const [discoverMoviesList, setDiscoverMoviesList] = useState(temp);

    useEffect(() => {
      setDiscoverMoviesList(temp);
    }, [temp])

  return (
    <>
      <div className="info">
        <FaInfoCircle />
        <p>Click on the individual movie and TV show to see more details</p>
      </div>
      <div className="discover">
        <h1>Movies</h1>
        {discoverMoviesList.length === 0 && <h3>No movies found</h3>}
        <div className="discover-movies-list">
          {discoverMoviesList.map((item) => {
            const { id } = item;
            return (
              <WatchlistCard
                key={id}
                {...item}
                isFavourite={checkInFavourites(id)}
                toWatchLater={checkInWatchLater(id)}
              />
            );
          })}
        </div>
      </div>
      <WatchlistPagination />
    </>
  );
};

export default DiscoverMoviesList;
