const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");

// Add Firebase SDK Snippet
const firebaseConfig = {
  apiKey: "AIzaSyBUcrcKj3fZfvATAAYALeL02xkmP-8GPRs",
  authDomain: "rep-counter-bc4e6.firebaseapp.com",
  databaseURL: "https://rep-counter-bc4e6-default-rtdb.firebaseio.com",
  projectId: "rep-counter-bc4e6",
  storageBucket: "rep-counter-bc4e6.appspot.com",
  messagingSenderId: "944043212944",
  appId: "1:944043212944:web:d4bf3019f0729da53c1815",
  measurementId: "G-J9XRD32G4E",
};

firebase.initializeApp(firebaseConfig);
module.exports = firebase;
