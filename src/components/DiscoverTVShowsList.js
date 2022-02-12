import { useEffect, useState } from "react";
import "../styles/Watchlist.css";
import WatchlistCard from "./WatchlistCard";
import WatchlistPagination from "./WatchlistPagination";
import {
  checkInFavourites,
  checkInWatchLater,
} from "../controllers/DBController";
import { FaInfoCircle } from "react-icons/fa";

const DiscoverMovies = (props) => {
  const { temp } = props;
  const [discoverTVShowsList, setDiscoverTVShowsList] = useState(temp);

  useEffect(() => {
    setDiscoverTVShowsList(temp);
  }, [temp]);

  return (
    <>
      <div className="info">
        <FaInfoCircle />
        <p>Click on the individual movie and TV show to see more details</p>
      </div>
      <div className="discover">
        <h1>TV Shows</h1>
        <div className="discover-tv-shows-list">
          {discoverTVShowsList.map((item) => {
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

export default DiscoverMovies;
