import { db } from "../firebase";
import firebase from "firebase";

const checkInFavourites = (id) => {
  return db
    .collection("favourites")
    .where("id", "==", id)
    .get()
    .then((querySnapshot) => {
      return !querySnapshot.empty;
    })
    .catch((err) => alert(err));
};

const checkInWatchLater = (id) => {
  return db
    .collection("watch-later")
    .where("id", "==", id)
    .get()
    .then((querySnapshot) => {
      return !querySnapshot.empty ? true : false;
    })
    .catch((err) => alert(err));
};

const addToFavourites = (props) => {
  const { isFavourite, toWatchLater, ...favouriteItem } = props;
  db.collection("favourites")
    .add({
      ...favouriteItem,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .catch((err) => alert(err));
};

const removeFromFavourites = (props) => {
  db.collection("favourites")
    .where("id", "==", props.id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.docs[0].ref.delete();
    })
    .catch((err) => alert(err));
};

const addToWatchLater = (props) => {
  const { isFavourite, toWatchLater, ...watchLaterItem } = props;
  db.collection("watch-later")
    .add({
      ...watchLaterItem,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .catch((err) => alert(err));
};

const removeFromWatchLater = (props) => {
  db.collection("watch-later")
    .where("id", "==", props.id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.docs[0].ref.delete();
    })
    .catch((err) => alert(err));
};

export {
  checkInFavourites,
  checkInWatchLater,
  addToFavourites,
  removeFromFavourites,
  addToWatchLater,
  removeFromWatchLater,
};
