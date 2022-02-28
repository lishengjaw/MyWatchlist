import { useEffect, useState } from "react";
import { db } from "../firebase";
import DisplayList from "./DisplayList";
import GenreCounter from "./GenreCounter";
import "../styles/FavouritesAndWatchLaterPage.css";
import { setErrorTimeout } from "../controllers/UtilityController";

const FavouritesAndWatchLaterPage = ({ isFavourite }) => {
  const [itemList, setItemList] = useState([]);
  const [errorMessage, setErrorMessage] = useState(
    `Loading ${isFavourite ? "favourites" : "watch later"}...`
  );

  useEffect(() => {
    db.collection(`${isFavourite ? "favourites" : "watch-later"}`)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setItemList(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
        if (snapshot.empty) {
          setErrorTimeout(
            setErrorMessage(
              `No ${isFavourite ? "favourites" : "watch later"} found`
            )
          );
        }
      });
  }, [isFavourite]);

  return (
    <div className="background">
      {itemList && itemList.length > 0 ? (
        <div className="favourites-and-watch-later-page">
          <h1>{`My ${isFavourite ? "Favourites" : "Watch Later"}`}</h1>
          <div className="favourites-and-watch-later-body">
            <GenreCounter temp={itemList} />
            <DisplayList favourites={isFavourite} temp={itemList} />
          </div>
        </div>
      ) : (
        <h1 className="list-no-search-results">{errorMessage}</h1>
      )}
    </div>
  );
};

export default FavouritesAndWatchLaterPage;
