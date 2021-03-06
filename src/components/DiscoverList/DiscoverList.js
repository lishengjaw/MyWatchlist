import {
  checkInFavourites,
  checkInWatchLater,
} from "../../db/DBController";
import ItemCard from "../ItemCard/ItemCard";
import "./DiscoverList.css";

const DiscoverList = ({ temp }) => {
  return (
    <div className="discover-list d-grid mb-3">
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
  );
};

export default DiscoverList;
