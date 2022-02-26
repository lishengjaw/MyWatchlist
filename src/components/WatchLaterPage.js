import { useEffect, useState } from "react";
import { db } from "../firebase";
import DisplayList from "./DisplayList";
import GenreCounter from "./GenreCounter";
import "../styles/WatchLaterPage.css";

const WatchLaterPage = () => {
  const [watchLaterList, setWatchLaterList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('Loading watch laters...')

  useEffect(() => {
    db.collection("watch-later")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setWatchLaterList(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage('No watch laters found')
    }, 10000)
  }, [])

  return (
    <div className="background">
      {watchLaterList && watchLaterList.length > 0 ? (
        <div className="watch-later-page">
          <h1>My Watch Later</h1>
          <div className="watch-later-body">
            <GenreCounter temp={watchLaterList} />
            <DisplayList favourites={false} temp={watchLaterList} />
          </div>
        </div>
      ) : (
        <h1 className="list-no-search-results">{errorMessage}</h1>
      )}
    </div>
  );
};

export default WatchLaterPage;
