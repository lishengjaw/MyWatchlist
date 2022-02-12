import { useEffect, useState } from "react";
import { db } from "../firebase";
import DisplayList from "./DisplayList";
import GenreCounter from "./GenreCounter";
import "../styles/FavouritesPage.css";

const FavouritesPage = () => {
  const [favouritesList, setFavouritesList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('Loading favourites...');
  
  useEffect(() => {
    db.collection("favourites")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setFavouritesList(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage('No favourites found');
    }, 5000)
  }, [])

  return (
    <div className="background">
      {favouritesList && favouritesList.length > 0 ? (
        <div className="favourites-page">
          <h1>My Favourites</h1>
          <div className="favourites-body">
            <GenreCounter temp={favouritesList} />
            <DisplayList favourites={true} temp={favouritesList} />
          </div>
        </div>
      ) : (
        <h1 className="list-no-search-results">{errorMessage}</h1>
      )}
    </div>
  );
};

export default FavouritesPage;
