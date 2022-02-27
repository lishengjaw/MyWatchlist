import firebase from "firebase";

// const firebaseConfig = {
//   apiKey: "AIzaSyB7Q2fJIDR8G530LCP7IZC_HCae_2zghOU",
//   authDomain: "mywatchlist-e3ddc.firebaseapp.com",
//   projectId: "mywatchlist-e3ddc",
//   storageBucket: "mywatchlist-e3ddc.appspot.com",
//   messagingSenderId: "959910128467",
//   appId: "1:959910128467:web:fd4d9fa636f0a1037d0fa6",
//   measurementId: "G-J4XPET471E",
// };

const firebaseConfig = {
  apiKey: "AIzaSyBhaj9YSBEqzLD4yihekoecQv0fBUJdxGM",
  authDomain: "test-6e7bc.firebaseapp.com",
  projectId: "test-6e7bc",
  storageBucket: "test-6e7bc.appspot.com",
  messagingSenderId: "290805691958",
  appId: "1:290805691958:web:de7760642e1db180e5ca97",
  measurementId: "G-GQVG9CFB1B"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export { db };
