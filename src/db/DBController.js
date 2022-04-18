import { db } from "../firebase";
import firebase from "firebase";
import { getItemById } from "../api/APIController";

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
      return !querySnapshot.empty;
    })
    .catch((err) => alert(err));
};

const addToFavourites = async (props, isMovie) => {
  let data = null;
  const { id } = props;
  const { genres } = await getItemById(id, isMovie);
  const genre_list = genres.map((genre) => genre.name);
  if (isMovie) {
    const { release_date, id, poster_path, title, vote_average } = props;
    data = {
      release_date,
      id,
      poster_path,
      title,
      vote_average,
      genre_list,
      isMovie,
    };
  } else {
    const { first_air_date, id, poster_path, name, vote_average } = props;
    data = {
      first_air_date,
      id,
      poster_path,
      name,
      vote_average,
      genre_list,
      isMovie,
    };
  }

  db.collection("favourites")
    .add({
      ...data,
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

const addToWatchLater = async (props, isMovie) => {
  let data = null;
  const { id } = props;
  const { genres } = await getItemById(id, isMovie);
  const genre_list = genres.map((genre) => genre.name);
  if (isMovie) {
    const { release_date, poster_path, title, vote_average } = props;
    data = {
      release_date,
      id,
      poster_path,
      title,
      vote_average,
      genre_list,
      isMovie,
    };
  } else {
    const { first_air_date, poster_path, name, vote_average } = props;
    data = {
      first_air_date,
      id,
      poster_path,
      name,
      vote_average,
      genre_list,
      isMovie,
    };
  }

  db.collection("watch-later")
    .add({
      ...data,
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
