// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-2cf28.firebaseapp.com",
  projectId: "mern-blog-2cf28",
  storageBucket: "mern-blog-2cf28.appspot.com",
  messagingSenderId: "115604973552",
  appId: "1:115604973552:web:75cba37954bc4e8ab65f35",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
