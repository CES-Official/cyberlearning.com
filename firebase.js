// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc, 
  getDocs 
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC99IpFFqvHnqUHRLE2F3MKZA283pV0Cro",
  authDomain: "cyberlearning-website.firebaseapp.com",
  projectId: "cyberlearning-website",
  storageBucket: "cyberlearning-website.firebasestorage.app",
  messagingSenderId: "1052730134732",
  appId: "1:1052730134732:web:0e9700601a48c5c5c33269",
  measurementId: "G-Z9P1QZQDLD"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);
export { db, collection, doc, getDoc, getDocs };