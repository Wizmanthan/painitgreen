
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDzdCkoqIQX5wco_ie8jE5Y0xo0fiqvkWI",
  authDomain: "manthan-video.firebaseapp.com",
  projectId: "manthan-video",
  storageBucket: "manthan-video.appspot.com",
  messagingSenderId: "969061610273",
  appId: "1:969061610273:web:0e672d2959ea052652c460",
  measurementId: "G-CNZ5H4XQH8"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);