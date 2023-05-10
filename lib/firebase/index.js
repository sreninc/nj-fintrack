// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIVYmYAgudLK_wuY58xgXILHphDP2G1l0",
  authDomain: "nj-fintrack.firebaseapp.com",
  projectId: "nj-fintrack",
  storageBucket: "nj-fintrack.appspot.com",
  messagingSenderId: "985531768678",
  appId: "1:985531768678:web:75006623a9e50a9dd7f2a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)

export { app, db, auth };