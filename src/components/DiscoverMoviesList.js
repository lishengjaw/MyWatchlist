import { useEffect, useState } from "react";
import "../styles/Watchlist.css";
import WatchlistCard from "./WatchlistCard";
import WatchlistPagination from "./WatchlistPagination";
import {
  checkInFavourites,
  checkInWatchLater,
} from "../controllers/DBController";

const DiscoverMoviesList = (props) => {
  const { temp } = props;
  const [discoverMoviesList, setDiscoverMoviesList] = useState(temp);

  useEffect(() => {
    setDiscoverMoviesList(temp);
  }, [temp]);

  return (
    <>
      <div className="discover">
        <h1>Movies</h1>
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
