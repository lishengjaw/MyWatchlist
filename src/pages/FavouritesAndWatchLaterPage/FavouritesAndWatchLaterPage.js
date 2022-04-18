import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { db } from "../../firebase";
import DisplayList from "../../components/DisplayList";
import GenreCounter from "../../components/GenreCounter";

const FavouritesAndWatchLaterPage = ({ isFavourite }) => {
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      });
  }, [isFavourite]);

  return (
    <div className="background">
      {loading ? (
        <Spinner animation="border" variant="dark" />
      ) : (
        <>
          {itemList?.length > 0 ? (
            <div className="favourites-and-watch-later-page">
              <h1 className="page-header">{`My ${
                isFavourite ? "Favourites" : "Watch Later"
              }`}</h1>
              <div className="d-flex">
                <GenreCounter temp={itemList} />
                <DisplayList favourites={isFavourite} temp={itemList} />
              </div>
            </div>
          ) : (
            <h1 className="error">No results</h1>
          )}
        </>
      )}
    </div>
  );
};

export default FavouritesAndWatchLaterPage;
