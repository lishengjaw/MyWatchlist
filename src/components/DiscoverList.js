import {
  checkInFavourites,
  checkInWatchLater,
} from "../controllers/DBController";
import ItemCard from "./ItemCard";
import Pagination from "./Pagination";
import "../styles/DiscoverList.css";

const DiscoverList = ({ temp, isMovie, isHidden }) => {
  return (
    <>
      <div className="discover">
        {!isHidden && <h1>{`${isMovie ? "Movies" : "TV Shows"}`}</h1>}
        <div className="discover-list">
          {temp.map((item) => {
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
