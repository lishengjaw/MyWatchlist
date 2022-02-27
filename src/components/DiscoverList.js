import { useEffect, useState } from "react";
import {
  checkInFavourites,
  checkInWatchLater,
} from "../controllers/DBController";
import ItemCard from "./ItemCard";
import Pagination from "./Pagination";
import "../styles/DiscoverList.css";

const DiscoverList = ({ temp, isMovie, isHidden }) => {
  const [discoverList, setDiscoverList] = useState(temp);

  useEffect(() => {
    setDiscoverList(temp);
  }, [temp]);
  return (
    <>
      <div className="discover">
        {!isHidden && <h1>{`${isMovie ? "Movies" : "Tv Shows"}`}</h1>}
        <div className="discover-list">
          {discoverList.map((item) => {
            const { id } = item;
            return (
              <ItemCard
                key={id}
                {...item}
                isFavourite={checkInFavourites(id)}
                toWatchLater={checkInWatchLater(id)}
              />
            );
          })}
        </div>
      </div>
      <Pagination />
    </>
  );
};

export default DiscoverList;
